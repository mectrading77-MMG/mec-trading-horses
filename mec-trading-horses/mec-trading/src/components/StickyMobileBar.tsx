"use client";

import { whatsappLink } from "@/lib/whatsapp";

export default function StickyMobileBar({ dict }: { dict: any }) {
  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: dict.brand.name, url: window.location.href });
      } catch {
        /* user cancelled — no action needed */
      }
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal-line bg-ivory/95 backdrop-blur lg:hidden">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 py-3 font-mono text-[10px] uppercase tracking-eyebrow text-hunter"
      >
        {dict.detail.whatsapp}
      </a>
      <a
        href="tel:+33600000000"
        className="flex flex-col items-center gap-1 border-x border-charcoal-line py-3 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal"
      >
        {dict.form.call}
      </a>
      <button
        onClick={share}
        className="flex flex-col items-center gap-1 py-3 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal"
      >
        Share
      </button>
    </div>
  );
}
