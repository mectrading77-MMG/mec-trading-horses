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
    <div className="relative ml-auto shrink-0">
      <label className="sr-only" htmlFor="language-switcher">
        Language
      </label>
      <select
        id="language-switcher"
        value={current}
        onChange={(e) => {
          window.location.href = `/${e.target.value}${rest ? `/${rest}` : ""}`;
        }}
        className="h-6 w-[42px] appearance-none border border-charcoal-line bg-ivory px-1 pr-3 font-mono text-[9px] uppercase tracking-normal text-charcoal cursor-pointer"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {labels[locale]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-charcoal/50"
        aria-hidden="true"
      >
        ⌄
      </span>
    </div>
  );
}
