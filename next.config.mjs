/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Отключаем X-Powered-By для безопасности
  poweredByHeader: false,
};

export default nextConfig;
