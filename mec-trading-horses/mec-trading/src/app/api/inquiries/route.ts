import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(1),
  lookingFor: z.string().optional(),
  hasTrainer: z.string().optional(),
  viewingDate: z.string().optional(),
  horseId: z.string().optional()
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = InquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  // TODO(production): persist with Prisma, e.g.
  //   await db.inquiry.create({ data: { ...parsed.data, status: "NEW" } });
  // and notify the admin (email / WhatsApp Business API webhook).
  console.log("New inquiry:", parsed.data);

  return NextResponse.json({ ok: true });
}
