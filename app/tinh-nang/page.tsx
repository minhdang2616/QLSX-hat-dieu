export default function TinhNangPage() {
  const features = [
    {
      icon: "🛒",
      title: "Quản lý mua hàng",
      description:
        "Theo dõi đơn mua, nhà cung cấp, nhập nguyên liệu và công nợ phát sinh trong quá trình mua hàng.",
    },
    {
      icon: "📦",
      title: "Quản lý kho",
      description:
        "Theo dõi nhập, xuất và tồn kho đối với kho nguyên liệu, kho chế biến và kho thành phẩm.",
    },
    {
      icon: "⚙️",
      title: "Quản lý chế biến",
      description:
        "Theo dõi quá trình từ tạo lô nguyên liệu, chế biến, phân loại đến chuyển thành phẩm vào kho.",
    },
    {
      icon: "💰",
      title: "Quản lý bán hàng",
      description:
        "Quản lý đơn bán, giao hàng, xuất kho, thanh toán và công nợ khách hàng.",
    },
    {
      icon: "👥",
      title: "Quản lý công nợ",
      description:
        "Theo dõi công nợ nhà cung cấp và khách hàng, hỗ trợ kiểm soát các khoản phải thu và phải trả.",
    },
    {
      icon: "📊",
      title: "Báo cáo và phân tích",
      description:
        "Tổng hợp dữ liệu nhập, xuất, tồn kho và giá trị giao dịch để hỗ trợ theo dõi hoạt động kinh doanh.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full bg-emerald-600/20 px-4 py-2 text-sm font-bold text-emerald-400">
            GIẢI PHÁP QUẢN LÝ DOANH NGHIỆP
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Tính năng quản lý
            <br />
            toàn diện
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Hệ thống hỗ trợ doanh nghiệp chế biến hạt điều quản lý
            xuyên suốt từ mua hàng, kho, chế biến đến bán hàng và
            báo cáo.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-bold uppercase tracking-wider text-emerald-600">
              TÍNH NĂNG
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              Các chức năng chính
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Các chức năng được thiết kế để hỗ trợ doanh nghiệp
              quản lý hoạt động tập trung trên một hệ thống.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAREHOUSE FLOW */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-wider text-emerald-600">
                QUẢN LÝ KHO
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                Theo dõi luân chuyển hàng hóa
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                Hệ thống hỗ trợ theo dõi hàng hóa qua các kho trong
                quá trình hoạt động của doanh nghiệp, từ nguyên liệu
                đầu vào đến thành phẩm.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Kho nguyên liệu",
                  "Kho chế biến",
                  "Kho thành phẩm",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                      {index + 1}
                    </div>

                    <span className="font-bold text-slate-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  LUÂN CHUYỂN
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-xl bg-emerald-600 p-5 font-bold text-white">
                    Kho nguyên liệu
                  </div>

                  <div className="text-2xl font-bold text-emerald-600">
                    ↓
                  </div>

                  <div className="rounded-xl bg-slate-800 p-5 font-bold text-white">
                    Kho chế biến
                  </div>

                  <div className="text-2xl font-bold text-emerald-600">
                    ↓
                  </div>

                  <div className="rounded-xl bg-emerald-600 p-5 font-bold text-white">
                    Kho thành phẩm
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      NHẬP
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      TỒN
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-500">
                      XUẤT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS FLOW */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-wider text-emerald-600">
              QUẢN LÝ TẬP TRUNG
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              Kết nối các hoạt động kinh doanh
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Dữ liệu được quản lý xuyên suốt giữa các hoạt động
              trong doanh nghiệp.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {[
              "Mua hàng",
              "Nhập kho",
              "Chế biến",
              "Bán hàng",
              "Báo cáo",
            ].map((item, index) => (
              <div key={item} className="relative">
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="mt-4 font-bold text-slate-900">
                    {item}
                  </p>
                </div>

                {index < 4 && (
                  <div className="hidden text-center text-2xl font-bold text-emerald-600 md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Tìm hiểu quy trình quản lý
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            Khám phá cách hệ thống hỗ trợ doanh nghiệp từ mua
            nguyên liệu, chế biến đến bán hàng và báo cáo.
          </p>

<a
  href="/quy-trinh"
  className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-bold text-emerald-700 transition hover:bg-slate-100"
>
  Xem quy trình
</a>

<div>
  <a
    href="/gioi-thieu"
    className="mt-4 inline-block text-sm font-semibold text-emerald-100 underline underline-offset-4 transition hover:text-white"
  >
    ← Quay về trang giới thiệu
  </a>
</div>

        </div>
      </section>
    </main>
  );
}
