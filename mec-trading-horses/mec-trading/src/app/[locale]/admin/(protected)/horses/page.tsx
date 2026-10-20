import Link from "next/link";
import HorseManager from "@/components/admin/HorseManager";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";

export default async function AdminHorsesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl italic text-charcoal">{dict.admin.horses}</h1>
          <p className="mt-2 text-sm text-charcoal/55">Manage existing horses, edit details, manage media, or remove listings.</p>
        </div>
        <Link href={`/${params.locale}/admin/horses/new`} className="bg-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-ivory hover:bg-hunter">
          {dict.admin.addHorse}
        </Link>
      </div>
      <div className="mt-8"><HorseManager /></div>
    </div>
  );
}
