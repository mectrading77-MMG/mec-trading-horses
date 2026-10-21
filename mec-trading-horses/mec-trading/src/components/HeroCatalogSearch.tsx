"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/types/horse";

const copy: Record<Locale, { placeholders: string[]; label: string; button: string }> = {
  en: { placeholders: ["Find your next champion", "Explore by age or height", "Search horses by breed", "Find horses by budget", "Discover by discipline", "Browse horses by country", "Search by competition level"], label: "Search the horse catalogue", button: "Search horses" },
  fr: { placeholders: ["Trouvez votre prochain champion", "Rechercher par âge ou taille", "Rechercher par race", "Rechercher selon votre budget", "Découvrir par discipline", "Rechercher par pays", "Rechercher par niveau de compétition"], label: "Rechercher dans le catalogue de chevaux", button: "Rechercher des chevaux" },
  ar: { placeholders: ["اعثر على بطلك القادم", "ابحث حسب العمر أو الارتفاع", "ابحث حسب السلالة", "ابحث حسب الميزانية", "اكتشف الخيول حسب التخصص", "ابحث حسب البلد", "ابحث حسب مستوى المنافسة"], label: "ابحث في كتالوج الخيول", button: "بحث عن الخيول" },
  de: { placeholders: ["Finden Sie Ihren nächsten Champion", "Nach Alter oder Stockmaß suchen", "Nach Rasse suchen", "Nach Budget suchen", "Nach Disziplin entdecken", "Nach Land suchen", "Nach Leistungsniveau suchen"], label: "Pferdekatalog durchsuchen", button: "Pferde suchen" },
  nl: { placeholders: ["Vind uw volgende kampioen", "Zoek op leeftijd of stokmaat", "Zoek op ras", "Zoek op budget", "Ontdek paarden per discipline", "Zoek op land", "Zoek op wedstrijdniveau"], label: "Doorzoek de paardencatalogus", button: "Paarden zoeken" }
};

export default function HeroCatalogSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const text = copy[locale] ?? copy.en;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % text.placeholders.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [text.placeholders.length]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(`/${locale}/horses-for-sale${value ? `?search=${encodeURIComponent(value)}` : ""}`);
  }

  return (
    <form onSubmit={submit} role="search" className="mx-auto mt-3 flex w-full max-w-4xl items-center gap-2 rounded-full border border-[#e4c36d] bg-gradient-to-r from-[#b9872e] via-[#f0d27d] to-[#b9872e] p-1.5 text-left shadow-[0_18px_50px_-22px_rgba(0,0,0,0.65)] sm:mt-4 sm:p-2">
      <label htmlFor="hero-horse-search" className="sr-only">{text.label}</label>
      <span aria-hidden="true" className="flex items-center ps-4 text-[#17130b]/70 sm:ps-5">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" strokeLinecap="round" /></svg>
      </span>
      <input
        id="hero-horse-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={text.placeholders[placeholderIndex]}
        className="min-w-0 flex-1 rounded-full bg-transparent px-2 py-3 text-sm font-medium text-[#17130b] outline-none placeholder:text-[#3d321b]/75 sm:px-3 sm:py-3.5 sm:text-base"
      />
      <button type="submit" aria-label={text.button} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#17130b]/80 bg-[#17130b] p-0 text-lg font-semibold text-[#f0d27d] transition-colors hover:bg-[#292317] sm:h-12 sm:w-12">
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
