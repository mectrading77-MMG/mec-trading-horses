import type { Metadata } from "next";
import type { Locale } from "@/types/horse";
import { localizedAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listHorses } from "@/lib/horses";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const titles: Record<Locale, string> = {
    en: "Contact MEC Horses",
    fr: "Contact MEC Horses",
    ar: "تواصل مع MEC Horses",
  };
  const descriptions: Record<Locale, string> = {
    en: "Contact MEC Horses in France about buying or selling a show jumping horse. We assist clients across Europe and the Middle East.",
    fr: "Contactez MEC Horses en France pour acheter ou vendre un cheval de saut d’obstacles. Nous accompagnons les clients en Europe et au Moyen-Orient.",
    ar: "تواصل مع MEC Horses في فرنسا للاستفسار عن شراء أو بيع خيول قفز الحواجز وخدماتنا للمشترين في أوروبا والشرق الأوسط.",
  };
  return { title: titles[params.locale], description: descriptions[params.locale], alternates: localizedAlternates(params.locale, "/contact") };
}

export default async function ContactPage({ params, searchParams }: { params: { locale: Locale }; searchParams?: { service?: string } }) {
  const dict = await getDictionary(params.locale);
  const horses = await listHorses();
  const horseOptions = horses.map((horse) => ({
    id: horse.id,
    name: (horse.translations[params.locale] ?? horse.translations.en).name
  }));

  const labels: Record<Locale, { email: string; phone: string; location: string }> = {
    en: { email: "Email", phone: "Phone", location: "Location" },
    fr: { email: "E-mail", phone: "Téléphone", location: "Localisation" },
    ar: { email: "البريد الإلكتروني", phone: "الهاتف", location: "الموقع" },
  };
  const label = labels[params.locale] ?? labels.en;

  const serviceKeys = ["selection", "sales", "prePurchase", "vetCoordination", "documentation", "transport", "export", "viewing", "afterSale", "trainingCamp", "valorization"] as const;
  const requestedService = searchParams?.service;
  const initialService = requestedService && serviceKeys.includes(requestedService as (typeof serviceKeys)[number]) ? requestedService : "";
  const selectedService = initialService ? dict.services.list[initialService as keyof typeof dict.services.list] : null;

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={selectedService ? dict.services.title : dict.contact.eyebrow} title={selectedService ? selectedService.title : dict.contact.title} />
      <p className="mt-4 max-w-2xl text-charcoal/70">{selectedService ? selectedService.text : dict.contact.text}</p>

      <div className={`mt-12 grid gap-12 ${selectedService ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_1.2fr]"}`}>
        {!selectedService && <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{label.email}</p>
            <a href="mailto:sales@mechorses.com" className="text-charcoal">sales@mechorses.com</a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{label.phone}</p>
            <a href="tel:+33618313530" className="text-charcoal">+33 6 18 31 35 30</a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{label.location}</p>
            <p className="text-charcoal">La Chapelle-des-Fougeretz, Brittany, France</p>
          </div>
          <WhatsAppButton label={dict.detail.whatsapp} />
        </div>}
        <div className={`border border-charcoal-line p-6 ${selectedService ? "max-w-3xl" : ""}`}>
          <ContactForm locale={params.locale} dict={dict} horses={horseOptions} initialService={initialService} />
        </div>
      </div>
    </div>
  );
}
