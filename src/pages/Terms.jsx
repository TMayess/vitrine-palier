export default function Terms() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-16">
        <p className="text-palier-cyan text-sm tracking-widest uppercase mb-4">Conditions d'utilisation</p>
        <h1 className="font-display italic text-5xl text-palier-ivory mb-6">
          Utiliser Palier en toute clarté.
        </h1>
        <p className="text-palier-muted text-sm">Dernière mise à jour : 9 juin 2026</p>
      </header>

      <div className="prose-palier">

        <Section title="1. Acceptation des conditions">
          <p>
            En téléchargeant, installant ou utilisant l'application Palier, vous acceptez d'être lié par les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
          </p>
          <p>
            Ces conditions s'appliquent à toutes les versions de l'application Palier disponibles sur le Google Play Store.
          </p>
        </Section>

        <Section title="2. Description du service">
          <p>
            Palier est une application mobile de logbook (carnet de bord) de plongée sous-marine à usage strictement personnel. Elle permet à l'utilisateur d'enregistrer, d'organiser et de consulter ses plongées — sites, profondeurs, durées, conditions, équipiers.
          </p>
          <p>
            Palier est un outil de journalisation personnelle. Il ne constitue pas :
          </p>
          <ul>
            <li>Un dispositif médical ou de santé</li>
            <li>Un outil de certification de plongée</li>
            <li>Un système de navigation ou de sécurité sous-marine</li>
            <li>Un substitut à une formation certifiée en plongée sous-marine</li>
          </ul>
        </Section>

        <Disclaimer />

        <Section title="4. Compte utilisateur">
          <p>
            La création d'un compte est facultative. En mode local, toutes les données restent sur votre appareil. Si vous créez un compte pour activer la synchronisation cloud :
          </p>
          <ul>
            <li>Vous êtes responsable de la sécurité de vos identifiants.</li>
            <li>Vous vous engagez à fournir des informations exactes lors de l'inscription.</li>
            <li>Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l'application.</li>
          </ul>
          <p>
            Nous nous réservons le droit de suspendre ou supprimer un compte en cas d'utilisation abusive, frauduleuse ou contraire aux présentes conditions.
          </p>
        </Section>

        <Section title="5. Propriété intellectuelle">
          <p>
            L'application Palier, son code source, son design, ses graphismes et son contenu éditorial sont protégés par le droit d'auteur. Toute reproduction, modification, distribution ou exploitation commerciale sans autorisation écrite préalable est interdite.
          </p>
          <p>
            Les données de plongée que vous saisissez dans l'application vous appartiennent. Vous nous accordez uniquement la licence nécessaire pour les stocker et les synchroniser à votre demande.
          </p>
        </Section>

        <Section title="6. Limitation de responsabilité">
          <p>
            Dans les limites autorisées par la loi applicable, Palier et ses développeurs ne sauraient être tenus responsables :
          </p>
          <ul>
            <li>Des pertes de données liées à une défaillance technique de l'appareil ou d'un service tiers (Firebase)</li>
            <li>Des décisions de plongée prises sur la base des informations enregistrées dans l'application</li>
            <li>Des interruptions de service dues à des maintenances, mises à jour ou événements indépendants de notre volonté</li>
            <li>De tout dommage indirect, accessoire ou consécutif lié à l'utilisation ou à l'impossibilité d'utiliser l'application</li>
          </ul>
        </Section>

        <Section title="7. Disponibilité du service">
          <p>
            Palier est fourni "en l'état" et "selon disponibilité". Nous ne garantissons pas que l'application sera exempte d'erreurs, disponible en continu, ou que les fonctionnalités ne seront pas modifiées. Nous nous efforçons de maintenir un service de qualité mais ne pouvons garantir une disponibilité à 100%.
          </p>
          <p>
            Les fonctionnalités locales (stockage Isar) fonctionnent indépendamment de toute connexion réseau. Les fonctionnalités cloud (synchronisation, compte) nécessitent une connexion Internet et dépendent de la disponibilité de Firebase.
          </p>
        </Section>

        <Section title="8. Modifications des conditions">
          <p>
            Nous nous réservons le droit de modifier les présentes conditions à tout moment. Les modifications importantes seront notifiées via l'application. La poursuite de l'utilisation de l'application après notification vaut acceptation des nouvelles conditions.
          </p>
          <p>
            La version en vigueur est toujours accessible à l'adresse <strong className="text-palier-ivory">palier.app/terms</strong>. La date de dernière mise à jour est indiquée en haut de ce document.
          </p>
        </Section>

        <Section title="9. Droit applicable et juridiction">
          <p>
            Les présentes conditions sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront ceux du ressort de Paris, France.
          </p>
          <p>
            Si vous êtes consommateur résidant dans l'Union Européenne, vous bénéficiez également des protections prévues par la législation de votre pays de résidence.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Pour toute question relative aux présentes conditions :<br />
            <a href="mailto:privacy@palier.app" className="text-palier-cyan hover:underline">privacy@palier.app</a>
          </p>
        </Section>

      </div>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-display italic text-2xl text-palier-ivory mb-4 pb-2 border-b border-palier-cyan/15">
        {title}
      </h2>
      <div className="text-palier-muted leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}

function Disclaimer() {
  return (
    <section className="mb-12">
      <div className="border border-palier-coral/40 rounded-2xl p-6 bg-palier-coral/5">
        <h2 className="font-display italic text-2xl text-palier-coral mb-4">
          3. Avertissement important — Plongée sous-marine
        </h2>
        <div className="text-palier-muted leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
          <p>
            <strong className="text-palier-ivory">La plongée sous-marine est une activité à risques.</strong> Palier est un outil de journalisation — il n'est en aucun cas un dispositif de sécurité.
          </p>
          <ul>
            <li>Palier ne remplace pas une formation certifiée auprès d'un organisme reconnu (PADI, FFESSM, SSI, NAUI, etc.).</li>
            <li>Palier ne valide pas votre aptitude médicale ou technique à plonger.</li>
            <li>Les données enregistrées dans l'application (profondeur, durée, paliers) sont fournies à titre informatif uniquement et ne doivent pas être utilisées pour planifier des plongées à la place d'un ordinateur de plongée homologué.</li>
            <li>Palier ne calcule pas de tables de décompression et ne doit jamais être utilisé comme référence de sécurité lors d'une plongée.</li>
            <li>Toute décision de plongée doit être prise en accord avec votre formation, vos certifications, et en présence d'un équipement de sécurité approprié.</li>
          </ul>
          <p>
            <strong className="text-palier-ivory">En utilisant Palier, vous reconnaissez et acceptez que l'application n'est pas un outil de sécurité et que vous êtes seul responsable de vos décisions relatives à la plongée.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
