import Link from "next/link";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Show Jumping Horse Sales & Buying Services | MEC Horses",
    fr: "Services d’achat et de vente de chevaux de saut d’obstacles | MEC Horses",
    ar: "خدمات شراء وبيع خيول قفز الحواجز | MEC Horses",
    de: "Dienstleistungen rund um Kauf und Verkauf von Springpferden | MEC Horses",
    nl: "Diensten voor aankoop en verkoop van springpaarden | MEC Horses"
  };
  const descriptions: Record<Locale, string> = {
    en: "Explore MEC Horses services: horse sourcing and sales, pre-purchase veterinary checks, viewings, transport and export assistance from France.",
    fr: "Découvrez nos services : recherche et vente de chevaux, visite vétérinaire avant achat, essais, transport et accompagnement à l’export depuis la France.",
    ar: "اكتشف خدمات MEC Horses في البحث عن الخيول وبيعها والفحوص البيطرية قبل الشراء والمعاينة والنقل والتصدير من فرنسا.",
    de: "Entdecken Sie unsere Leistungen: Pferdesuche und -verkauf, tierärztliche Kaufuntersuchung, Besichtigungen, Transport und Export ab Frankreich.",
    nl: "Ontdek onze diensten: paarden zoeken en verkopen, veterinaire keuring vóór aankoop, bezichtigingen, transport en export vanuit Frankrijk."
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates("/services") };
}

const KEYS = [
  "selection",
  "sales",
  "prePurchase",
  "vetCoordination",
  "documentation",
  "transport",
  "export",
  "viewing",
  "afterSale",
  "trainingCamp",
  "valorization"
] as const;

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading title={dict.services.title} />
      <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {KEYS.map((key, i) => (
          <Link
            key={key}
            href={`/${params.locale}/contact?service=${key}`}
            className="group border-t border-charcoal-line pt-5 transition-colors duration-300 hover:border-gold"
          >
            <span className="font-mono text-[10px] text-charcoal/30">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-display text-xl italic text-charcoal group-hover:text-gold">{dict.services.list[key].title}</h3>
            <p className="mt-2 text-sm text-charcoal/60">{dict.services.list[key].text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
