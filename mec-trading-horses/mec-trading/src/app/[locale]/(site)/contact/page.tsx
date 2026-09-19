import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.contact.eyebrow} title={dict.contact.title} />
      <p className="mt-4 max-w-lg text-charcoal/70">{dict.contact.text}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">Email</p>
            <a href="mailto:contact@mectrading.com" className="text-charcoal">contact@mectrading.com</a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">Phone</p>
            <a href="tel:+33600000000" className="text-charcoal">+33 6 00 00 00 00</a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">Location</p>
            <p className="text-charcoal">La Chapelle-des-Fougeretz, Brittany, France</p>
          </div>
          <WhatsAppButton label={dict.detail.whatsapp} />
        </div>
        <div className="border border-charcoal-line p-6">
          <ContactForm dict={dict} />
        </div>
      </div>
    </div>
  );
}
