import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

const posts = [
  { title: "Orphée des Forges placed at CSI3* Deauville", date: "2026-07-18" },
  { title: "MEC Trading now assisting Gulf-based buyers with export documentation", date: "2026-06-02" },
  { title: "Why we vet every horse independently before it is offered", date: "2026-05-10" }
];

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.nav.news} title={dict.nav.news} />
      <ul className="mt-12 divide-y divide-charcoal-line border-y border-charcoal-line">
        {posts.map((post) => (
          <li key={post.title} className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-display text-xl italic text-charcoal">{post.title}</h3>
            <time className="font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/40">
              {new Date(post.date).toLocaleDateString(params.locale, { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
