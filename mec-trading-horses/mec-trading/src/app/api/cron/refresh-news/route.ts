import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("equestrian-news");
  return NextResponse.json({
    ok: true,
    refreshed: true,
    schedule: "daily cache invalidation; feed cache revalidates hourly on demand",
    scheduledUtc: "07:00",
    timezone: "UTC"
  });
}
