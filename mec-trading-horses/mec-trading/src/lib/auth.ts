import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const COOKIE_NAME = "mec_admin_session";
const isProd = process.env.NODE_ENV === "production";
const rawSecret = process.env.AUTH_SECRET;
const secret = rawSecret
  ? new TextEncoder().encode(rawSecret)
  : isProd
  ? null
  : new TextEncoder().encode("dev-only-secret-change-me");

export interface AdminSession {
  sub: string;
  email: string;
  name: string;
  role: "OWNER" | "EDITOR";
}

export async function createSession(session: AdminSession) {
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession(): Promise<AdminSession | null> {
  if (!secret) return null;
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    if (payload.role !== "OWNER" && payload.role !== "EDITOR") return null;
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}

/**
 * Authenticate against the AdminUser table first. Environment credentials are
 * retained as an explicit emergency owner fallback for existing deployments.
 */
export async function verifyCredentials(email: string, password: string): Promise<AdminSession | null> {
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) return null;

  try {
    const user = await db.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() }
    });
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      return {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role === "OWNER" ? "OWNER" : "EDITOR"
      };
    }
  } catch (error) {
    // If the database is temporarily unavailable, allow only explicitly
    // configured environment credentials below; never invent a default password.
    console.error("Admin database authentication failed:", error);
  }

  const ownerEmail = process.env.ADMIN_EMAIL ?? "admin@mechorses.com";
  const ownerUsername = (process.env.ADMIN_USERNAME ?? "admin").toLowerCase();
  const ownerPassword = process.env.ADMIN_PASSWORD;
  if (!ownerPassword) return null;

  if (
    (email.trim().toLowerCase() === ownerEmail.toLowerCase() ||
      email.trim().toLowerCase() === ownerUsername) &&
    password === ownerPassword
  ) {
    return { sub: "owner", email: ownerEmail, name: "MEC HORSES", role: "OWNER" };
  }
  return null;
}
