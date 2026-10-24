import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const horses = await db.horse.findMany({
      include: { translations: true, media: { orderBy: { sortOrder: "asc" } }, pedigreeEntries: true, competitionResults: true },
      orderBy: [{ featuredOnHome: "desc" }, { updatedAt: "desc" }]
    });
    const safeHorses = horses.map((horse) => ({
      id: horse.id, slug: horse.slug, breed: horse.breed, sex: horse.sex,
      dateOfBirth: horse.dateOfBirth.toISOString(), heightCm: horse.heightCm, color: horse.color,
      jumpHeightCm: horse.jumpHeightCm, maxHeightJumpedCm: horse.maxHeightJumpedCm,
      competitionLevel: horse.competitionLevel, priceAmount: horse.priceAmount,
      priceCurrency: horse.priceCurrency, priceOnRequest: horse.priceOnRequest,
      status: horse.status, locationLabel: horse.locationLabel, featuredOnHome: horse.featuredOnHome,
      translations: horse.translations.map((item) => ({ locale: item.locale, name: item.name, positioning: item.positioning, personality: item.personality, training: item.training, strengths: item.strengths, experience: item.experience, suitability: item.suitability, potential: item.potential, idealRider: item.idealRider })),
      media: horse.media.map((item) => ({ type: item.type, url: item.url, alt: item.alt, isCover: item.isCover })),
      pedigree: horse.pedigreeEntries, competitionResults: horse.competitionResults
    }));
    return NextResponse.json({ horses: safeHorses, locales: ["en", "fr", "ar", "de", "nl"] }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("Public horse catalogue API failed:", error);
    return NextResponse.json({ error: "Catalogue temporarily unavailable" }, { status: 503 });
  }
}
