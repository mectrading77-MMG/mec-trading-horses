import type { Locale } from "@/types/horse";

export default function ConfidentialitePage({ params }: { params: { locale: Locale } }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16 text-charcoal sm:py-24 lg:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9a7837]">MEC HORSES · DONNÉES PERSONNELLES</p>
      <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">Politique de confidentialité</h1>
      <p className="mt-5 text-sm leading-7 text-charcoal/65">Cette politique explique comment MEC Trading SAS, exploitant le nom commercial MEC Horses, traite les données personnelles des visiteurs et des clients de mechorses.com.</p>
      <div className="mt-10 space-y-8 text-sm leading-7">
        <section><h2 className="font-display text-2xl italic">Responsable du traitement</h2><p className="mt-3">MEC Trading SAS, La Chapelle-des-Fougeretz, 35520, France. Contact : sales@mechorses.com.</p></section>
        <section><h2 className="font-display text-2xl italic">Données traitées</h2><p className="mt-3">Selon votre utilisation du site, les données peuvent inclure votre nom, adresse e-mail, numéro de téléphone, pays, contenu de votre demande, informations communiquées lors de la création d’un compte et données techniques nécessaires à la sécurité du site. Ne transmettez pas de données sensibles dans les formulaires.</p></section>
        <section><h2 className="font-display text-2xl italic">Finalités et bases légales</h2><p className="mt-3">Les données sont utilisées pour répondre aux demandes concernant les chevaux et les services (mesures précontractuelles ou intérêt légitime), gérer les comptes clients et les services demandés (exécution du contrat), assurer la sécurité et prévenir les abus (intérêt légitime), et respecter les obligations légales applicables (obligation légale).</p></section>
        <section><h2 className="font-display text-2xl italic">Destinataires et transferts</h2><p className="mt-3">Les données sont accessibles uniquement aux personnes habilitées chez MEC Trading SAS et aux prestataires techniques intervenant pour le fonctionnement du site, dans la limite de leurs missions. Si un prestataire traite des données hors de l’Espace économique européen, les garanties prévues par le RGPD doivent être mises en place.</p></section>
        <section><h2 className="font-display text-2xl italic">Durée de conservation</h2><p className="mt-3">Les données sont conservées pendant la durée nécessaire à la gestion de votre demande ou de votre compte, puis archivées ou supprimées conformément aux obligations légales et aux délais de prescription applicables. Les durées précises doivent être définies dans le registre interne des traitements.</p></section>
        <section><h2 className="font-display text-2xl italic">Vos droits</h2><p className="mt-3">Conformément au RGPD, vous pouvez demander l’accès, la rectification, l’effacement, la limitation du traitement, vous opposer à certains traitements et, lorsque cela s’applique, demander la portabilité de vos données ou retirer votre consentement. Adressez votre demande à sales@mechorses.com. Vous pouvez également déposer une réclamation auprès de la CNIL : <a className="underline" href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">www.cnil.fr/fr/plaintes</a>.</p></section>
        <section><h2 className="font-display text-2xl italic">Sécurité</h2><p className="mt-3">MEC Trading SAS met en œuvre des mesures techniques et organisationnelles adaptées afin de protéger les données contre l’accès non autorisé, la perte ou l’altération. Aucun service en ligne ne peut toutefois garantir une sécurité absolue.</p></section>
        <section><h2 className="font-display text-2xl italic">Contact</h2><p className="mt-3">Pour toute question relative à cette politique ou à vos données personnelles : sales@mechorses.com.</p></section>
      </div>
      <p className="mt-12 border-t border-charcoal/10 pt-5 text-xs text-charcoal/45">Dernière mise à jour : novembre 2026.</p>
    </article>
  );
}
