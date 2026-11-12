import type { Metadata } from "next";
import "../globals.css";
import { locales, dirFor, getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/horse";
import { siteDescriptions } from "@/lib/seo";

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
    description: siteDescriptions[params.locale],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mechorses.com"),
    openGraph: {
      siteName: dict.brand.name,
      locale: params.locale,
      type: "website",
      images: [
        {
          url: "https://www.mechorses.com/brand/og-default.png",
          width: 1200,
          height: 630,
          alt: "MEC Horses — Sport Horses"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.mechorses.com/brand/og-default.png"]
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
      <body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.mechorses.com/#organization",
            name: "MEC Horses",
            legalName: "MEC Trading SAS",
            url: "https://www.mechorses.com",
            email: "sales@mechorses.com",
            telephone: "+33618313530",
            address: {
              "@type": "PostalAddress",
              streetAddress: "La Chapelle-des-Fougeretz",
              postalCode: "35520",
              addressLocality: "La Chapelle-des-Fougeretz",
              addressRegion: "Brittany",
              addressCountry: "FR"
            },
            sameAs: [
              "https://instagram.com/m.e.c_horses",
              "https://facebook.com/MecHorses"
            ],
            areaServed: ["Europe", "Middle East"]
          }).replace(/</g, "\\u003c")
        }}
      />
      {children}
    </body>
    </html>
  );
}
