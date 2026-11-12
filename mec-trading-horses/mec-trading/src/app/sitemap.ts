import type { MetadataRoute } from "next";
import { listHorses } from "@/lib/horses";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mechorses.com";
const locales = ["en", "fr", "ar", "de", "nl"] as const;
const publicPaths = [
  "",
  "/horses-for-sale",
  "/services",
  "/about",
  "/news",
  "/contact",
  "/legal/mentions-legales",
  "/legal/confidentialite",
  "/legal/cookies"
] as const;

function languageAlternates(path: string) {
  return {
    en: `${siteUrl}/en${path}`,
    fr: `${siteUrl}/fr${path}`,
    ar: `${siteUrl}/ar${path}`,
    de: `${siteUrl}/de${path}`,
    nl: `${siteUrl}/nl${path}`,
    "x-default": `${siteUrl}/en${path}`
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    publicPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/horses-for-sale" ? 0.9 : 0.6,
      alternates: { languages: languageAlternates(path) }
    }))
  );

  const horses = await listHorses();
  const horseEntries: MetadataRoute.Sitemap = horses.flatMap((horse) =>
    locales.map((locale) => {
      const path = `/horses-for-sale/${horse.slug}`;
      return {
        url: `${siteUrl}/${locale}${path}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: { languages: languageAlternates(path) }
      };
    })
  );

  return [...staticEntries, ...horseEntries];
}
