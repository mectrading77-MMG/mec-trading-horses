"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Horse, Locale } from "@/types/horse";
import { ageFromDob, formatPrice } from "@/lib/horses";
import { formatJumpHeight } from "@/lib/levels";

export const PREVIEW_W = 340;
export const PREVIEW_H = 470;

/**
 * Floating preview shown while a horse card is hovered. Cycles through the
 * horse's photographs and shows only the facts a buyer scans first: level,
 * age, sex/studbook, price and the headline achievements.
 *
 * Pointer-transparent, so it never steals the hover from the card beneath.
 */
export default function HorsePreview({
  horse,
  locale,
  dict,
  anchor,
  interval = 1500
}: {
  horse: Horse;
  locale: Locale;
  dict: any;
  anchor: DOMRect;
  interval?: number;
}) {
  const t = horse.translations[locale] ?? horse.translations.en;
  const photos = horse.media.filter((m) => m.type === "PHOTO");
  const [i, setI] = useState(0);
  const price = formatPrice(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, locale);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % photos.length), interval);
    return () => clearInterval(id);
  }, [photos.length, interval]);

  // Sit to the right of the card, or to the left when there is no room.
  const gap = 18;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const left =
    anchor.right + gap + PREVIEW_W <= vw - 12 ? anchor.right + gap : Math.max(12, anchor.left - gap - PREVIEW_W);
  const top = Math.min(Math.max(12, anchor.top), Math.max(12, vh - PREVIEW_H - 12));

  const statusClass =
    horse.status === "AVAILABLE"
      ? "bg-hunter text-ivory"
      : horse.status === "RESERVED"
      ? "bg-gold text-charcoal"
      : "bg-charcoal/85 text-ivory";

  return (
    <div
      role="presentation"
      className="preview-in pointer-events-none fixed z-[60] overflow-hidden border border-charcoal/10 bg-ivory shadow-[0_30px_80px_-20px_rgba(23,20,15,0.45)]"
      style={{ left, top, width: PREVIEW_W }}
    >
      <div className="relative h-[215px] w-full overflow-hidden bg-charcoal-soft">
        {photos.map((p, n) => (
          <Image
            key={p.url}
            src={p.url}
            alt=""
            fill
            sizes="340px"
            className={`object-cover transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
            priority={n === 0}
          />
        ))}
        <span className={`absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] uppercase tracking-eyebrow ${statusClass}`}>
          {dict.horse.statusLabel[horse.status]}
        </span>
        <span className="absolute bottom-3 left-3 bg-ivory/95 px-2.5 py-1 font-display text-sm italic text-charcoal">
          {formatJumpHeight(horse.jumpHeightCm)}
        </span>
        {photos.length > 1 && (
          <span className="absolute bottom-3 right-3 flex gap-1">
            {photos.map((_, n) => (
              <i key={n} className={`block h-1 w-4 ${n === i ? "bg-gold" : "bg-ivory/50"}`} />
            ))}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl italic leading-tight text-charcoal">{t.name}</h3>
        <p className="mt-1 text-[13px] text-charcoal/60">
          {horse.breed} · {dict.horse.sexLabel[horse.sex]} · {ageFromDob(horse.dateOfBirth)} {dict.horse.years}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-y border-charcoal-line py-3">
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.level}</dt>
            <dd className="mt-0.5 font-display text-base text-charcoal">{formatJumpHeight(horse.jumpHeightCm)}</dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.age}</dt>
            <dd className="mt-0.5 font-display text-base text-charcoal">
              {ageFromDob(horse.dateOfBirth)} {dict.horse.years}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-eyebrow text-charcoal/40">{dict.horse.sex}</dt>
            <dd className="mt-0.5 font-display text-base text-charcoal">{dict.horse.sexLabel[horse.sex]}</dd>
          </div>
        </dl>

        <p className="mt-3 font-display text-lg text-gold">{price ?? dict.horse.priceOnRequest}</p>

        {horse.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {horse.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-2 text-[13px] leading-snug text-charcoal/80">
                <span className="mt-[7px] h-1 w-1 shrink-0 bg-gold" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 font-mono text-[10px] uppercase tracking-eyebrow text-gold">{dict.preview.more} →</p>
      </div>
    </div>
  );
}
