import type { Metadata } from "next";
import type { Locale } from "@/types/horse";
import { localizedAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import { getEquestrianNews } from "@/lib/equestrian-news";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Equestrian News & Show Jumping Updates",
    fr: "Actualités équestres et saut d’obstacles",
    ar: "أخبار الفروسية وقفز الحواجز"
  };
  const descriptions: Record<Locale, string> = {
    en: "The latest show jumping and equestrian headlines from specialist publishers, refreshed automatically.",
    fr: "Les dernières actualités du saut d’obstacles et du monde équestre, actualisées automatiquement.",
    ar: "أحدث أخبار قفز الحواجز والفروسية من مصادر متخصصة، تُحدّث تلقائيًا."
  };
  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
    alternates: localizedAlternates(params.locale, "/news")
  };
}

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const posts = await getEquestrianNews(18);
  const copy = {
    en: { intro: "Fresh headlines from the international equestrian community.", empty: "No headlines are available right now. Please check again soon.", source: "Original publisher", updated: "Feeds refresh automatically every day at 08:00 (Paris time)." },
    fr: { intro: "Les dernières nouvelles de la communauté équestre internationale.", empty: "Aucune actualité n’est disponible pour le moment. Revenez bientôt.", source: "Source originale", updated: "Les actualités sont actualisées automatiquement chaque jour à 08 h 00 (heure de Paris)." },
    ar: { intro: "أحدث الأخبار من مجتمع الفروسية الدولي.", empty: "لا توجد أخبار متاحة حاليًا. يرجى المحاولة مرة أخرى قريبًا.", source: "المصدر الأصلي", updated: "تُحدّث الأخبار تلقائيًا يوميًا الساعة 08:00 بتوقيت باريس." }
  }[params.locale];

  return (
    <div className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <SectionHeading eyebrow={dict.nav.news} title={dict.nav.news} />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60">{copy.intro}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-48 flex-col justify-between border border-charcoal/10 bg-[#f5f2eb] p-5 transition-colors hover:border-[#B08D57] sm:p-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9a7837]">{post.source}</p>
              <h2 className="mt-4 font-display text-xl italic leading-snug text-charcoal group-hover:text-[#9a7837]">{post.title}</h2>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              {post.date ? (
                <time dateTime={post.date} className="font-mono text-[10px] uppercase tracking-wide text-charcoal/45">
                  {new Date(post.date).toLocaleDateString(params.locale, { day: "numeric", month: "short", year: "numeric" })}
                </time>
              ) : <span className="font-mono text-[10px] uppercase tracking-wide text-charcoal/45" />}
              <span className="font-mono text-[9px] uppercase tracking-wider text-charcoal/50">{copy.source} ↗</span>
            </div>
          </a>
        ))}
      </div>
      {posts.length === 0 && <p className="mt-8 border-y border-charcoal-line py-8 text-sm text-charcoal/60">{copy.empty}</p>}
      <p className="mt-6 font-mono text-[9px] uppercase tracking-wide text-charcoal/40">{copy.updated}</p>
    </div>
  );
}
