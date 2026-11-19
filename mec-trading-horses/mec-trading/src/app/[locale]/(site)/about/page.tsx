import Image from "next/image";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

const copy: Record<Locale, [string, string, string]> = {
  en: [
    "MEC Horses is a private show-horse specialist based in Brittany, France, working with professional riders, breeders and private clients across Europe and the Gulf.",
    "Every horse is personally selected for conformation, temperament, movement and soundness before being presented to a buyer. We offer horses that we own or represent directly.",
    "For international buyers, reliable documentation, veterinary transparency and clear communication matter as much as the horse itself. We coordinate viewings, veterinary examinations, transport and export paperwork from start to finish."
  ],
  fr: [
    "MEC Horses est une structure spécialisée dans les chevaux de sport, basée en Bretagne, en France. Nous travaillons avec des cavaliers professionnels, des éleveurs et des clients privés en Europe et dans les pays du Golfe.",
    "Chaque cheval est sélectionné personnellement selon sa conformation, son tempérament, sa locomotion et son état de santé avant d’être proposé à un acheteur. Nous présentons uniquement des chevaux que nous possédons ou que nous représentons directement.",
    "Pour les acheteurs internationaux, la qualité des documents, la transparence vétérinaire et une communication claire sont aussi importantes que le cheval lui-même. Nous coordonnons les visites, les examens vétérinaires, le transport et les formalités d’exportation."
  ],
  ar: [
    "MEC Horses شركة متخصصة في خيول الرياضة، مقرها بريتاني في فرنسا، وتعمل مع الفرسان المحترفين والمربين والعملاء الأفراد في أوروبا ودول الخليج.",
    "نختار كل حصان بعناية وبشكل شخصي، مع تقييم بنيته ومزاجه وحركته وسلامته الصحية قبل عرضه للبيع. ونعرض الخيول التي نملكها أو نمثلها مباشرةً.",
    "نهتم خصوصًا بالمشترين الدوليين؛ فوضوح المستندات والشفافية البيطرية والتواصل الدقيق لا تقل أهمية عن الحصان نفسه. ونتولى تنسيق المعاينات والفحوص البيطرية والنقل وإجراءات التصدير."
  ]
};

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "About MEC Horses",
    fr: "À propos de MEC Horses",
    ar: "من نحن",
  };
  const descriptions: Record<Locale, string> = {
    en: "Learn about MEC Horses, a France-based show jumping horse specialist supporting riders, breeders and international buyers across Europe and the Gulf.",
    fr: "Découvrez MEC Horses, spécialiste français du cheval de saut d’obstacles, au service des cavaliers, éleveurs et acheteurs internationaux.",
    ar: "تعرف على MEC Horses، شركة فرنسية متخصصة في خيول قفز الحواجز وتقديم الدعم للمشترين والفرسان دوليًا.",
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/about") };
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const paragraphs = copy[params.locale] ?? copy.en;

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />
      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-soft">
          <Image
            src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1600"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-charcoal/80">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  );
}
