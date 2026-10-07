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
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("featured");

  const generalOptions = useMemo(() => {
    const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
    return {
      breeds: unique(horses.map((h) => h.breed)),
      colors: unique(horses.map((h) => h.color)),
      competitionLevels: unique(horses.map((h) => h.competitionLevel ?? "")),
      locations: unique(horses.map((h) => h.locationLabel))
    };
  }, [horses]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const h of horses) {
      const id = bandFor(h.jumpHeightCm).id;
      c[id] = (c[id] ?? 0) + 1;
    }
    return c;
  }, [horses]);

  const PRICE_RANGES = [
    { id: "5000-10000", min: 5000, max: 10000, label: "€5,000 – €10,000" },
    { id: "10000-20000", min: 10000, max: 20000, label: "€10,000 – €20,000" },
    { id: "20000-30000", min: 20000, max: 30000, label: "€20,000 – €30,000" },
    { id: "30000-50000", min: 30000, max: 50000, label: "€30,000 – €50,000" },
    { id: "50000-100000", min: 50000, max: 100000, label: "€50,000 – €100,000" },
    { id: "100000-150000", min: 100000, max: 150000, label: "€100,000 – €150,000" },
    { id: "150000-plus", min: 150000, max: Infinity, label: "€150,000+" }
  ];

  const filtered = useMemo(() => {
    let list = horses; // sold horses stay visible with their badge
    if (level) list = list.filter((h) => bandFor(h.jumpHeightCm).id === level);
    if (breed) list = list.filter((h) => h.breed === breed);
    if (sex) list = list.filter((h) => h.sex === sex);
    if (color) list = list.filter((h) => h.color === color);
    if (competitionLevel) list = list.filter((h) => h.competitionLevel === competitionLevel);
    if (location) list = list.filter((h) => h.locationLabel === location);
    if (priceRange) {
      const range = PRICE_RANGES.find((r) => r.id === priceRange);
      if (range) list = list.filter((h) => h.priceAmount != null && h.priceAmount >= range.min && h.priceAmount <= range.max);
    }

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
  }, [horses, level, breed, sex, color, competitionLevel, location, priceRange, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow border transition-colors duration-400 ${
      active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal-line text-charcoal/70 hover:border-gold hover:text-gold"
    }`;
  const selectClass =
    "border border-charcoal-line bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal";

  return (
    <div>
      {/* Filters driven by the horse's General Information */}
      <div className="border-y border-charcoal-line py-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.catalog.filterLevel}</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allLevels}</option>
              {HEIGHT_BANDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label} — {counts[b.id] ?? 0}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.breed}</span>
            <select value={breed} onChange={(e) => setBreed(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allBreeds}</option>
              {generalOptions.breeds.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.sex}</span>
            <select value={sex} onChange={(e) => setSex(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allSexes}</option>
              <option value="MARE">{dict.horse.sexLabel.MARE}</option>
              <option value="STALLION">{dict.horse.sexLabel.STALLION}</option>
              <option value="GELDING">{dict.horse.sexLabel.GELDING}</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.detail.color}</span>
            <select value={color} onChange={(e) => setColor(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allColors}</option>
              {generalOptions.colors.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>

          {generalOptions.competitionLevels.length > 0 && (
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.detail.competitionLevel}</span>
              <select value={competitionLevel} onChange={(e) => setCompetitionLevel(e.target.value)} className={selectClass}>
                <option value="">{dict.catalog.allCompetitionLevels}</option>
                {generalOptions.competitionLevels.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          )}

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.catalog.priceRange}</span>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allPriceRanges}</option>
              {PRICE_RANGES.map((range) => <option key={range.id} value={range.id}>{range.label}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.location}</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
              <option value="">{dict.catalog.allLocations}</option>
              {generalOptions.locations.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Sort + result count */}
      <div className="flex flex-wrap items-center gap-3 py-4">
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
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((horse) => (
            <HorseCard key={horse.id} horse={horse} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
