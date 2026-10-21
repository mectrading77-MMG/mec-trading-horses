import Image from "next/image";
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
  ],
  de: [
    "MEC Horses ist ein auf Sportpferde spezialisiertes Unternehmen mit Sitz in der Bretagne, Frankreich. Wir arbeiten mit Berufsreitern, Züchtern und Privatkunden in Europa und den Golfstaaten zusammen.",
    "Jedes Pferd wird persönlich nach Exterieur, Temperament, Bewegung und Gesundheit ausgewählt, bevor es einem Käufer vorgestellt wird. Wir bieten Pferde an, die sich in unserem Besitz befinden oder die wir direkt vertreten.",
    "Für internationale Käufer sind vollständige Unterlagen, veterinärmedizinische Transparenz und klare Kommunikation ebenso wichtig wie das Pferd selbst. Wir koordinieren Besichtigungen, tierärztliche Untersuchungen, Transport und Exportformalitäten."
  ],
  nl: [
    "MEC Horses is een specialist in sportpaarden, gevestigd in Bretagne, Frankrijk. We werken met professionele ruiters, fokkers en particuliere klanten in Europa en de Golfregio.",
    "Elk paard wordt persoonlijk geselecteerd op bouw, temperament, beweging en gezondheid voordat het aan een koper wordt voorgesteld. We bieden paarden aan die we zelf bezitten of rechtstreeks vertegenwoordigen.",
    "Voor internationale kopers zijn goede documentatie, veterinaire transparantie en duidelijke communicatie net zo belangrijk als het paard zelf. We coördineren bezichtigingen, dierenartskeuringen, transport en exportdocumenten."
  ]
};

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
