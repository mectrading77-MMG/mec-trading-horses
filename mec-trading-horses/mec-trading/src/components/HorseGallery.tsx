"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/types/horse";
import { useSwipe } from "@/lib/useSwipe";

export default function HorseGallery({
  media,
  name,
  representativeNote
}: {
  media: MediaItem[];
  name: string;
  representativeNote?: string;
}) {
  const photos = media.filter((m) => m.type === "PHOTO");
  const [active, setActive] = useState(0);
  const current = photos[active] ?? photos[0];
  const swipe = useSwipe((d) => setActive((a) => (a + d + photos.length) % photos.length));

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[16/9] w-full touch-pan-y overflow-hidden bg-charcoal-soft sm:aspect-[21/9]" {...swipe}>
        <Image
          src={current.url}
          alt={current.alt ?? name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {representativeNote && (
          <span className="absolute bottom-3 left-3 bg-charcoal/70 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow text-ivory/85 backdrop-blur">
            {representativeNote}
          </span>
        )}
      </div>
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto px-1">
          {photos.map((photo, i) => (
            <button
              key={photo.url + i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden transition-opacity duration-400 ${
                i === active ? "opacity-100 ring-1 ring-gold" : "opacity-60 hover:opacity-90"
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <Image src={photo.url} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
