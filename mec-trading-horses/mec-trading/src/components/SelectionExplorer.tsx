"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Horse, Locale } from "@/types/horse";
import { HEIGHT_BANDS, bandFor, formatJumpHeight } from "@/lib/levels";
import { ageFromDob, formatPrice } from "@/lib/horses";

/**
 * "Find a horse by the height it jumps." The bands sit on the left; hovering
 * one shows a preview card on the right that rotates through the horses
 * available at that level, each with a photo slideshow and a curated set of
 * facts. Clicking a band deep-links into the filtered catalogue.
 *
 * On touch devices the preview follows a tap instead of a hover.
 */
export default function SelectionExplorer({
  horses,
  locale,
  dict
}: {
  horses: Horse[];
  locale: Locale;
  dict: any;
}) {
  const byBand = useMemo(() => {
    const map = new Map<string, Horse[]>();
    for (const b of HEIGHT_BANDS) map.set(b.id, []);
    for (const h of horses) map.get(bandFor(h.jumpHeightCm).id)?.push(h);
    return map;
  }, [horses]);

  const firstWithHorses = HEIGHT_BANDS.find((b) => (byBand.get(b.id)?.length ?? 0) > 0)?.id ?? HEIGHT_BANDS[0].id;
  const [active, setActive] = useState(firstWithHorses);
  const [horseIdx, setHorseIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const list = byBand.get(active) ?? [];
  const horse = list[horseIdx % Math.max(1, list.length)];
  const photos = horse?.media.filter((m) => m.type === "PHOTO") ?? [];

  // Rotate horses within the band; rotate photos within the horse.
  useEffect(() => {
    setHorseIdx(0);
    setPhotoIdx(0);
  }, [active]);
  useEffect(() => {
    if (list.length < 2) return;
    const id = setInterval(() => {
      setHorseIdx((n) => (n + 1) % list.length);
      setPhotoIdx(0);
    }, 3600);
    return () => clearInterval(id);
  }, [list.length, active]);
  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setPhotoIdx((n) => (n + 1) % photos.length), 1200);
    return () => clearInterval(id);
  }, [photos.length, horse?.id]);

  const t = horse ? horse.translations[locale] ?? horse.translations.en : null;
  const price = horse ? formatPrice(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, locale) : null;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
      {/* Bands */}
      <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
        {HEIGHT_BANDS.map((b, i) => {
          const count = byBand.get(b.id)?.length ?? 0;
          const isActive = active === b.id;
          return (
            <li key={b.id}>
              <Link
                href={`/${locale}/horses-for-sale?level=${b.id}`}
                onMouseEnter={() => setActive(b.id)}
                onFocus={() => setActive(b.id)}
                onTouchStart={() => setActive(b.id)}
                className="group flex items-baseline gap-5 py-4 transition-colors duration-400"
              >
                <span className="font-mono text-[11px] tracking-eyebrow text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`font-display text-3xl italic leading-tight transition-colors duration-400 sm:text-4xl ${
                    isActive ? "text-gold" : "text-ivory/55 group-hover:text-ivory"
                  }`}
                >
                  {b.label}
                </span>
                <span className="ms-auto font-mono text-[10px] uppercase tracking-eyebrow text-ivory/35">
                  {dict.bands.count.replace("{count}", String(count))}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Preview card */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        {horse && t ? (
          <Link
            href={`/${locale}/horses-for-sale/${horse.slug}`}
            className="block overflow-hidden bg-ivory text-charcoal shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]"
          >
            <div className="relative h-[240px] overflow-hidden bg-charcoal-soft">
              {photos.map((p, n) => (
                <Image
                  key={p.url}
                  src={p.url}
                  alt=""
                  fill
                  sizes="440px"
                  className={`object-cover transition-opacity duration-700 ${n === photoIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span
                className={`absolute left-4 top-4 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow ${
                  horse.status === "AVAILABLE" ? "bg-hunter text-ivory" : horse.status === "RESERVED" ? "bg-gold text-charcoal" : "bg-charcoal/85 text-ivory"
                }`}
              >
                {dict.horse.statusLabel[horse.status]}
              </span>
              {list.length > 1 && (
                <span className="absolute bottom-4 right-4 flex gap-1.5">
                  {list.map((_, n) => (
                    <i key={n} className={`block h-1.5 w-1.5 rounded-full ${n === horseIdx % list.length ? "bg-gold" : "bg-ivory/60"}`} />
                  ))}
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl italic leading-tight">{t.name}</h3>
                <span className="shrink-0 font-display text-base text-gold">{price ?? dict.horse.priceOnRequest}</span>
              </div>
              <p className="mt-1 text-[13px] text-charcoal/60">
                {horse.breed} · {dict.horse.sexLabel[horse.sex]} · {ageFromDob(horse.dateOfBirth)} {dict.horse.years}
              </p>
              <div className="mt-4 flex gap-7">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.level}</div>
                  <div className="text-sm">{formatJumpHeight(horse.jumpHeightCm)}</div>
                </div>
                {horse.maxHeightJumpedCm && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.maxHeight}</div>
                    <div className="text-sm">{formatJumpHeight(horse.maxHeightJumpedCm)}</div>
                  </div>
                )}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.location}</div>
                  <div className="text-sm">{horse.locationLabel}</div>
                </div>
              </div>
              {horse.highlights[0] && (
                <p className="mt-4 border-s-2 border-gold ps-3 text-[13px] text-hunter">{horse.highlights[0]}</p>
              )}
              <p className="mt-5 font-mono text-[10px] uppercase tracking-eyebrow text-gold underline underline-offset-4">
                {dict.preview.view}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex h-full min-h-[300px] items-center border border-ivory/10 p-8 text-sm text-ivory/60">
            {dict.bands.empty}
          </div>
        )}
      </div>
    </div>
  );
}
