import { NextResponse } from "next/server";
import { clearCustomerSession } from "@/lib/customer-auth";

export async function POST(request: Request) {
  clearCustomerSession();
  const url = new URL(request.url);
  const locale = ["ar", "en", "fr"].includes(url.searchParams.get("locale") ?? "")
    ? url.searchParams.get("locale")
    : "en";
  return NextResponse.redirect(new URL(`/${locale}`, url.origin), 303);
}
