"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, string> = {
  ar: "AR",
  en: "EN",
  fr: "FR"
};

const locales: Locale[] = ["ar", "en", "fr"];

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const routeSegments = locales.includes(segments[0] as Locale) ? segments.slice(1) : segments;
  const rest = routeSegments.length ? `/${routeSegments.join("/")}` : "";

  return (
    <div className="relative shrink-0">
      <label className="sr-only" htmlFor="language-switcher">Language</label>
      <select
        id="language-switcher"
        value={current}
        onChange={(e) => {
          const nextLocale = e.target.value as Locale;
          router.push(`/${nextLocale}${rest}`);
          router.refresh();
        }}
        className="h-[30px] w-[76px] appearance-none rounded-none border border-charcoal bg-ivory px-2 py-1 pr-6 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal cursor-pointer transition-colors duration-400 hover:border-gold hover:text-gold sm:h-[32px] sm:w-[86px] sm:text-[10px]"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>{labels[locale]}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-charcoal/50" aria-hidden="true">⌄</span>
    </div>
  );
}
