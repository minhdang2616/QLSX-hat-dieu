import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(session.value),
    },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-slate-800">
          <div>
            <h1 className="text-lg font-bold">
              HẠT ĐIỀU
            </h1>

            <p className="text-xs text-slate-400">
              Administration
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">

          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-600 text-white"
          >
            <span>▦</span>
            <span>Bảng điều khiển</span>
          </a>

          <a
            href="/admin/content"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>▤</span>
            <span>Nội dung website</span>
          </a>

          <a
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>♙</span>
            <span>Tài khoản</span>
          </a>

          <div className="pt-6 pb-2 px-4 text-xs uppercase text-slate-500">
            Hệ thống
          </div>

          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>↗</span>
            <span>Xem website</span>
          </a>

        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold">
              {(user.name || user.username)
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="font-medium truncate">
                {user.name || user.username}
              </p>

              <p className="text-xs text-slate-400">
                Quản trị viên
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOP BAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

          <div>
            <h2 className="font-semibold text-slate-800">
              Bảng điều khiển
            </h2>

            <p className="text-xs text-slate-500">
              Quản lý website
            </p>
          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-slate-600">
              {user.name || user.username}
            </span>

            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
              {(user.name || user.username)
                .charAt(0)
                .toUpperCase()}
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-8">

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Xin chào, {user.name || user.username} 👋
            </h1>

            <p className="text-slate-500 mt-1">
              Đây là khu vực quản trị website.
            </p>
          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-slate-500">
                Nội dung website
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                0
              </p>

              <p className="text-xs text-emerald-600 mt-2">
                Nội dung đang quản lý
              </p>
            </div>

            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-slate-500">
                Tài khoản quản trị
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                1
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Tài khoản hệ thống
              </p>
            </div>

            <div className="bg-white rounded-xl border p-5">
              <p className="text-sm text-slate-500">
                Trạng thái hệ thống
              </p>

              <p className="text-3xl font-bold text-emerald-600 mt-2">
                Online
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Hệ thống đang hoạt động
              </p>
            </div>

          </div>

          {/* QUICK ACTIONS */}
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quản lý nhanh
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <a
              href="/admin/content"
              className="bg-white border rounded-xl p-6 hover:border-emerald-500 hover:shadow-sm transition"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-4">
                ▤
              </div>

              <h3 className="font-semibold text-slate-900">
                Quản lý nội dung
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Chỉnh sửa nội dung hiển thị trên website.
              </p>
            </a>

            <a
              href="/admin/users"
              className="bg-white border rounded-xl p-6 hover:border-emerald-500 hover:shadow-sm transition"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xl mb-4">
                ♙
              </div>

              <h3 className="font-semibold text-slate-900">
                Quản lý tài khoản
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Quản lý tài khoản và quyền truy cập.
              </p>
            </a>

          </div>

        </div>

      </main>

    </div>
  );
}
