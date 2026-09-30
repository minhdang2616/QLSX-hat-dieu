export default function LienHePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full bg-emerald-600/20 px-4 py-2 text-sm font-bold text-emerald-400">
            LIÊN HỆ
          </span>

          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Liên hệ với chúng tôi
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Nếu bạn cần thêm thông tin về giải pháp quản lý doanh
            nghiệp, hãy liên hệ với chúng tôi để được hỗ trợ.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* INFORMATION */}
          <div>
            <p className="font-bold uppercase tracking-wider text-emerald-600">
              THÔNG TIN LIÊN HỆ
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Chúng tôi sẵn sàng hỗ trợ
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Liên hệ với chúng tôi để tìm hiểu thêm về hệ thống
              quản lý và các giải pháp phù hợp với hoạt động của
              doanh nghiệp.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Doanh nghiệp
                </p>

                <p className="mt-2 font-bold text-slate-950">
                  Công ty chế biến hạt điều
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Địa chỉ
                </p>

                <p className="mt-2 font-bold text-slate-950">
                  Việt Nam
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Điện thoại
                </p>

                <p className="mt-2 font-bold text-slate-950">
                  0123 456 789
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Email
                </p>

                <p className="mt-2 font-bold text-slate-950">
                  contact@example.com
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-950">
              Gửi yêu cầu liên hệ
            </h2>

            <p className="mt-2 text-slate-600">
              Vui lòng điền thông tin bên dưới.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-900"
                >
                  Họ và tên
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-bold text-slate-900"
                >
                  Số điện thoại
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-slate-900"
                >
                  Nội dung
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Nhập nội dung cần liên hệ..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
              >
                Gửi liên hệ
              </button>

              <p className="text-center text-xs text-slate-500">
                Biểu mẫu hiện chỉ là giao diện minh họa.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* MAP / LOCATION */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="flex min-h-[280px] items-center justify-center rounded-xl bg-slate-200">
              <div className="text-center">
                <div className="text-4xl">📍</div>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  Địa chỉ doanh nghiệp
                </h3>

                <p className="mt-2 text-slate-600">
                  Việt Nam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Tìm hiểu thêm về hệ thống
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            Khám phá các tính năng và quy trình quản lý được hỗ
            trợ trong hệ thống.
          </p>

<a
  href="/gioi-thieu"
  className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-bold text-emerald-700 transition hover:bg-slate-100"
>
  Về trang giới thiệu
</a>
        </div>
      </section>
    </main>
  );
}
