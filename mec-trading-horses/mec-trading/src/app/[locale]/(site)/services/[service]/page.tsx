import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { localizedAlternates } from "@/lib/seo";
import { listHorses } from "@/lib/horses";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

const SERVICE_KEYS = [
  "selection", "sales", "vetCoordination", "documentation",
  "transport", "afterSale", "trainingCamp", "valorization"
] as const;

const COPY: Record<Locale, {
  eyebrow: string;
  requestTitle: string;
  requestText: string;
  benefits: [string, string, string];
}> = {
  en: {
    eyebrow: "MEC HORSES SERVICES",
    requestTitle: "Request this service",
    requestText: "Share a few details below. Our team will review your request and get back to you personally.",
    benefits: ["Personalised support", "A clear plan", "International coordination"]
  },
  fr: {
    eyebrow: "LES SERVICES MEC HORSES",
    requestTitle: "Demander ce service",
    requestText: "Présentez-nous votre projet. Notre équipe étudiera votre demande et vous répondra personnellement.",
    benefits: ["Accompagnement personnalisé", "Un programme clair", "Coordination internationale"]
  },
  ar: {
    eyebrow: "خدمات MEC HORSES",
    requestTitle: "اطلب هذه الخدمة",
    requestText: "شاركنا تفاصيل طلبك، وسيراجع فريقنا احتياجاتك ويتواصل معك شخصيًا.",
    benefits: ["مرافقة شخصية", "خطة واضحة", "تنسيق دولي"]
  }
};

type PageProps = { params: { locale: Locale; service: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  const key = SERVICE_KEYS.find((item) => item === params.service);
  const service = key ? dict.services.list[key] : null;
  return {
    title: service ? `${service.title} | MEC Horses` : "MEC Horses Services",
    description: service?.text ?? dict.services.title,
    alternates: { canonical: `/${params.locale}/services/${params.service}` }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const key = SERVICE_KEYS.find((item) => item === params.service);
  if (!key) notFound();

  const dict = await getDictionary(params.locale);
  const service = dict.services.list[key];
  const horses = await listHorses();
  const horseOptions = horses.map((horse) => ({
    id: horse.id,
    name: (horse.translations[params.locale] ?? horse.translations.en).name
  }));
  const copy = COPY[params.locale] ?? COPY.en;

  return (
    <main dir={params.locale === "ar" ? "rtl" : "ltr"} className="mx-auto max-w-editorial px-6 py-10 lg:px-10 lg:py-16">
      <section className="relative overflow-hidden border-b border-charcoal-line pb-10 lg:pb-14">
        <div className="pointer-events-none absolute -right-8 -top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight text-charcoal sm:text-5xl lg:text-6xl">{service.title}</h1>
        <div className="mt-6 h-px w-20 bg-gold" />
        <p className="mt-7 max-w-3xl text-base leading-8 text-charcoal/75 sm:text-lg">{service.text}</p>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {copy.benefits.map((benefit, index) => (
            <div key={benefit} className="flex items-center gap-3 border-t border-charcoal-line pt-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 font-display text-lg italic text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-base text-charcoal">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-sm border border-charcoal-line bg-ivory/40 p-5 sm:p-8 lg:mt-14 lg:p-10">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.requestTitle} />
        <p className="mb-7 mt-3 max-w-2xl text-sm leading-7 text-charcoal/65">{copy.requestText}</p>
        <div className="max-w-3xl">
          <ContactForm locale={params.locale} dict={dict} horses={horseOptions} initialService={key} hideServiceSelect />
        </div>
      </section>
    </main>
  );
}
