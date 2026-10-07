import Link from "next/link";
import StatusControls from "@/components/admin/StatusControls";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses, ageFromDob, formatPrice } from "@/lib/horses";
import { formatJumpHeight } from "@/lib/levels";

export default async function AdminHorsesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const horses = await listHorses();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl italic text-charcoal">{dict.admin.horses}</h1>
        <Link
          href={`/${params.locale}/admin/horses/new`}
          className="bg-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-ivory hover:bg-hunter"
        >
          {dict.admin.addHorse}
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-charcoal-line bg-white">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-charcoal-line bg-ivory-dim font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Breed</th>
              <th className="px-4 py-3 text-left">Age</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {horses.map((horse) => {
              const t = horse.translations[params.locale] ?? horse.translations.en;
              const price = formatPrice(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, params.locale);
              return (
                <tr key={horse.id} className="border-b border-charcoal-line/60">
                  <td className="px-4 py-3 font-display italic text-charcoal">{t.name}</td>
                  <td className="px-4 py-3 text-charcoal/70">{horse.breed}</td>
                  <td className="px-4 py-3 text-charcoal/70">{ageFromDob(horse.dateOfBirth)}</td>
                  <td className="px-4 py-3 text-charcoal/70">{formatJumpHeight(horse.jumpHeightCm)}</td>
                  <td className="px-4 py-3 text-charcoal/70">{price ?? dict.horse.priceOnRequest}</td>
                  <td className="px-4 py-3">
                    <StatusControls horseId={horse.id} status={horse.status} dict={dict} />
                  </td>
                  <td className="px-4 py-3 text-charcoal/50">{horse.featuredOnHome ? "Yes" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/${params.locale}/horses-for-sale/${horse.slug}`}
                      className="font-mono text-[11px] uppercase tracking-eyebrow text-gold underline underline-offset-4"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

   </div>
  );
}
