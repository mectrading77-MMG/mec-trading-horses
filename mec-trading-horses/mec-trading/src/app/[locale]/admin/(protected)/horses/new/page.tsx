"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const inputClass =
  "w-full border border-charcoal-line bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold";
const labelClass = "font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export default function NewHorsePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale ?? "en";
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/admin/horses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setSaving(false);
    if (res.ok) {
      router.push(`/${locale}/admin/horses`);
    } else {
      setError("Could not save this horse — check the required fields and try again.");
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl italic text-charcoal">Add Horse</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-10">
        <section className="grid gap-5 sm:grid-cols-2">
          <Field label="Horse Name (English)"><input required name="nameEn" className={inputClass} /></Field>
          <Field label="Breed"><input required name="breed" className={inputClass} /></Field>

          <Field label="Sex">
            <select required name="sex" className={inputClass}>
              <option value="MARE">Mare</option>
              <option value="STALLION">Stallion</option>
              <option value="GELDING">Gelding</option>
            </select>
          </Field>
          <Field label="Date of Birth"><input required type="date" name="dateOfBirth" className={inputClass} /></Field>

          <Field label="Height (cm)"><input required type="number" name="heightCm" className={inputClass} /></Field>
          <Field label="Color"><input required name="color" className={inputClass} /></Field>

          <Field label="Discipline">
            <select required name="discipline" className={inputClass}>
              {["SHOW_JUMPING", "DRESSAGE", "EVENTING", "BREEDING", "ARABIAN", "YOUNG_HORSE", "COMPETITION", "PROSPECT"].map(
                (d) => (
                  <option key={d} value={d}>
                    {d.replace("_", " ")}
                  </option>
                )
              )}
            </select>
          </Field>
          <Field label="Competition Level"><input name="competitionLevel" className={inputClass} /></Field>

          <Field label="Price"><input type="number" name="priceAmount" className={inputClass} /></Field>
          <Field label="Currency">
            <select name="priceCurrency" className={inputClass} defaultValue="EUR">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </Field>

          <Field label="Location"><input required name="locationLabel" className={inputClass} defaultValue="Brittany, France" /></Field>
          <Field label="Status">
            <select name="status" className={inputClass} defaultValue="AVAILABLE">
              <option value="AVAILABLE">Available</option>
              <option value="RESERVED">Reserved</option>
              <option value="SOLD">Sold</option>
            </select>
          </Field>

          <Field label="Registration Number"><input name="registrationNo" className={inputClass} /></Field>
          <Field label="Passport Number"><input name="passportNo" className={inputClass} /></Field>
        </section>

        <section>
          <h2 className="font-display text-lg italic text-charcoal">Description (English)</h2>
          <div className="mt-4 grid gap-5">
            <Field label="Positioning statement"><textarea name="positioning" rows={2} className={inputClass} /></Field>
            <Field label="Personality"><textarea name="personality" rows={2} className={inputClass} /></Field>
            <Field label="Training"><textarea name="training" rows={2} className={inputClass} /></Field>
            <Field label="Strengths"><textarea name="strengths" rows={2} className={inputClass} /></Field>
            <Field label="Experience"><textarea name="experience" rows={2} className={inputClass} /></Field>
            <Field label="Suitability"><textarea name="suitability" rows={2} className={inputClass} /></Field>
            <Field label="Potential"><textarea name="potential" rows={2} className={inputClass} /></Field>
            <Field label="Ideal Rider"><textarea name="idealRider" rows={2} className={inputClass} /></Field>
          </div>
          <p className="mt-3 text-xs text-charcoal/40">
            French and Arabic versions of this description are added in a second step once the horse
            is created, so you can dictate or paste each language separately.
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          <Field label="Photos"><input type="file" name="photos" multiple accept="image/*" className={inputClass} /></Field>
          <Field label="Videos"><input type="file" name="videos" multiple accept="video/*" className={inputClass} /></Field>
          <Field label="Documents"><input type="file" name="documents" multiple className={inputClass} /></Field>
        </section>

        <section>
          <h2 className="font-display text-lg italic text-charcoal">Trust Indicators</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["trustVetDocs", "Veterinary docs"],
              ["trustXrays", "X-rays"],
              ["trustPedigreeDocs", "Pedigree docs"],
              ["trustTransport", "Transport"]
            ].map(([name, label]) => (
              <label key={name} className="flex items-center gap-2 text-sm text-charcoal">
                <input type="checkbox" name={name} className="accent-gold" />
                {label}
              </label>
            ))}
          </div>
        </section>

        <section className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" name="featuredOnHome" className="accent-gold" />
            Feature on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" name="documentsPublic" className="accent-gold" />
            Documents downloadable
          </label>
        </section>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-charcoal px-8 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory hover:bg-hunter disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Horse"}
        </button>
      </form>
    </div>
  );
}
