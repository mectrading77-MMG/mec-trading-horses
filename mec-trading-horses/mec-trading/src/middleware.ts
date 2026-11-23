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

  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const hasLocale = locales.includes(firstSegment as (typeof locales)[number]);

  // Never expose unsupported language prefixes as page roots.
  // Drop an unsupported two-letter language prefix and serve the English route.
  if (!hasLocale && /^[a-z]{2}$/i.test(firstSegment)) {
    const url = request.nextUrl.clone();
    const remainingPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, "");
    url.pathname = `/${defaultLocale}${remainingPath}`;
    return NextResponse.redirect(url, 308);
  }

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
