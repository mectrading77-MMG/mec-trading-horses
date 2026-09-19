import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "mec_admin_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-only-secret-change-me");

export interface AdminSession {
  sub: string;
  email: string;
  name: string;
  role: "OWNER" | "EDITOR";
}

export async function createSession(session: AdminSession) {
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession(): Promise<AdminSession | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}

/**
 * Verifies credentials against AdminUser in the database (bcrypt compare).
 * Wire this up once Prisma is connected — see the TODO inline. Until then it
 * checks against a single owner account read from environment variables so
 * the admin area is demonstrable without a database.
 */
export async function verifyCredentials(email: string, password: string): Promise<AdminSession | null> {
  // TODO(production): replace with
  //   const user = await db.adminUser.findUnique({ where: { email } });
  //   if (!user || !(await bcrypt.compare(password, user.passwordHash))) return null;
  //   return { sub: user.id, email: user.email, name: user.name, role: user.role };
  const ownerEmail = process.env.ADMIN_EMAIL ?? "admin@mectrading.com";
  const ownerPassword = process.env.ADMIN_PASSWORD ?? "changeme";
  if (email.toLowerCase() === ownerEmail.toLowerCase() && password === ownerPassword) {
    return { sub: "owner", email: ownerEmail, name: "MEC Trading", role: "OWNER" };
  }
  return null;
}
