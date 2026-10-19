"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileQuickNav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 z-[100] -translate-y-1/2 md:hidden">
      {open ? (
        <nav aria-label="Quick navigation" className="flex flex-col gap-2">
          <Link href={`/${locale}/horses-for-sale`} className="flex min-h-12 w-32 items-center justify-between border border-[#e5c36c] bg-[#171717]/95 px-2.5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#f2d27d] shadow-2xl">
            <span>Our Horses</span><span aria-hidden="true">→</span>
          </Link>
          <Link href={`/${locale}/services`} className="flex min-h-12 w-32 items-center justify-between border border-[#e5c36c] bg-[#171717]/95 px-2.5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#f2d27d] shadow-2xl">
            <span>Our Services</span><span aria-hidden="true">→</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} aria-label="Hide quick navigation" className="ml-auto flex h-8 w-10 items-center justify-center border border-[#e5c36c] bg-[#171717]/95 text-lg text-[#f2d27d] shadow-xl">
            ›
          </button>
        </nav>
      ) : (
        <button type="button" onClick={() => setOpen(true)} aria-label="Show two quick navigation buttons" aria-expanded={false} className="flex min-h-20 w-8 flex-col items-center justify-center gap-1 rounded-l-md border border-r-0 border-[#e5c36c] bg-[#171717]/95 text-[#f2d27d] shadow-2xl">
          <span aria-hidden="true" className="text-xl leading-none">‹</span>
          <span className="text-[10px] font-bold leading-none">2</span>
          <span aria-hidden="true" className="text-[8px] uppercase [writing-mode:vertical-rl]">Menu</span>
        </button>
      )}
    </div>
  );
}
