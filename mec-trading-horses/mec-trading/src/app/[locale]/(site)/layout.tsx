import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";

export default async function SiteLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Header locale={params.locale} dict={dict} />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer locale={params.locale} dict={dict} />
      <StickyMobileBar dict={dict} />
    </>
  );
}
