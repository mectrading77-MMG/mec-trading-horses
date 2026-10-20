"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/types/horse";

const placeholders = [
  "Search by breed…",
  "Search by age…",
  "Search by height…",
  "Search by price…",
  "Search by sex…",
  "Search by country…",
  "Search by competition level…"
];

export default function HeroCatalogSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % placeholders.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(`/${locale}/horses-for-sale${value ? `?search=${encodeURIComponent(value)}` : ""}`);
  }

  return (
    <form onSubmit={submit} role="search" className="mt-8 flex w-full max-w-4xl items-stretch overflow-hidden rounded-sm border border-white/70 bg-ivory shadow-[0_18px_50px_-22px_rgba(0,0,0,0.55)] sm:mt-10">
      <label htmlFor="hero-horse-search" className="sr-only">Search the horse catalogue</label>
      <span aria-hidden="true" className="flex items-center ps-4 text-charcoal/55 sm:ps-6">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" strokeLinecap="round" /></svg>
      </span>
      <input
        id="hero-horse-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholders[placeholderIndex]}
        className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-charcoal outline-none placeholder:text-charcoal/45 sm:px-5 sm:py-5 sm:text-base"
      />
      <button type="submit" className="m-1.5 inline-flex shrink-0 items-center gap-2 bg-charcoal px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-hunter sm:m-2 sm:px-7 sm:text-[11px]">
        <span>Search</span><span aria-hidden="true" className="text-base">→</span>
      </button>
    </form>
  );
}
