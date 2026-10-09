import type { Content } from "@/lib/api";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function IntroSections({ contents }: { contents: Content[] }) {
  const get = (section: string) => contents.find((c) => c.section === section);

  const hero = get("hero");
  const about = get("about");
  const warehouse = get("warehouse");
  const production = get("production");
  const business = get("business");
  const report = get("report");
  const cta = get("cta");

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      {hero && (
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
      )}

      {/* ABOUT */}
      {about && (
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

              {about.items.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-5">
                  {about.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="text-3xl font-bold text-emerald-600">
                        {item.description}
                      </p>
                      <p className="mt-2 font-semibold text-slate-900">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
      )}

      {/* WAREHOUSE */}
      {warehouse && (
        <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
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
                {warehouse.items.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                      {num(i)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-950">{item.title}</h3>
                      {item.description && (
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTION */}
      {production && (
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

            {production.items.length > 0 && (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {production.items.map((item, i) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                      {num(i)}
                    </div>
                    <h3 className="mt-4 font-bold text-slate-950">{item.title}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* BUSINESS */}
      {business && (
        <section className="bg-slate-950 px-6 py-20 text-white lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-400">
                QUẢN LÝ KINH DOANH
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">{business.title}</h2>
              {business.description && (
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {business.description}
                </p>
              )}

              {business.items.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {business.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-5"
                    >
                      <h3 className="font-bold">{item.title}</h3>
                      {item.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
      )}

      {/* REPORT */}
      {report && (
        <section className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
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
                {report.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-950">{item.title}</h3>
                      {item.description && (
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
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
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="bg-emerald-700 px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{cta.title}</h2>
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
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold">Hệ thống quản lý doanh nghiệp</p>
            <p className="mt-1 text-sm text-slate-400">
              Giải pháp quản lý doanh nghiệp chế biến hạt điều
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <a href="/" className="transition hover:text-white">Giới thiệu</a>
            <a href="/tinh-nang" className="transition hover:text-white">Tính năng</a>
            <a href="/quy-trinh" className="transition hover:text-white">Quy trình</a>
            <a href="/lien-he" className="transition hover:text-white">Liên hệ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
