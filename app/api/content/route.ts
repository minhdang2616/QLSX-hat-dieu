import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: [{ page: "asc" }, { sortOrder: "asc" }, { id: "asc" }],
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("GET /api/content ERROR:", error);

    return NextResponse.json(
      { error: "Không thể tải nội dung" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const filled = (v: unknown): v is string =>
      typeof v === "string" && v.trim().length > 0;

    if (!filled(page) || !filled(section) || !filled(title)) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const order = Number(sortOrder);

    const content = await prisma.content.create({
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

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error("POST /api/content ERROR:", error);

    return NextResponse.json(
      { error: "Không thể tạo nội dung" },
      { status: 500 }
    );
  }
}
