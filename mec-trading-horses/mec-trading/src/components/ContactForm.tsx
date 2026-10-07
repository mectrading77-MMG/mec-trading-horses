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

const COUNTRY_PHONE_CODES: Record<string, string> = {
  AF:"+93", AL:"+355", DZ:"+213", AD:"+376", AO:"+244", AG:"+1-268", AR:"+54", AM:"+374", AU:"+61", AT:"+43", AZ:"+994", BS:"+1-242", BH:"+973", BD:"+880", BB:"+1-246", BY:"+375", BE:"+32", BZ:"+501", BJ:"+229", BT:"+975", BO:"+591", BA:"+387", BW:"+267", BR:"+55", BN:"+673", BG:"+359", BF:"+226", BI:"+257", CV:"+238", KH:"+855", CM:"+237", CA:"+1", CF:"+236", TD:"+235", CL:"+56", CN:"+86", CO:"+57", KM:"+269", CG:"+242", CD:"+243", CR:"+506", CI:"+225", HR:"+385", CU:"+53", CY:"+357", CZ:"+420", DK:"+45", DJ:"+253", DM:"+1-767", DO:"+1-809", EC:"+593", EG:"+20", SV:"+503", GQ:"+240", ER:"+291", EE:"+372", SZ:"+268", ET:"+251", FJ:"+679", FI:"+358", FR:"+33", GA:"+241", GM:"+220", GE:"+995", DE:"+49", GH:"+233", GR:"+30", GD:"+1-473", GT:"+502", GN:"+224", GW:"+245", GY:"+592", HT:"+509", HN:"+504", HU:"+36", IS:"+354", IN:"+91", ID:"+62", IR:"+98", IQ:"+964", IE:"+353", IL:"+972", IT:"+39", JM:"+1-876", JP:"+81", JO:"+962", KZ:"+7", KE:"+254", KI:"+686", KP:"+850", KR:"+82", KW:"+965", KG:"+996", LA:"+856", LV:"+371", LB:"+961", LS:"+266", LR:"+231", LY:"+218", LI:"+423", LT:"+370", LU:"+352", MG:"+261", MW:"+265", MY:"+60", MV:"+960", ML:"+223", MT:"+356", MH:"+692", MR:"+222", MU:"+230", MX:"+52", FM:"+691", MD:"+373", MC:"+377", MN:"+976", ME:"+382", MA:"+212", MZ:"+258", MM:"+95", NA:"+264", NR:"+674", NP:"+977", NL:"+31", NZ:"+64", NI:"+505", NE:"+227", NG:"+234", MK:"+389", NO:"+47", OM:"+968", PK:"+92", PW:"+680", PA:"+507", PG:"+675", PY:"+595", PE:"+51", PH:"+63", PL:"+48", PT:"+351", QA:"+974", RO:"+40", RU:"+7", RW:"+250", KN:"+1-869", LC:"+1-758", VC:"+1-784", WS:"+685", SM:"+378", ST:"+239", SA:"+966", SN:"+221", RS:"+381", SC:"+248", SL:"+232", SG:"+65", SK:"+421", SI:"+386", SB:"+677", SO:"+252", ZA:"+27", SS:"+211", ES:"+34", LK:"+94", SD:"+249", SR:"+597", SE:"+46", CH:"+41", SY:"+963", TJ:"+992", TZ:"+255", TH:"+66", TL:"+670", TG:"+228", TO:"+676", TT:"+1-868", TN:"+216", TR:"+90", TM:"+993", TV:"+688", UG:"+256", UA:"+380", AE:"+971", GB:"+44", US:"+1", UY:"+598", UZ:"+998", VU:"+678", VA:"+39", VE:"+58", VN:"+84", YE:"+967", ZM:"+260", ZW:"+263"
};


export default function ContactForm({
  dict,
  horseId,
  horseName,
  horses = []
}: {
  dict: any;
  horseId?: string;
  horseName?: string;
  horses?: { id: string; name: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [service, setService] = useState("");
  const [selectedHorse, setSelectedHorse] = useState("");
  const [viewingDate, setViewingDate] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [sendMethod, setSendMethod] = useState<"email" | "whatsapp" | "">("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const inquiryText = [
      `Name: ${payload.name ?? ""}`,
      `Email: ${payload.email ?? ""}`,
      `Country: ${payload.country ?? ""}`,
      `Phone: ${payload.phone ?? ""}`,
      `Service: ${payload.service ?? ""}`,
      payload.lookingFor ? `Horse: ${payload.lookingFor}` : "",
      payload.viewingDate ? `Viewing date: ${payload.viewingDate}` : "",
      `Message: ${payload.message ?? ""}`
    ].filter(Boolean).join("\n");

    if (sendMethod === "whatsapp") {
      window.location.href = "https://wa.me/33618313530?text=" + encodeURIComponent("MEC Horses inquiry\n\n" + inquiryText);
      setStatus("sent");
      return;
    }

    if (sendMethod === "email") {
      window.location.href = "mailto:mec.trading77@gmail.com?subject=" + encodeURIComponent("MEC Horses inquiry — " + (payload.name ?? "")) + "&body=" + encodeURIComponent(inquiryText);
      setStatus("sent");
      return;
    }

    setStatus("error");
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
        <select
          required
          name="country"
          value={country}
          onChange={(e) => {
            const nextCountry = e.target.value;
            setCountry(nextCountry);
            setPhone(COUNTRY_PHONE_CODES[nextCountry] ?? "");
          }}
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
        <input
          required
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={dict.form.phone}
          className={inputClass}
        />
      </div>

      <select
        required
        name="service"
        value={service}
        onChange={(e) => setService(e.target.value)}
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

      {service === "selection" && horses.length > 0 && (
        <select
          required
          name="lookingFor"
          value={selectedHorse}
          onChange={(e) => setSelectedHorse(e.target.value)}
          aria-label="Horse"
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            Select a horse
          </option>
          {horses.map((horse) => (
            <option key={horse.id} value={horse.name}>
              {horse.name}
            </option>
          ))}
          <option value="NOT_LISTED">Not listed</option>
        </select>
      )}
      {service === "viewing" && (
        <div className="relative w-full min-w-0">
          <input
            required
            type="date"
            name="viewingDate"
            aria-label="Select your viewing date"
            className={`${inputClass} box-border !w-full !min-w-0 !max-w-none appearance-none pr-12 text-left [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5`}
            value={viewingDate}
            onChange={(e) => setViewingDate(e.target.value)}
          />
          {!viewingDate && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-charcoal/40">
              Select your viewing date
            </span>
          )}
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M16 2v4M8 2v4M3 9h18" />
            </svg>
          </span>
        </div>
      )}
      <textarea required name="message" rows={4} placeholder={dict.form.message} className={inputClass} />

      <div className="grid gap-3">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/50">Send inquiry via</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 border border-charcoal-line px-4 py-3 text-sm">
            <input required type="radio" name="sendMethod" value="email" checked={sendMethod === "email"} onChange={() => setSendMethod("email")} />
            <span>Email — mec.trading77@gmail.com</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 border border-charcoal-line px-4 py-3 text-sm">
            <input required type="radio" name="sendMethod" value="whatsapp" checked={sendMethod === "whatsapp"} onChange={() => setSendMethod("whatsapp")} />
            <span>WhatsApp — +33 6 18 31 35 30</span>
          </label>
        </div>
      </div>

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
