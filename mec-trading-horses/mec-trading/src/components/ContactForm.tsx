"use client";

import { useState } from "react";

const inputClass =
  "w-full border border-charcoal-line bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold";

export default function ContactForm({
  dict,
  horseId,
  horseName
}: {
  dict: any;
  horseId?: string;
  horseName?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, horseId })
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-hunter bg-hunter/5 p-8 text-center">
        <p className="font-display text-xl italic text-hunter">{dict.form.sentTitle}</p>
        <p className="mt-2 text-sm text-charcoal/60">{dict.form.sentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {horseName && <input type="hidden" name="lookingForHorse" value={horseName} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder={dict.form.name} className={inputClass} />
        <input required type="email" name="email" placeholder={dict.form.email} className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="phone" placeholder={dict.form.phone} className={inputClass} />
        <input name="country" placeholder={dict.form.country} className={inputClass} />
      </div>
      <textarea required name="message" rows={4} placeholder={dict.form.message} className={inputClass} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="lookingFor" placeholder={dict.form.lookingFor} className={inputClass} />
        <select name="hasTrainer" className={inputClass}>
          <option value="">{dict.form.hasTrainer}</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <input type="date" name="viewingDate" aria-label={dict.form.viewingDate} className={inputClass} />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 bg-charcoal px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory transition-colors duration-400 hover:bg-hunter disabled:opacity-60"
      >
        {status === "sending" ? "…" : dict.form.send}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">Something went wrong — please try again or contact us directly.</p>
      )}
    </form>
  );
}
