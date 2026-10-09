"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { Horse, Locale } from "@/types/horse";
import { ageFromDob, formatPriceRange } from "@/lib/horses";
import { formatJumpHeight } from "@/lib/levels";
import HorsePreview from "@/components/HorsePreview";
import { whatsappLink } from "@/lib/whatsapp";
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

        <div className="mt-4 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl italic text-charcoal">{t.name}</h3>
            <p className="mt-1 text-sm text-charcoal/60">
              {horse.breed} · {dict.horse.sexLabel[horse.sex]} · {ageFromDob(horse.dateOfBirth)} {dict.horse.years}
            </p>
            {horse.highlights[0] && <p className="mt-1 text-sm text-charcoal/60">{horse.highlights[0]}</p>}
            <p className="mt-1 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/40">{horse.locationLabel}</p>
          </div>
          <div className="shrink-0 text-right">
            <div>
              <p className="font-display text-lg text-gold">{price ?? "—"}</p>
              <a href={whatsappLink(t.name)} className="mt-2 inline-block border border-gold px-3 py-1.5 font-mono text-[9px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-charcoal" onClick={(e) => e.stopPropagation()}>Inquire this horse</a>
            </div>
          </div>
        </div>
      </Link>

      {anchor &&
        typeof document !== "undefined" &&
        createPortal(<HorsePreview horse={horse} locale={locale} dict={dict} anchor={anchor} />, document.body)}
    </>
  );
}
