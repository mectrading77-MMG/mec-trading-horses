import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email.trim() || !password) {
    return NextResponse.json({ error: "Enter your admin email and password." }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
    console.error("Admin login is disabled because AUTH_SECRET is missing.");
    return NextResponse.json({ error: "Admin security is not configured. Set AUTH_SECRET in the hosting environment." }, { status: 503 });
  }

  try {
    const session = await verifyCredentials(email, password);
    if (!session) {
      return NextResponse.json({ error: "Invalid email or password, or admin account not found." }, { status: 401 });
    }
    await createSession(session);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Could not sign in. Check the admin database and server configuration." }, { status: 500 });
  }
}
