import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

const KEYS = [
  "selection",
  "sales",
  "prePurchase",
  "vetCoordination",
  "documentation",
  "transport",
  "export",
  "viewing",
  "afterSale"
] as const;

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} />
      <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {KEYS.map((key, i) => (
          <div key={key} className="border-t border-charcoal-line pt-5">
            <span className="font-mono text-[10px] text-charcoal/30">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-display text-xl italic text-charcoal">{dict.services.list[key].title}</h3>
            <p className="mt-2 text-sm text-charcoal/60">{dict.services.list[key].text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
