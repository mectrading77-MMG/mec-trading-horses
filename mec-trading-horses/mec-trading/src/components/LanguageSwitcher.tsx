"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/types/horse";

const labels: Record<string, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
  de: "DE",
  nl: "NL"
};

const locales = ["en", "fr", "ar", "de", "nl"] as const;

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="relative shrink-0">
      <label className="sr-only" htmlFor="language-switcher">
        Language
      </label>
      <select
        id="language-switcher"
        value={current}
        onChange={(e) => {
          window.location.href = `/${e.target.value}${rest ? `/${rest}` : ""}`;
        }}
        className="h-[34px] w-[92px] appearance-none rounded-none border border-charcoal bg-ivory px-4 py-2 pr-7 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal cursor-pointer transition-colors duration-400 hover:border-gold hover:text-gold sm:h-[38px] sm:w-[108px] sm:text-[11px]"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {labels[locale]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-charcoal/50"
        aria-hidden="true"
      >
        ⌄
      </span>
    </div>
  );
}
