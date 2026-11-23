import { redirect } from "next/navigation";
import Link from "next/link";
import { getCustomerSession } from "@/lib/customer-auth";

const copy = {
  en: { label: "MY ACCOUNT", welcome: "Welcome", signed: "You are signed in with", account: "Your account", description: "Your personal MEC HORSES account is ready. You can use it when contacting our team about horses and services.", horses: "Explore horses" },
  fr: { label: "MON COMPTE", welcome: "Bienvenue", signed: "Vous êtes connecté avec", account: "Votre compte", description: "Votre compte personnel MEC HORSES est prêt. Vous pouvez l’utiliser pour contacter notre équipe au sujet des chevaux et de nos services.", horses: "Découvrir les chevaux" },
  ar: { label: "حسابي", welcome: "مرحبًا", signed: "تم تسجيل الدخول باستخدام", account: "حسابك", description: "أصبح حسابك الشخصي في MEC HORSES جاهزًا. يمكنك استخدامه عند التواصل مع فريقنا بشأن الخيول والخدمات.", horses: "اكتشف الخيول" }
} as const;

export default async function CustomerDashboard({ params }: { params: { locale: string } }) {
  const customer = await getCustomerSession();
  if (!customer) redirect(`/${params.locale}/account`);
  const t = copy[params.locale as keyof typeof copy] ?? copy.en;

  return (
    <main dir={params.locale === "ar" ? "rtl" : "ltr"} className="min-h-[75vh] bg-ivory px-6 py-16 text-charcoal">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-gold">MEC HORSES · {t.label}</p>
        <h1 className="mt-4 font-display text-5xl italic">{t.welcome}, {customer.name}.</h1>
        <p className="mt-4 text-sm text-charcoal/60">{t.signed} {customer.email}.</p>
        <div className="mt-10 border-y border-charcoal/15 py-6">
          <h2 className="font-display text-2xl italic">{t.account}</h2>
          <p className="mt-2 text-sm leading-6 text-charcoal/65">{t.description}</p>
        </div>
        <Link href={`/${params.locale}/horses-for-sale`} className="mt-8 inline-block text-sm underline underline-offset-4">{t.horses}</Link>
      </div>
    </main>
  );
}
