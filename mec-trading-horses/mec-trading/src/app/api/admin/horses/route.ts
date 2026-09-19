import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";

const HorseInputSchema = z.object({
  nameEn: z.string().min(1),
  breed: z.string().min(1),
  sex: z.enum(["MARE", "STALLION", "GELDING"]),
  dateOfBirth: z.string().min(1),
  heightCm: z.coerce.number().int().positive().optional(),
  color: z.string().min(1),
  jumpHeightCm: z.coerce.number().int().min(80).max(170),
  maxHeightJumpedCm: z.coerce.number().int().optional(),
  competitionLevel: z.string().optional(),
  priceAmount: z.coerce.number().optional(),
  priceCurrency: z.string().default("EUR"),
  locationLabel: z.string().min(1),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]).default("AVAILABLE"),
  registrationNo: z.string().optional(),
  passportNo: z.string().optional(),
  positioning: z.string().optional(),
  personality: z.string().optional(),
  training: z.string().optional(),
  strengths: z.string().optional(),
  experience: z.string().optional(),
  suitability: z.string().optional(),
  potential: z.string().optional(),
  idealRider: z.string().optional()
});

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = HorseInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = slugify(parsed.data.nameEn);

  // TODO(production): persist with Prisma, e.g.
  //   await db.horse.create({
  //     data: {
  //       slug, breed: parsed.data.breed, sex: parsed.data.sex, ...
  //       translations: { create: [{ locale: "en", name: parsed.data.nameEn, ... }] }
  //     }
  //   });
  // File uploads (photos/videos/documents) should go to S3/R2 first and the
  // resulting URLs passed here — see STORAGE_* variables in .env.example.
  console.log("New horse:", { slug, ...parsed.data });

  return NextResponse.json({ ok: true, slug });
}
