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


const SERVICE_DETAILS: Record<Locale, Record<(typeof SERVICE_KEYS)[number], string>> = {
  en: {
    selection: "A tailored horse search built around your riding level, sporting ambitions, preferred type and budget. We identify suitable prospects, review their profiles and help coordinate viewings so you can make a confident, informed choice.",
    sales: "We present your horse to a relevant international audience through carefully prepared profiles, verified information and direct enquiries. Our team helps organise the presentation and buyer communication from first interest through the sale.",
    vetCoordination: "We help arrange independent veterinary examinations, coordinate appointments with the relevant clinic and collect the available reports and imaging. You stay informed throughout the process and can discuss the findings before deciding how to proceed.",
    documentation: "We assist with the practical paperwork involved in a horse transaction, including passport and registration details, ownership-transfer steps and the supporting documents needed for a clear handover.",
    transport: "We coordinate suitable road or air transport according to the horse’s destination and requirements, helping organise timing, collection, delivery and communication with the transport provider.",
    afterSale: "Our support continues after the transaction. We remain available to help with follow-up questions and practical coordination as your horse settles into its new home.",
    trainingCamp: "Individual and intensive training stays for riders and horses, shaped around your current level and sporting goals. Sessions can focus on technique, confidence, fitness, course work and preparation for competition, with professional guidance in a high-standard environment.",
    valorization: "A tailored programme to develop and showcase your horse’s sporting qualities. We help plan its training and presentation, document its progress and position it appropriately for prospective buyers or future sporting opportunities."
  },
  fr: {
    selection: "Une recherche de cheval construite autour de votre niveau, de vos objectifs sportifs, du type de cheval souhaité et de votre budget. Nous identifions les profils pertinents, étudions leurs informations et organisons les étapes de découverte afin de vous aider à choisir en toute confiance.",
    sales: "Nous présentons votre cheval à un réseau international d’acheteurs grâce à une fiche soignée, des informations vérifiées et des demandes directes. Notre équipe vous accompagne dans sa présentation et les échanges avec les acheteurs, de la première prise de contact jusqu’à la vente.",
    vetCoordination: "Nous vous aidons à organiser les examens vétérinaires indépendants, à coordonner les rendez-vous avec la clinique et à réunir les comptes rendus et imageries disponibles. Vous restez informé à chaque étape pour prendre votre décision en connaissance de cause.",
    documentation: "Nous vous accompagnons dans les formalités liées à la transaction : vérification des informations du passeport et de l’enregistrement, étapes du changement de propriétaire et documents nécessaires à une transmission claire.",
    transport: "Nous coordonnons un transport routier ou aérien adapté à la destination et aux besoins du cheval, en facilitant la planification, l’enlèvement, la livraison et les échanges avec le transporteur.",
    afterSale: "Notre accompagnement se poursuit après la transaction. Nous restons disponibles pour vos questions et pour faciliter les démarches pratiques pendant l’installation du cheval dans son nouvel environnement.",
    trainingCamp: "Des stages intensifs et sur mesure pour les cavaliers et leurs chevaux, définis selon votre niveau et vos objectifs sportifs. Les séances peuvent porter sur la technique, la confiance, la condition physique, le travail de parcours et la préparation aux compétitions, avec un encadrement professionnel dans un environnement de haut niveau.",
    valorization: "Un programme personnalisé pour développer et présenter les qualités sportives de votre cheval. Nous vous aidons à définir son travail, à valoriser sa progression et à préparer une présentation cohérente auprès d’acheteurs potentiels ou pour ses prochains objectifs sportifs."
  },
  ar: {
    selection: "نضع خطة بحث مخصصة وفق مستوى الفارس وأهدافه الرياضية ونوع الحصان المطلوب والميزانية. نساعد في تحديد الخيارات المناسبة ومراجعة بياناتها وتنظيم المعاينات حتى تتمكن من اتخاذ قرار واضح ومدروس.",
    sales: "نعمل على تقديم حصانك إلى شبكة مناسبة من المشترين الدوليين من خلال ملف احترافي ومعلومات موثقة واستفسارات مباشرة. نرافقك في تجهيز العرض والتواصل مع المهتمين من أول اتصال وحتى إتمام البيع.",
    vetCoordination: "نساعد في ترتيب الفحوص البيطرية المستقلة وتنسيق المواعيد مع العيادات وجمع التقارير والصور المتاحة. ونحرص على إبقائك على اطلاع بكل خطوة لتتمكن من اتخاذ قرارك بناءً على المعلومات.",
    documentation: "نرافقك في تجهيز ومراجعة المستندات اللازمة لإتمام المعاملة، بما في ذلك بيانات جواز الحصان والتسجيل وإجراءات نقل الملكية والوثائق المطلوبة لتسليم واضح ومنظم.",
    transport: "ننسق وسيلة النقل البري أو الجوي المناسبة لوجهة الحصان واحتياجاته، مع المساعدة في ترتيب المواعيد والاستلام والتسليم والتواصل مع شركة النقل.",
    afterSale: "لا ينتهي دورنا بإتمام البيع؛ نظل متاحين للإجابة عن استفساراتك والمساعدة في الترتيبات العملية خلال تأقلم الحصان في مكانه الجديد.",
    trainingCamp: "معسكرات تدريب مكثفة ومخصصة للفرسان وخيولهم، وفق المستوى الحالي والأهداف الرياضية. يمكن أن تركز التدريبات على التقنية والثقة واللياقة والعمل على المسارات والاستعداد للمنافسات، بإشراف متخصصين وفي بيئة تدريب عالية المستوى.",
    valorization: "برنامج مخصص لتطوير وإبراز الإمكانات الرياضية لحصانك. نساعد في وضع خطة التدريب وتوثيق التقدم وتجهيز عرض احترافي مناسب للمشترين المحتملين أو للخطوات الرياضية القادمة."
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
          <p className="mt-7 max-w-3xl text-base leading-8 text-charcoal/80 sm:text-lg">{SERVICE_DETAILS[params.locale][key]}</p>
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
