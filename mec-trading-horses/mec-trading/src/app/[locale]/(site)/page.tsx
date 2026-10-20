import Link from "next/link";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listHorses } from "@/lib/horses";
import SelectionExplorer from "@/components/SelectionExplorer";
import HeroVideo from "@/components/HeroVideo";
import MobileQuickNav from "@/components/MobileQuickNav";
import HeroCatalogSearch from "@/components/HeroCatalogSearch";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const all = await listHorses();

  return (
    <>
      <MobileQuickNav locale={params.locale} />
      <section className="relative isolate flex min-h-[680px] h-[88vh] items-start overflow-hidden bg-charcoal supports-[height:88dvh]:h-[88dvh]">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        <div className="absolute inset-x-0 bottom-[264px] z-10 mx-auto w-full max-w-editorial px-6 pb-0 sm:relative sm:inset-auto sm:bottom-auto sm:pt-[264px] sm:pb-16 lg:px-10 lg:pt-[280px]">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="mx-auto w-full max-w-4xl font-sans text-center text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-6xl">
              <span className="block w-full whitespace-nowrap text-center text-[clamp(0.92rem,3.15vw,3.5rem)] font-semibold tracking-[0.025em] sm:text-[clamp(1.8rem,3.8vw,3.5rem)] lg:text-[clamp(2.25rem,3.8vw,3.6rem)]">BUY · SELL · LEASE · CONSULTING</span>
            </h1>
            <HeroCatalogSearch locale={params.locale} />
            <div className="mt-9 hidden flex-col items-center justify-center gap-3 md:flex md:flex-row md:gap-4">
              <Link href={`/${params.locale}/horses-for-sale`} className="group inline-flex min-h-[58px] min-w-[250px] items-center justify-between gap-8 border border-[#d7ae53] bg-gradient-to-r from-[#b9872e] via-[#f0d27d] to-[#b9872e] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#17130b] shadow-lg transition-all duration-300 hover:brightness-110 sm:min-w-[280px]">
                {dict.home.heroCta}<span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href={`/${params.locale}/services`} className="group inline-flex min-h-[58px] min-w-[250px] items-center justify-between gap-8 border border-[#e4c36d] bg-black/25 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#d7ae53] hover:text-black sm:min-w-[280px]">
                Our Services<span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
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
