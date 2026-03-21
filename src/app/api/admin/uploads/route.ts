import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";

// Папка для загрузок — вне публичного доступа
const UPLOAD_DIR = process.env.UPLOAD_DIR || "/data/uploads";

// Разрешённые MIME-типы
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_SIZE = 10 * 1024 * 1024; // 10 МБ

// POST /api/admin/uploads — загрузить файл
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Недопустимый тип файла" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Файл слишком большой (максимум 10 МБ)" },
        { status: 400 }
      );
    }

    // Генерируем безопасное имя файла
    const ext = file.name.split(".").pop() || "bin";
    const storedName = `${randomUUID()}.${ext}`;

    // Создаём директорию при необходимости
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Записываем файл
    const bytes = new Uint8Array(await file.arrayBuffer());
    await writeFile(join(UPLOAD_DIR, storedName), bytes);

    // Сохраняем метаданные в БД
    const upload = await db.upload.create({
      data: {
        filename: file.name,
        storedName,
        mimeType: file.type,
        size: file.size,
        uploadedById: user.id,
      },
    });

    return NextResponse.json({ upload }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Ошибка загрузки файла" },
      { status: 500 }
    );
  }
}

// GET /api/admin/uploads — список загруженных файлов
export async function GET() {
  const uploads = await db.upload.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ uploads });
}
