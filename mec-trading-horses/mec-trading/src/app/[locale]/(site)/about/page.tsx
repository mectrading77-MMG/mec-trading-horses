import Image from "next/image";
import type { Locale } from "@/types/horse";
import { getDictionary } from "@/i18n/config";
import SectionHeading from "@/components/SectionHeading";

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-editorial px-6 py-16 lg:px-10">
      <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-soft">
          <Image
            src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1600"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-charcoal/80">
          <p>
            MEC Trading is a private horse trading house based in Brittany, France, working with
            professional riders, breeders and private clients across Europe and the Gulf.
          </p>
          <p>
            Every horse offered is selected personally — for conformation, temperament, way of
            going, and soundness — before it is ever presented to a buyer. We do not list horses
            on behalf of third parties: each horse shown here is owned or directly represented by
            MEC Trading.
          </p>
          <p>
            Our clients are buying at a distance as often as not, so documentation, veterinary
            transparency and clear communication carry as much weight as the horse itself. We
            coordinate viewings, vetting, transport and export paperwork so that a purchase from
            abroad feels no different from one made in person.
          </p>
        </div>
      </div>
    </div>
  );
}
