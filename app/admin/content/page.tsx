"use client";

import { FormEvent, useEffect, useState } from "react";

type Content = {
  id: number;
  page: string;
  section: string;
  title: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
};

// Reads a response safely. If the server sends HTML (404 page, redirect to
// login, crash page...) instead of JSON, we show a useful error instead of
// "Unexpected token '<'".
async function readJson(res: Response) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `Server trả về HTML thay vì JSON (HTTP ${res.status}) tại ${res.url}`
    );
  }
}

const initialForm = {
  page: "home",
  section: "",
  title: "",
  description: "",
  image: "",
  sortOrder: 1,
};

export default function ContentAdminPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function notify(text: string, error = false) {
    setMessage(text);
    setIsError(error);
  }

  async function loadContents() {
    try {
      setLoading(true);

      const res = await fetch("/api/content", {
        cache: "no-store",
      });

      const data = await readJson(res);

      if (!res.ok) {
        throw new Error(data?.error || "Không thể tải nội dung");
      }

      setContents(data);
    } catch (error) {
      console.error(error);
      notify(
        error instanceof Error ? error.message : "Không thể tải dữ liệu",
        true
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContents();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "sortOrder" ? (value === "" ? 0 : Number(value)) : value,
    }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.page || !form.section || !form.title) {
      notify("Vui lòng nhập đầy đủ thông tin bắt buộc", true);
      return;
    }

    try {
      setSaving(true);
      notify("");

      const url = editingId
        ? `/api/content/${editingId}`
        : "/api/content";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image: form.image.trim(),
        }),
      });

      const data = await readJson(res);

      if (!res.ok) {
        throw new Error(data?.error || "Có lỗi xảy ra");
      }

      notify(
        editingId
          ? "Cập nhật nội dung thành công"
          : "Thêm nội dung thành công"
      );

      resetForm();
      await loadContents();
    } catch (error) {
      console.error(error);

      notify(
        error instanceof Error
          ? error.message
          : "Không thể lưu nội dung",
        true
      );
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(content: Content) {
    setEditingId(content.id);

    setForm({
      page: content.page,
      section: content.section,
      title: content.title,
      description: content.description || "",
      image: content.image || "",
      sortOrder: content.sortOrder,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa nội dung này?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      });

      const data = await readJson(res);

      if (!res.ok) {
        throw new Error(data?.error || "Không thể xóa");
      }

      notify("Xóa nội dung thành công");

      if (editingId === id) {
        resetForm();
      }

      await loadContents();
    } catch (error) {
      console.error(error);

      notify(
        error instanceof Error
          ? error.message
          : "Không thể xóa nội dung",
        true
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 bg-slate-950 text-white">
          <div className="border-b border-slate-800 px-6 py-5">
            <h1 className="text-xl font-bold">
              Admin
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              Quản trị website
            </p>
          </div>

          <nav className="p-4">
            <a
              href="/admin"
              className="mb-2 block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Bảng điều khiển
            </a>

            <a
              href="/admin/content"
              className="mb-2 block rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white"
            >
              Nội dung website
            </a>

            <a
              href="/admin/users"
              className="mb-2 block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Tài khoản
            </a>

	    <a
	      href="/gioi-thieu"
	      className="mt-6 block rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
	    >
	      Xem website
	    </a>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-950">
                Nội dung website
              </h2>

              <p className="mt-2 text-base text-slate-700">
                Quản lý nội dung các trang trên website.
              </p>
            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className={`mb-6 rounded-lg border px-4 py-3 font-semibold ${
                  isError
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-emerald-300 bg-emerald-50 text-emerald-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* FORM */}
            <div className="mb-8 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    {editingId
                      ? "Chỉnh sửa nội dung"
                      : "Thêm nội dung"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Các trường có dấu * là bắt buộc.
                  </p>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100"
                  >
                    Hủy chỉnh sửa
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  {/* PAGE */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Trang *
                    </label>

                    <select
                      name="page"
                      value={form.page}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    >

                      <option value="gioi-thieu">
                        Giới thiệu
                      </option>

                      <option value="tinh-nang">
                        Tính năng
                      </option>

                      <option value="quy-trinh">
                        Quy trình
                      </option>

                      <option value="lien-he">
                        Liên hệ
                      </option>
                    </select>
                  </div>

                  {/* SECTION */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Section *
                    </label>

                    <input
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                      placeholder="Ví dụ: hero, about, warehouse"
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  {/* TITLE */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Tiêu đề *
                    </label>

                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề"
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Mô tả
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Nhập nội dung mô tả"
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  {/* IMAGE */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Hình ảnh
                    </label>

                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="/images/gioi-thieu/anh.png hoặc https://example.com/image.jpg"
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />

                    <p className="mt-2 text-sm text-slate-600">
                      Nhập URL ảnh, hoặc đường dẫn file trong thư mục public (bắt đầu bằng /).
                    </p>

                    {form.image.trim() && (
                      <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-4">
                        <p className="mb-3 text-sm font-bold text-slate-800">
                          Xem trước hình ảnh
                        </p>

                        <div className="flex min-h-[180px] items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-3">
                          <img
                            src={form.image}
                            alt="Xem trước"
                            className="max-h-80 max-w-full rounded-lg object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display =
                                "block";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SORT ORDER */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-900">
                      Thứ tự
                    </label>

                    <input
                      type="number"
                      name="sortOrder"
                      value={form.sortOrder}
                      onChange={handleChange}
                      min={0}
                      className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Đang lưu..."
                      : editingId
                      ? "Cập nhật"
                      : "Thêm nội dung"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg border border-slate-400 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-100"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
              <div className="border-b border-slate-300 px-6 py-5">
                <h3 className="text-xl font-bold text-slate-950">
                  Danh sách nội dung
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Tổng số: {contents.length} nội dung
                </p>
              </div>

              {loading ? (
                <div className="p-8 text-center font-semibold text-slate-700">
                  Đang tải dữ liệu...
                </div>
              ) : contents.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-bold text-slate-900">
                    Chưa có nội dung
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Hãy thêm nội dung đầu tiên ở phía trên.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-bold text-slate-900">
                          ID
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-bold text-slate-900">
                          Hình ảnh
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-bold text-slate-900">
                          Trang
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-bold text-slate-900">
                          Section
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-bold text-slate-900">
                          Tiêu đề
                        </th>

                        <th className="px-4 py-4 text-center text-sm font-bold text-slate-900">
                          Thứ tự
                        </th>

                        <th className="px-4 py-4 text-right text-sm font-bold text-slate-900">
                          Thao tác
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {contents.map((content) => (
                        <tr
                          key={content.id}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-4 py-4 font-semibold text-slate-900">
                            #{content.id}
                          </td>

                          <td className="px-4 py-4">
                            {content.image ? (
                              <img
                                src={content.image}
                                alt={content.title}
                                className="h-16 w-24 rounded-lg border border-slate-300 object-cover"
                              />
                            ) : (
                              <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-dashed border-slate-400 text-xs font-semibold text-slate-500">
                                Không có ảnh
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-4 font-semibold text-slate-800">
                            {content.page}
                          </td>

                          <td className="px-4 py-4">
                            <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-bold text-slate-800">
                              {content.section}
                            </span>
                          </td>

                          <td className="max-w-xs px-4 py-4 font-bold text-slate-950">
                            {content.title}
                          </td>

                          <td className="px-4 py-4 text-center font-semibold text-slate-800">
                            {content.sortOrder}
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(content)
                                }
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700"
                              >
                                Sửa
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(content.id)
                                }
                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
