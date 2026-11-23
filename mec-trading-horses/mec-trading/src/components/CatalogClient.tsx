"use client";

import { useEffect, useMemo, useState } from "react";
import type { Horse, Locale } from "@/types/horse";
import HorseCard from "@/components/HorseCard";
import { ageFromDob } from "@/lib/horses";
import { HEIGHT_BANDS, bandFor } from "@/lib/levels";

export default function CatalogClient({
  horses,
  locale,
  dict,
  initialLevel,
  initialSearch
}: {
  horses: Horse[];
  locale: Locale;
  dict: any;
  initialLevel?: string;
  initialSearch?: string;
}) {
  const [level, setLevel] = useState(HEIGHT_BANDS.some((b) => b.id === initialLevel) ? (initialLevel as string) : "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const syncFavorites = () => {
      try {
        const stored = window.localStorage.getItem("mec-favorite-horses");
        const parsed: unknown = stored ? JSON.parse(stored) : [];
        setFavoriteIds(Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []);
      } catch {
        setFavoriteIds([]);
      }
    };
    syncFavorites();
    window.addEventListener("mec-favorites-changed", syncFavorites);
    window.addEventListener("storage", syncFavorites);
    return () => {
      window.removeEventListener("mec-favorites-changed", syncFavorites);
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

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
    const needle = search.trim().toLocaleLowerCase();
    if (needle) {
      list = list.filter((h) => {
        const age = String(ageFromDob(h.dateOfBirth));
        const height = String(h.jumpHeightCm);
        const price = h.priceAmount == null ? "" : String(h.priceAmount);
        const translatedNames = Object.values(h.translations).map((t) => t?.name ?? "").join(" ");
        const searchable = [
          h.breed, h.sex, h.color, h.competitionLevel ?? "", h.locationLabel,
          age, height, price, translatedNames, h.status
        ].join(" ").toLocaleLowerCase();
        return searchable.includes(needle);
      });
    }
    if (favoritesOnly) list = list.filter((h) => favoriteIds.includes(h.id));
    if (level) list = list.filter((h) => bandFor(h.jumpHeightCm).id === level);
    if (breed) list = list.filter((h) => h.breed === breed);
    if (sex) list = list.filter((h) => h.sex === sex);
    if (color) list = list.filter((h) => h.color === color);
    if (competitionLevel) list = list.filter((h) => h.competitionLevel === competitionLevel);
    if (location) list = list.filter((h) => h.locationLabel === location);
    if (priceRange) {
      const range = PRICE_RANGES.find((r) => r.id === priceRange);
      if (range) list = list.filter((h) => h.priceAmount != null && h.priceAmount >= range.min && (range.max === Infinity || h.priceAmount < range.max));
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
  }, [horses, search, level, breed, sex, color, competitionLevel, location, priceRange, sort, favoritesOnly, favoriteIds]);

  const chip = (active: boolean) =>
    `px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow border transition-colors duration-400 ${
      active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal-line text-charcoal/70 hover:border-gold hover:text-gold"
    }`;
  const selectClass =
    "border border-charcoal-line bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal";

  return (
    <div>
      {/* Collapsible filter panel, styled with the existing MEC HORSES palette */}
      <section className="border-y border-charcoal-line py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{locale === "fr" ? "Affiner la sélection" : locale === "ar" ? "تصفية النتائج" : "Refine your selection"}</p><p className="mt-1 text-sm text-charcoal/65">{locale === "fr" ? "Trouvez le cheval idéal" : locale === "ar" ? "اعثر على الحصان المناسب" : "Find your ideal horse"}</p></div>
          <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} aria-controls="horse-filter-panel" className="inline-flex min-h-11 items-center gap-3 border border-gold bg-charcoal px-5 py-3 font-mono text-[10px] uppercase tracking-eyebrow text-ivory transition-colors hover:bg-gold hover:text-charcoal">
            <span aria-hidden="true">☷</span>{filtersOpen ? (locale === "fr" ? "Masquer les filtres" : locale === "ar" ? "إخفاء الفلاتر" : "Hide Filters") : (locale === "fr" ? "Afficher les filtres" : locale === "ar" ? "إظهار الفلاتر" : "Show Filters")}<span aria-hidden="true">{filtersOpen ? "⌃" : "⌄"}</span>
          </button>
        </div>
        {filtersOpen && <div id="horse-filter-panel" className="mt-5 border border-charcoal-line bg-ivory/60 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-charcoal-line pb-3"><h2 className="font-serif text-xl text-charcoal">{locale === "fr" ? "Filtres des chevaux" : locale === "ar" ? "فلاتر الخيول" : "Horse Filters"}</h2><button type="button" onClick={() => { setLevel(""); setSearch(""); setBreed(""); setSex(""); setColor(""); setCompetitionLevel(""); setLocation(""); setPriceRange(""); }} className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/60 underline decoration-gold underline-offset-4">{locale === "fr" ? "Tout réinitialiser" : locale === "ar" ? "إعادة ضبط الكل" : "Reset All"}</button></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.catalog.filterLevel}</span><select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}><option value="">{dict.catalog.allLevels}</option>{HEIGHT_BANDS.map((b) => <option key={b.id} value={b.id}>{b.label} ({counts[b.id] ?? 0})</option>)}</select></label>
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.catalog.priceRange}</span><select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className={selectClass}><option value="">{dict.catalog.allPriceRanges}</option>{PRICE_RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.breed}</span><select value={breed} onChange={(e) => setBreed(e.target.value)} className={selectClass}><option value="">{dict.catalog.allBreeds}</option>{generalOptions.breeds.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.sex}</span><select value={sex} onChange={(e) => setSex(e.target.value)} className={selectClass}><option value="">{dict.catalog.allSexes}</option><option value="MARE">{dict.horse.sexLabel.MARE}</option><option value="STALLION">{dict.horse.sexLabel.STALLION}</option><option value="GELDING">{dict.horse.sexLabel.GELDING}</option></select></label>
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.detail.color}</span><select value={color} onChange={(e) => setColor(e.target.value)} className={selectClass}><option value="">{dict.catalog.allColors}</option>{generalOptions.colors.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
            <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.horse.location}</span><select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}><option value="">{dict.catalog.allLocations}</option>{generalOptions.locations.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
            {generalOptions.competitionLevels.length > 0 && <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">{dict.detail.competitionLevel}</span><select value={competitionLevel} onChange={(e) => setCompetitionLevel(e.target.value)} className={selectClass}><option value="">{dict.catalog.allCompetitionLevels}</option>{generalOptions.competitionLevels.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-charcoal-line pt-4"><p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/60">{filtered.length} {locale === "fr" ? "chevaux trouvés" : locale === "ar" ? "حصان" : "horses found"}</p><button type="button" onClick={() => setFiltersOpen(false)} className="border border-gold bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal hover:bg-charcoal hover:text-ivory">{locale === "fr" ? "Voir les résultats" : locale === "ar" ? "عرض النتائج" : "View Results"}</button></div>
        </div>}
      </section>
      {/* Sort + result count */}
      <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <button type="button" onClick={() => setFavoritesOnly((value) => !value)} aria-pressed={favoritesOnly} className={`flex items-center gap-2 border px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow transition-colors ${favoritesOnly ? "border-gold bg-gold/10 text-gold" : "border-charcoal-line text-charcoal/70 hover:border-gold hover:text-gold"}`}>
          <span aria-hidden="true" className="text-base leading-none">★</span>
          {locale === "fr" ? "Favoris" : locale === "ar" ? "المفضلة" : "Favorites"}
          <span className="ms-1 inline-flex min-w-5 items-center justify-center rounded-full bg-current/10 px-1.5 py-0.5 text-[9px] tabular-nums">{favoriteIds.length}</span>
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${selectClass} w-full sm:w-auto sm:min-w-[220px]`}>
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
        <div className="mt-4 grid gap-x-6 gap-y-8 sm:mt-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {filtered.map((horse) => (
            <HorseCard key={horse.id} horse={horse} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
