/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Bắt buộc khi dùng static export
  },
};

export default nextConfig;