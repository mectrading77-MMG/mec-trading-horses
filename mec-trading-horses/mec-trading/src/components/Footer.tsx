import Link from "next/link";
import type { Locale } from "@/types/horse";
import Logo from "@/components/Logo";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  const year = new Date().getFullYear();
  const footerLabels: Record<Locale, { social: string; legal: string; mentions: string; privacy: string; cookies: string; explore: string; contactTitle: string }> = {
    en: { social: "Follow MEC", legal: "Legal", mentions: "Legal notices", privacy: "Privacy policy", cookies: "Cookie policy", explore: "Discover", contactTitle: "Get in touch" },
    fr: { social: "Suivez MEC", legal: "Informations légales", mentions: "Mentions légales", privacy: "Politique de confidentialité", cookies: "Politique relative aux cookies", explore: "Découvrir", contactTitle: "Nous contacter" },
    ar: { social: "تابع MEC", legal: "معلومات قانونية", mentions: "الإشعارات القانونية", privacy: "سياسة الخصوصية", cookies: "سياسة ملفات تعريف الارتباط", explore: "اكتشف", contactTitle: "تواصل معنا" },
  };
  const labels = footerLabels[locale] ?? footerLabels.en;

  return (
    <footer className="mt-8 bg-charcoal text-ivory">
      <div className="h-px bg-gradient-to-r from-transparent via-[#c5a875]/80 to-transparent" />

      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.1fr_1.2fr_0.7fr] lg:gap-5 lg:px-8 lg:py-6">
        <div className="flex min-w-0 items-center gap-4 border-b border-ivory/10 pb-4 sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-e lg:pb-0 lg:pe-5">
          <Logo variant="full" onDark className="!h-16 shrink-0" />
          <p className="max-w-[220px] text-xs leading-5 text-ivory/65">{dict.brand.tagline}</p>
        </div>

        <div className="lg:border-e lg:pe-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a875]">{labels.explore}</p>
          <nav className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ivory/75">
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/horses-for-sale`}>{dict.nav.horses}</Link>
            <span className="text-ivory/25">|</span>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/services`}>{dict.nav.services}</Link>
            <span className="text-ivory/25">|</span>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/about`}>{dict.nav.about}</Link>
          </nav>
        </div>

        <div className="lg:border-e lg:pe-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a875]">{labels.contactTitle}</p>
          <div className="mt-3 flex flex-col gap-2 text-xs text-ivory/75 sm:flex-row sm:flex-wrap sm:gap-x-4">
            <a className="transition-colors hover:text-[#d8bd8d]" href="mailto:sales@mechorses.com">sales@mechorses.com</a>
            <a className="transition-colors hover:text-[#d8bd8d]" href="tel:+33618313530">+33 6 18 31 35 30</a>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a875]">{labels.social}</p>
          <div className="mt-3 flex items-center gap-2.5">
            <a aria-label="Instagram" title="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/80 transition-all hover:-translate-y-0.5 hover:border-[#c5a875] hover:text-[#d8bd8d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a875]" href="https://instagram.com/m.e.c_horses" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a aria-label="Facebook" title="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/80 transition-all hover:-translate-y-0.5 hover:border-[#c5a875] hover:text-[#d8bd8d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a875]" href="https://facebook.com/MecHorses" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-editorial flex-col gap-3 px-5 py-3.5 text-[9px] leading-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:flex-nowrap lg:gap-4 lg:px-8">
          <p className="text-ivory/40">MEC Trading SAS · SIRET : 108 537 549 00017 · La Chapelle-des-Fougeretz · 35520 · France</p>
          <nav aria-label={labels.legal} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ivory/55">
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/mentions-legales`}>{labels.mentions}</Link>
            <span className="text-ivory/25">|</span>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/confidentialite`}>{labels.privacy}</Link>
            <span className="text-ivory/25">|</span>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/cookies`}>{labels.cookies}</Link>
          </nav>
          <p className="whitespace-nowrap text-ivory/35">© {year} MEC Horses. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
