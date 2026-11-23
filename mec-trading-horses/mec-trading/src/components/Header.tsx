import Link from "next/link";
import type { Locale } from "@/types/horse";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import DismissibleDetails from "@/components/DismissibleDetails";
import { getCustomerSession } from "@/lib/customer-auth";

export default async function Header({ locale, dict }: { locale: Locale; dict: any }) {
  const customer = await getCustomerSession();
  const accountLabels = {
    en: { account: "My Account", dashboard: "My Dashboard", signIn: "Sign in", signUp: "Sign up", signOut: "Sign out" },
    fr: { account: "Mon compte", dashboard: "Mon espace", signIn: "Se connecter", signUp: "Créer un compte", signOut: "Se déconnecter" },
    ar: { account: "حسابي", dashboard: "لوحة حسابي", signIn: "تسجيل الدخول", signUp: "إنشاء حساب", signOut: "تسجيل الخروج" }
  } as const;
  const accountText = accountLabels[locale] ?? accountLabels.en;
  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/horses-for-sale`, label: dict.nav.horses },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/contact`, label: dict.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-line bg-ivory/95 backdrop-blur">
      <div dir="ltr" className="mx-auto grid max-w-editorial grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5 lg:px-10">
        <div className="flex min-w-0 items-center justify-start">
          <DismissibleDetails className="group relative">
            <summary aria-label="Open navigation menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-gold hover:text-gold sm:h-11 sm:w-auto sm:gap-2 sm:px-3 [&::-webkit-details-marker]:hidden">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              <span className="hidden font-mono text-[10px] uppercase tracking-eyebrow sm:inline">Menu</span>
            </summary>
            <nav className="absolute left-0 top-full z-50 mt-2 min-w-56 border border-charcoal/15 bg-ivory p-2 shadow-xl">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/75 transition-colors hover:bg-sand/15 hover:text-gold">{item.label}</Link>
              ))}
            </nav>
          </DismissibleDetails>
        </div>

        <Link href={`/${locale}`} aria-label={dict.brand.name} className="flex min-w-0 flex-col items-center justify-center">
          <Logo variant="compact" priority className="!h-[48px] max-w-full sm:!h-[62px] lg:!h-[78px]" />
          <span className="mt-0.5 flex w-max max-w-full flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap font-mono text-[6px] font-bold uppercase tracking-[0.1em] text-charcoal sm:mt-1 sm:gap-3 sm:text-[9px] sm:tracking-[0.16em]">
            <span>France</span><span className="h-px w-2 shrink-0 bg-[#B08D57] sm:w-5" /><span>Europe</span><span className="h-px w-2 shrink-0 bg-[#B08D57] sm:w-5" /><span>Middle East</span>
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1.5 sm:gap-3">
          <DismissibleDetails className="group relative">
            <summary aria-label="My account" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-charcoal/30 text-charcoal transition-colors hover:border-gold hover:text-gold sm:h-11 sm:w-auto sm:gap-2 sm:px-3 [&::-webkit-details-marker]:hidden">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20c.6-3.2 2.8-5 6.5-5s5.9 1.8 6.5 5" strokeLinecap="round" /></svg>
              <span className="hidden whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-eyebrow sm:inline">{accountText.account}</span>
              <span className="hidden text-[9px] sm:inline">▾</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 min-w-48 border border-charcoal/15 bg-ivory p-2 shadow-xl">
              {customer ? (
                <>
                  <Link href={`/${locale}/account/dashboard`} className="block px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">{accountText.dashboard}</Link>
                  <form action={`/api/account/logout?locale=${locale}`} method="post">
                    <button type="submit" className="block w-full px-4 py-3 text-left font-mono text-[11px] uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">{accountText.signOut}</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href={`/${locale}/account?mode=login`} className="block px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">{accountText.signIn}</Link>
                  <Link href={`/${locale}/account?mode=register`} className="block px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal hover:bg-sand/15 hover:text-gold">{accountText.signUp}</Link>
                </>
              )}
            </div>
          </DismissibleDetails>
          <LanguageSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
