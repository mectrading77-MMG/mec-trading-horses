import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mechorses.com";
const locales = ["en", "fr", "ar", "de", "nl"] as const;
const publicPaths = ["", "/horses-for-sale", "/services", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    publicPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/horses-for-sale" ? 0.9 : 0.6
    }))
  );
}
