"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/types/horse";

const TABS = [
  { key: "PHOTO", labelKey: "tabPhotos" },
  { key: "VIDEO_GENERAL", labelKey: "tabVideos" },
  { key: "VIDEO_COMPETITION", labelKey: "tabCompetitionVideos" },
  { key: "VIDEO_TRAINING", labelKey: "tabTrainingVideos" }
] as const;

export default function MediaTabs({ media, dict }: { media: MediaItem[]; dict: any }) {
  const available = TABS.filter((t) => media.some((m) => m.type === t.key));
  const [tab, setTab] = useState(available[0]?.key ?? "PHOTO");
  const items = media.filter((m) => m.type === tab);

  return (
    <div>
      <div className="flex gap-6 border-b border-charcoal-line">
        {available.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 font-mono text-[11px] uppercase tracking-eyebrow transition-colors duration-400 ${
              tab === t.key ? "border-b border-gold text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
            }`}
          >
            {dict.detail[t.labelKey]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) =>
          item.type === "PHOTO" ? (
            <div key={i} className="relative aspect-square overflow-hidden bg-charcoal-soft">
              <Image src={item.url} alt={item.alt ?? ""} fill sizes="33vw" className="object-cover" />
            </div>
          ) : (
            <div key={i} className="flex aspect-square items-center justify-center bg-charcoal-soft text-ivory/50">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow">Video</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
