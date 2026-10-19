"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

export default function InquiryOptions({ horseName, label }: { horseName: string; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const message = `Hello MEC HORSES, I’m interested in ${horseName}. Please send me more information.`;
  const email = "mailto:sales@mechorses.com?subject=" + encodeURIComponent("Horse inquiry — " + horseName) + "&body=" + encodeURIComponent(message);

  return (
    <div ref={rootRef} className="relative inline-block" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => { event.preventDefault(); setOpen((value) => !value); }}
        className="mt-2 inline-block border border-gold px-3 py-1.5 font-mono text-[9px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-charcoal"
      >
        {label}
      </button>
      {open && (
        <div role="menu" aria-label="Choose inquiry method" className="absolute right-0 top-full z-[80] mt-2 min-w-40 border border-gold/50 bg-[#171717] p-1.5 shadow-2xl">
          <a role="menuitem" href={whatsappLink(horseName)} target="_blank" rel="noreferrer" className="block whitespace-nowrap px-3 py-2.5 text-left text-xs text-[#f2d27d] hover:bg-white/10">
            WhatsApp
          </a>
          <a role="menuitem" href={email} className="block whitespace-nowrap px-3 py-2.5 text-left text-xs text-[#f2d27d] hover:bg-white/10">
            Email
          </a>
        </div>
      )}
    </div>
  );
}
