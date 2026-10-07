import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { getHorse, listHorses, ageFromDob, formatPriceRange, heightHands } from "@/lib/horses";
import HorseGallery from "@/components/HorseGallery";
import MediaTabs from "@/components/MediaTabs";
import PedigreeTree from "@/components/PedigreeTree";
import CompetitionTable from "@/components/CompetitionTable";
import TrustBadges from "@/components/TrustBadges";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import XrayViewer from "@/components/XrayViewer";
import { formatJumpHeight } from "@/lib/levels";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const horses = await listHorses();
  return horses.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const horse = await getHorse(params.slug);
  if (!horse) return {};
  const t = horse.translations[params.locale] ?? horse.translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mectrading.com";

  return {
    title: `${t.name} — ${horse.breed}`,
    description: t.positioning,
    alternates: { canonical: `${siteUrl}/${params.locale}/horses-for-sale/${horse.slug}` },
    openGraph: {
      title: t.name,
      description: t.positioning,
      images: horse.media[0] ? [{ url: horse.media[0].url }] : undefined
    }
  };
}

export default async function HorseDetailPage({
  params
}: {
  params: { locale: Locale; slug: string };
}) {
  const dict = await getDictionary(params.locale);
  const horse = await getHorse(params.slug);
  if (!horse) notFound();

  const t = horse.translations[params.locale] ?? horse.translations.en;
  const price = formatPriceRange(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mectrading.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t.name,
    description: t.positioning,
    image: horse.media.map((m) => m.url),
    brand: { "@type": "Organization", name: "MEC Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: horse.priceCurrency,
      availability:
        horse.status === "AVAILABLE"
          ? "https://schema.org/InStock"
          : horse.status === "RESERVED"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/SoldOut",
      url: `${siteUrl}/${params.locale}/horses-for-sale/${horse.slug}`
    }
  };

  const descriptionFields: Array<{ label: string; value?: string }> = [
    { label: "Personality", value: t.personality },
    { label: "Training", value: t.training },
    { label: "Strengths", value: t.strengths },
    { label: "Experience", value: t.experience },
    { label: "Suitability", value: t.suitability },
    { label: "Potential", value: t.potential },
    { label: "Ideal rider", value: t.idealRider }
  ].filter((f) => f.value);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HorseGallery
        media={horse.media}
        name={t.name}
      />

      <div className="mx-auto max-w-editorial px-6 py-12 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">
                  {dict.horse.discipline} · {formatJumpHeight(horse.jumpHeightCm)}
                </p>
                <h1 className="mt-2 font-display text-4xl italic text-charcoal">{t.name}</h1>
                <p className="mt-3 max-w-xl text-charcoal/70">{t.positioning}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl text-gold">{price ?? dict.horse.priceOnRequest}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/50">
                  {dict.horse.statusLabel[horse.status]}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <TrustBadges trust={horse.trust} hasResults={horse.competitionResults.length > 0} dict={dict} />
            </div>

            {/* Basic info */}
            <section className="mt-14">
              <SectionHeading eyebrow={dict.detail.basicInfo} title="" />
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {[
                  [dict.horse.breed, horse.breed],
                  [dict.horse.sex, dict.horse.sexLabel[horse.sex]],
                  [dict.detail.dateOfBirth, new Date(horse.dateOfBirth).toLocaleDateString(params.locale)],
                  [dict.horse.age, `${ageFromDob(horse.dateOfBirth)} ${dict.horse.years}`],
                  [dict.horse.height, horse.heightCm ? heightHands(horse.heightCm) : "—"],
                  [dict.detail.color, horse.color],
                  [dict.horse.location, horse.locationLabel],
                  ...(horse.competitionLevel ? [[dict.detail.competitionLevel, horse.competitionLevel]] : []),
                  ...(horse.registrationNo ? [[dict.detail.registration, horse.registrationNo]] : [])
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{label}</dt>
                    <dd className="mt-1 text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-charcoal-line py-6">
              <p className="mr-2 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/50">
                {price ?? dict.horse.priceOnRequest}
              </p>
              <WhatsAppButton horseName={t.name} label={dict.detail.whatsapp} />
              <a
                href="#contact"
                className="border border-charcoal-line px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/70 transition-colors duration-400 hover:border-gold hover:text-gold"
              >
                {dict.detail.requestViewing}
              </a>
            </div>

            {/* Description */}
            {descriptionFields.length > 0 && (
              <section className="mt-14">
                <SectionHeading eyebrow={dict.detail.description} title="" />
                <div className="mt-8 space-y-5">
                  {descriptionFields.map((f) => (
                    <p key={f.label} className="text-charcoal/80">
                      <span className="font-mono text-[10px] uppercase tracking-eyebrow text-gold">{f.label} — </span>
                      {f.value}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Pedigree */}
            {horse.pedigree.length > 0 && (
              <section className="mt-14">
                <SectionHeading eyebrow={dict.detail.pedigree} title={t.name} />
                <div className="mt-8">
                  <PedigreeTree entries={horse.pedigree} dict={dict} />
                </div>
              </section>
            )}

            {/* Competition history */}
            {horse.competitionResults.length > 0 && (
              <section className="mt-14">
                <SectionHeading eyebrow={dict.detail.competitionHistory} title="" />
                <div className="mt-8">
                  <CompetitionTable results={horse.competitionResults} dict={dict} />
                </div>
              </section>
            )}

            {/* Health & documents */}
            <section className="mt-14">
              <SectionHeading eyebrow={dict.detail.healthDocuments} title="" />
              {horse.xrays && (
                <div className="mt-8">
                  <XrayViewer set={horse.xrays} dict={dict} locale={params.locale} />
                </div>
              )}
              <ul className="mt-8 divide-y divide-charcoal-line border-y border-charcoal-line">
                {horse.documents.map((doc) => (
                  <li key={doc.label} className="flex items-center justify-between py-4">
                    <span className="text-charcoal">{doc.label}</span>
                    {doc.downloadable ? (
                      <a href={doc.url} download className="font-mono text-[11px] uppercase tracking-eyebrow text-gold underline underline-offset-4">
                        Download
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/40">
                        {doc.type === "XRAY" ? dict.detail.xraysOnRequest : dict.detail.downloadNotAvailable}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Location */}
            <section className="mt-14">
              <SectionHeading eyebrow={dict.detail.locationTitle} title={horse.locationLabel} />
              <p className="mt-4 max-w-lg text-sm text-charcoal/50">{dict.detail.locationNote}</p>
            </section>
          </div>

          {/* Contact sidebar */}
          <aside id="contact" className="h-fit border border-charcoal-line p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl italic text-charcoal">{dict.detail.contactFormTitle}</h2>
            <div className="mt-6">
              <ContactForm dict={dict} horseId={horse.id} horseName={t.name} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
