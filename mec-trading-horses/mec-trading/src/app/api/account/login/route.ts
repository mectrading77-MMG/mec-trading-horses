import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createCustomerSession } from "@/lib/customer-auth";

const Schema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) });

export async function POST(request: NextRequest) {
  const parsed = Schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  try {
    const customer = await db.customerUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!customer || !(await bcrypt.compare(parsed.data.password, customer.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    await createCustomerSession({ sub: customer.id, name: customer.name, email: customer.email, role: "CUSTOMER" });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Customer login failed:", error);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 500 });
  }
}
