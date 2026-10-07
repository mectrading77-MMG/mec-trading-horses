import { horses, getHorseBySlug, getFeaturedHorses, getFeaturedStoryHorse } from "@/lib/sample-data";
import type { Locale } from "@/types/horse";
import { db } from "@/lib/db";
import type { Horse } from "@/types/horse";

function withTranslationFallback(horse: Horse): Horse {
  return {
    ...horse,
    translations: {
      ...horse.translations,
      de: horse.translations.de ?? horse.translations.en,
      nl: horse.translations.nl ?? horse.translations.en
    }
  };
}

/**
 * This module is the single seam between UI and data source. Every function
 * here currently reads from `sample-data.ts`. To go live:
 *
 *   1. `npm run db:push` to create the tables from prisma/schema.prisma
 *   2. Seed real horses (see prisma/seed.ts for the shape expected)
 *   3. Replace each function body with the equivalent `db.horse.findMany(...)`
 *
 * No page or component needs to change — they only import from here.
 */

export async function listHorses() {
  try {
    const statuses = await db.horse.findMany({
      select: { slug: true, status: true }
    });
    const statusBySlug = new Map(statuses.map((h) => [h.slug, h.status]));
    return horses.map((horse) => withTranslationFallback({
      ...horse,
      status: statusBySlug.get(horse.slug) ?? horse.status
    })));
  } catch {
    return horses.map(withTranslationFallback);
  }
}

export async function getHorse(slug: string) {
  const horse = getHorseBySlug(slug);
  if (!horse) return horse;
  const normalizedHorse = withTranslationFallback(horse);
  try {
    const record = await db.horse.findUnique({
      where: { slug },
      select: { status: true }
    });
    return record ? { ...normalizedHorse, status: record.status } : normalizedHorse;
  } catch {
    return normalizedHorse;
  }
}

export async function featuredHorses() {
  return getFeaturedHorses().map(withTranslationFallback);
}

export async function featuredStory() {
  const horse = getFeaturedStoryHorse();
  return horse ? withTranslationFallback(horse) : horse;
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
