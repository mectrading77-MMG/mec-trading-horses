import "server-only";
import type { Locale } from "@/types/horse";

export const locales: Locale[] = ["ar", "en", "fr"];
export const defaultLocale: Locale = "en";
export const rtlLocales: Locale[] = ["ar"];

export function dirFor(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default)
};

export async function getDictionary(locale: Locale) {
  // Routes can receive an unexpected locale segment at runtime even though
  // the TypeScript type is constrained. Never invoke an undefined loader:
  // fall back to English so the public page can still render.
  const loader = dictionaries[locale as keyof typeof dictionaries] ?? dictionaries[defaultLocale];
  return loader();
}
