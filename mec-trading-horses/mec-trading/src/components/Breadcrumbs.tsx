"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    "horses-for-sale": "Horses for sale",
    about: "About",
    services: "Services",
    contact: "Contact",
    legal: "Legal information",
    "mentions-legales": "Legal notices",
    confidentialite: "Privacy policy",
    cookies: "Cookie policy"
  },
  fr: {
    home: "Accueil",
    "horses-for-sale": "Chevaux à vendre",
    about: "À propos",
    services: "Expertise",
    contact: "Contact",
    legal: "Informations légales",
    "mentions-legales": "Mentions légales",
    confidentialite: "Confidentialité",
    cookies: "Cookies"
  },
  ar: {
    home: "الرئيسية",
    "horses-for-sale": "خيول للبيع",
    about: "من نحن",
    services: "خدماتنا",
    contact: "اتصل بنا",
    legal: "معلومات قانونية",
    "mentions-legales": "الإشعارات القانونية",
    confidentialite: "سياسة الخصوصية",
    cookies: "سياسة ملفات تعريف الارتباط"
  }
};

function readableSegment(segment: string) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Breadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const copy = labels[locale] ?? labels.en;
  const crumbs = [
    { label: copy.home, href: `/${locale}` },
    ...segments.map((segment, index) => ({
      label: copy[segment] ?? readableSegment(segment),
      href: `/${locale}/${segments.slice(0, index + 1).join("/")}`
    }))
  ];

  return (
    <nav
      aria-label={locale === "ar" ? "مسار التنقل" : locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="border-b border-charcoal-line/70 bg-ivory"
    >
      <ol className="mx-auto flex max-w-editorial flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2.5 text-[10px] sm:px-6 sm:text-[11px] lg:px-10">
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-gold/80">/</span>}
              {current ? (
                <span aria-current="page" className="max-w-[ min(65vw, 24rem)] truncate font-semibold uppercase tracking-[0.12em] text-charcoal">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="truncate font-mono uppercase tracking-[0.1em] text-charcoal/55 transition-colors hover:text-gold">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
