import { redirect } from "next/navigation";
import Link from "next/link";
import { getCustomerSession } from "@/lib/customer-auth";

export default async function CustomerDashboard({ params }: { params: { locale: string } }) {
  const customer = await getCustomerSession();
  if (!customer) redirect(`/${params.locale}/account`);

  return (
    <main className="min-h-[75vh] bg-ivory px-6 py-16 text-charcoal">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-gold">MEC HORSES · MY ACCOUNT</p>
        <h1 className="mt-4 font-display text-5xl italic">Welcome, {customer.name}.</h1>
        <p className="mt-4 text-sm text-charcoal/60">You are signed in with {customer.email}.</p>
        <div className="mt-10 border-y border-charcoal/15 py-6">
          <h2 className="font-display text-2xl italic">Your account</h2>
          <p className="mt-2 text-sm leading-6 text-charcoal/65">Your personal MEC HORSES account is ready. You can use it when contacting our team about horses and services.</p>
        </div>
        <form action="/api/account/logout" method="post" className="mt-8">
          <button className="border border-charcoal px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] hover:border-gold hover:text-gold">Sign out</button>
        </form>
        <Link href={`/${params.locale}/horses-for-sale`} className="ml-5 text-sm underline underline-offset-4">Explore horses</Link>
      </div>
    </main>
  );
}
