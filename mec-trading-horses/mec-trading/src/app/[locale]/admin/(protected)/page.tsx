import Link from "next/link";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses } from "@/lib/horses";

export default async function AdminDashboardPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const horses = await listHorses();

  const counts = {
    available: horses.filter((h) => h.status === "AVAILABLE").length,
    reserved: horses.filter((h) => h.status === "RESERVED").length,
    sold: horses.filter((h) => h.status === "SOLD").length
  };

  const stats = [
    { label: "Available", value: counts.available },
    { label: "Reserved", value: counts.reserved },
    { label: "Sold", value: counts.sold },
    { label: "New inquiries", value: 3 }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">{dict.admin.dashboard}</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-charcoal-line bg-white p-6">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{s.label}</p>
            <p className="mt-2 font-display text-3xl italic text-charcoal">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href={`/${params.locale}/admin/horses/new`}
          className="bg-charcoal px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory hover:bg-hunter"
        >
          {dict.admin.addHorse}
        </Link>
        <Link
          href={`/${params.locale}/admin/inquiries`}
          className="border border-charcoal-line px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal hover:border-gold hover:text-gold"
        >
          {dict.admin.inquiries}
        </Link>
      </div>
    </div>
  );
}
