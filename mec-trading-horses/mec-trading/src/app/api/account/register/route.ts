import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createCustomerSession } from "@/lib/customer-auth";

const Schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
  phone: z.string().trim().max(40).optional()
});

export async function POST(request: NextRequest) {
  const parsed = Schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check your details. Password must be at least 8 characters." }, { status: 400 });
  const { name, email, password, phone } = parsed.data;
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const customer = await db.customerUser.create({
      data: { name, email: email.toLowerCase(), passwordHash, phone: phone || null },
      select: { id: true, name: true, email: true }
    });
    await createCustomerSession({ sub: customer.id, name: customer.name, email: customer.email, role: "CUSTOMER" });
    return NextResponse.json({ ok: true, customer }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    console.error("Customer registration failed:", error);
    return NextResponse.json({ error: "Registration is temporarily unavailable." }, { status: 500 });
  }
}
