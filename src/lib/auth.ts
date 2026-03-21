import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "CHANGE_ME_IN_PRODUCTION"
);

const COOKIE_NAME = "session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 дней в секундах

// Создать JWT-токен и установить cookie
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  // Сохраняем сессию в БД
  const session = await db.session.create({
    data: {
      userId,
      expiresAt,
    },
  });

  // Подписываем JWT с ID сессии
  const token = await new SignJWT({ sessionId: session.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(JWT_SECRET);

  // Устанавливаем httpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return session;
}

// Получить текущего пользователя из cookie
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const sessionId = payload.sessionId as string;

    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      // Сессия истекла — удаляем
      if (session) {
        await db.session.delete({ where: { id: sessionId } });
      }
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

// Удалить сессию (logout)
export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const sessionId = payload.sessionId as string;
      await db.session.delete({ where: { id: sessionId } }).catch(() => {});
    } catch {
      // Невалидный токен — просто удаляем cookie
    }
  }

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
