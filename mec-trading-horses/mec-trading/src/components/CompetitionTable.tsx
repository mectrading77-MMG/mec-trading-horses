import type { CompetitionResult } from "@/types/horse";

export default function CompetitionTable({ results, dict }: { results: CompetitionResult[]; dict: any }) {
  if (results.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-charcoal-line font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">
            <th className="py-3 text-left">{dict.detail.table.competition}</th>
            <th className="py-3 text-left">{dict.detail.table.year}</th>
            <th className="py-3 text-left">{dict.detail.table.level}</th>
            <th className="py-3 text-left">{dict.detail.table.result}</th>
            <th className="py-3 text-left">{dict.detail.table.rider}</th>
            <th className="py-3 text-left">{dict.detail.table.location}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border-b border-charcoal-line/60">
              <td className="py-3 font-display italic text-charcoal">{r.competition}</td>
              <td className="py-3 font-mono text-xs text-charcoal/60">{r.year}</td>
              <td className="py-3 text-charcoal/70">{r.level}</td>
              <td className="py-3 text-gold">{r.result}</td>
              <td className="py-3 text-charcoal/70">{r.rider ?? "—"}</td>
              <td className="py-3 text-charcoal/70">{r.location ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
