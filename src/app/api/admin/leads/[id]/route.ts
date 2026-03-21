import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED", "REJECTED"]).optional(),
  notes: z.string().max(2000).optional(),
});

// PATCH /api/admin/leads/[id] — обновить заявку
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const lead = await db.lead.update({
      where: { id },
      data,
    });

    return NextResponse.json({ lead });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Lead update error:", err);
    return NextResponse.json(
      { error: "Заявка не найдена" },
      { status: 404 }
    );
  }
}

// DELETE /api/admin/leads/[id] — удалить заявку
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Заявка не найдена" },
      { status: 404 }
    );
  }
}
