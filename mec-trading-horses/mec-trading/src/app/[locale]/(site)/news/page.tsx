import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

const postsByLocale: Record<Locale, { title: string; date: string }[]> = {
  en: [
    { title: "Orphée des Forges placed at CSI3* Deauville", date: "2026-07-18" },
    { title: "MEC Horses supports Gulf-based buyers with export documentation", date: "2026-06-02" },
    { title: "Why every horse receives an independent veterinary review", date: "2026-05-10" }
  ],
  fr: [
    { title: "Orphée des Forges classé au CSI3* de Deauville", date: "2026-07-18" },
    { title: "MEC Horses accompagne les acheteurs du Golfe dans les formalités d’exportation", date: "2026-06-02" },
    { title: "Pourquoi chaque cheval fait l’objet d’un examen vétérinaire indépendant", date: "2026-05-10" }
  ],
  ar: [
    { title: "أورفيه دي فورج ضمن المراكز المتقدمة في CSI3* دوفيل", date: "2026-07-18" },
    { title: "MEC Horses تساعد المشترين في الخليج في مستندات التصدير", date: "2026-06-02" },
    { title: "لماذا نخضع كل حصان لفحص بيطري مستقل", date: "2026-05-10" }
  ],
  de: [
    { title: "Orphée des Forges platziert beim CSI3* in Deauville", date: "2026-07-18" },
    { title: "MEC Horses unterstützt Käufer aus der Golfregion bei Exportdokumenten", date: "2026-06-02" },
    { title: "Warum jedes Pferd unabhängig tierärztlich untersucht wird", date: "2026-05-10" }
  ],
  nl: [
    { title: "Orphée des Forges geplaatst op CSI3* Deauville", date: "2026-07-18" },
    { title: "MEC Horses helpt kopers uit de Golfregio met exportdocumenten", date: "2026-06-02" },
    { title: "Waarom elk paard onafhankelijk veterinair wordt onderzocht", date: "2026-05-10" }
  ]
};

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);\n  const posts = postsByLocale[params.locale] ?? postsByLocale.en;

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.nav.news} title={dict.nav.news} />
      <ul className="mt-12 divide-y divide-charcoal-line border-y border-charcoal-line">
        {posts.map((post) => (
          <li key={post.title} className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-display text-xl italic text-charcoal">{post.title}</h3>
            <time className="font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/40">
              {new Date(post.date).toLocaleDateString(params.locale, { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
