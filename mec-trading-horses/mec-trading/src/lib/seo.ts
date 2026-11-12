import type { Metadata } from "next";
import type { Locale } from "@/types/horse";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mechorses.com";

export const siteDescriptions: Record<Locale, string> = {
  en: "France-based MEC Horses specialises in show jumping horses for sale, helping buyers across Europe and the Middle East with selection and export.",
  fr: "Basée en France, MEC Horses est spécialisée dans les chevaux de saut d’obstacles et accompagne les acheteurs en Europe et au Moyen-Orient.",
  ar: "MEC Horses شركة وساطة خيول رياضية مقرها فرنسا، متخصصة في خيول قفز الحواجز ومساعدة المشترين في أوروبا والشرق الأوسط.",
  de: "MEC Horses vermittelt Springpferde aus Frankreich und begleitet internationale Käufer in Europa und im Nahen Osten.",
  nl: "MEC Horses bemiddelt in springpaarden vanuit Frankrijk en begeleidt kopers in Europa en het Midden-Oosten."
};

export function localizedAlternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const languages = {
    en: `${SITE_URL}/en${cleanPath}`,
    fr: `${SITE_URL}/fr${cleanPath}`,
    ar: `${SITE_URL}/ar${cleanPath}`,
    de: `${SITE_URL}/de${cleanPath}`,
    nl: `${SITE_URL}/nl${cleanPath}`,
    "x-default": `${SITE_URL}/en${cleanPath}`
  };
  return { canonical: `${SITE_URL}/${locale}${cleanPath}`, languages };
}
