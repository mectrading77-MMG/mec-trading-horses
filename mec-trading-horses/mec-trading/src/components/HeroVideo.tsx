"use client";

import { useEffect, useRef } from "react";

/**
 * Silent, looping background video for the home hero.
 *
 * React does not reliably emit the `muted` attribute in server HTML, and
 * browsers only autoplay muted video — so we set it imperatively before
 * calling play(). Viewers who prefer reduced motion get the poster only.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // play() returns a Promise in modern browsers; autoplay refusals reject and are expected.
    void v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
