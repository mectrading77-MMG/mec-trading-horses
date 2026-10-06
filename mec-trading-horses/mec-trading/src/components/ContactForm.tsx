"use client";

import { useState } from "react";

const inputClass =
  "w-full border border-charcoal-line bg-transparent px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold";

const SERVICE_KEYS = [
  "selection",
  "sales",
  "prePurchase",
  "vetCoordination",
  "documentation",
  "transport",
  "export",
  "viewing",
  "afterSale"
] as const;

const COUNTRY_CODES = [
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
] as const;

const COUNTRY_NAMES = new Intl.DisplayNames(["en"], { type: "region" });

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
        <select
          required
          name="country"
          defaultValue=""
          aria-label={dict.form.country}
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            {dict.form.country}
          </option>
          {COUNTRY_CODES.map((code) => (
            <option key={code} value={code}>
              {COUNTRY_NAMES.of(code)}
            </option>
          ))}
        </select>
      </div>

      <select
        required
        name="service"
        defaultValue=""
        aria-label="Service"
        className={`${inputClass} appearance-none`}
      >
        <option value="" disabled>
          Select a service
        </option>
        {SERVICE_KEYS.map((key) => (
          <option key={key} value={key}>
            {dict.services.list[key].title}
          </option>
        ))}
      </select>

      <textarea required name="message" rows={4} placeholder={dict.form.message} className={inputClass} />

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
