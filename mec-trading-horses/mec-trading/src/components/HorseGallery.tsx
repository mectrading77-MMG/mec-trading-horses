"use client";

import { useEffect, useMemo, useState } from "react";
import type { MediaItem } from "@/types/horse";
import { useSwipe } from "@/lib/useSwipe";

const isVideo = (item: MediaItem) => item.type.startsWith("VIDEO_");

export default function HorseGallery({ media, name }: { media: MediaItem[]; name: string }) {
  // Keep the cover first, then preserve the administrator's media ordering.
  const gallery = useMemo(
    () => [...media].filter((item) => item.type === "PHOTO" || isVideo(item))
      .sort((a, b) => Number(b.isCover) - Number(a.isCover)),
    [media]
  );
  const [active, setActive] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const current = gallery[active] ?? gallery[0];

  const showPrevious = () => setActive((value) => (value - 1 + gallery.length) % gallery.length);
  const showNext = () => setActive((value) => (value + 1) % gallery.length);
  const handleSwipe = (direction: number) => {
    if (gallery.length > 1) setActive((value) => (value + direction + gallery.length) % gallery.length);
  };
  const swipe = useSwipe(handleSwipe);
  const fullscreenSwipe = useSwipe(handleSwipe);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
      if (event.key === "ArrowLeft" && gallery.length > 1) showPrevious();
      if (event.key === "ArrowRight" && gallery.length > 1) showNext();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, gallery.length]);

  if (!current) return null;

  const renderMedia = (item: MediaItem, fullscreen = false) => {
    if (isVideo(item)) {
      return (
        <video
          key={item.url}
          src={item.url}
          controls
          playsInline
          preload={fullscreen ? "auto" : "metadata"}
          className={fullscreen ? "h-full w-full object-contain" : "h-full w-full object-cover"}
          aria-label={item.alt ?? name}
          onClick={(event) => event.stopPropagation()}
        />
      );
    }
    return (
      <img
        key={item.url}
        src={item.url}
        alt={item.alt ?? name}
        loading={fullscreen ? "eager" : "lazy"}
        className={fullscreen ? "h-full w-full object-contain" : "h-full w-full object-cover"}
        onError={() => setFailed((value) => ({ ...value, [item.url]: true }))}
      />
    );
  };

  return (
    <div>
      <div
        className="group relative aspect-[16/9] w-full cursor-zoom-in touch-pan-y overflow-hidden bg-charcoal-soft sm:aspect-[21/9]"
        {...swipe}
        onClick={() => setIsFullscreen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Open ${name} media fullscreen`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsFullscreen(true);
          }
        }}
      >
        {renderMedia(current)}
        {failed[current.url] && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal text-sm text-ivory">
            Media could not be loaded
          </div>
        )}
        <span className="absolute right-3 top-3 bg-charcoal/70 px-3 py-2 text-ivory/90 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100" aria-hidden="true">⛶</span>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto px-1">
          {gallery.map((item, index) => (
            <button
              key={item.url + index}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden bg-charcoal-soft transition-opacity ${index === active ? "opacity-100 ring-1 ring-gold" : "opacity-60 hover:opacity-90"}`}
              aria-label={`View ${isVideo(item) ? "video" : "photo"} ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            >
              {isVideo(item) ? (
                <video src={item.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
              ) : (
                <img src={item.url} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
              {isVideo(item) && <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-xl text-white">▶</span>}
            </button>
          ))}
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} media gallery`}
          onClick={() => setIsFullscreen(false)}
        >
          <button type="button" onClick={() => setIsFullscreen(false)} className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center bg-white/10 text-2xl text-white hover:bg-white/20" aria-label="Close fullscreen gallery">×</button>
          {gallery.length > 1 && (
            <>
              <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white sm:left-6" aria-label="Previous media">‹</button>
              <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white sm:right-6" aria-label="Next media">›</button>
            </>
          )}
          <div className="relative h-full w-full" onClick={(event) => event.stopPropagation()} {...fullscreenSwipe}>
            {renderMedia(current, true)}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 font-mono text-xs text-white/80">{active + 1} / {gallery.length}</div>
        </div>
      )}
    </div>
  );
}
