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
    <header className="sticky top-0 z-40 border-b border-charcoal-line bg-ivory/95 backdrop-blur">
      <div dir="ltr" className="mx-auto grid max-w-editorial grid-cols-3 items-center gap-3 px-4 py-2.5 lg:px-10">
        <div className="flex items-center justify-start">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 border border-charcoal/25 px-3 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal transition-colors hover:border-gold hover:text-gold [&::-webkit-details-marker]:hidden">
              <span className="text-base leading-none">☰</span>
              <span className="hidden sm:inline">Menu</span>
            </summary>
            <nav className="absolute left-0 top-full z-50 mt-2 min-w-56 border border-charcoal/15 bg-ivory p-2 shadow-xl">
              <Link href={`/${locale}/account?mode=login`} className="block border-b border-charcoal/15 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">Sign in</Link>
              <Link href={`/${locale}/account?mode=register`} className="block border-b border-charcoal/15 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">Sign up</Link>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/75 transition-colors hover:bg-sand/15 hover:text-gold">{item.label}</Link>
              ))}
            </nav>
          </details>
        </div>

        <Link href={`/${locale}`} aria-label={dict.brand.name} className="flex flex-col items-center justify-center">
          <Logo variant="compact" priority className="!h-[68px] lg:!h-[78px]" />
          <span className="mt-1 flex w-max flex-nowrap items-center justify-center gap-2 whitespace-nowrap font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-charcoal sm:gap-3 sm:text-[10px] sm:tracking-[0.16em]">
            <span className="whitespace-nowrap">France</span><span className="h-px w-3 shrink-0 bg-[#B08D57] sm:w-5" /><span className="whitespace-nowrap">Europe</span><span className="h-px w-3 shrink-0 bg-[#B08D57] sm:w-5" /><span className="whitespace-nowrap">Middle East</span>
          </span>
        </Link>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link href={`/${locale}/account`} className="whitespace-nowrap border border-charcoal/30 px-2.5 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-charcoal transition-colors hover:border-gold hover:text-gold sm:px-3 sm:text-[10px] sm:tracking-eyebrow">My Account</Link>
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
