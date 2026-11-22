import Link from "next/link";
import type { Metadata } from "next";
import { localizedAlternates, siteDescriptions } from "@/lib/seo";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listHorses } from "@/lib/horses";
import SelectionExplorer from "@/components/SelectionExplorer";
import HeroVideo from "@/components/HeroVideo";


export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: "Show Jumping Horses for Sale in Europe",
    description: siteDescriptions[params.locale],
    alternates: localizedAlternates(params.locale, "")
  };
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const all = await listHorses();

  return (
    <>
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-charcoal sm:min-h-[660px] lg:min-h-[700px]">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-5 py-16 text-center sm:px-6 sm:py-28 lg:px-10 lg:py-32">
          <p className="mx-auto mb-5 max-w-[29rem] font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-[#C7A468] sm:mb-7 sm:text-xs sm:tracking-[0.28em]">
            {({ en: "International Sport Horse Sales & Brokerage", fr: "Vente et courtage international de chevaux de sport", ar: "بيع ووساطة الخيول الرياضية دوليًا" } as Record<Locale, string>)[params.locale]}
          </p>
          <h1 className="mx-auto max-w-5xl font-display text-[2.65rem] font-normal italic leading-[1.05] tracking-[-0.045em] text-ivory sm:text-6xl lg:text-7xl">
            Where Champions
            <span className="mt-2 block text-[#C7A468]">Change Hands</span>
          </h1>
          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
            <Link href={`/${params.locale}/horses-for-sale`} className="group inline-flex min-h-[54px] w-full max-w-[340px] items-center justify-center gap-4 border border-[#C7A468] bg-[#B08D57] px-5 py-4 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:w-auto sm:min-w-[220px] sm:px-7 sm:text-[10px] sm:tracking-[0.18em] text-charcoal transition-all duration-300 hover:bg-[#C7A468]">
              {({ en: "Explore our horses", fr: "Découvrir nos chevaux", ar: "اكتشف خيولنا" } as Record<Locale, string>)[params.locale]}
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href={`/${params.locale}/contact`} className="inline-flex min-h-[54px] w-full max-w-[340px] items-center justify-center border border-ivory/60 bg-charcoal/20 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.14em] sm:w-auto sm:min-w-[220px] sm:px-7 sm:text-[10px] sm:tracking-[0.18em] text-ivory transition-all duration-300 hover:border-[#C7A468] hover:text-[#C7A468]">
              {({ en: "Speak with our team", fr: "Contacter notre équipe", ar: "تواصل مع فريقنا" } as Record<Locale, string>)[params.locale]}
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


      <section aria-label="MEC Horses services" className="relative z-10 border-y border-[#d5cbb9] bg-[#e9e3d7] px-5 py-8 sm:px-8 sm:py-11 lg:px-10">
        <div className="mx-auto max-w-editorial">
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#967545]">
                {({ en: "How we can help", fr: "Nos services", ar: "كيف نساعدك" } as Record<Locale, string>)[params.locale]}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl italic leading-tight text-charcoal sm:text-4xl">
                {({ en: "Your next step in sport horses.", fr: "Votre projet équestre, notre expertise.", ar: "خطوتك القادمة في عالم الخيول الرياضية." } as Record<Locale, string>)[params.locale]}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
              {({ en: "From finding the right partner to presenting your horse internationally.", fr: "De la recherche du bon cheval à sa présentation sur la scène internationale.", ar: "من العثور على الحصان المناسب إلى تقديم خيلك للمشترين حول العالم." } as Record<Locale, string>)[params.locale]}
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {([
              {
                title: { en: "Buy a Horse", fr: "Acheter un cheval", ar: "شراء حصان" },
                text: { en: "Explore our current selection of carefully presented sport horses.", fr: "Découvrez notre sélection actuelle de chevaux de sport.", ar: "اكتشف الخيول الرياضية المتاحة ضمن مجموعتنا الحالية." },
                cta: { en: "Browse horses", fr: "Voir les chevaux", ar: "تصفح الخيول" },
                href: `/${params.locale}/horses-for-sale`
              },
              {
                title: { en: "Find Your Horse", fr: "Trouver votre cheval", ar: "ابحث عن حصانك" },
                text: { en: "Tell us your goals, level and budget. We will help source suitable horses.", fr: "Présentez-nous vos objectifs, votre niveau et votre budget.", ar: "أخبرنا بأهدافك ومستواك وميزانيتك لنساعدك في العثور على الحصان المناسب." },
                cta: { en: "Request a search", fr: "Demander une recherche", ar: "اطلب البحث عن حصان" },
                href: `/${params.locale}/contact?service=selection`
              },
              {
                title: { en: "Sell Your Horse", fr: "Vendre un cheval", ar: "اعرض حصانك للبيع" },
                text: { en: "Introduce your horse to our international network of potential buyers.", fr: "Présentez votre cheval à notre réseau international d'acheteurs.", ar: "اعرض خيلك على شبكة المشترين الدوليين لدينا." },
                cta: { en: "Discuss a sale", fr: "Parler d'une vente", ar: "ناقش عملية البيع" },
                href: `/${params.locale}/contact?service=sales`
              }
            ] as const).map((item, index) => (
              <Link key={item.title.en} href={item.href} className={`group flex w-[94%] flex-col gap-3 rounded-full border border-[#d8cdbb] bg-[#f8f5ee] px-6 py-5 transition-all duration-300 hover:border-[#b08d57] hover:bg-[#fffdf8] sm:w-[82%] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-6 ${index % 2 === 1 ? "ml-auto" : "mr-auto"}`}>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl italic leading-tight text-charcoal transition-colors group-hover:text-[#967545] sm:text-2xl">{item.title[params.locale]}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-charcoal/65 sm:text-sm">{item.text[params.locale]}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-3 self-start border-b border-[#b08d57] pb-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-charcoal transition-colors group-hover:text-[#967545] sm:self-center">
                  {item.cta[params.locale]} <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-6 py-20 sm:py-24 lg:px-10">
        <SectionHeading eyebrow={dict.home.whyEyebrow} title={dict.home.whyTitle} />
        <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {(["selected", "evaluation", "documentation", "international", "assistance", "transport"] as const).map(
            (key) => (
              <div key={key} className="border-t border-[#c5b18b] pt-5">
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

      <section aria-labelledby="expertise-heading" className="border-t border-[#ddd3c2] bg-[#eee9df] py-16 sm:py-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#967545]">
                {({ en: "MEC Horses Journal", fr: "Journal MEC Horses", ar: "مجلة MEC Horses" } as Record<Locale, string>)[params.locale]}
              </p>
              <h2 id="expertise-heading" className="mt-3 font-display text-3xl italic text-charcoal sm:text-4xl">
                "Expertise"
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal/65">
                {({ en: "Explore show jumping, sport horse selection and international buying guidance.", fr: "Découvrez le saut d’obstacles, la sélection de chevaux de sport et les conseils pour acheter à l’international.", ar: "اكتشف عالم قفز الحواجز واختيار الخيول الرياضية ونصائح الشراء الدولي." } as Record<Locale, string>)[params.locale]}
              </p>
            </div>
            <Link href={`/${params.locale}/news`} className="inline-flex min-h-11 shrink-0 items-center gap-3 self-start border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-charcoal transition-colors hover:text-gold sm:self-auto">
              {({ en: "View all news", fr: "Toutes les actualités", ar: "عرض كل الأخبار" } as Record<Locale, string>)[params.locale]}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {([
              {
                number: "01",
                title: { en: "Show Jumping", fr: "Saut d’obstacles", ar: "قفز الحواجز" },
                description: { en: "Competition updates and perspectives from the equestrian world.", fr: "Actualités des compétitions et regards sur le monde équestre.", ar: "مستجدات البطولات وأخبار عالم الفروسية." }
              },
              {
                number: "02",
                title: { en: "Sport Horse Market", fr: "Marché des chevaux de sport", ar: "سوق الخيول الرياضية" },
                description: { en: "Understand the selection process and what matters when evaluating a horse.", fr: "Comprendre la sélection et les critères essentiels pour évaluer un cheval.", ar: "تعرّف على معايير اختيار الخيل وتقييمه قبل الشراء." }
              },
              {
                number: "03",
                title: { en: "Buying Internationally", fr: "Acheter à l’international", ar: "الشراء الدولي" },
                description: { en: "Practical guidance on veterinary checks, paperwork and transport.", fr: "Conseils pratiques sur les examens vétérinaires, les documents et le transport.", ar: "إرشادات عن الفحوص البيطرية والمستندات ونقل الخيول." }
              }
            ] as const).map((item) => (
              <Link key={item.number} href={`/${params.locale}/news`} className="group flex min-h-[200px] flex-col justify-between border border-[#ddd3c2] bg-[#faf8f2] p-6 transition-colors hover:border-[#b08d57] sm:p-7">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#967545]">{item.number} / JOURNAL</span>
                  <h3 className="mt-5 font-display text-2xl italic text-charcoal">{item.title[params.locale]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{item.description[params.locale]}</p>
                </div>
                <span aria-hidden="true" className="mt-6 self-end text-xl text-gold transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
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
