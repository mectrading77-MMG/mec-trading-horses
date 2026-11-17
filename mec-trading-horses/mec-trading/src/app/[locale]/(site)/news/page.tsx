import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types/horse";
import { localizedAlternates } from "@/lib/seo";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const copy = {
  en: { intro: "Daily, source-led updates from Egypt, the Gulf and Europe.", calendar: "Competition calendar", latest: "Latest news", empty: "New verified updates will appear here as they are published.", source: "Original source", categories: { COMPETITION: "Competitions", RESULT: "Results", FEDERATION: "Federations", MARKET: "Market", WELFARE: "Horse welfare" }, regions: { EGYPT: "Egypt", GULF: "Gulf", EUROPE: "Europe", INTERNATIONAL: "International" } },
  fr: { intro: "L’actualité quotidienne vérifiée d’Égypte, du Golfe et d’Europe.", calendar: "Calendrier des concours", latest: "Dernières actualités", empty: "Les nouvelles informations vérifiées apparaîtront ici.", source: "Source originale", categories: { COMPETITION: "Compétitions", RESULT: "Résultats", FEDERATION: "Fédérations", MARKET: "Marché", WELFARE: "Bien-être équin" }, regions: { EGYPT: "Égypte", GULF: "Golfe", EUROPE: "Europe", INTERNATIONAL: "International" } },
  ar: { intro: "تحديثات يومية موثوقة من مصر والخليج وأوروبا.", calendar: "أجندة البطولات", latest: "آخر الأخبار", empty: "ستظهر هنا آخر المستجدات الموثوقة فور نشرها.", source: "المصدر الأصلي", categories: { COMPETITION: "البطولات", RESULT: "النتائج", FEDERATION: "الاتحادات", MARKET: "السوق", WELFARE: "رعاية الخيل" }, regions: { EGYPT: "مصر", GULF: "الخليج", EUROPE: "أوروبا", INTERNATIONAL: "دولي" } },
  de: { intro: "Tägliche, quellenbasierte Nachrichten aus Ägypten, dem Golf und Europa.", calendar: "Turnierkalender", latest: "Neueste Nachrichten", empty: "Neue geprüfte Meldungen erscheinen hier.", source: "Originalquelle", categories: { COMPETITION: "Turniere", RESULT: "Ergebnisse", FEDERATION: "Verbände", MARKET: "Markt", WELFARE: "Pferdewohl" }, regions: { EGYPT: "Ägypten", GULF: "Golf", EUROPE: "Europa", INTERNATIONAL: "International" } },
  nl: { intro: "Dagelijks gecontroleerd paardensportnieuws uit Egypte, de Golf en Europa.", calendar: "Wedstrijdkalender", latest: "Laatste nieuws", empty: "Nieuwe gecontroleerde berichten verschijnen hier.", source: "Oorspronkelijke bron", categories: { COMPETITION: "Wedstrijden", RESULT: "Resultaten", FEDERATION: "Federaties", MARKET: "Markt", WELFARE: "Paardenwelzijn" }, regions: { EGYPT: "Egypte", GULF: "Golf", EUROPE: "Europa", INTERNATIONAL: "Internationaal" } }
} as const;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = { en: "Equestrian News & Show Jumping Calendar", fr: "Actualités équestres et calendrier de saut d’obstacles", ar: "أخبار الفروسية وأجندة قفز الحواجز", de: "Nachrichten und Turnierkalender im Springsport", nl: "Paardensportnieuws en springkalender" };
  const descriptions: Record<Locale, string> = { en: "Verified equestrian news, show jumping results and competition dates from Egypt, the Gulf and Europe.", fr: "Actualités équestres vérifiées, résultats et dates de concours en Égypte, dans le Golfe et en Europe.", ar: "أخبار فروسية موثوقة ونتائج ومواعيد بطولات قفز الحواجز من مصر والخليج وأوروبا.", de: "Verifizierte Nachrichten, Springresultate und Turniertermine aus Ägypten, dem Golf und Europa.", nl: "Geverifieerd paardensportnieuws, springresultaten en wedstrijddatums uit Egypte, de Golf en Europa." };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/news") };
}

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const text = copy[locale] ?? copy.en;
  const articles = await db.newsArticle.findMany({ orderBy: { publishedAt: "desc" }, take: 24 });
  const titleKey = ({ en: "titleEn", fr: "titleFr", ar: "titleAr", de: "titleDe", nl: "titleNl" } as const)[locale];
  const summaryKey = ({ en: "summaryEn", fr: "summaryFr", ar: "summaryAr", de: "summaryDe", nl: "summaryNl" } as const)[locale];
  const events = await db.competitionEvent.findMany({ where: { startsAt: { gte: new Date() } }, orderBy: { startsAt: "asc" }, take: 8 });
  const dateLocale = locale === "ar" ? "ar-EG" : locale;
  return (
    <div className="mx-auto max-w-editorial px-6 py-14 lg:px-10">
      <div className="mb-12 border-b border-charcoal-line pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">MEC HORSES · EQUESTRIAN NEWS</p>
        <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-6xl">Equestrian News</h1>
        <p className="mt-4 max-w-2xl text-base text-charcoal/65">{text.intro}</p>
        <div className="mt-7 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.14em]">
          {Object.entries(text.regions).map(([key, label]) => <span key={key} className="border border-charcoal/20 px-3 py-2">{label}</span>)}
        </div>
      </div>
      <section className="mb-14">
        <div className="mb-6 flex items-end justify-between"><h2 className="font-display text-3xl text-charcoal">{text.calendar}</h2><span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40">FEI · CSI · National</span></div>
        {events.length ? <div className="grid gap-3 md:grid-cols-2">{events.map((event) => <article key={event.id} className="border border-charcoal-line bg-white p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-gold">{event.country}{event.city ? ` · ${event.city}` : ""}</p><h3 className="mt-2 font-display text-xl text-charcoal">{event.title}</h3><p className="mt-2 text-sm text-charcoal/60">{new Date(event.startsAt).toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })}{event.endsAt ? ` – ${new Date(event.endsAt).toLocaleDateString(dateLocale, { day: "numeric", month: "long" })}` : ""} · {event.eventLevel ?? "Show jumping"}{event.heightLevels ? ` · ${event.heightLevels}` : ""}</p><a className="mt-3 inline-block text-xs underline underline-offset-4" href={event.sourceUrl} target="_blank" rel="noreferrer">Official event information ↗</a></article>)}</div> : <p className="border-y border-charcoal-line py-6 text-sm text-charcoal/55">{text.empty}</p>}
      </section>
      <section>
        <h2 className="mb-6 font-display text-3xl text-charcoal">{text.latest}</h2>
        {articles.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <article key={article.id} className="overflow-hidden border border-charcoal-line bg-white">{article.imageUrl ? <img src={article.imageUrl} alt="" className="h-48 w-full object-cover" loading="lazy"/> : <div className="h-2 bg-charcoal"/>}<div className="p-5"><div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-widest text-gold"><span>{text.regions[article.region]}</span><span>·</span><span>{text.categories[article.category]}</span></div><h3 className="mt-3 font-display text-xl leading-snug text-charcoal">{article[titleKey]}</h3><p className="mt-3 text-sm leading-6 text-charcoal/65">{article[summaryKey]}</p><div className="mt-5 flex items-center justify-between gap-3 border-t border-charcoal-line pt-3 text-[10px] text-charcoal/45"><time>{new Date(article.publishedAt).toLocaleDateString(dateLocale)}</time><Link href={article.sourceUrl} target="_blank" className="underline underline-offset-4">{text.source} ↗</Link></div></div></article>)}</div> : <p className="border-y border-charcoal-line py-8 text-sm text-charcoal/55">{text.empty}</p>}
      </section>
    </div>
  );
}
