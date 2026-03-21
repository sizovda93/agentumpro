// Простой in-memory rate limiter.
// Для production с несколькими инстансами нужен Redis,
// но для одного сервера этого достаточно.

const requests = new Map<string, { count: number; resetAt: number }>();

type RateLimitConfig = {
  maxRequests: number; // Максимум запросов
  windowMs: number;    // Временное окно в миллисекундах
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = requests.get(key);

  // Очистка устаревших записей (каждые 100 вызовов)
  if (Math.random() < 0.01) {
    requests.forEach((v, k) => {
      if (v.resetAt < now) requests.delete(k);
    });
  }

  if (!entry || entry.resetAt < now) {
    requests.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}
