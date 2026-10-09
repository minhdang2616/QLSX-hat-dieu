import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

// Validates credentials against the .NET API, then stores the admin session cookie.
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    const apiRes = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    const data = await apiRes.json().catch(() => null);

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: data?.error || "Đăng nhập thất bại" },
        { status: apiRes.status }
      );
    }

    const response = NextResponse.json({ success: true });
    const opts = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    };

    response.cookies.set("admin_session", String(data.id), opts);
    response.cookies.set("admin_name", encodeURIComponent(data.name || data.username), opts);

    return response;
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được máy chủ API" },
      { status: 502 }
    );
  }
}
