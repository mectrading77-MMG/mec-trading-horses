"use client";

import { useEffect, useState } from "react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const current = photos[active] ?? photos[0];

  const showPrevious = () =>
    setActive((a) => (a - 1 + photos.length) % photos.length);

  const showNext = () =>
    setActive((a) => (a + 1) % photos.length);

  const handleSwipe = (d: number) => {
    if (photos.length < 2) return;
    setActive((a) => (a + d + photos.length) % photos.length);
  };

  const swipe = useSwipe(handleSwipe);
  const fullscreenSwipe = useSwipe(handleSwipe);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
      if (event.key === "ArrowLeft" && photos.length > 1) showPrevious();
      if (event.key === "ArrowRight" && photos.length > 1) showNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, photos.length]);

  if (!current) return null;

  return (
    <div>
      <div
        className="group relative aspect-[16/9] w-full cursor-zoom-in touch-pan-y overflow-hidden bg-charcoal-soft sm:aspect-[21/9]"
        {...swipe}
        onClick={() => setIsFullscreen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Open ${name} photo in fullscreen`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsFullscreen(true);
          }
        }}
      >
        <Image
          src={current.url}
          alt={current.alt ?? name}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <span className="absolute right-3 top-3 bg-charcoal/70 px-3 py-2 text-ivory/90 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <span className="sr-only">Open image fullscreen</span>
          <span aria-hidden="true" className="text-lg leading-none">⛶</span>
        </span>
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
              aria-current={i === active ? "true" : undefined}
            >
              <Image src={photo.url} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} photo gallery`}
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label="Close fullscreen gallery"
          >
            ×
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Previous photo"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
            {...fullscreenSwipe}
          >
            <Image
              src={current.url}
              alt={current.alt ?? name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur">
            {active + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
