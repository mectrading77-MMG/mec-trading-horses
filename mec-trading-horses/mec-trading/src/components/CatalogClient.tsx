"use client";

import { useMemo, useState } from "react";
import type { Horse, Locale } from "@/types/horse";
import HorseCard from "@/components/HorseCard";
import { ageFromDob } from "@/lib/horses";
import { HEIGHT_BANDS, bandFor } from "@/lib/levels";

export default function CatalogClient({
  horses,
  locale,
  dict,
  initialLevel
}: {
  horses: Horse[];
  locale: Locale;
  dict: any;
  initialLevel?: string;
}) {
  const [level, setLevel] = useState(HEIGHT_BANDS.some((b) => b.id === initialLevel) ? (initialLevel as string) : "");
  const [sex, setSex] = useState("");
  const [sort, setSort] = useState("featured");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const h of horses) {
      const id = bandFor(h.jumpHeightCm).id;
      c[id] = (c[id] ?? 0) + 1;
    }
    return c;
  }, [horses]);

  const filtered = useMemo(() => {
    let list = horses; // sold horses stay visible with their badge
    if (level) list = list.filter((h) => bandFor(h.jumpHeightCm).id === level);
    if (sex) list = list.filter((h) => h.sex === sex);

    switch (sort) {
      case "priceAsc":
        list = [...list].sort((a, b) => (a.priceAmount ?? Infinity) - (b.priceAmount ?? Infinity));
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => (b.priceAmount ?? -1) - (a.priceAmount ?? -1));
        break;
      case "age":
        list = [...list].sort((a, b) => ageFromDob(a.dateOfBirth) - ageFromDob(b.dateOfBirth));
        break;
      case "height":
        list = [...list].sort((a, b) => b.jumpHeightCm - a.jumpHeightCm);
        break;
      case "newest":
        list = [...list].sort((a, b) => new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime());
        break;
      default:
        list = [...list].sort(
          (a, b) =>
            Number(a.status === "SOLD") - Number(b.status === "SOLD") ||
            Number(b.featuredOnHome) - Number(a.featuredOnHome)
        );
    }
    return list;
  }, [horses, level, sex, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow border transition-colors duration-400 ${
      active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal-line text-charcoal/70 hover:border-gold hover:text-gold"
    }`;
  const selectClass =
    "border border-charcoal-line bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal";

  return (
    <div>
      {/* Height bands */}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setLevel("")} className={chip(level === "")}>
          {dict.catalog.allLevels}
        </button>
        {HEIGHT_BANDS.map((b) => (
          <button key={b.id} type="button" onClick={() => setLevel(b.id)} className={chip(level === b.id)}>
            {b.label}
            <span className="ms-2 text-[9px] opacity-60">{counts[b.id] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Secondary filters + sort */}
      <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-charcoal-line py-4">
        <select value={sex} onChange={(e) => setSex(e.target.value)} className={selectClass}>
          <option value="">{dict.horse.sex}</option>
          <option value="MARE">{dict.horse.sexLabel.MARE}</option>
          <option value="STALLION">{dict.horse.sexLabel.STALLION}</option>
          <option value="GELDING">{dict.horse.sexLabel.GELDING}</option>
        </select>
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">
          {dict.catalog.showing.replace("{count}", String(filtered.length))}
        </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${selectClass} ms-auto`}>
          <option value="featured">{dict.catalog.sortFeatured}</option>
          <option value="height">{dict.catalog.sortHeight}</option>
          <option value="newest">{dict.catalog.sortNewest}</option>
          <option value="priceAsc">{dict.catalog.sortPriceAsc}</option>
          <option value="priceDesc">{dict.catalog.sortPriceDesc}</option>
          <option value="age">{dict.catalog.sortAge}</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-charcoal/50">{dict.catalog.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((horse) => (
            <HorseCard key={horse.id} horse={horse} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
