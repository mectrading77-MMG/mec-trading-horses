import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";

type SampleInquiry = {
  name: string;
  country: string;
  email: string;
  phone: string;
  horse: string;
  message: string;
  date: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "VIEWING_SCHEDULED" | "SOLD" | "CLOSED";
};

const sampleInquiries: SampleInquiry[] = [
  {
    name: "Laila Al Farsi",
    country: "United Arab Emirates",
    email: "laila.alfarsi@example.com",
    phone: "+971 50 000 0000",
    horse: "Amira El Shams",
    message: "Interested in bloodline details and availability for export to Dubai.",
    date: "2026-08-18",
    status: "NEW"
  },
  {
    name: "Thomas Weber",
    country: "Germany",
    email: "t.weber@example.com",
    phone: "+49 151 000 0000",
    horse: "Orphée des Forges",
    message: "Would like to arrange a trial ride in the next two weeks.",
    date: "2026-08-15",
    status: "VIEWING_SCHEDULED"
  },
  {
    name: "Camille Dubreuil",
    country: "France",
    email: "camille.d@example.com",
    phone: "+33 6 00 00 00 00",
    horse: "Brio de Lune",
    message: "Looking for a young eventing prospect for my daughter's first FEI season.",
    date: "2026-08-10",
    status: "CONTACTED"
  }
];

const statusStyles: Record<SampleInquiry["status"], string> = {
  NEW: "bg-gold/10 text-gold",
  CONTACTED: "bg-charcoal/10 text-charcoal/70",
  QUALIFIED: "bg-hunter/10 text-hunter",
  VIEWING_SCHEDULED: "bg-hunter/10 text-hunter",
  SOLD: "bg-charcoal text-ivory",
  CLOSED: "bg-charcoal/5 text-charcoal/40"
};

export default async function AdminInquiriesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div>
      <h1 className="font-display text-2xl italic text-charcoal">{dict.admin.inquiries}</h1>

      <div className="mt-8 space-y-4">
        {sampleInquiries.map((inq) => (
          <div key={inq.email} className="border border-charcoal-line bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg italic text-charcoal">{inq.name}</p>
                <p className="text-sm text-charcoal/50">{inq.country} · {inq.email} · {inq.phone}</p>
              </div>
              <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow ${statusStyles[inq.status]}`}>
                {inq.status.replace("_", " ")}
              </span>
            </div>
            <p className="mt-3 text-sm text-charcoal/40">
              Re: <span className="text-charcoal/70">{inq.horse}</span>
            </p>
            <p className="mt-2 text-charcoal/80">{inq.message}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/30">
              {new Date(inq.date).toLocaleDateString(params.locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-charcoal/40">
        This view reads from placeholder data. Once Prisma is connected, replace it with
        <code className="mx-1 rounded bg-charcoal/5 px-1.5 py-0.5">db.inquiry.findMany()</code>
        and wire status changes to a PATCH route.
      </p>
    </div>
  );
}
