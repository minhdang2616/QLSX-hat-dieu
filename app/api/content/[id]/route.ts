import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Parse a positive integer ID. Number("") === 0 and Number("1e3") === 1000,
// so a strict regex is safer than Number.isInteger alone.
function parseId(id: string): number | null {
  if (!/^\d+$/.test(id)) return null;
  const n = Number(id);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}

// Prisma throws code P2025 when the record to update/delete doesn't exist.
function isNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "P2025"
  );
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const contentId = parseId(id);

    if (contentId === null) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Dữ liệu JSON không hợp lệ" },
        { status: 400 }
      );
    }

    const { page, section, title, description, image, sortOrder } = body;

    const isFilledString = (v: unknown): v is string =>
      typeof v === "string" && v.trim().length > 0;

    if (!isFilledString(page) || !isFilledString(section) || !isFilledString(title)) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const order = Number(sortOrder);

    const content = await prisma.content.update({
      where: { id: contentId },
      data: {
        page: page.trim(),
        section: section.trim(),
        title: title.trim(),
        description:
          typeof description === "string" && description ? description : null,
        image: typeof image === "string" && image ? image : null,
        sortOrder: Number.isFinite(order) ? Math.trunc(order) : 0,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json(
        { error: "Không tìm thấy nội dung" },
        { status: 404 }
      );
    }

    console.error("PUT /api/content/[id] ERROR:", error);

    return NextResponse.json(
      { error: "Không thể cập nhật nội dung" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const contentId = parseId(id);

    if (contentId === null) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    await prisma.content.delete({
      where: { id: contentId },
    });

    return NextResponse.json({ message: "Xóa nội dung thành công" });
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json(
        { error: "Không tìm thấy nội dung" },
        { status: 404 }
      );
    }

    console.error("DELETE /api/content/[id] ERROR:", error);

    return NextResponse.json(
      { error: "Không thể xóa nội dung" },
      { status: 500 }
    );
  }
}
