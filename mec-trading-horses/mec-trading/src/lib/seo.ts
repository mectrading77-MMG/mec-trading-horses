import type { Metadata } from "next";
import type { Locale } from "@/types/horse";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mechorses.com";

export const siteDescriptions: Record<Locale, string> = {
  en: "MEC Horses is a France-based sport horse brokerage specialising in show jumping horses for sale, with expert assistance for buyers across Europe and the Middle East.",
  fr: "MEC Horses est une agence de courtage équin basée en France, spécialisée dans les chevaux de saut d’obstacles et l’accompagnement des acheteurs en Europe et au Moyen-Orient.",
  ar: "MEC Horses شركة وساطة خيول رياضية مقرها فرنسا، متخصصة في خيول قفز الحواجز ومساعدة المشترين في أوروبا والشرق الأوسط.",
  de: "MEC Horses ist ein in Frankreich ansässiger Sportpferdevermittler, spezialisiert auf Springpferde und die Betreuung internationaler Käufer in Europa und im Nahen Osten.",
  nl: "MEC Horses is een in Frankrijk gevestigd bemiddelingsbedrijf voor sportpaarden, gespecialiseerd in springpaarden en begeleiding van kopers in Europa en het Midden-Oosten."
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
