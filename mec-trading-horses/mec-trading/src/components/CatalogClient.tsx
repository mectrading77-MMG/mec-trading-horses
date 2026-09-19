"use client";

import { useMemo, useState } from "react";
import type { Horse, Locale, Discipline } from "@/types/horse";
import HorseCard from "@/components/HorseCard";
import { ageFromDob } from "@/lib/horses";

const DISCIPLINES: Discipline[] = [
  "SHOW_JUMPING",
  "DRESSAGE",
  "EVENTING",
  "BREEDING",
  "ARABIAN",
  "YOUNG_HORSE",
  "COMPETITION",
  "PROSPECT"
];

export default function CatalogClient({
  horses,
  locale,
  dict,
  initialDiscipline
}: {
  horses: Horse[];
  locale: Locale;
  dict: any;
  initialDiscipline?: string;
}) {
  const [discipline, setDiscipline] = useState(initialDiscipline ?? "");
  const [sex, setSex] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = horses.filter((h) => h.status !== "SOLD" || true); // keep sold visible with badge
    if (discipline) list = list.filter((h) => h.discipline === discipline);
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
      case "newest":
        list = [...list].sort((a, b) => new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime());
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featuredOnHome) - Number(a.featuredOnHome));
    }
    return list;
  }, [horses, discipline, sex, sort]);

  const selectClass = "border border-charcoal-line bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-y border-charcoal-line py-4">
        <select value={discipline} onChange={(e) => setDiscipline(e.target.value)} className={selectClass}>
          <option value="">{dict.horse.discipline}</option>
          {DISCIPLINES.map((d) => (
            <option key={d} value={d}>
              {dict.disciplines[d]}
            </option>
          ))}
        </select>
        <select value={sex} onChange={(e) => setSex(e.target.value)} className={selectClass}>
          <option value="">{dict.horse.sex}</option>
          <option value="MARE">{dict.horse.sexLabel.MARE}</option>
          <option value="STALLION">{dict.horse.sexLabel.STALLION}</option>
          <option value="GELDING">{dict.horse.sexLabel.GELDING}</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${selectClass} ml-auto`}>
          <option value="featured">{dict.catalog.sortFeatured}</option>
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
