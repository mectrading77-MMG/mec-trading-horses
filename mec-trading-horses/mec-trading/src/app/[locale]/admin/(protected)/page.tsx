export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses } from "@/lib/horses";
import { db } from "@/lib/db";

export default async function AdminDashboardPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const [horses, newInquiries, newHorseSearches] = await Promise.all([
    listHorses(),
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.count({ where: { service: "selection", status: "NEW" } })
  ]);

  const counts = {
    available: horses.filter((h) => h.status === "AVAILABLE").length,
    reserved: horses.filter((h) => h.status === "RESERVED").length,
    sold: horses.filter((h) => h.status === "SOLD").length
  };

  const stats = [
    { label: "Available", value: counts.available, href: `/${params.locale}/admin/horses?status=AVAILABLE` },
    { label: "Reserved", value: counts.reserved, href: `/${params.locale}/admin/horses?status=RESERVED` },
    { label: "Sold", value: counts.sold, href: `/${params.locale}/admin/horses?status=SOLD` },
    { label: "New inquiries", value: newInquiries, href: `/${params.locale}/admin/inquiries` },
    { label: "New horse search requests", value: newHorseSearches, href: `/${params.locale}/admin/inquiries?service=selection` }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">{dict.admin.dashboard}</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="block min-h-32 border border-charcoal-line bg-white p-6 transition-colors hover:border-gold hover:bg-ivory-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{s.label}</p>
            <p className="mt-2 font-display text-3xl italic text-charcoal">{s.value}</p>
            <p className="mt-3 text-xs text-gold">Open section →</p>
          </Link>
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
