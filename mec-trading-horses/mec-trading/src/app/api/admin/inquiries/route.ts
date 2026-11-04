import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

const LeadStatus = z.enum(["NEW", "CONTACTED", "QUALIFIED", "HORSES_SENT", "NEGOTIATION", "VIEWING_SCHEDULED", "WON", "LOST"]);

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const inquiries = await db.inquiry.findMany({
    include: { horse: { include: { translations: true } } },
    orderBy: { createdAt: "desc" },
    take: 200
  });
  return NextResponse.json({ inquiries });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = z.object({
    id: z.string().min(1),
    status: LeadStatus.optional(),
    notes: z.string().max(10000).nullable().optional(),
    nextAction: z.string().datetime().nullable().optional()
  }).refine((data) => data.status !== undefined || data.notes !== undefined || data.nextAction !== undefined).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid lead update" }, { status: 400 });

  const { id, ...changes } = parsed.data;
  try {
    const inquiry = await db.inquiry.update({
      where: { id },
      data: {
        status: changes.status,
        notes: changes.notes,
        nextAction: changes.nextAction === undefined ? undefined : changes.nextAction ? new Date(changes.nextAction) : null
      }
    });
    return NextResponse.json({ ok: true, inquiry });
  } catch (error) {
    console.error("CRM lead update failed:", error);
    return NextResponse.json({ error: "Could not update lead" }, { status: 500 });
  }
}
