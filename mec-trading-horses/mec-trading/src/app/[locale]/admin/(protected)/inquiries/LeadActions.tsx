"use client";

import { useState } from "react";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "HORSES_SENT", "NEGOTIATION", "VIEWING_SCHEDULED", "WON", "LOST"];

export default function LeadActions({ id, initialStatus, initialNotes }: { id: string; initialStatus: string; initialNotes: string | null }) {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, notes })
      });
      if (!response.ok) throw new Error("Save failed");
      setMessage("Saved");
    } catch {
      setMessage("Could not save changes");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-5 border-t border-charcoal-line pt-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
        <label className="grid gap-1 text-xs text-charcoal/50">
          Pipeline stage
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="border border-charcoal-line bg-white px-3 py-2 text-sm text-charcoal">
            {statuses.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-xs text-charcoal/50">
          Internal notes
          <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add follow-up notes…" className="border border-charcoal-line bg-white px-3 py-2 text-sm text-charcoal" />
        </label>
        <button type="button" disabled={saving} onClick={save} className="bg-charcoal px-5 py-2 text-xs uppercase tracking-wider text-white disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      {message && <p className="mt-2 text-xs text-charcoal/50">{message}</p>}
    </div>
  );
}
