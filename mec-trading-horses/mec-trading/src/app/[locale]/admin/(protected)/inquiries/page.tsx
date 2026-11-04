import LeadActions from "./LeadActions";
import { db } from "@/lib/db";

const statusStyles: Record<string, string> = {
  NEW: "bg-gold/10 text-gold",
  CONTACTED: "bg-charcoal/10 text-charcoal/70",
  QUALIFIED: "bg-hunter/10 text-hunter",
  HORSES_SENT: "bg-hunter/10 text-hunter",
  NEGOTIATION: "bg-gold/10 text-gold",
  VIEWING_SCHEDULED: "bg-hunter/10 text-hunter",
  WON: "bg-charcoal text-ivory",
  LOST: "bg-charcoal/5 text-charcoal/40",
  SOLD: "bg-charcoal text-ivory",
  CLOSED: "bg-charcoal/5 text-charcoal/40"
};

export default async function AdminInquiriesPage() {
  const inquiries = await db.inquiry.findMany({
    include: { horse: { include: { translations: true } } },
    orderBy: { createdAt: "desc" },
    take: 200
  });

  const counts = {
    total: inquiries.length,
    new: inquiries.filter((item) => item.status === "NEW").length,
    active: inquiries.filter((item) => ["CONTACTED", "QUALIFIED", "HORSES_SENT", "NEGOTIATION", "VIEWING_SCHEDULED"].includes(item.status)).length,
    won: inquiries.filter((item) => ["WON", "SOLD"].includes(item.status)).length
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold">Customer relationship management</p>
          <h1 className="mt-2 font-display text-2xl italic text-charcoal">CRM · Leads</h1>
        </div>
        <p className="text-xs text-charcoal/50">Showing the latest 200 leads</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total leads", counts.total],
          ["New", counts.new],
          ["Active pipeline", counts.active],
          ["Won", counts.won]
        ].map(([label, value]) => (
          <div key={label} className="border border-charcoal-line bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/40">{label}</p>
            <p className="mt-2 font-display text-3xl italic text-charcoal">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <div className="border border-charcoal-line bg-white p-10 text-center">
            <p className="font-display text-xl italic text-charcoal">No leads yet</p>
            <p className="mt-2 text-sm text-charcoal/50">Website inquiries will appear here automatically.</p>
          </div>
        ) : inquiries.map((inq) => {
          const horseName = inq.horse?.translations.find((t) => t.locale === "en")?.name;
          return (
            <article key={inq.id} className="border border-charcoal-line bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg italic text-charcoal">{inq.name}</h2>
                  <p className="mt-1 text-sm text-charcoal/55">{[inq.country, inq.email, inq.phone].filter(Boolean).join(" · ")}</p>
                </div>
                <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow ${statusStyles[inq.status] ?? statusStyles.NEW}`}>
                  {inq.status.replaceAll("_", " ")}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <p><span className="text-charcoal/40">Service:</span> {inq.service}</p>
                <p><span className="text-charcoal/40">Horse:</span> {horseName ?? inq.lookingFor ?? "—"}</p>
                <p><span className="text-charcoal/40">Preferred contact:</span> {inq.preferredContact}</p>
                <p><span className="text-charcoal/40">Source:</span> {inq.source}</p>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-charcoal/80">{inq.message}</p>
              {inq.notes && <p className="mt-3 border-l-2 border-gold pl-3 text-sm text-charcoal/60">Notes: {inq.notes}</p>}
              <p className="mt-4 font-mono text-[10px] uppercase tracking-eyebrow text-charcoal/35">
                {inq.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} · ID {inq.id}
              </p>
              <LeadActions id={inq.id} initialStatus={inq.status} initialNotes={inq.notes} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
