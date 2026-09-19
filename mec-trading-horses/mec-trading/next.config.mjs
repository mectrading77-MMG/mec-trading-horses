/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.mec-trading.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["clsx"]
  }
};

export default nextConfig;
