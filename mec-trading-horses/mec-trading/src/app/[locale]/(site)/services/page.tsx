import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import ServicePiano from "@/components/ServicePiano";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Show Jumping Horse Sales & Buying Services",
    fr: "Services d’achat et de vente de chevaux de saut d’obstacles",
    ar: "خدمات شراء وبيع خيول قفز الحواجز",
  };
  const descriptions: Record<Locale, string> = {
    en: "Explore MEC Horses services: horse sourcing and sales, pre-purchase veterinary checks, viewings, transport and export assistance from France.",
    fr: "Découvrez nos services : recherche et vente de chevaux, visite vétérinaire avant achat, essais, transport et accompagnement à l’export depuis la France.",
    ar: "اكتشف خدمات MEC Horses في البحث عن الخيول وبيعها والفحوص البيطرية قبل الشراء والمعاينة والنقل والتصدير من فرنسا.",
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/services") };
}

const KEYS = [
  "selection", "sales", "prePurchase", "vetCoordination", "documentation",
  "transport", "export", "viewing", "afterSale", "trainingCamp", "valorization"
] as const;

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const services = KEYS.map((key) => ({
    key,
    title: dict.services.list[key].title,
    text: dict.services.list[key].text,
  }));
  return <ServicePiano locale={params.locale} services={services} />;
}
