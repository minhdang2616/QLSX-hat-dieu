"use client";

import { useEffect, useState } from "react";

type Content = {
  id: number;
  page: string;
  section: string;
  title: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
};

export default function GioiThieuPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/content");

        if (!response.ok) {
          throw new Error("Không thể tải nội dung");
        }

        const data: Content[] = await response.json();

        const filtered = data
          .filter((item) => item.page === "gioi-thieu")
          .sort((a, b) => a.sortOrder - b.sortOrder);

        setContents(filtered);
      } catch (error) {
        console.error("Lỗi tải nội dung:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="text-lg font-semibold text-slate-900">
            Đang tải nội dung...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
          HERO
      ========================== */}
      {(() => {
        const hero = contents.find(
          (item) => item.section === "hero"
        );

        if (!hero) return null;

        return (
          <section className="relative overflow-hidden bg-slate-950">
            {hero.image && (
              <img
                src={hero.image}
                alt={hero.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            )}

            <div className="absolute inset-0 bg-slate-950/60" />

            <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
              <div className="max-w-4xl">
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                  GIỚI THIỆU
                </p>

                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {hero.title}
                </h1>

                {hero.description && (
                  <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                    {hero.description}
                  </p>
                )}

                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="/tinh-nang"
                    className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Xem tính năng
                  </a>

                  <a
                    href="/lien-he"
                    className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Liên hệ
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* =========================
          GIỚI THIỆU
      ========================== */}
      {(() => {
        const about = contents.find(
          (item) => item.section === "about"
        );

        if (!about) return null;

        return (
          <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">
                  VỀ HỆ THỐNG
                </p>

                <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                  {about.title}
                </h2>

                {about.description && (
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    {about.description}
                  </p>
                )}

                <div className="mt-8 grid grid-cols-2 gap-5">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-3xl font-bold text-emerald-600">
                      01
                    </p>

                    <p className="mt-2 font-semibold text-slate-900">
                      Nền tảng quản lý
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-3xl font-bold text-emerald-600">
                      03
                    </p>

                    <p className="mt-2 font-semibold text-slate-900">
                      Phân hệ kho
                    </p>
                  </div>
                </div>
              </div>

              {about.image && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                  <img
                    src={about.image}
                    alt={about.title}
                    className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* =========================
          NĂNG LỰC / KHO
      ========================== */}
      {(() => {
        const warehouse = contents.find(
          (item) => item.section === "warehouse"
        );

        if (!warehouse) return null;

        return (
          <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">

              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                {warehouse.image && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                    <img
                      src={warehouse.image}
                      alt={warehouse.title}
                      className="h-[420px] w-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">
                    QUẢN LÝ KHO
                  </p>

                  <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                    {warehouse.title}
                  </h2>

                  {warehouse.description && (
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                      {warehouse.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-4">

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        01
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Kho nguyên liệu
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Theo dõi nhập, xuất và tồn nguyên liệu.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        02
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Kho chế biến
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Theo dõi nguyên liệu đang trong quá trình chế biến.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        03
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Kho thành phẩm
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Quản lý thành phẩm sau khi hoàn tất chế biến.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })()}

      {/* =========================
          QUY TRÌNH CHẾ BIẾN
      ========================== */}
      {(() => {
        const production = contents.find(
          (item) => item.section === "production"
        );

        if (!production) return null;

        return (
          <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">

              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">
                  QUY TRÌNH
                </p>

                <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
                  {production.title}
                </h2>

                {production.description && (
                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    {production.description}
                  </p>
                )}
              </div>

              {production.image && (
                <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                  <img
                    src={production.image}
                    alt={production.title}
                    className="h-[420px] w-full object-cover"
                  />
                </div>
              )}

              <div className="mt-12 grid gap-5 md:grid-cols-4">

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    01
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950">
                    Nhập nguyên liệu
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Tiếp nhận và ghi nhận nguyên liệu đầu vào.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    02
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950">
                    Tạo lô chế biến
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Theo dõi từng lô nguyên liệu đưa vào sản xuất.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    03
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950">
                    Chế biến
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Ghi nhận quá trình chế biến và phân loại.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    04
                  </div>

                  <h3 className="mt-4 font-bold text-slate-950">
                    Nhập thành phẩm
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Chuyển thành phẩm hoàn tất vào kho.
                  </p>
                </div>

              </div>
            </div>
          </section>
        );
      })()}

      {/* =========================
          MUA BÁN / CÔNG NỢ
      ========================== */}
      {(() => {
        const business = contents.find(
          (item) => item.section === "business"
        );

        if (!business) return null;

        return (
          <section className="bg-slate-950 px-6 py-20 text-white lg:px-8 lg:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-400">
                  QUẢN LÝ KINH DOANH
                </p>

                <h2 className="text-3xl font-bold md:text-4xl">
                  {business.title}
                </h2>

                {business.description && (
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    {business.description}
                  </p>
                )}

                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-bold">
                      Mua hàng
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Quản lý đơn mua và theo dõi công nợ nhà cung cấp.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-bold">
                      Bán hàng
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Quản lý đơn bán, giao hàng và công nợ khách hàng.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-bold">
                      Thu chi
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Theo dõi các khoản thu và chi phát sinh.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-bold">
                      Đối tác
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Quản lý thông tin khách hàng và nhà cung cấp.
                    </p>
                  </div>

                </div>
              </div>

              {business.image && (
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={business.image}
                    alt={business.title}
                    className="h-[460px] w-full object-cover"
                  />
                </div>
              )}

            </div>
          </section>
        );
      })()}

      {/* =========================
          BÁO CÁO
      ========================== */}
      {(() => {
        const report = contents.find(
          (item) => item.section === "report"
        );

        if (!report) return null;

        return (
          <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">

              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">
                    BÁO CÁO & PHÂN TÍCH
                  </p>

                  <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                    {report.title}
                  </h2>

                  {report.description && (
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                      {report.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-4">

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Theo dõi nhập - xuất - tồn
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Tổng hợp dữ liệu từ các kho trong hệ thống.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Theo dõi doanh thu
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Tổng hợp giá trị các giao dịch bán hàng.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          Phân tích hoạt động
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Hỗ trợ theo dõi hiệu quả hoạt động kinh doanh.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {report.image && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="h-[420px] w-full object-cover"
                    />
                  </div>
                )}

              </div>
            </div>
          </section>
        );
      })()}

      {/* =========================
          CTA
      ========================== */}
      {(() => {
        const cta = contents.find(
          (item) => item.section === "cta"
        );

        if (!cta) return null;

        return (
          <section className="bg-emerald-700 px-6 py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">

              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {cta.title}
              </h2>

              {cta.description && (
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
                  {cta.description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <a
                  href="/tinh-nang"
                  className="rounded-lg bg-white px-7 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Xem tính năng
                </a>

                <a
                  href="/lien-he"
                  className="rounded-lg border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Liên hệ
                </a>

              </div>
            </div>
          </section>
        );
      })()}

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-lg font-bold">
              Hệ thống quản lý doanh nghiệp
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Giải pháp quản lý doanh nghiệp chế biến hạt điều
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <a
              href="/"
              className="transition hover:text-white"
            >
              Trang chủ
            </a>

            <a
              href="/gioi-thieu"
              className="transition hover:text-white"
            >
              Giới thiệu
            </a>

            <a
              href="/tinh-nang"
              className="transition hover:text-white"
            >
              Tính năng
            </a>

            <a
              href="/quy-trinh"
              className="transition hover:text-white"
            >
              Quy trình
            </a>

            <a
              href="/lien-he"
              className="transition hover:text-white"
            >
              Liên hệ
            </a>
          </div>

        </div>
      </footer>

    </main>
  );
}
