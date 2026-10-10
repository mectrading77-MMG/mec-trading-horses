import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

const optionalNumber = z.preprocess((value) => value === "" || value === null ? undefined : value, z.coerce.number().int().optional());
const optionalText = z.preprocess((value) => value === "" || value == null ? undefined : value, z.string().optional());

const HorseInputSchema = z.object({
  nameEn: z.string().trim().min(1),
  breed: z.string().trim().min(1),
  sex: z.enum(["MARE", "STALLION", "GELDING"]),
  dateOfBirth: z.string().min(1),
  heightCm: optionalNumber,
  color: z.string().trim().min(1),
  jumpHeightCm: z.coerce.number().int().min(80).max(170),
  maxHeightJumpedCm: optionalNumber,
  competitionLevel: optionalText,
  priceAmount: optionalNumber,
  priceCurrency: z.string().default("EUR"),
  locationLabel: z.string().trim().min(1),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]).default("AVAILABLE"),
  registrationNo: optionalText,
  passportNo: optionalText,
  positioning: optionalText,
  personality: optionalText,
  training: optionalText,
  strengths: optionalText,
  experience: optionalText,
  suitability: optionalText,
  potential: optionalText,
  idealRider: optionalText,
  featuredOnHome: z.coerce.boolean().optional(),
  documentsPublic: z.coerce.boolean().optional(),
  trustVetDocs: z.coerce.boolean().optional(),
  trustXrays: z.coerce.boolean().optional(),
  trustPedigreeDocs: z.coerce.boolean().optional(),
  trustTransport: z.coerce.boolean().optional()
});

function slugify(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const statusUpdate = z.object({
    horseSlug: z.string().min(1),
    status: z.enum(["AVAILABLE", "RESERVED", "SOLD"])
  }).safeParse(body);
  if (!statusUpdate.success) {
    const fullUpdate = z.object({
      horseSlug: z.string().min(1),
      ...HorseInputSchema.partial().shape
    }).safeParse(body);
    if (!fullUpdate.success) return NextResponse.json({ error: fullUpdate.error.flatten() }, { status: 400 });
    const { horseSlug, ...input } = fullUpdate.data;
    try {
      const horse = await db.horse.update({
        where: { slug: horseSlug },
        data: {
          ...input,
          dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
          translations: input.nameEn || input.positioning || input.personality || input.training || input.strengths || input.experience || input.suitability || input.potential || input.idealRider
            ? { upsert: { where: { horseId_locale: { horseId: (await db.horse.findUniqueOrThrow({ where: { slug: horseSlug }, select: { id: true } })).id, locale: "en" } }, create: { locale: "en", name: input.nameEn ?? "Unnamed horse", positioning: input.positioning ?? "", personality: input.personality, training: input.training, strengths: input.strengths, experience: input.experience, suitability: input.suitability, potential: input.potential, idealRider: input.idealRider }, update: { name: input.nameEn, positioning: input.positioning, personality: input.personality, training: input.training, strengths: input.strengths, experience: input.experience, suitability: input.suitability, potential: input.potential, idealRider: input.idealRider } } }
            : undefined
        }
      });
      return NextResponse.json({ ok: true, horse: { slug: horse.slug, status: horse.status } });
    } catch (error) {
      console.error("Horse update failed:", error);
      return NextResponse.json({ error: "Horse not found or database unavailable" }, { status: 500 });
    }
  }

  try {
    const horse = await db.horse.update({
      where: { slug: statusUpdate.data.horseSlug },
      data: { status: statusUpdate.data.status },
      select: { slug: true, status: true }
    });
    return NextResponse.json({ ok: true, horse });
  } catch (error) {
    console.error("Horse status update failed:", error);
    return NextResponse.json({ error: "Horse not found or database unavailable" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = HorseInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;
  const baseSlug = slugify(data.nameEn);
  const slug = baseSlug || `horse-${Date.now()}`;

  try {
    const horse = await db.horse.create({
      data: {
        slug,
        breed: data.breed,
        sex: data.sex,
        dateOfBirth: new Date(data.dateOfBirth),
        heightCm: data.heightCm,
        color: data.color,
        jumpHeightCm: data.jumpHeightCm,
        maxHeightJumpedCm: data.maxHeightJumpedCm,
        competitionLevel: data.competitionLevel,
        priceAmount: data.priceAmount,
        priceCurrency: data.priceCurrency,
        priceOnRequest: data.priceAmount === undefined,
        status: data.status,
        locationLabel: data.locationLabel,
        registrationNo: data.registrationNo,
        passportNo: data.passportNo,
        featuredOnHome: data.featuredOnHome ?? false,
        documentsPublic: data.documentsPublic ?? false,
        trustVetDocs: data.trustVetDocs ?? false,
        trustXrays: data.trustXrays ?? false,
        trustPedigreeDocs: data.trustPedigreeDocs ?? false,
        trustTransport: data.trustTransport ?? false,
        translations: { create: [{ locale: "en", name: data.nameEn, positioning: data.positioning ?? "", personality: data.personality, training: data.training, strengths: data.strengths, experience: data.experience, suitability: data.suitability, potential: data.potential, idealRider: data.idealRider }] }
      },
      select: { id: true, slug: true, status: true }
    });
    return NextResponse.json({ ok: true, horse }, { status: 201 });
  } catch (error) {
    console.error("Horse creation failed:", error);
    return NextResponse.json({ error: "Could not create horse. Check whether this name already exists and the database is available." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = z.object({ horseSlug: z.string().min(1) }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "A valid horse slug is required" }, { status: 400 });
  try {
    await db.horse.delete({ where: { slug: parsed.data.horseSlug } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Horse deletion failed:", error);
    return NextResponse.json({ error: "Horse not found or database unavailable" }, { status: 500 });
  }
}
