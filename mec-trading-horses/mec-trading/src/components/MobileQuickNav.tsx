"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types/horse";

const labels: Record<Locale, { horses: string; services: string; aria: string }> = {
  en: { horses: "Our Horses", services: "Our Services", aria: "Show quick navigation buttons" },
  fr: { horses: "Nos chevaux", services: "Nos services", aria: "Afficher les raccourcis de navigation" },
  ar: { horses: "خيولنا", services: "خدماتنا", aria: "عرض اختصارات التنقل" },
  de: { horses: "Unsere Pferde", services: "Unsere Leistungen", aria: "Schnellnavigation anzeigen" },
  nl: { horses: "Onze paarden", services: "Onze diensten", aria: "Snelle navigatie tonen" }
};

export default function MobileQuickNav({ locale }: { locale: Locale }) {
  const text = labels[locale] ?? labels.en;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-0 top-1/2 z-[100] -translate-y-1/2 md:hidden">
      {open ? (
        <nav aria-label={text.aria} className="flex flex-col items-end gap-2">
          <Link href={`/${locale}/horses-for-sale`} className="flex min-h-11 w-36 items-center justify-between rounded-full border border-[#e5c36c] bg-[#171717]/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#f2d27d] shadow-2xl transition-transform active:scale-95">
            <span>{text.horses}</span><span aria-hidden="true">→</span>
          </Link>
          <Link href={`/${locale}/services`} className="flex min-h-11 w-36 items-center justify-between rounded-full border border-[#e5c36c] bg-[#171717]/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#f2d27d] shadow-2xl transition-transform active:scale-95">
            <span>{text.services}</span><span aria-hidden="true">→</span>
          </Link>
        </nav>
      ) : (
        <button type="button" onClick={() => setOpen(true)} aria-label={text.aria} aria-expanded={false} className="flex min-h-16 w-8 flex-col items-center justify-center gap-1 rounded-l-full border border-r-0 border-[#e5c36c] bg-[#171717]/95 text-[#f2d27d] shadow-2xl">
          <span aria-hidden="true" className="text-xl leading-none">‹</span>
          <span className="text-[10px] font-bold leading-none">2</span>
        </button>
      )}
    </div>
  );
}
