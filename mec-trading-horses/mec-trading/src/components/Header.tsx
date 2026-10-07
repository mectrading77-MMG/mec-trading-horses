import Link from "next/link";
import type { Locale } from "@/types/horse";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

export default function Header({ locale, dict }: { locale: Locale; dict: any }) {
  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/horses-for-sale`, label: dict.nav.horses },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-line bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-editorial items-center justify-between gap-6 px-6 py-2.5 lg:px-10">
        <Link href={`/${locale}`} aria-label={dict.brand.name} className="flex shrink-0 items-center">
          <Logo variant="compact" priority className="!h-[60px] lg:!h-[68px]" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/70 transition-colors duration-400 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="rounded-none border border-charcoal px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal transition-colors duration-400 hover:border-gold hover:text-gold sm:px-5 sm:text-[11px]"
          >
            {dict.nav.ctaSecondary}
          </Link>
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
