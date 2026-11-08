import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "mec_customer_session";
const secretValue = process.env.AUTH_SECRET;
const secret = secretValue ? new TextEncoder().encode(secretValue) : null;

export type CustomerSession = { sub: string; email: string; name: string; role: "CUSTOMER" };

export async function createCustomerSession(session: CustomerSession) {
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30
  });
}

export async function getCustomerSession(): Promise<CustomerSession | null> {
  if (!secret) return null;
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "CUSTOMER" || typeof payload.sub !== "string") return null;
    return payload as unknown as CustomerSession;
  } catch { return null; }
}

export function clearCustomerSession() {
  cookies().delete(COOKIE_NAME);
}
