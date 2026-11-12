"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type AdminHorse = {
  id: string; slug: string; breed: string; sex: string; dateOfBirth: string;
  jumpHeightCm: number; priceAmount: number | null; priceCurrency: string;
  priceOnRequest: boolean; status: string; featuredOnHome: boolean;
  translations: { locale: string; name: string }[];
  media: { id: string; type: string; url: string }[];
};

export default function HorseManager() {
  const params = useParams();
  const locale = String(params?.locale ?? "en");
  const [horses, setHorses] = useState<AdminHorse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/horses", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load horses");
      setHorses(data.horses ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load horses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function changeStatus(horse: AdminHorse, status: "ARCHIVED" | "AVAILABLE") {
    setBusy(horse.slug);
    setError("");
    try {
      const res = await fetch("/api/admin/horses", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horseSlug: horse.slug, status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not update horse");
      setHorses((current) => current.map((item) => item.slug === horse.slug ? { ...item, status } : item));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update horse");
    } finally {
      setBusy("");
    }
  }

  async function removeHorse(horse: AdminHorse) {
    const name = horse.translations.find((t) => t.locale === locale)?.name ?? horse.translations.find((t) => t.locale === "en")?.name ?? horse.slug;
    if (!window.confirm(`Permanently delete "${name}"? Its media and related horse records will also be deleted. This cannot be undone.`)) return;
    setBusy(horse.slug);
    setError("");
    try {
      const res = await fetch("/api/admin/horses", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horseSlug: horse.slug })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Delete failed");
      setHorses((current) => current.filter((item) => item.slug !== horse.slug));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy("");
    }
  }

  return (
    <div>
      {error && <p role="alert" className="mb-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {loading ? <p className="py-10 text-sm text-charcoal/60">Loading horses…</p> : horses.length === 0 ? (
        <div className="border border-charcoal-line bg-white p-8 text-sm text-charcoal/60">No horses in the database yet. Add your first horse to get started.</div>
      ) : (
        <div className="overflow-x-auto border border-charcoal-line bg-white">
          <table className="w-full min-w-[1050px] border-collapse text-sm">
            <thead><tr className="border-b border-charcoal-line bg-ivory-dim font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">
              <th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Breed</th><th className="px-4 py-3 text-left">Born</th><th className="px-4 py-3 text-left">Level</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Media</th><th className="px-4 py-3 text-right">Actions</th>
            </tr></thead>
            <tbody>{horses.map((horse) => {
              const name = horse.translations.find((t) => t.locale === locale)?.name ?? horse.translations.find((t) => t.locale === "en")?.name ?? horse.slug;
              const archived = horse.status === "ARCHIVED";
              return <tr key={horse.id} className="border-b border-charcoal-line/60">
                <td className="px-4 py-3 font-display italic text-charcoal">{name}</td>
                <td className="px-4 py-3 text-charcoal/70">{horse.breed}</td>
                <td className="px-4 py-3 text-charcoal/70">{new Date(horse.dateOfBirth).getFullYear()}</td>
                <td className="px-4 py-3 text-charcoal/70">{horse.jumpHeightCm} cm</td>
                <td className="px-4 py-3 text-charcoal/70">{horse.priceOnRequest || horse.priceAmount == null ? "On request" : new Intl.NumberFormat(locale, { style: "currency", currency: horse.priceCurrency, maximumFractionDigits: 0 }).format(horse.priceAmount)}</td>
                <td className="px-4 py-3"><span className="text-xs font-medium">{archived ? "Sold Archived" : horse.status}</span></td>
                <td className="px-4 py-3 text-charcoal/70">{horse.media.length}</td>
                <td className="px-4 py-3"><div className="flex justify-end gap-3">
                  <Link href={`/${locale}/admin/horses/${encodeURIComponent(horse.slug)}`} className="font-mono text-[10px] uppercase tracking-eyebrow text-gold underline underline-offset-4">Edit</Link>
                  {archived ? (
                    <button type="button" disabled={Boolean(busy)} onClick={() => void changeStatus(horse, "AVAILABLE")} className="font-mono text-[10px] uppercase tracking-eyebrow text-hunter underline underline-offset-4 disabled:opacity-50">Restore</button>
                  ) : (
                    <button type="button" disabled={Boolean(busy)} onClick={() => void changeStatus(horse, "ARCHIVED")} className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/70 underline underline-offset-4 disabled:opacity-50">Archive</button>
                  )}
                  <button type="button" disabled={Boolean(busy)} onClick={() => void removeHorse(horse)} className="font-mono text-[10px] uppercase tracking-eyebrow text-red-700 underline underline-offset-4 disabled:opacity-50">{busy === horse.slug ? "Working…" : "Delete Horse"}</button>
                </div></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
