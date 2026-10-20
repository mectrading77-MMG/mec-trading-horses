import { horses, getFeaturedHorses, getFeaturedStoryHorse } from "@/lib/sample-data";
import type { Locale } from "@/types/horse";
import { db } from "@/lib/db";

export async function listHorses() {
  try {
    const records = await db.horse.findMany({
      include: {
        translations: true,
        media: { orderBy: { sortOrder: "asc" } },
        documents: true,
        competitionResults: true,
        pedigreeEntries: true
      },
      orderBy: { updatedAt: "desc" }
    });

    // When the database is available, the public catalogue is the source of
    // truth. This keeps the rotating homepage preview in sync with admin CRUD.
    return records.map((record) => {
      const byLocale = new Map(record.translations.map((translation) => [translation.locale, translation]));
      const english = byLocale.get("en") ?? record.translations[0];
      const translationFor = (locale: Locale) => {
        const translation = byLocale.get(locale) ?? english;
        return {
          locale,
          name: translation?.name ?? "Unnamed horse",
          positioning: translation?.positioning ?? "",
          personality: translation?.personality ?? undefined,
          training: translation?.training ?? undefined,
          strengths: translation?.strengths ?? undefined,
          experience: translation?.experience ?? undefined,
          suitability: translation?.suitability ?? undefined,
          potential: translation?.potential ?? undefined,
          idealRider: translation?.idealRider ?? undefined
        };
      };

      return {
        id: record.id,
        slug: record.slug,
        breed: record.breed,
        sex: record.sex,
        dateOfBirth: record.dateOfBirth.toISOString(),
        heightCm: record.heightCm ?? undefined,
        color: record.color,
        jumpHeightCm: record.jumpHeightCm,
        maxHeightJumpedCm: record.maxHeightJumpedCm ?? undefined,
        competitionLevel: record.competitionLevel ?? undefined,
        registrationNo: record.registrationNo ?? undefined,
        passportNo: record.passportNo ?? undefined,
        priceAmount: record.priceAmount ?? undefined,
        priceCurrency: record.priceCurrency,
        priceOnRequest: record.priceOnRequest,
        status: record.status,
        locationLabel: record.locationLabel,
        featuredOnHome: record.featuredOnHome,
        featuredStory: record.featuredStory,
        highlights: [record.translations.find((translation) => translation.locale === "en")?.strengths ?? ""].filter(Boolean),
        photosAreRepresentative: false,
        trust: {
          vetDocs: record.trustVetDocs,
          xrays: record.trustXrays,
          pedigreeDocs: record.trustPedigreeDocs,
          transport: record.trustTransport
        },
        translations: {
          en: translationFor("en"),
          fr: translationFor("fr"),
          ar: translationFor("ar"),
          de: translationFor("de"),
          nl: translationFor("nl")
        },
        media: record.media.map((item) => ({
          type: item.type,
          url: item.url,
          alt: item.alt ?? undefined,
          isCover: item.isCover
        })),
        documents: record.documents.map((item) => ({
          type: item.type,
          label: item.label,
          url: item.url,
          downloadable: item.downloadable
        })),
        competitionResults: record.competitionResults.map((item) => ({
          competition: item.competition,
          year: item.year,
          level: item.level,
          result: item.result,
          rider: item.rider ?? undefined,
          location: item.location ?? undefined
        })),
        pedigree: record.pedigreeEntries.map((item) => ({
          position: item.position,
          name: item.name,
          breed: item.breed ?? undefined,
          photoUrl: item.photoUrl ?? undefined,
          competitionNote: item.competitionNote ?? undefined
        }))
      };
    });
  } catch {
    // Keep the demo catalogue usable when the database is not configured.
    return horses;
  }
}

export async function getHorse(slug: string) {
  const catalogue = await listHorses();
  return catalogue.find((horse) => horse.slug === slug);
}

export async function featuredHorses() {
  return getFeaturedHorses();
}

export async function featuredStory() {
  return getFeaturedStoryHorse();
}

export function ageFromDob(dob: string) {
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function formatPrice(amount: number | undefined, currency: string, onRequest: boolean, locale: Locale) {
  if (onRequest || amount === undefined) {
    return null;
  }
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPriceRange(amount: number | undefined, currency: string, onRequest: boolean, locale: Locale) {
  if (amount === undefined) return null;
  const ranges = [
    { min: 5000, max: 10000 },
    { min: 10000, max: 20000 },
    { min: 20000, max: 30000 },
    { min: 30000, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 150000 },
    { min: 150000, max: Infinity }
  ];
  const range = ranges.find((r) => amount >= r.min && (r.max === Infinity || amount < r.max));
  if (!range) return null;
  const format = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(value);
  return range.max === Infinity ? format(range.min) + "+" : format(range.min) + " – " + format(range.max);
}

export function heightHands(cm: number) {
  return `${cm} cm`;
}
