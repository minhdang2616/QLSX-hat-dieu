/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Thêm dòng này để Next.js xuất ra thư mục out/
  images: {
    unoptimized: true, // Bắt buộc khi dùng static export
  },
};

export default nextConfig;