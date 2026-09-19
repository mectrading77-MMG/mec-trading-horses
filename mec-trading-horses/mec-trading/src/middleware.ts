import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr", "ar"];
const defaultLocale = "en";

function pickLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  const preferred = header.split(",")[0]?.split("-")[0];
  return locales.includes(preferred ?? "") ? preferred! : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch admin auth routes, API routes, or static assets.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const locale = pickLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Gate every /admin/* route except /admin/login behind the session cookie.
  // This is a cheap presence check for fast redirects; the actual JWT
  // signature is verified server-side via getSession() on each admin page,
  // so a forged/expired cookie still can't grant real access.
  if (isProtectedAdminPath(pathname)) {
    const hasSession = request.cookies.has("mec_admin_session");
    if (!hasSession) {
      const locale = pathname.split("/")[1];
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

function isProtectedAdminPath(pathname: string) {
  return locales.some(
    (l) => pathname.startsWith(`/${l}/admin`) && !pathname.startsWith(`/${l}/admin/login`)
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
