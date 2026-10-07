"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  de: "Deutsch",
  nl: "Nederlands (België)"
};

const locales: Locale[] = ["en", "fr", "ar", "de", "nl"];

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">Language</label>
      <select
        id="language-switcher"
        value={current}
        onChange={(e) => {
          window.location.href = `/${e.target.value}${rest ? `/${rest}` : ""}`;
        }}
        className="appearance-none border border-charcoal-line bg-ivory px-3 py-2 pr-8 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal cursor-pointer"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>{labels[locale]}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-charcoal/50">⌄</span>
    </div>
  );
}
