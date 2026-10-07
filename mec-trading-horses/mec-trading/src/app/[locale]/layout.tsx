import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { locales, dirFor, getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/horse";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: {
      default: `${dict.brand.name} — ${dict.brand.tagline}`,
      template: `%s — ${dict.brand.name}`
    },
    description: dict.brand.tagline,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mectrading.com"),
    alternates: {
      languages: { en: "/en", fr: "/fr", ar: "/ar", de: "/de", nl: "/nl" }
    },
    openGraph: {
      siteName: dict.brand.name,
      locale: params.locale,
      type: "website",
      images: [
        {
          url: "https://mec-trading-horses-jiu4nuax0-mec-f416.vercel.app/brand/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "MEC Trading — Sport Horses"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://mec-trading-horses-jiu4nuax0-mec-f416.vercel.app/brand/og-default.jpg"]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={params.locale} dir={dirFor(params.locale)}>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
