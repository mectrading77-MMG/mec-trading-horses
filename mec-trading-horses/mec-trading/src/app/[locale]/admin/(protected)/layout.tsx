import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const session = await getSession();

  // Defence in depth: middleware already redirects unauthenticated requests
  // away from every /admin/* route except /admin/login, but that check only
  // looks at cookie *presence*. This verifies the JWT signature itself, so a
  // forged or expired cookie still can't render the dashboard.
  if (!session) {
    redirect(`/${params.locale}/admin/login`);
  }

  const dict = await getDictionary(params.locale);
  const base = `/${params.locale}/admin`;

  const links = [
    { href: base, label: dict.admin.dashboard },
    { href: `${base}/horses`, label: dict.admin.horses },
    { href: `${base}/inquiries`, label: dict.admin.inquiries }
  ];

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-56 shrink-0 border-r border-charcoal-line bg-charcoal text-ivory lg:block">
        <div className="px-6 py-6">
          <span className="font-display text-xl italic">MEC Horses</span>
          <p className="font-mono text-[9px] uppercase tracking-eyebrow text-gold">Admin</p>
        </div>
        <nav className="mt-4 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-t border-ivory/10 px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-ivory/70 hover:bg-charcoal-soft hover:text-ivory"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-ivory/10 px-6 py-4">
          <SignOutButton label={dict.admin.signOut} locale={params.locale} />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-charcoal-line px-6 py-4 lg:hidden">
          <span className="font-display text-lg italic text-charcoal">MEC Horses Admin</span>
          <SignOutButton label={dict.admin.signOut} locale={params.locale} />
        </header>
        <div className="p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
