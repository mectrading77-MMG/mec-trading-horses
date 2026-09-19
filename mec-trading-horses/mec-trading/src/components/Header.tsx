import Link from "next/link";
import type { Locale } from "@/types/horse";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
      <div className="mx-auto flex max-w-editorial items-center justify-between px-6 py-4 lg:px-10">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <span className="font-display text-2xl italic tracking-tight text-charcoal">MEC</span>
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-gold">Trading</span>
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

        <div className="flex items-center gap-4">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-none border border-charcoal px-5 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal transition-colors duration-400 hover:border-gold hover:text-gold sm:inline-block"
          >
            {dict.nav.ctaSecondary}
          </Link>
        </div>
      </div>
    </header>
  );
}
