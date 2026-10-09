"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mec-favorite-horses";
const EVENT_NAME = "mec-favorites-changed";

function readFavorites(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export default function FavoriteStar({ horseId, label = "Add to favorites" }: { horseId: string; label?: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => setActive(readFavorites().includes(horseId));
    sync();
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [horseId]);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const favorites = readFavorites();
    const next = favorites.includes(horseId)
      ? favorites.filter((id) => id !== horseId)
      : [...favorites, horseId];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setActive(next.includes(horseId));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch {
      // Keep the control usable even if browser storage is unavailable.
      setActive((value) => !value);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={active ? "Remove from favorites" : label}
      aria-pressed={active}
      title={active ? "Remove from favorites" : label}
      className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 bg-ivory/95 text-gold shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3 2.75 5.57 6.15.89-4.45 4.34 1.05 6.13L12 17.04l-5.5 2.89 1.05-6.13L3.1 9.46l6.15-.89L12 3Z" />
      </svg>
    </button>
  );
}
