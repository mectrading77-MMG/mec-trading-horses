"use client";

import { useState } from "react";
import Link from "next/link";

type Service = { key: string; title: string; text: string };
type Props = { locale: string; services: Service[] };

export default function ServicePiano({ locale, services }: Props) {
  const [active, setActive] = useState(0);
  const rtl = locale === "ar";
  const heading = locale === "fr" ? "L’expertise MEC HORSES" : locale === "ar" ? "خبرة MEC HORSES" : "The MEC HORSES experience";
  const intro = locale === "fr"
    ? "Un accompagnement pensé autour du cheval, du cavalier et de chaque étape de votre projet."
    : locale === "ar"
      ? "خدمات متكاملة تتمحور حول الحصان والفارس وكل خطوة في رحلتك."
      : "Considered support shaped around the horse, the rider and every stage of your journey.";
  const cta = locale === "fr" ? "Découvrir le service" : locale === "ar" ? "اكتشف الخدمة" : "Explore service";
  const eyebrow = locale === "fr" ? "NOS SERVICES" : locale === "ar" ? "خدماتنا" : "OUR SERVICES";

  return (
    <main className="service-world" dir={rtl ? "rtl" : "ltr"}>
      <section className="service-cinematic">
        <div className="service-cinematic-copy">
          <p className="service-eyebrow">{eyebrow} · MEC HORSES</p>
          <h1>{heading}</h1>
          <p className="service-lede">{intro}</p>
          <span className="service-scroll-mark"><i /> {locale === "fr" ? "DÉCOUVRIR" : locale === "ar" ? "اكتشف المزيد" : "DISCOVER MORE"}</span>
        </div>
        <div className="jumping-arena" aria-hidden="true">
          <div className="arena-glow" />
          <div className="arena-ground" />
          <svg className="jump-horse" viewBox="0 0 560 340" role="presentation">
            <g className="horse-motion" fill="currentColor">
              <path d="M120 192 C145 158 185 142 228 145 C259 147 277 163 302 169 L347 157 L372 131 L401 126 L418 139 L405 154 L383 158 L365 185 C351 207 331 220 303 224 L280 270 L260 270 L269 218 L223 215 L194 264 L174 263 L190 205 C161 211 140 207 120 192Z"/>
              <path d="M363 157 C350 132 344 105 356 83 C369 60 392 53 410 64 L430 82 L420 94 L402 83 C390 79 379 90 381 106 L390 137Z"/>
              <path d="M403 65 L416 43 L422 69 M389 66 L390 42 L400 65" />
              <path d="M147 176 L105 148 L96 157 L126 194Z"/>
              <path d="M220 211 L212 282 L229 282 L248 215 M300 215 L324 278 L341 275 L330 205" />
            </g>
          </svg>
          <div className="jump-obstacle"><span /><span /><span /><b /></div>
          <div className="arena-caption">WHERE CHAMPIONS CHANGE HANDS</div>
        </div>
      </section>

      <section className="service-piano-section">
        <div className="service-section-heading">
          <p className="service-eyebrow">{locale === "fr" ? "UN ACCOMPAGNEMENT SUR MESURE" : locale === "ar" ? "خدمات مصممة خصيصًا" : "A TAILORED APPROACH"}</p>
          <h2>{locale === "fr" ? "Choisissez votre parcours" : locale === "ar" ? "اختر الخدمة المناسبة لك" : "Choose your journey"}</h2>
          <p>{locale === "fr" ? "Chaque service ouvre sur une expertise dédiée." : locale === "ar" ? "كل خدمة تقودك إلى تجربة متخصصة ونموذج طلب مخصص." : "Every service opens into dedicated expertise and a tailored application."}</p>
        </div>
        <div className="service-piano" role="tablist" aria-label={heading}>
          {services.map((service, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`service-panel-${index}`}
              key={service.key}
              className={`piano-key ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span className="piano-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="piano-title">{service.title}</span>
              <span className="piano-plus">{active === index ? "−" : "+"}</span>
            </button>
          ))}
        </div>
        <div className="piano-detail" id={`service-panel-${active}`} role="tabpanel">
          <div>
            <span className="service-eyebrow">MEC HORSES · {String(active + 1).padStart(2, "0")}</span>
            <h3>{services[active]?.title}</h3>
            <p>{services[active]?.text}</p>
          </div>
          <Link href={`/${locale}/services/${services[active]?.key}`} className="service-cta">{cta}<span aria-hidden="true"> ↗</span></Link>
        </div>
      </section>
    </main>
  );
}
