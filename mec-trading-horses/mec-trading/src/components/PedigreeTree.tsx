"use client";

import { useState } from "react";
import type { PedigreeEntry } from "@/types/horse";

function findEntry(entries: PedigreeEntry[], position: string) {
  return entries.find((e) => e.position === position);
}

function Node({ entry, position }: { entry?: PedigreeEntry; position: string }) {
  return (
    <div className="pedigree-branch flex flex-col items-center border border-charcoal-line bg-ivory px-4 py-3 text-center">
      <span className="font-mono text-[9px] uppercase tracking-eyebrow text-gold">{position.split(".").pop()}</span>
      <span className="mt-1 font-display text-base italic text-charcoal">{entry?.name ?? "—"}</span>
      {entry?.breed && <span className="mt-0.5 text-xs text-charcoal/50">{entry.breed}</span>}
      {entry?.competitionNote && <span className="mt-0.5 text-[11px] text-hunter">{entry.competitionNote}</span>}
    </div>
  );
}

export default function PedigreeTree({ entries, dict }: { entries: PedigreeEntry[]; dict: any }) {
  const [expanded, setExpanded] = useState(false);
  const hasThirdGen = entries.some((e) => e.position.split(".").length >= 3);

  const branches: Array<{ root: string; gen2: [string, string] }> = [
    { root: "sire", gen2: ["sire.sire", "sire.dam"] },
    { root: "dam", gen2: ["dam.sire", "dam.dam"] }
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div key={branch.root} className="flex flex-col items-center gap-6">
            <Node entry={findEntry(entries, branch.root)} position={branch.root} />
            <div className="grid grid-cols-2 gap-3">
              {branch.gen2.map((pos) => (
                <Node key={pos} entry={findEntry(entries, pos)} position={pos} />
              ))}
            </div>
            {expanded && (
              <div className="grid grid-cols-4 gap-2">
                {branch.gen2.flatMap((pos) => [`${pos}.sire`, `${pos}.dam`]).map((pos) => (
                  <Node key={pos} entry={findEntry(entries, pos)} position={pos} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasThirdGen && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mx-auto mt-8 block font-mono text-[11px] uppercase tracking-eyebrow text-gold underline underline-offset-4"
        >
          {dict.detail.showMoreGenerations}
        </button>
      )}
    </div>
  );
}
