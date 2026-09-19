import Image from "next/image";
import Link from "next/link";
import type { Locale, Discipline } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { featuredHorses, featuredStory } from "@/lib/horses";
import HorseCard from "@/components/HorseCard";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";

const DISCIPLINE_ORDER: Discipline[] = [
  "SHOW_JUMPING",
  "DRESSAGE",
  "EVENTING",
  "BREEDING",
  "ARABIAN",
  "YOUNG_HORSE",
  "COMPETITION",
  "PROSPECT"
];

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const featured = await featuredHorses();
  const story = await featuredStory();
  const storyT = story.translations[params.locale] ?? story.translations.en;

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[92vh] min-h-[560px] items-end overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2400"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 lg:px-10 lg:pb-24">
          <p className="eyebrow text-ivory/70">{dict.brand.name}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-[1.05] text-ivory sm:text-6xl">
            {dict.home.heroHeadline}
          </h1>
          <p className="mt-6 max-w-lg text-ivory/70">{dict.home.heroSupport}</p>
          <Link
            href={`/${params.locale}/horses-for-sale`}
            className="mt-8 inline-block border border-gold px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors duration-400 hover:bg-gold hover:text-charcoal"
          >
            {dict.home.heroCta}
          </Link>
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

      {/* Our selection */}
      <section className="bg-charcoal-soft py-24 text-ivory">
        <div className="mx-auto max-w-editorial px-6 lg:px-10">
          <SectionHeading eyebrow={dict.home.selectionEyebrow} title={dict.home.selectionTitle} />
          <div className="mt-12 grid grid-cols-2 gap-px bg-ivory/10 sm:grid-cols-4">
            {DISCIPLINE_ORDER.map((d) => (
              <Link
                key={d}
                href={`/${params.locale}/horses-for-sale?discipline=${d}`}
                className="group flex aspect-square flex-col items-center justify-center gap-2 bg-charcoal-soft p-4 text-center transition-colors duration-400 hover:bg-charcoal"
              >
                <span className="font-display text-lg italic text-ivory group-hover:text-gold">
                  {dict.disciplines[d]}
                </span>
              </Link>
            ))}
          </div>
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
            {story.media[0] && (
              <Image src={story.media[0].url} alt={storyT.name} fill sizes="50vw" className="object-cover" />
            )}
          </div>
          <div>
            <p className="eyebrow">{dict.home.storyEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl italic text-charcoal">{storyT.name}</h2>
            <p className="mt-4 text-charcoal/70">{storyT.positioning}</p>
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
          <SectionHeading eyebrow={dict.home.internationalEyebrow} title={dict.home.internationalTitle} />
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
