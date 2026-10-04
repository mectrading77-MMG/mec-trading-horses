"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { XraySet } from "@/types/horse";
import { useSwipe } from "@/lib/useSwipe";

/**
 * Radiograph viewer: one large view on a dark plate, previous/next controls
 * (buttons, keyboard arrows, or clicking a filmstrip thumbnail), the view's
 * label, and — when the admin has enabled it — a "download all" ZIP.
 */
export default function XrayViewer({ set, dict, locale }: { set: XraySet; dict: any; locale: string }) {
  const [i, setI] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const n = set.images.length;
  const cur = set.images[i];

  const go = (d: number) => setI((k) => (k + d + n) % n);
  const swipe = useSwipe((d) => go(d));

  // Arrow keys step through the views whenever a control inside the viewer has focus.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen, n]);

  const taken = new Date(set.takenOn).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

  return (
    <section ref={rootRef} className="min-w-0 max-w-full bg-charcoal text-ivory" aria-label={dict.detail.xraysTitle}>
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/10 px-5 py-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-lg italic">{dict.detail.xraysTitle}</span>
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ivory/50">
            {dict.detail.xraysViews.replace("{count}", String(n))} · {dict.detail.xraysTakenOn} {taken}
            {set.clinic ? ` · ${dict.detail.xraysBy} ${set.clinic}` : ""}
          </span>
        </div>
        {set.zipUrl && (
          <a
            href={set.zipUrl}
            download
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap border border-gold px-4 py-2 font-mono sm:w-auto text-[10px] uppercase tracking-eyebrow text-gold transition-colors duration-400 hover:bg-gold hover:text-charcoal"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" />
            </svg>
            {dict.detail.xraysDownloadAll.replace("{size}", String(set.zipSizeMb ?? ""))}
          </a>
        )}
      </div>

      {/* Main plate */}
      <div className="relative aspect-[4/5] w-full touch-pan-y bg-black sm:aspect-[16/10]" {...swipe}>
        <Image
          key={cur.url}
          src={cur.url}
          alt={`${dict.detail.xraysTitle} — ${cur.label}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="cursor-zoom-in object-contain"
          onClick={() => setIsFullscreen(true)}
          priority={i === 0}
          unoptimized
        />
        {/* Warm the cache for the neighbouring views so cycling feels instant */}
        {[1, -1].map((d) => (
          <link key={d} rel="prefetch" as="image" href={set.images[(i + d + n) % n].url} />
        ))}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={dict.detail.xraysPrev}
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory/25 bg-charcoal/60 text-ivory backdrop-blur transition-colors duration-400 hover:border-gold hover:text-gold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={dict.detail.xraysNext}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory/25 bg-charcoal/60 text-ivory backdrop-blur transition-colors duration-400 hover:border-gold hover:text-gold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-5 sm:pb-4">
          <div>
            <div className="font-display text-lg italic leading-tight sm:text-xl">{cur.label}</div>
            {cur.bodyPart && (
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-eyebrow text-ivory/50">{cur.bodyPart}</div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="whitespace-nowrap font-mono text-[11px] tracking-eyebrow text-ivory/70">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <a
              href={cur.url}
              download
              className="whitespace-nowrap font-mono text-[10px] uppercase tracking-eyebrow text-gold underline underline-offset-4"
            >
              {dict.detail.xraysDownloadView}
            </a>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={cur.label} onClick={() => setIsFullscreen(false)}>
          <Image src={cur.url} alt={`${dict.detail.xraysTitle} — ${cur.label}`} fill sizes="100vw" className="object-contain" unoptimized priority />
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }} aria-label="Close fullscreen" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-ivory/30 bg-charcoal/70 text-ivory backdrop-blur hover:border-gold hover:text-gold"><span className="text-2xl leading-none">×</span></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={dict.detail.xraysPrev} className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/30 bg-charcoal/70 text-ivory backdrop-blur hover:border-gold hover:text-gold"><span className="text-2xl">‹</span></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={dict.detail.xraysNext} className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/30 bg-charcoal/70 text-ivory backdrop-blur hover:border-gold hover:text-gold"><span className="text-2xl">›</span></button>
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 bg-black/60 px-4 py-2 text-center text-ivory backdrop-blur"><div className="font-display text-lg italic">{cur.label}</div><div className="font-mono text-[10px] uppercase tracking-eyebrow text-ivory/60">{i + 1} / {n}</div></div>
        </div>
      )}

      {/* Filmstrip */}
      <div className="flex min-w-0 gap-1.5 overflow-x-auto border-t border-ivory/10 bg-charcoal-soft p-3">
        {set.images.map((img, k) => (
          <button
            key={img.url}
            type="button"
            data-idx={k}
            onClick={() => setI(k)}
            title={img.label}
            className={`relative h-20 w-16 shrink-0 overflow-hidden bg-black transition-opacity duration-400 ${
              k === i ? "opacity-100 ring-1 ring-gold" : "opacity-50 hover:opacity-90"
            }`}
            aria-label={img.label}
          >
            <Image src={img.thumbUrl} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      <p className="px-5 py-3 text-xs text-ivory/45">{dict.detail.xraysNote}</p>
    </section>
  );
}
