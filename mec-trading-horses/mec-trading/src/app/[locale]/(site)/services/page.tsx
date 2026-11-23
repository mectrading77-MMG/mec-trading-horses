import Link from "next/link";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Show Jumping Horse Sales & Buying Services",
    fr: "Services d’achat et de vente de chevaux de saut d’obstacles",
    ar: "خدمات شراء وبيع خيول قفز الحواجز",
  };
  const descriptions: Record<Locale, string> = {
    en: "Explore MEC HORSES services: horse sourcing and sales, veterinary coordination, training, horse valorization and international transport from France.",
    fr: "Découvrez nos services : recherche et vente de chevaux, coordination vétérinaire, stages d’entraînement, valorisation et transport international depuis la France.",
    ar: "اكتشف خدمات MEC HORSES في البحث عن الخيول وبيعها والتنسيق البيطري والتدريب وتطوير الخيل والنقل الدولي من فرنسا.",
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/services") };
}

const KEYS = [
  "selection",
  "sales",
  "vetCoordination",
  "documentation",
  "transport",
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
            href={`/${params.locale}/services/${key}`}
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
