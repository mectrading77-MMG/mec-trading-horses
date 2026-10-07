import "server-only";
import type { Locale } from "@/types/horse";

export const locales: Locale[] = ["en", "fr", "ar", "de", "nl"];
export const defaultLocale: Locale = "en";
export const rtlLocales: Locale[] = ["ar"];

export function dirFor(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
  de: () => import("./dictionaries/en.json").then((m) => m.default),
  nl: () => import("./dictionaries/en.json").then((m) => m.default)
};

export async function getDictionary(locale: Locale) {
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loader();
}
