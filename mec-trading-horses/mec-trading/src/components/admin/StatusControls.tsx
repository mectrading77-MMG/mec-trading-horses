"use client";

import { useState } from "react";
import type { HorseStatus } from "@/types/horse";

export default function StatusControls({ horseSlug, status, dict }: { horseSlug: string; status: HorseStatus; dict: any }) {
  const [current, setCurrent] = useState<HorseStatus>(status);
  const [saving, setSaving] = useState(false);
  const options = [
    { value: "AVAILABLE" as const, label: dict.horse.statusLabel.AVAILABLE, cls: "border-[#B6FF00] text-[#567000]" },
    { value: "RESERVED" as const, label: dict.horse.statusLabel.RESERVED, cls: "border-gold text-gold" },
    { value: "SOLD" as const, label: dict.horse.statusLabel.SOLD, cls: "border-charcoal/30 text-charcoal/60" }
  ];
  async function updateStatus(next: HorseStatus) {
    if (next === current || saving) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/horses", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ horseSlug, status: next }) });
      if (!response.ok) throw new Error("Status update failed");
      setCurrent(next);
    } catch {}
    finally { setSaving(false); }
  }
  return <div className="flex flex-wrap gap-1.5">{options.map((option) => (
    <button key={option.value} type="button" disabled={saving} onClick={() => updateStatus(option.value)}
      className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-eyebrow ${current === option.value ? "bg-charcoal text-ivory" : option.cls}`}>
      {option.label}
    </button>
  ))}</div>;
}
