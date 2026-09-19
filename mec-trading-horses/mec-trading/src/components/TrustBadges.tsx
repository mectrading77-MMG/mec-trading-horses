import type { Horse } from "@/types/horse";

export default function TrustBadges({ trust, hasResults, dict }: { trust: Horse["trust"]; hasResults: boolean; dict: any }) {
  const badges = [
    trust.vetDocs && dict.trust.vetDocs,
    trust.xrays && dict.trust.xrays,
    trust.pedigreeDocs && dict.trust.pedigreeDocs,
    trust.transport && dict.trust.transport,
    hasResults && dict.trust.competitionRecord
  ].filter(Boolean) as string[];

  if (badges.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {badges.map((label) => (
        <li key={label} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-hunter">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}
