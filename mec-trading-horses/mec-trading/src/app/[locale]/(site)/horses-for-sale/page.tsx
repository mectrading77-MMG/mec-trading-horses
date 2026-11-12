import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses } from "@/lib/horses";
import CatalogClient from "@/components/CatalogClient";
import SectionHeading from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Show Jumping Horses for Sale in Europe",
    fr: "Chevaux de saut d’obstacles à vendre en Europe",
    ar: "خيول قفز حواجز للبيع في أوروبا",
    de: "Springpferde in Europa kaufen",
    nl: "Springpaarden te koop in Europa"
  };
  const descriptions: Record<Locale, string> = {
    en: "Browse show jumping horses for sale at MEC Horses in France. Explore sport horses by age, height, competition level and experience.",
    fr: "Découvrez les chevaux de saut d’obstacles proposés par MEC Horses en France. Filtrez par âge, taille, niveau et expérience sportive.",
    ar: "تصفح خيول قفز الحواجز المعروضة لدى MEC Horses في فرنسا، وابحث حسب العمر والارتفاع والمستوى والخبرة الرياضية.",
    de: "Entdecken Sie Springpferde bei MEC Horses in Frankreich. Filtern Sie nach Alter, Stockmaß, Leistungsniveau und Turniererfahrung.",
    nl: "Bekijk springpaarden bij MEC Horses in Frankrijk. Zoek op leeftijd, stokmaat, wedstrijdniveau en ervaring."
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

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.catalog.title} title={dict.catalog.subtitle} />
      <div className="mt-8">
        <CatalogClient
          horses={horses}
          locale={params.locale}
          dict={dict}
          initialLevel={searchParams.level}
          initialSearch={searchParams.search}
        />
      </div>
    </div>
  );
}
