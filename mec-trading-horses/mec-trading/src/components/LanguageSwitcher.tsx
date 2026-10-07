"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, string> = { en: "EN", fr: "FR", ar: "AR" };
const locales: Locale[] = ["en", "fr", "ar"];

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-eyebrow">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <Link
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            className={locale === current ? "text-gold" : "text-charcoal/50 hover:text-charcoal"}
          >
            {labels[locale]}
          </Link>
          {i < locales.length - 1 && <span className="text-charcoal/20">/</span>}
        </span>
      ))}
    </div>
  );
}
