import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

// Валидация входящих данных
const leadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое").max(100),
  phone: z
    .string()
    .min(7, "Некорректный номер телефона")
    .max(20)
    .regex(/^[\d\s\+\-\(\)]+$/, "Некорректный формат телефона"),
  message: z.string().max(1000).optional(),
});

// POST /api/leads — создание новой заявки с сайта
export async function POST(request: NextRequest) {
  // Rate limit: 5 заявок в минуту с одного IP
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

    const lead = await db.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        message: data.message || null,
      },
    });

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Lead creation error:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
