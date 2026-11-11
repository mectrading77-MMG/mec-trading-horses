import type { Locale } from "@/types/horse";

export default function CookiesPage({ params }: { params: { locale: Locale } }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16 text-charcoal sm:py-24 lg:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9a7837]">MEC HORSES · TRACEURS</p>
      <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">Politique relative aux cookies</h1>
      <p className="mt-5 text-sm leading-7 text-charcoal/65">Cette page présente les règles applicables aux cookies et autres traceurs utilisés sur mechorses.com.</p>
      <div className="mt-10 space-y-8 text-sm leading-7">
        <section><h2 className="font-display text-2xl italic">Cookies strictement nécessaires</h2><p className="mt-3">Certains traceurs peuvent être nécessaires au fonctionnement technique du site, à la sécurité, à la navigation ou à l’authentification. Lorsqu’ils sont strictement nécessaires au service demandé, ils ne nécessitent pas de consentement préalable, mais doivent être expliqués aux utilisateurs.</p></section>
        <section><h2 className="font-display text-2xl italic">Mesure d’audience et publicité</h2><p className="mt-3">Aucun outil de mesure d’audience ou de publicité tiers n’est déclaré dans la version actuelle du site. Si de tels outils sont ajoutés, les traceurs non essentiels ne seront activés qu’après recueil du consentement lorsque la réglementation l’exige.</p></section>
        <section><h2 className="font-display text-2xl italic">Gérer les cookies</h2><p className="mt-3">Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies. Le blocage de certains cookies strictement nécessaires peut empêcher le fonctionnement de certaines fonctionnalités, notamment l’accès à un compte.</p></section>
        <section><h2 className="font-display text-2xl italic">Durée et évolution</h2><p className="mt-3">Les durées de vie des traceurs dépendent de leur finalité et de leur configuration. Cette politique doit être actualisée à chaque ajout ou modification d’un cookie ou d’un prestataire tiers.</p></section>
        <section><h2 className="font-display text-2xl italic">Contact</h2><p className="mt-3">Pour toute question : sales@mechorses.com.</p></section>
      </div>
      <p className="mt-12 border-t border-charcoal/10 pt-5 text-xs text-charcoal/45">Dernière mise à jour : novembre 2026.</p>
    </article>
  );
}
