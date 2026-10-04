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
      <div className="relative mx-auto grid max-w-editorial grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-2.5 lg:px-10">
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

        <Link
          href={`/${locale}`}
          aria-label={dict.brand.name}
          className="justify-self-center"
        >
          <Logo variant="compact" priority className="!h-[60px] lg:!h-[68px]" />
        </Link>

        <div className="flex items-center justify-self-end gap-4">
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
