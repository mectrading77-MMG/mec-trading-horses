import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json().catch(() => ({ email: "", password: "" }));

  const session = await verifyCredentials(email, password);
  if (!session) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await createSession(session);
  return NextResponse.json({ ok: true });
}
