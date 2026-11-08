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

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const all = await listHorses();

  return (
    <>
      <MobileQuickNav locale={params.locale} />
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-charcoal sm:min-h-[700px]">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 py-24 text-center sm:py-32 lg:px-10">
          <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C7A468] sm:text-xs">
            {({ en: "International Sport Horse Sales & Brokerage", fr: "Vente et courtage international de chevaux de sport", ar: "بيع ووساطة الخيول الرياضية دوليًا", de: "Internationaler Sportpferdeverkauf & Vermittlung", nl: "Internationale verkoop & bemiddeling van sportpaarden" } as Record<Locale, string>)[params.locale]}
          </p>
          <h1 className="mx-auto max-w-5xl font-display text-4xl font-normal italic leading-[1.08] tracking-[-0.035em] text-ivory sm:text-6xl lg:text-7xl">
            Where Champions
            <span className="mt-2 block text-[#C7A468]">Change Hands</span>
          </h1>
          <div className="mx-auto mt-9 max-w-3xl">
            <HeroCatalogSearch locale={params.locale} />
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`/${params.locale}/horses-for-sale`} className="group inline-flex min-h-[54px] min-w-[220px] items-center justify-center gap-5 border border-[#C7A468] bg-[#B08D57] px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal transition-all duration-300 hover:bg-[#C7A468]">
              {({ en: "Explore our horses", fr: "Découvrir nos chevaux", ar: "اكتشف خيولنا", de: "Unsere Pferde entdecken", nl: "Ontdek onze paarden" } as Record<Locale, string>)[params.locale]}
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href={`/${params.locale}/contact`} className="inline-flex min-h-[54px] min-w-[220px] items-center justify-center border border-ivory/60 bg-charcoal/20 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:border-[#C7A468] hover:text-[#C7A468]">
              {({ en: "Speak with our team", fr: "Contacter notre équipe", ar: "تواصل مع فريقنا", de: "Kontaktieren Sie unser Team", nl: "Neem contact op" } as Record<Locale, string>)[params.locale]}
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto -mt-1 grid max-w-editorial gap-px bg-charcoal-line px-6 lg:grid-cols-3 lg:px-10">
        {([
          {
            title: { en: "Buy a Horse", fr: "Acheter un cheval", ar: "شراء حصان", de: "Pferd kaufen", nl: "Een paard kopen" },
            text: { en: "Explore our current selection of carefully presented sport horses.", fr: "Découvrez notre sélection actuelle de chevaux de sport.", ar: "اكتشف الخيول الرياضية المتاحة ضمن مجموعتنا الحالية.", de: "Entdecken Sie unsere aktuelle Auswahl an Sportpferden.", nl: "Ontdek onze actuele selectie sportpaarden." },
            cta: { en: "Browse horses", fr: "Voir les chevaux", ar: "تصفح الخيول", de: "Pferde entdecken", nl: "Bekijk paarden" },
            href: `/${params.locale}/horses-for-sale`
          },
          {
            title: { en: "Find Your Horse", fr: "Trouver votre cheval", ar: "ابحث عن حصانك", de: "Finden Sie Ihr Pferd", nl: "Vind uw paard" },
            text: { en: "Tell us your goals, level and budget. We will help source suitable horses.", fr: "Présentez-nous vos objectifs, votre niveau et votre budget.", ar: "أخبرنا بأهدافك ومستواك وميزانيتك لنساعدك في العثور على الحصان المناسب.", de: "Teilen Sie uns Ihre Ziele, Ihr Niveau und Ihr Budget mit.", nl: "Vertel ons uw doelen, niveau en budget." },
            cta: { en: "Request a search", fr: "Demander une recherche", ar: "اطلب البحث عن حصان", de: "Pferdesuche anfragen", nl: "Zoekopdracht aanvragen" },
            href: `/${params.locale}/contact?service=selection`
          },
          {
            title: { en: "Sell Your Horse", fr: "Vendre votre cheval", ar: "اعرض حصانك للبيع", de: "Ihr Pferd verkaufen", nl: "Verkoop uw paard" },
            text: { en: "Introduce your horse to our international network of potential buyers.", fr: "Présentez votre cheval à notre réseau international d'acheteurs.", ar: "اعرض حصانك على شبكة المشترين الدوليين لدينا.", de: "Präsentieren Sie Ihr Pferd unserem internationalen Käufernetzwerk.", nl: "Presenteer uw paard aan ons internationale kopersnetwerk." },
            cta: { en: "Discuss a sale", fr: "Parler d'une vente", ar: "ناقش عملية البيع", de: "Verkauf besprechen", nl: "Verkoop bespreken" },
            href: `/${params.locale}/contact?service=sales`
          }
        ] as const).map((item, index) => (
          <Link key={item.title.en} href={item.href} className="group flex min-h-[220px] flex-col justify-between bg-[#f5f2eb] p-7 transition-colors duration-300 hover:bg-white sm:p-9">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a7837]">0{index + 1} / MEC HORSES</span>
              <h2 className="mt-4 font-display text-2xl italic text-charcoal sm:text-3xl">{item.title[params.locale]}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/65">{item.text[params.locale]}</p>
            </div>
            <span className="mt-7 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-charcoal transition-colors group-hover:text-[#9a7837]">
              {item.cta[params.locale]} <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
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
