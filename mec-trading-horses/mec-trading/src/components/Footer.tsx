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
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/60">{dict.brand.tagline}</p>
          <p className="mt-3 max-w-sm text-xs leading-6 text-ivory/40">{labels.company}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.explore}</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/horses-for-sale`}>{dict.nav.horses}</Link></li>
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/services`}>{dict.nav.services}</Link></li>
            <li><Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.contactTitle}</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-ivory/70">
            <li>{labels.location}</li>
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="mailto:sales@mechorses.com">sales@mechorses.com</a></li>
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="tel:+33618313530">+33 6 18 31 35 30</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a875]">{labels.social}</p>
          <p className="mt-5 text-sm text-ivory/55">{labels.follow}</p>
          <ul className="mt-3 space-y-3 text-sm text-ivory/75">
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="https://instagram.com/m.e.c_horses" target="_blank" rel="noopener noreferrer">Instagram <span className="text-ivory/35">↗</span></a></li>
            <li><a className="transition-colors hover:text-[#d8bd8d]" href="https://facebook.com/MecHorses" target="_blank" rel="noopener noreferrer">Facebook <span className="text-ivory/35">↗</span></a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-editorial flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="space-y-1.5 text-[11px] leading-5 text-ivory/40">
            <p>MEC Trading SAS · SIRET : 108 537 549 00017</p>
            <p>La Chapelle-des-Fougeretz · 35520 · France</p>
          </div>
          <nav aria-label={labels.legal} className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ivory/55">
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/mentions-legales`}>{labels.mentions}</Link>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/confidentialite`}>{labels.privacy}</Link>
            <Link className="transition-colors hover:text-[#d8bd8d]" href={`/${locale}/legal/cookies`}>{labels.cookies}</Link>
          </nav>
          <p className="text-[11px] text-ivory/35">© {year} MEC Horses. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
