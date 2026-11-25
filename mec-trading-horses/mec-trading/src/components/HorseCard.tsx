"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { Horse, Locale } from "@/types/horse";
import { ageFromDob, formatPriceRange } from "@/lib/horses";
import { formatJumpHeight } from "@/lib/levels";
import HorsePreview from "@/components/HorsePreview";
import InquiryOptions from "@/components/InquiryOptions";
import FavoriteStar from "@/components/FavoriteStar";

export default function HorseCard({ horse, locale, dict }: { horse: Horse; locale: Locale; dict: any }) {
  const cover = horse.media.find((m) => m.isCover) ?? horse.media[0];
  const price = formatPriceRange(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, locale);
  const t = horse.translations[locale] ?? horse.translations.en;

  const ref = useRef<HTMLAnchorElement>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [canHover, setCanHover] = useState(false);

  // Only pointer devices get the floating preview; touch users tap straight through.
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const show = () => {
    if (!canHover || !ref.current) return;
    setAnchor(ref.current.getBoundingClientRect());
  };
  const hide = () => setAnchor(null);

  const statusClass =
    horse.status === "AVAILABLE"
      ? "bg-hunter text-ivory"
      : horse.status === "RESERVED"
      ? "bg-gold text-charcoal"
      : "bg-charcoal/80 text-ivory";

  const statusDotClass =
    horse.status === "AVAILABLE"
      ? "bg-[#B6FF00]"
      : horse.status === "RESERVED"
      ? "bg-[#FF8C00]"
      : "bg-[#FF2B2B]";

  return (
    <>
      <div className="relative">
      <Link
        ref={ref}
        href={`/${locale}/horses-for-sale/${horse.slug}`}
        className="group block"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-soft">
          <FavoriteStar horseId={horse.id} />
          {cover && (
            <Image
              src={cover.url}
              alt={cover.alt ?? t.name}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover transition-transform duration-400 group-hover:scale-105"
            />
          )}
          <span className={`absolute left-4 top-4 flex items-center gap-2 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow ${statusClass}`}>
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusDotClass}`} aria-hidden="true" />
            {dict.horse.statusLabel[horse.status]}
          </span>
          <span className="absolute bottom-4 left-4 bg-ivory/95 px-3 py-1 font-display text-sm italic text-charcoal">
            {formatJumpHeight(horse.jumpHeightCm)}
          </span>
        </div>

        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)] sm:items-start sm:gap-6 lg:gap-8">
          <div className="min-w-0">
            <h3 className="min-h-[2.25em] break-words font-display text-[clamp(1.45rem,2vw,1.9rem)] italic leading-[1.12] text-charcoal">
              {t.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-charcoal/65">
              <span>{horse.breed}</span>
              <span aria-hidden="true" className="text-gold/70">·</span>
              <span>{dict.horse.sexLabel[horse.sex]}</span>
              <span aria-hidden="true" className="text-gold/70">·</span>
              <span>{ageFromDob(horse.dateOfBirth)} {dict.horse.years}</span>
            </div>
            {horse.highlights[0] && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/60">
                {horse.highlights[0]}
              </p>
            )}
            <p className="mt-3 break-words font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-charcoal/45">
              {horse.locationLabel}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-stretch border-t border-charcoal-line/70 pt-3 text-left sm:items-end sm:border-l sm:border-t-0 sm:pt-0 sm:pl-5 sm:text-right">
            <p className="whitespace-nowrap font-display text-xl leading-tight tabular-nums text-gold sm:text-2xl">
              {price ?? "—"}
            </p>
            <div className="mt-2 w-full sm:flex sm:justify-end">
              <InquiryOptions horseName={t.name} label={dict.horse.inquireHorse} />
            </div>
          </div>
        </div>
      </Link>
      <FavoriteStar horseId={horse.id} />
      </div>

      {anchor &&
        typeof document !== "undefined" &&
        createPortal(<HorsePreview horse={horse} locale={locale} dict={dict} anchor={anchor} />, document.body)}
    </>
  );
}
