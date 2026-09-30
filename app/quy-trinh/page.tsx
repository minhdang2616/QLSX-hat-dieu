export default function QuyTrinhPage() {
  const processes = [
    {
      number: "01",
      title: "Mua hàng",
      description:
        "Doanh nghiệp tạo đơn mua và quản lý thông tin nhà cung cấp, nguyên liệu và giá trị đơn hàng.",
      items: [
        "Tạo đơn mua",
        "Quản lý nhà cung cấp",
        "Theo dõi giá trị mua",
      ],
    },
    {
      number: "02",
      title: "Nhập kho nguyên liệu",
      description:
        "Nguyên liệu sau khi mua được tiếp nhận và ghi nhận vào kho nguyên liệu.",
      items: [
        "Tạo phiếu nhập",
        "Kiểm tra số lượng",
        "Cập nhật tồn kho",
      ],
    },
    {
      number: "03",
      title: "Chế biến",
      description:
        "Nguyên liệu được đưa vào quá trình chế biến và theo dõi theo từng lô sản xuất.",
      items: [
        "Tạo lô chế biến",
        "Theo dõi nguyên liệu",
        "Phân loại sản phẩm",
      ],
    },
    {
      number: "04",
      title: "Nhập kho thành phẩm",
      description:
        "Sau quá trình chế biến, thành phẩm được chuyển vào kho để tiếp tục quản lý.",
      items: [
        "Ghi nhận thành phẩm",
        "Cập nhật tồn kho",
        "Theo dõi số lượng",
      ],
    },
    {
      number: "05",
      title: "Bán hàng",
      description:
        "Doanh nghiệp tạo đơn bán và quản lý thông tin khách hàng, sản phẩm và giá trị giao dịch.",
      items: [
        "Tạo đơn bán",
        "Quản lý khách hàng",
        "Theo dõi doanh thu",
      ],
    },
    {
      number: "06",
      title: "Xuất kho và giao hàng",
      description:
        "Sản phẩm được xuất khỏi kho thành phẩm để thực hiện giao hàng cho khách.",
      items: [
        "Tạo phiếu xuất",
        "Cập nhật tồn kho",
        "Theo dõi giao hàng",
      ],
    },
    {
      number: "07",
      title: "Thanh toán và công nợ",
      description:
        "Theo dõi các khoản thanh toán và công nợ phát sinh với khách hàng và nhà cung cấp.",
      items: [
        "Theo dõi khoản phải thu",
        "Theo dõi khoản phải trả",
        "Ghi nhận thanh toán",
      ],
    },
    {
      number: "08",
      title: "Báo cáo",
      description:
        "Dữ liệu từ các hoạt động được tổng hợp để hỗ trợ theo dõi tình hình hoạt động của doanh nghiệp.",
      items: [
        "Báo cáo nhập - xuất - tồn",
        "Theo dõi doanh thu",
        "Theo dõi lãi/lỗ",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full bg-emerald-600/20 px-4 py-2 text-sm font-bold text-emerald-400">
            QUY TRÌNH QUẢN LÝ
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Quy trình hoạt động
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Theo dõi toàn bộ quá trình từ mua nguyên liệu, nhập kho,
            chế biến đến bán hàng và báo cáo trên một hệ thống tập trung.
          </p>
        </div>
      </section>

      {/* OVERVIEW FLOW */}
      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-wider text-emerald-600">
              QUY TRÌNH TỔNG QUAN
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              Từ nguyên liệu đến thành phẩm
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto">
            <div className="mx-auto flex min-w-[900px] items-center justify-center gap-3">
              {[
                "Mua hàng",
                "Nhập kho",
                "Chế biến",
                "Thành phẩm",
                "Bán hàng",
                "Báo cáo",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="rounded-xl bg-white px-5 py-4 text-center shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-bold text-emerald-600">
                      BƯỚC {index + 1}
                    </p>

                    <p className="mt-1 whitespace-nowrap font-bold text-slate-950">
                      {item}
                    </p>
                  </div>

                  {index < 5 && (
                    <span className="text-xl font-bold text-emerald-600">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS LIST */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="font-bold uppercase tracking-wider text-emerald-600">
              CHI TIẾT QUY TRÌNH
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              Các bước quản lý
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Các hoạt động được kết nối với nhau để dữ liệu được
              quản lý xuyên suốt trong quá trình vận hành.
            </p>
          </div>

          <div className="space-y-6">
            {processes.map((process, index) => (
              <div
                key={process.number}
                className="relative"
              >
                {index < processes.length - 1 && (
                  <div className="absolute left-8 top-20 hidden h-8 w-px bg-emerald-200 md:block" />
                )}

                <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    {/* NUMBER */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-bold text-white">
                      {process.number}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-950">
                        {process.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {process.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {process.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
                LUÂN CHUYỂN KHO
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                Quản lý hàng hóa qua từng kho
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                Hàng hóa được theo dõi trong quá trình nhập, xuất
                và chuyển giữa các kho phục vụ hoạt động sản xuất
                và kinh doanh.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-600 p-5 text-center font-bold text-white">
                  KHO NGUYÊN LIỆU
                </div>

                <div className="text-center text-2xl font-bold text-emerald-600">
                  ↓
                </div>

                <div className="rounded-xl bg-slate-800 p-5 text-center font-bold text-white">
                  KHO CHẾ BIẾN
                </div>

                <div className="text-center text-2xl font-bold text-emerald-600">
                  ↓
                </div>

                <div className="rounded-xl bg-emerald-600 p-5 text-center font-bold text-white">
                  KHO THÀNH PHẨM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFIT / REPORT */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-slate-950 p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-bold uppercase tracking-wider text-emerald-400">
                  BÁO CÁO
                </p>

                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Theo dõi hoạt động kinh doanh
                </h2>

                <p className="mt-5 leading-8 text-slate-300">
                  Dữ liệu từ quá trình mua hàng, nhập kho, xuất kho
                  và bán hàng được tổng hợp để hỗ trợ doanh nghiệp
                  theo dõi tình hình hoạt động.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-6">
                  <p className="text-sm text-slate-400">
                    Nhập kho
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Theo dõi
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-6">
                  <p className="text-sm text-slate-400">
                    Xuất kho
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Theo dõi
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-6">
                  <p className="text-sm text-slate-400">
                    Tồn kho
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Tổng hợp
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-6">
                  <p className="text-sm text-slate-400">
                    Lãi / Lỗ
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    Phân tích
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Khám phá các tính năng của hệ thống
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            Tìm hiểu các chức năng hỗ trợ quản lý mua hàng, kho,
            chế biến, bán hàng và báo cáo.
          </p>
<a
  href="/tinh-nang"
  className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-bold text-emerald-700 transition hover:bg-slate-100"
>
  Xem tính năng
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
