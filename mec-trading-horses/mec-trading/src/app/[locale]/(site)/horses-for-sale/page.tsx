import type { Metadata } from "next";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import { listHorses } from "@/lib/horses";
import CatalogClient from "@/components/CatalogClient";
import SectionHeading from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return { title: dict.catalog.title, description: dict.catalog.subtitle };
}

export default async function HorsesForSalePage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { level?: string };
}) {
  const dict = await getDictionary(params.locale);
  const horses = await listHorses();

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.catalog.title} title={dict.catalog.subtitle} />
      <div className="mt-8">
        <CatalogClient
          horses={horses}
          locale={params.locale}
          dict={dict}
          initialLevel={searchParams.level}
        />
      </div>
    </div>
  );
}
