import Link from "next/link";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses } from "@/lib/horses";
import CatalogClient from "@/components/CatalogClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Show Jumping Horses for Sale in Europe",
    fr: "Chevaux de saut d’obstacles à vendre en Europe",
    ar: "خيول قفز حواجز للبيع في أوروبا",
  };
  const descriptions: Record<Locale, string> = {
    en: "Browse show jumping horses for sale at MEC Horses in France. Explore sport horses by age, height, competition level and experience.",
    fr: "Découvrez les chevaux de saut d’obstacles proposés par MEC Horses en France. Filtrez par âge, taille, niveau et expérience sportive.",
    ar: "تصفح خيول قفز الحواجز المعروضة لدى MEC Horses في فرنسا، وابحث حسب العمر والارتفاع والمستوى والخبرة الرياضية.",
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/horses-for-sale") };
}

export default async function HorsesForSalePage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { level?: string; search?: string };
}) {
  const dict = await getDictionary(params.locale);
  const horses = await listHorses();
  const breadcrumb = {
    home: ({ en: "Home", fr: "Accueil", ar: "الرئيسية" } as Record<Locale, string>)[params.locale],
    current: ({ en: "Horses for Sale", fr: "Chevaux à vendre", ar: "خيول للبيع" } as Record<Locale, string>)[params.locale],
  };

  return (
    <div className="mx-auto max-w-editorial px-6 py-10 lg:px-10 lg:py-12">
      <nav aria-label={params.locale === "ar" ? "مسار التنقل" : params.locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"} dir={params.locale === "ar" ? "rtl" : "ltr"} className="mb-7">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">
          <li><Link href={`/${params.locale}`} className="transition-colors hover:text-gold">{breadcrumb.home}</Link></li>
          <li aria-hidden="true" className="text-gold">/</li>
          <li aria-current="page" className="text-charcoal">{breadcrumb.current}</li>
        </ol>
      </nav>
      <CatalogClient
        horses={horses}
        locale={params.locale}
        dict={dict}
        initialLevel={searchParams.level}
        initialSearch={searchParams.search}
      />
    </div>
  );
}
