import Link from "next/link";
import type { Locale } from "@/types/horse";
import Logo from "@/components/Logo";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-charcoal-line bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-editorial gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div>
          <Logo variant="full" onDark className="!h-28" />
          <p className="mt-5 max-w-xs text-sm text-ivory/60">{dict.brand.tagline}</p>
        </div>

        <div>
          <p className="eyebrow">{dict.nav.horses}</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li><Link href={`/${locale}/horses-for-sale`}>{dict.nav.horses}</Link></li>
            <li><Link href={`/${locale}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`/${locale}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{dict.nav.contact}</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>La Chapelle-des-Fougeretz, Brittany, France</li>
            <li><a href="mailto:contact@mectrading.com">contact@mectrading.com</a></li>
            <li><a href="tel:+33618313530">+33 6 18 31 35 30</a></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Social</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">YouTube</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-6 py-6 lg:px-10">
        <p className="mx-auto max-w-editorial text-xs text-ivory/40">{dict.footer.privateNotice}</p>
        <p className="mx-auto mt-2 max-w-editorial text-xs text-ivory/30">
          © {year} MEC Trading SAS. {dict.footer.rights}
        </p>
        <p className="mx-auto mt-2 max-w-editorial text-[11px] text-ivory/25">{dict.site.demoNotice}</p>
      </div>
    </footer>
  );
}
