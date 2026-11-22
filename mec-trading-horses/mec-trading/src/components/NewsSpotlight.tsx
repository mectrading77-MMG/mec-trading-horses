"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EquestrianNewsItem } from "@/lib/equestrian-news";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, { kicker: string; journal: string; pause: string; play: string; empty: string }> = {
  en: { kicker: "The world of show jumping", journal: "Open the Journal", pause: "Pause", play: "Play", empty: "The latest equestrian stories will appear here." },
  fr: { kicker: "Le monde du saut d’obstacles", journal: "Ouvrir le journal", pause: "Pause", play: "Lecture", empty: "Les dernières actualités équestres apparaîtront ici." },
  ar: { kicker: "من عالم قفز الحواجز", journal: "افتح الجريدة", pause: "إيقاف", play: "تشغيل", empty: "ستظهر هنا أحدث أخبار الفروسية." }
};

export default function NewsSpotlight({ items, locale }: { items: EquestrianNewsItem[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const copy = labels[locale];
  const current = items[active];

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % items.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, items.length]);

  if (!current) {
    return <section className="mx-auto max-w-editorial px-5 py-8 sm:px-8 lg:px-10"><div className="rounded-sm border border-charcoal/15 bg-[#f5f2eb] p-7 text-sm text-charcoal/60">{copy.empty}</div></section>;
  }

  return (
    <section className="mx-auto max-w-editorial px-5 py-8 sm:px-8 lg:px-10">
      <div className="relative overflow-hidden border border-charcoal/15 bg-[#171916] text-ivory shadow-sm">
        <div className="grid min-h-[230px] md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[190px] overflow-hidden bg-[#292b25]">
            {current.image ? <img key={current.image} src={current.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" /> : <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#55513f,_#22251f_70%)]"><span className="font-display text-5xl italic text-[#c7a468]/70">MEC</span></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">MEC HORSES JOURNAL</span>
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3"><span className="h-px w-7 bg-[#c7a468]" /><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c7a468]">{copy.kicker}</p></div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c7a468]">{current.source}{current.date ? "  ·  " + new Date(current.date).toLocaleDateString(locale, { day: "numeric", month: "short" }) : ""}</p>
              <a href={current.url} target="_blank" rel="noopener noreferrer" className="mt-3 block font-display text-2xl italic leading-tight text-white transition-colors hover:text-[#d8bd8e] sm:text-3xl">{current.title}</a>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Previous story" onClick={() => setActive((active - 1 + items.length) % items.length)} className="grid h-9 w-9 place-items-center border border-white/25 text-lg transition-colors hover:border-[#c7a468] hover:text-[#c7a468]">‹</button>
                <button type="button" aria-label="Next story" onClick={() => setActive((active + 1) % items.length)} className="grid h-9 w-9 place-items-center border border-white/25 text-lg transition-colors hover:border-[#c7a468] hover:text-[#c7a468]">›</button>
                <div className="ml-2 flex items-center gap-1.5">{items.map((item, index) => <button key={item.url} type="button" aria-label={`Story ${index + 1}`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-6 bg-[#c7a468]" : "w-1.5 bg-white/35 hover:bg-white/70"}`} />)}</div>
                <button type="button" onClick={() => setPaused(!paused)} className="ml-2 font-mono text-[8px] uppercase tracking-wider text-white/55 hover:text-white">{paused ? copy.play : copy.pause}</button>
              </div>
              <Link href={`/${locale}/news`} className="inline-flex items-center gap-2 border-b border-[#c7a468] pb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#e2c995] hover:text-white">{copy.journal} <span>↗</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
