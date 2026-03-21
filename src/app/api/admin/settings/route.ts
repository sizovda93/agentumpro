import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

// GET /api/admin/settings — получить все настройки
export async function GET() {
  const settings = await db.siteSetting.findMany();
  const result: Record<string, string> = {};
  for (const s of settings) {
    result[s.key] = s.value;
  }
  return NextResponse.json({ settings: result });
}

const settingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().max(5000),
});

// PUT /api/admin/settings — обновить настройку (upsert)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = settingSchema.parse(body);

    await db.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Settings error:", err);
    return NextResponse.json(
      { error: "Ошибка сохранения" },
      { status: 500 }
    );
  }
}
