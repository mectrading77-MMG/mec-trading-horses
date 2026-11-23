import Link from "next/link";
import type { Locale } from "@/types/horse";
import Logo from "@/components/Logo";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  const year = new Date().getFullYear();
  const footerLabels: Record<Locale, { social: string; location: string; legal: string; mentions: string; privacy: string; cookies: string; explore: string; contactTitle: string; follow: string; company: string }> = {
    en: { social: "Follow MEC", location: "La Chapelle-des-Fougeretz, Brittany, France", legal: "Legal", mentions: "Legal notices", privacy: "Privacy policy", cookies: "Cookie policy", explore: "Discover", contactTitle: "Get in touch", follow: "Follow our journey", company: "MEC Horses is an equestrian sales and advisory company based in France." },
    fr: { social: "Suivez MEC", location: "La Chapelle-des-Fougeretz, Bretagne, France", legal: "Informations légales", mentions: "Mentions légales", privacy: "Politique de confidentialité", cookies: "Politique relative aux cookies", explore: "Découvrir", contactTitle: "Nous contacter", follow: "Suivez notre actualité", company: "MEC Horses, votre partenaire en vente et conseil équestre, basé en France." },
    ar: { social: "تابع MEC", location: "لا شابيل دي فوجريه، بريتاني، فرنسا", legal: "معلومات قانونية", mentions: "الإشعارات القانونية", privacy: "سياسة الخصوصية", cookies: "سياسة ملفات تعريف الارتباط", explore: "اكتشف", contactTitle: "تواصل معنا", follow: "تابع أخبارنا", company: "MEC Horses — شريكك في بيع الخيول والاستشارات الفروسية في فرنسا." },
  };
  const labels = footerLabels[locale] ?? footerLabels.en;

  return (
    <footer className="mt-16 bg-charcoal text-ivory">
      <div className="h-px bg-gradient-to-r from-transparent via-[#b99a62]/70 to-transparent" />
      <div className="mx-auto grid max-w-editorial gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_0.9fr] lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <Logo variant="full" onDark className="!h-24" />
          <p className="mt-3 max-w-sm text-[11px] leading-5 text-ivory/60">{dict.brand.tagline}</p>
          <p className="mt-3 max-w-sm text-xs leading-6 text-ivory/40">{labels.company}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.explore}</p>
          <ul className="mt-4 space-y-2.5 text-xs text-ivory/75">
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/horses-for-sale`}>{dict.nav.horses}</Link></li>
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/services`}>{dict.nav.services}</Link></li>
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.contactTitle}</p>
          <ul className="mt-4 space-y-2.5 text-xs leading-6 text-ivory/70">
            <li>{labels.location}</li>
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="mailto:sales@mechorses.com">sales@mechorses.com</a></li>
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="tel:+33618313530">+33 6 18 31 35 30</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.social}</p>
          <p className="mt-4 text-xs text-ivory/55">{labels.follow}</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              aria-label="Instagram"
              title="Instagram"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5a875] hover:bg-[#c5a875]/10 hover:text-[#d8bd8d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a875]"
              href="https://instagram.com/m.e.c_horses"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a
              aria-label="Facebook"
              title="Facebook"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5a875] hover:bg-[#c5a875]/10 hover:text-[#d8bd8d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a875]"
              href="https://facebook.com/MecHorses"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-editorial flex-col gap-4 px-6 py-6 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-5 lg:px-10">
          <p className="whitespace-nowrap text-[10px] leading-5 text-ivory/40">
            MEC Trading SAS · SIRET : 108 537 549 00017 · La Chapelle-des-Fougeretz · 35520 · France
          </p>
          <nav aria-label={labels.legal} className="flex flex-nowrap items-center gap-x-4 whitespace-nowrap text-[10px] text-ivory/55">
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/mentions-legales`}>{labels.mentions}</Link>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/confidentialite`}>{labels.privacy}</Link>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/cookies`}>{labels.cookies}</Link>
          </nav>
          <p className="whitespace-nowrap text-[9px] text-ivory/35">© {year} MEC Horses. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
