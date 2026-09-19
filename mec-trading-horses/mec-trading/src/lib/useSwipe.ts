"use client";

import { useRef } from "react";

/**
 * Horizontal swipe detection for touch devices. Returns handlers to spread on
 * the swipeable element; `onSwipe(+1)` means the user swiped left (next),
 * `onSwipe(-1)` swiped right (previous). Vertical drags are ignored so page
 * scrolling is never hijacked.
 */
export function useSwipe(onSwipe: (direction: 1 | -1) => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) onSwipe(dx < 0 ? 1 : -1);
    }
  };
}
