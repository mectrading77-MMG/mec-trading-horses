"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { useRouter, useParams } from "next/navigation";
import { HEIGHT_BANDS } from "@/lib/levels";
import { HORSE_BREEDS, HORSE_COLOURS } from "@/lib/horse-options";

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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const photos = Array.from((formElement.elements.namedItem("photos") as HTMLInputElement | null)?.files ?? []);
    const videos = Array.from((formElement.elements.namedItem("videos") as HTMLInputElement | null)?.files ?? []);
    const xrays = Array.from((formElement.elements.namedItem("xrays") as HTMLInputElement | null)?.files ?? []);
    const files = [
      ...photos.map((file) => ({ file, type: "PHOTO" as const })),
      ...videos.map((file) => ({ file, type: "VIDEO_GENERAL" as const })),
      ...xrays.map((file) => ({ file, type: "XRAY" as const }))
    ];
    const maxBytes = 100 * 1024 * 1024;
    const oversized = files.find(({ file }) => file.size > maxBytes);
    if (oversized) {
      setSaving(false);
      setError(`${oversized.file.name} exceeds the 100 MB per-file limit.`);
      return;
    }
    const payload: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(
      Array.from(form.entries()).filter(([key, value]) =>
        !["photos", "videos", "xrays", "documents"].includes(key) && !(value instanceof File)
      )
    );
    const heightMeters = String(payload.heightCm ?? "").trim();
    payload.heightCm = heightMeters === "" ? "" : String(Math.round(Number(heightMeters.replace(",", ".")) * 100));
    const selectedJumpLevel = String(payload.jumpHeightCm ?? "130");
    payload.isYoungHorse = selectedJumpLevel === "YOUNG_HORSE";
    if (selectedJumpLevel === "YOUNG_HORSE") payload.jumpHeightCm = "80";

    const res = await fetch("/api/admin/horses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      setSaving(false);
      const data = await res.json().catch(() => null);
      setError(typeof data?.error === "string" ? data.error : "Could not save this horse — check the required fields and try again.");
      return;
    }

    const created = await res.json();
    const horseSlug = created?.horse?.slug;
    if (!horseSlug) {
      setSaving(false);
      setError("Horse was created, but its identifier was not returned. Open the horse list and edit it to add media.");
      return;
    }

    if (files.length > 0) {
      setUploading(true);
      setUploadProgress(0);
      try {
        for (let index = 0; index < files.length; index++) {
          const { file, type } = files[index];
          const blob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/admin/horses/upload",
            clientPayload: JSON.stringify({ horseSlug, type, alt: "" }),
            onUploadProgress: ({ percentage }) =>
              setUploadProgress(Math.round(((index + percentage / 100) / files.length) * 100))
          });
          const mediaResponse = await fetch("/api/admin/horses", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mediaAction: "add", horseSlug, type, url: blob.url })
          });
          const mediaData = await mediaResponse.json().catch(() => null);
          if (!mediaResponse.ok) {
            throw new Error(typeof mediaData?.error === "string" ? mediaData.error : `Could not attach ${file.name} to the horse.`);
          }
        }
      } catch (uploadError) {
        setSaving(false);
        setUploading(false);
        setError(`Horse created, but media upload did not finish: ${uploadError instanceof Error ? uploadError.message : "Upload failed"}. You can finish uploading from Edit Horse.`);
        return;
      }
    }

    setSaving(false);
    setUploading(false);
    router.push(`/${locale}/admin/horses`);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl italic text-charcoal">Add Horse</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-10">
        <section className="grid gap-5 sm:grid-cols-2">
          <Field label="Horse Name (English)"><input required name="nameEn" className={inputClass} /></Field>
          <Field label="Breed"><select required name="breed" className={inputClass} defaultValue=""><option value="" disabled>Select breed</option>{HORSE_BREEDS.map((breed) => <option key={breed} value={breed}>{breed}</option>)}</select></Field>

          <Field label="Sex">
            <select required name="sex" className={inputClass}>
              <option value="MARE">Mare</option>
              <option value="STALLION">Stallion</option>
              <option value="GELDING">Gelding</option>
            </select>
          </Field>
          <Field label="Date of Birth"><input required type="date" name="dateOfBirth" className={inputClass} /></Field>

          <Field label="Height at withers (m)"><input type="number" name="heightCm" inputMode="decimal" min="0.8" max="2.5" step="0.01" placeholder="1.66" className={inputClass} /><span className="text-xs text-charcoal/45">Enter metres, e.g. 1.66. Saved as 166 cm.</span></Field>
          <Field label="Color"><select required name="color" className={inputClass} defaultValue=""><option value="" disabled>Select coat colour</option>{HORSE_COLOURS.map((colour) => <option key={colour} value={colour}>{colour}</option>)}</select></Field>

          <Field label="Jumping height (level offered at)">
            <select required name="jumpHeightCm" className={inputClass} defaultValue="130">
              {HEIGHT_BANDS.map((b) => (
                <option key={b.id} value={Number(b.id)}>{b.label}</option>
              ))}
              <option value="YOUNG_HORSE">Young Horse / Jeunes chevaux</option>
            </select>
          </Field>
          <Field label="Highest height jumped (cm)"><input type="number" name="maxHeightJumpedCm" className={inputClass} /></Field>
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

        <section className="border border-charcoal-line bg-white p-5">
          <h2 className="font-display text-lg italic text-charcoal">Pedigree</h2>
          <p className="mt-1 text-xs text-charcoal/50">Add the horse's parents and the sire of each parent. All fields are optional.</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Sire (Father)"><input name="sireName" className={inputClass} placeholder="Father's name" /></Field>
            <Field label="Dam (Mother)"><input name="damName" className={inputClass} placeholder="Mother's name" /></Field>
            <Field label="Sire's sire (Paternal grandsire)"><input name="sireSireName" className={inputClass} placeholder="Father's father" /></Field>
            <Field label="Dam's sire (Maternal grandsire)"><input name="damSireName" className={inputClass} placeholder="Mother's father" /></Field>
          </div>
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

        <section className="border border-charcoal-line bg-white p-5">
          <h2 className="font-display text-lg italic text-charcoal">Horse Photos & Videos</h2>
          <p className="mt-1 text-xs text-charcoal/55">Select files directly from your device. They will upload to the media store and be attached to this horse after it is created.</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Photos (JPG, PNG, WebP, AVIF)">
              <input type="file" name="photos" multiple accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
            </Field>
            <Field label="Videos (MP4, WebM, MOV)">
              <input type="file" name="videos" multiple accept="video/mp4,video/webm,video/quicktime" className={inputClass} />
            </Field>
            <Field label="X-rays (JPG, PNG, WebP, AVIF)">
              <input type="file" name="xrays" multiple accept="image/jpeg,image/png,image/webp,image/avif" className={inputClass} />
            </Field>
          </div>
          <p className="mt-3 text-xs text-charcoal/45">Maximum 100 MB per file. Keep this page open until the upload finishes.</p>
          {(saving || uploading) && <div className="mt-4"><div className="h-1.5 overflow-hidden bg-charcoal/10"><div className="h-full bg-gold transition-all" style={{ width: `${uploadProgress}%` }} /></div><p className="mt-2 text-xs text-charcoal/55">{uploading ? `Uploading media… ${uploadProgress}%` : "Creating horse…"}</p></div>}
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
          disabled={saving || uploading}
          className="bg-charcoal px-8 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory hover:bg-hunter disabled:opacity-60"
        >
          {uploading ? `Uploading… ${uploadProgress}%` : saving ? "Saving…" : "Save Horse"}
        </button>
      </form>
    </div>
  );
}
