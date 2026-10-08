import Link from "next/link";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listHorses } from "@/lib/horses";
import SelectionExplorer from "@/components/SelectionExplorer";
import HeroVideo from "@/components/HeroVideo";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const all = await listHorses();

  return (
    <>
      <section className="relative flex h-[88vh] min-h-[520px] items-end overflow-hidden bg-charcoal supports-[height:88dvh]:h-[88dvh]">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-10 sm:pb-16 lg:px-10 lg:pb-24">
          <h1 className="max-w-3xl font-display text-3xl italic leading-[1.08] text-ivory sm:text-6xl">
            {dict.home.heroHeadline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/75 sm:mt-6 sm:text-lg">
            {dict.home.heroSupport}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <Link
              href={`/${params.locale}/horses-for-sale`}
              className="inline-flex min-w-[220px] items-center justify-center border border-gold bg-charcoal/20 px-7 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-gold shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-colors duration-400 hover:bg-gold hover:text-charcoal sm:min-w-[260px] sm:px-8 sm:py-4 sm:text-[14px]"
            >
              {dict.home.heroCta}
            </Link>
            <Link
              href={`/${params.locale}/services`}
              className="inline-flex min-w-[220px] items-center justify-center border border-ivory/70 bg-charcoal/15 px-7 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-ivory transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-charcoal sm:min-w-[260px] sm:text-[13px]"
            >
              {dict.nav.services}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory sm:py-24">
        <div className="mx-auto max-w-editorial px-6 lg:px-10">
          <SectionHeading eyebrow={dict.home.selectionEyebrow} title={dict.home.selectionTitle} onDark />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-ivory/35">{dict.home.selectionHint}</p>
          <SelectionExplorer horses={all} locale={params.locale} dict={dict} />
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-6 py-20 sm:py-24 lg:px-10">
        <SectionHeading eyebrow={dict.home.whyEyebrow} title={dict.home.whyTitle} />
        <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {(["selected", "evaluation", "documentation", "international", "assistance", "transport"] as const).map(
            (key) => (
              <div key={key} className="border-t border-gold pt-5">
                <h3 className="font-display text-lg italic text-charcoal">{dict.why[key].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{dict.why[key].text}</p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="bg-hunter py-20 text-ivory sm:py-24">
        <div className="mx-auto max-w-editorial px-6 lg:px-10">
          <SectionHeading eyebrow={dict.home.internationalEyebrow} title={dict.home.internationalTitle} onDark />
          <p className="mt-4 max-w-2xl leading-relaxed text-ivory/70">{dict.home.internationalText}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-[11px] uppercase tracking-eyebrow text-ivory/80 sm:grid-cols-4">
            {(["selection", "info", "vet", "xrays", "viewing", "transport", "export"] as const).map((k) => (
              <li key={k}>{dict.international[k]}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-6 py-12 text-center sm:py-16 lg:px-10">
        <h2 className="font-display text-3xl italic text-charcoal sm:text-4xl">{dict.home.closingTitle}</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${params.locale}/contact`}
            className="border border-charcoal px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal transition-colors duration-400 hover:border-gold hover:text-gold"
          >
            {dict.home.closingCta}
          </Link>
          <WhatsAppButton label={dict.detail.whatsapp} />
        </div>
      </section>
    </>
  );
}
