import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const parisTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(new Date());

  if (parisTime !== "08:00") {
    return NextResponse.json({ ok: true, skipped: true, parisTime });
  }

  revalidateTag("equestrian-news");
  return NextResponse.json({ ok: true, refreshed: true, timezone: "Europe/Paris", time: parisTime });
}
