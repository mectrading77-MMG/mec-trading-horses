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
    en: { intro: "Fresh headlines from the international equestrian community.", empty: "No headlines are available right now. Please check again soon.", source: "Original publisher", updated: "Feeds are refreshed automatically about once an hour." },
    fr: { intro: "Les dernières nouvelles de la communauté équestre internationale.", empty: "Aucune actualité n’est disponible pour le moment. Revenez bientôt.", source: "Source originale", updated: "Les flux sont actualisés automatiquement environ toutes les heures." },
    ar: { intro: "أحدث الأخبار من مجتمع الفروسية الدولي.", empty: "لا توجد أخبار متاحة حاليًا. يرجى المحاولة مرة أخرى قريبًا.", source: "المصدر الأصلي", updated: "تُحدّث الأخبار تلقائيًا كل ساعة تقريبًا." }
  }[params.locale];

  return (
    <div className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <SectionHeading eyebrow={dict.nav.news} title={dict.nav.news} />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60">{copy.intro}</p>
      <div className="mt-10 border-y-2 border-charcoal py-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-charcoal/55">MEC HORSES · INTERNATIONAL EQUESTRIAN JOURNAL · {new Date().toLocaleDateString(params.locale, { day: "numeric", month: "long", year: "numeric" })}</div>
      {posts.length > 0 && (
        <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post.url} className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className={`relative overflow-hidden bg-[#252821] ${index === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
                  {post.image ? <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /> : <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#68604a,_#252821_72%)]"><span className="font-display text-5xl italic text-[#c7a468]/65">MEC</span></div>}
                  <span className="absolute bottom-3 left-3 bg-charcoal/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#e2c995]">{post.source}</span>
                </div>
                <div className="pt-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9a7837]">{post.date ? new Date(post.date).toLocaleDateString(params.locale, { day: "numeric", month: "short", year: "numeric" }) : copy.source}</p>
                  <h2 className={`mt-2 font-display italic leading-tight text-charcoal transition-colors group-hover:text-[#9a7837] ${index === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>{post.title}</h2>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-charcoal/45">{copy.source} · {post.source} ↗</p>
                </div>
              </a>
              <div className="mt-5 border-b border-charcoal/15" />
            </article>
          ))}
        </div>
      )}
      {posts.length === 0 && <p className="mt-8 border-y border-charcoal-line py-8 text-sm text-charcoal/60">{copy.empty}</p>}
      <p className="mt-6 font-mono text-[9px] uppercase tracking-wide text-charcoal/40">{copy.updated}</p>
    </div>
  );
}
