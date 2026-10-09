# QLSX Hạt Điều

- **Frontend**: Next.js (root of this repo) — trang giới thiệu nằm ở `/` (trang chủ), khu vực quản trị ở `/admin`.
- **Backend**: ASP.NET Core 8 Web API + PostgreSQL (`backend/QlsxHatDieu.Api`).

## Chạy backend

```bash
cd backend/QlsxHatDieu.Api
# sửa ConnectionStrings:Default trong appsettings.json (hoặc biến môi trường ConnectionStrings__Default)
dotnet run --urls http://localhost:5000
```

Lần chạy đầu tự tạo bảng và dữ liệu mẫu (tài khoản `admin`, mật khẩu mặc định `123`, đổi bằng `Seed:AdminPassword`).
CORS cho phép các domain trong `Cors:Origins`.

| Method | URL | Mô tả |
| --- | --- | --- |
| GET | `/api/content?page=home` | Nội dung của một trang (kèm `items`) |
| POST / PUT / DELETE | `/api/content[/{id}]` | Thêm / sửa / xóa nội dung |
| POST | `/api/auth/login` | Đăng nhập admin |
| GET | `/api/stats` | Số liệu cho dashboard |

## Chạy frontend

```bash
cp .env.example .env.local   # API_URL=http://localhost:5000
npm install
npm run dev
```

Khi deploy (Vercel/Cloudflare) đặt biến môi trường `API_URL` trỏ tới địa chỉ backend.
Trình duyệt gọi `/api/*`, Next.js chuyển tiếp (rewrite) sang backend.

## Cấu trúc nội dung

`Content` = một section của một trang (`page` + `section`), mỗi section có `items` (các thẻ/bước/điểm nổi bật) chỉnh sửa tại `/admin/content`.
Các section của trang chủ: `hero`, `about`, `warehouse`, `production`, `business`, `report`, `cta`.
