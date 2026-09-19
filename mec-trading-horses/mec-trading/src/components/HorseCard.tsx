import Image from "next/image";
import Link from "next/link";
import type { Horse, Locale } from "@/types/horse";
import { ageFromDob, formatPrice, heightHands } from "@/lib/horses";

export default function HorseCard({ horse, locale, dict }: { horse: Horse; locale: Locale; dict: any }) {
  const cover = horse.media.find((m) => m.isCover) ?? horse.media[0];
  const price = formatPrice(horse.priceAmount, horse.priceCurrency, horse.priceOnRequest, locale);
  const t = horse.translations[locale] ?? horse.translations.en;

  return (
    <Link href={`/${locale}/horses-for-sale/${horse.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-soft">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt ?? t.name}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
        )}
        <span
          className={`absolute left-4 top-4 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow ${
            horse.status === "AVAILABLE"
              ? "bg-hunter text-ivory"
              : horse.status === "RESERVED"
              ? "bg-gold text-charcoal"
              : "bg-charcoal/80 text-ivory"
          }`}
        >
          {dict.horse.statusLabel[horse.status]}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl italic text-charcoal">{t.name}</h3>
          <p className="mt-1 text-sm text-charcoal/60">
            {horse.breed} · {dict.horse.sexLabel[horse.sex]} · {ageFromDob(horse.dateOfBirth)} {dict.horse.years}
          </p>
          <p className="text-sm text-charcoal/60">
            {heightHands(horse.heightCm)} · {dict.disciplines[horse.discipline]}
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/40">
            {horse.locationLabel}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-lg text-gold">{price ?? dict.horse.priceOnRequest}</p>
        </div>
      </div>
    </Link>
  );
}
