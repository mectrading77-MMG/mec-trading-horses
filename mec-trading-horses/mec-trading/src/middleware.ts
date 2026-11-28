import { NextRequest, NextResponse } from "next/server";

const locales = ["ar", "en", "fr"] as const;
const defaultLocale = "en";

function pickLocale(request: NextRequest) {
  const accepted = request.headers.get("accept-language")?.split(",") ?? [];
  for (const entry of accepted) {
    const language = entry.split(";")[0]?.trim().split("-")[0]?.toLowerCase();
    if (language && locales.includes(language as (typeof locales)[number])) return language;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Any unsupported two-letter locale prefix falls back to English.
  const localePrefix = pathname.match(/^\/([a-z]{2})(?=\/|$)/i)?.[1]?.toLowerCase();
  if (localePrefix && !locales.includes(localePrefix as (typeof locales)[number])) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, "/en");
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (locale) => pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = "/" + pickLocale(request) + pathname;
    return NextResponse.redirect(url);
  }

  if (isProtectedAdminPath(pathname)) {
    const hasSession = request.cookies.has("mec_admin_session");
    if (!hasSession) {
      const locale = pathname.split("/")[1];
      const url = request.nextUrl.clone();
      url.pathname = "/" + locale + "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

function isProtectedAdminPath(pathname: string) {
  return locales.some(
    (locale) => pathname.startsWith("/" + locale + "/admin") && !pathname.startsWith("/" + locale + "/admin/login")
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
