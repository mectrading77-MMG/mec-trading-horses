import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { featuredHorses, featuredStory, listHorses } from "@/lib/horses";
import HorseCard from "@/components/HorseCard";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroVideo from "@/components/HeroVideo";
import SelectionExplorer from "@/components/SelectionExplorer";
import Logo from "@/components/Logo";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const [featured, story, all] = await Promise.all([featuredHorses(), featuredStory(), listHorses()]);
  const storyT = story.translations[params.locale] ?? story.translations.en;
  const storyCover = story.media.find((m) => m.isCover) ?? story.media[0];

  return (
    <>
      {/* Hero — silent looping film */}
      <section className="relative flex h-[92vh] min-h-[560px] items-end overflow-hidden bg-charcoal supports-[height:92dvh]:h-[92dvh]">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 lg:px-10 lg:pb-24">
          <Logo variant="full" onDark priority className="!h-24 sm:!h-32" />
          <h1 className="mt-8 max-w-3xl font-display text-4xl italic leading-[1.05] text-ivory sm:text-6xl">
            {dict.home.heroHeadline}
          </h1>
          <p className="mt-6 max-w-lg text-ivory/75">{dict.home.heroSupport}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${params.locale}/horses-for-sale`}
              className="inline-block border border-gold px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors duration-400 hover:bg-gold hover:text-charcoal"
            >
              {dict.home.heroCta}
            </Link>
            <Link
              href={`/${params.locale}/contact`}
              className="inline-block border border-ivory/40 px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory transition-colors duration-400 hover:border-gold hover:text-gold"
            >
              {dict.nav.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured horses */}
      <section className="mx-auto max-w-editorial px-6 py-24 lg:px-10">
        <SectionHeading eyebrow={dict.home.featuredEyebrow} title={dict.home.featuredTitle} />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((horse) => (
            <HorseCard key={horse.id} horse={horse} locale={params.locale} dict={dict} />
          ))}
        </div>
      </section>

      {/* Find a horse by the height it jumps */}
      <section className="bg-charcoal py-24 text-ivory">
        <div className="mx-auto max-w-editorial px-6 lg:px-10">
          <SectionHeading eyebrow={dict.home.selectionEyebrow} title={dict.home.selectionTitle} onDark />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-ivory/35">{dict.home.selectionHint}</p>
          <SelectionExplorer horses={all} locale={params.locale} dict={dict} />
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-editorial px-6 py-24 lg:px-10">
        <SectionHeading eyebrow={dict.home.whyEyebrow} title={dict.home.whyTitle} />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {(["selected", "evaluation", "documentation", "international", "assistance", "transport"] as const).map(
            (key) => (
              <div key={key} className="border-t border-gold pt-5">
                <h3 className="font-display text-lg italic text-charcoal">{dict.why[key].title}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{dict.why[key].text}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured story */}
      <section className="mx-auto max-w-editorial px-6 pb-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-soft">
            {storyCover && (
              <Image src={storyCover.url} alt={storyT.name} fill sizes="50vw" className="object-cover" />
            )}
          </div>
          <div>
            <p className="eyebrow">{dict.home.storyEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl italic text-charcoal">{storyT.name}</h2>
            <p className="mt-4 text-charcoal/70">{storyT.positioning}</p>
            {storyT.experience && <p className="mt-4 text-sm text-charcoal/60">{storyT.experience}</p>}
            <Link
              href={`/${params.locale}/horses-for-sale/${story.slug}`}
              className="mt-6 inline-block font-mono text-[11px] uppercase tracking-eyebrow text-gold underline underline-offset-4"
            >
              {dict.horse.viewHorse}
            </Link>
          </div>
        </div>
      </section>

      {/* International buyers */}
      <section className="bg-hunter py-24 text-ivory">
        <div className="mx-auto max-w-editorial px-6 lg:px-10">
          <SectionHeading eyebrow={dict.home.internationalEyebrow} title={dict.home.internationalTitle} onDark />
          <p className="mt-4 max-w-2xl text-ivory/70">{dict.home.internationalText}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory/80 sm:grid-cols-4">
            {(["selection", "info", "vet", "xrays", "viewing", "transport", "export"] as const).map((k) => (
              <li key={k}>{dict.international[k]}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-editorial px-6 py-24 text-center lg:px-10">
        <h2 className="font-display text-3xl italic text-charcoal sm:text-4xl">{dict.home.closingTitle}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
