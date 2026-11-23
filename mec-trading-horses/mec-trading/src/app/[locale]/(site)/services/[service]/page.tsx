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
    alternates: localizedAlternates(params.locale, `/services/${params.service}`)
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

  const trainingCopy: Record<Locale, { benefits: [string, string, string]; requestTitle: string; requestText: string }> = {
    en: { benefits: ["Professional coaching", "Personalised programme", "Progress & performance"], requestTitle: "Request a Training Camp", requestText: "Complete the form and our team will get back to you shortly." },
    fr: { benefits: ["Encadrement professionnel", "Programme personnalisé", "Progression et performance"], requestTitle: "Demander un Training Camp", requestText: "Remplissez le formulaire et notre équipe vous répondra rapidement." },
    ar: { benefits: ["إشراف احترافي", "برنامج مخصص", "تطور وأداء أفضل"], requestTitle: "اطلب معسكرًا تدريبيًا", requestText: "املأ النموذج وسيتواصل معك فريقنا في أقرب وقت." }
  };
  const training = trainingCopy[params.locale] ?? trainingCopy.en;
  const isTraining = key === "trainingCamp";

  return (
    <main dir={params.locale === "ar" ? "rtl" : "ltr"} className="mx-auto max-w-editorial px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pt-12">
      <section className={`relative isolate overflow-hidden rounded-sm border-b border-charcoal-line ${isTraining ? "min-h-[440px] px-6 py-12 sm:px-10 lg:min-h-[480px] lg:px-12" : "pb-10 pt-4 lg:pb-14"}`}>
        {isTraining && <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full bg-cover bg-center opacity-90 sm:w-[58%]" style={{ backgroundImage: "linear-gradient(90deg, #f8f5ee 0%, rgba(248,245,238,.96) 12%, rgba(248,245,238,.60) 48%, rgba(248,245,238,.05) 100%), url('/video/hero-poster.jpg')" }} />}
        {!isTraining && <div className="pointer-events-none absolute -right-8 -top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />}
        <div className={isTraining ? "relative max-w-3xl" : "relative"}>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{isTraining ? (params.locale === "fr" ? "NOS SERVICES" : params.locale === "ar" ? "خدماتنا" : "OUR SERVICES") : copy.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight text-charcoal sm:text-5xl lg:text-6xl">{service.title}</h1>
          <div className="mt-6 h-px w-20 bg-gold" />
          <p className="mt-7 max-w-3xl text-base leading-8 text-charcoal/80 sm:text-lg">{isTraining && params.locale === "fr" ? "Des stages d’entraînement intensifs et sur mesure pour cavaliers et chevaux, encadrés par des professionnels expérimentés, dans un environnement de haut niveau." : service.text}</p>
        </div>
        <div className="relative mt-9 grid gap-5 sm:grid-cols-3">
          {(isTraining ? training.benefits : copy.benefits).map((benefit, index) => (
            <div key={benefit} className="flex flex-col items-center gap-2 border-r border-charcoal-line/70 px-3 text-center last:border-r-0">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 font-display text-xl italic text-gold">{["✦", "◎", "↗"][index]}</span>
              <span className="max-w-[13rem] font-display text-base leading-snug text-charcoal">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-charcoal-line/70 bg-[#fbf8f1] p-5 shadow-[0_12px_35px_rgba(39,34,25,0.08)] sm:mt-10 sm:p-8 lg:p-10">
        <div className="mb-7 flex items-start gap-4">
          <span className="mt-1 text-3xl text-gold" aria-hidden="true">✉</span>
          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">{isTraining ? training.requestTitle : copy.requestTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{isTraining ? training.requestText : copy.requestText}</p>
          </div>
        </div>
        <div className="max-w-5xl">
          <ContactForm locale={params.locale} dict={dict} horses={horseOptions} initialService={key} hideServiceSelect />
        </div>
      </section>
    </main>
  );
}
}
