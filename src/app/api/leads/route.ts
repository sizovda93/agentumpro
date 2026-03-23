import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const PLATFORM_API_URL = process.env.PLATFORM_API_URL;
const PLATFORM_API_KEY = process.env.PLATFORM_API_KEY;

const leadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое").max(100),
  phone: z
    .string()
    .min(7, "Некорректный номер телефона")
    .max(20)
    .regex(/^[\d\s\+\-\(\)]+$/, "Некорректный формат телефона"),
});

// POST /api/leads — проксирует заявку в платформу
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { allowed, retryAfterMs } = checkRateLimit(`lead:${ip}`, {
    maxRequests: 5,
    windowMs: 60_000,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    if (!PLATFORM_API_URL || !PLATFORM_API_KEY) {
      console.error("Missing PLATFORM_API_URL or PLATFORM_API_KEY");
      return NextResponse.json(
        { error: "Сервис временно недоступен" },
        { status: 503 }
      );
    }

    const platformRes = await fetch(PLATFORM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": PLATFORM_API_KEY,
      },
      body: JSON.stringify({
        firstName: data.name.split(" ")[0] || data.name,
        lastName: data.name.split(" ").slice(1).join(" ") || "",
        phone: data.phone,
      }),
    });

    if (!platformRes.ok) {
      const err = await platformRes.json().catch(() => ({}));
      console.error("Platform API error:", platformRes.status, err);
      return NextResponse.json(
        { error: "Ошибка отправки заявки" },
        { status: 502 }
      );
    }

    const result = await platformRes.json();
    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Lead proxy error:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
