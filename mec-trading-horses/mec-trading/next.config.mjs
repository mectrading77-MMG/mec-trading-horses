/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.mec-trading.com" },
      { protocol: "https", hostname: "mechorses.com" },
      { protocol: "https", hostname: "www.mechorses.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["clsx"]
  }
};

export default nextConfig;
