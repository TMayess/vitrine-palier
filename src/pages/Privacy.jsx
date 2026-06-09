export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-16">
        <p className="text-palier-cyan text-sm tracking-widest uppercase mb-4">Politique de confidentialité</p>
        <h1 className="font-display italic text-5xl text-palier-ivory mb-6">
          Vos données vous appartiennent.
        </h1>
        <p className="text-palier-muted text-sm">Dernière mise à jour : 9 juin 2026</p>
      </header>

      <div className="prose-palier">

        <Section title="1. Qui sommes-nous ?">
          <p>
            Palier est une application mobile de logbook de plongée sous-marine développée et maintenue en tant que projet indépendant. Pour toute question relative à la confidentialité, vous pouvez nous contacter à l'adresse <a href="mailto:privacy@palier.app" className="text-palier-cyan hover:underline">privacy@palier.app</a>.
          </p>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons uniquement les données nécessaires au fonctionnement de l'application :</p>
          <ul>
            <li><strong className="text-palier-ivory">Données de compte :</strong> adresse e-mail, utilisée pour créer et identifier votre compte Firebase Authentication. Cette donnée est facultative — l'application peut être utilisée entièrement en mode local sans créer de compte.</li>
            <li><strong className="text-palier-ivory">Données de plongée :</strong> site de plongée, date, profondeur maximale, durée, température de l'eau, visibilité, nom de l'équipier, notes libres. Ces données sont saisies manuellement par l'utilisateur.</li>
            <li><strong className="text-palier-ivory">Données d'usage :</strong> Firebase Analytics collecte des événements anonymisés (ouverture de l'app, navigation entre écrans) afin d'améliorer l'expérience utilisateur. Aucun identifiant personnel n'est associé à ces événements.</li>
          </ul>
        </Section>

        <Section title="3. Données non collectées">
          <p>Palier ne collecte <strong className="text-palier-ivory">pas</strong> les données suivantes :</p>
          <ul>
            <li>Position GPS précise ou historique de localisation</li>
            <li>Contacts de l'appareil</li>
            <li>Accès au microphone ou à la caméra</li>
            <li>Données biométriques</li>
            <li>Historique de navigation web</li>
            <li>Données de santé ou médicales</li>
          </ul>
        </Section>

        <Section title="4. Stockage des données">
          <p>
            <strong className="text-palier-ivory">Stockage local :</strong> par défaut, toutes vos données de plongée sont stockées localement sur votre appareil via Isar (base de données embarquée). Ces données ne quittent jamais votre appareil sans votre action explicite.
          </p>
          <p>
            <strong className="text-palier-ivory">Stockage cloud :</strong> si vous créez un compte et activez la synchronisation, vos données sont répliquées sur Firebase Firestore (infrastructure Google Cloud). Ce stockage est chiffré en transit (TLS) et au repos. Vous pouvez désactiver la synchronisation à tout moment depuis les paramètres de l'application.
          </p>
        </Section>

        <Section title="5. Partage des données">
          <p>
            Nous ne vendons, ne louons et ne partageons vos données personnelles avec aucun tiers à des fins commerciales. Les seuls tiers impliqués sont :
          </p>
          <ul>
            <li><strong className="text-palier-ivory">Google Firebase</strong> (Authentication, Firestore, Analytics) — sous-traitant technique, soumis aux conditions de confidentialité de Google. Firebase Analytics est configuré avec la collecte de données minimale.</li>
          </ul>
          <p>Aucune donnée n'est partagée avec des annonceurs, courtiers en données ou partenaires marketing.</p>
        </Section>

        <Section title="6. Sécurité">
          <p>
            Les données transmises entre votre appareil et nos serveurs Firebase sont chiffrées via TLS/HTTPS. Les règles de sécurité Firestore sont configurées pour que chaque utilisateur n'ait accès qu'à ses propres données. L'accès aux données cloud nécessite une authentification Firebase valide.
          </p>
          <p>
            Les données locales (Isar) sont stockées dans le répertoire privé de l'application, inaccessible aux autres applications sur un appareil non rooté.
          </p>
        </Section>

        <Section title="7. Vos droits (RGPD)">
          <p>Si vous êtes résident de l'Union Européenne, vous disposez des droits suivants :</p>
          <ul>
            <li><strong className="text-palier-ivory">Droit d'accès :</strong> obtenir une copie de vos données personnelles que nous détenons.</li>
            <li><strong className="text-palier-ivory">Droit de rectification :</strong> corriger des données inexactes. La plupart des données sont modifiables directement dans l'application.</li>
            <li><strong className="text-palier-ivory">Droit à l'effacement :</strong> supprimer votre compte et l'ensemble de vos données cloud. Les données locales peuvent être supprimées en désinstallant l'application.</li>
            <li><strong className="text-palier-ivory">Droit à la portabilité :</strong> exporter vos données dans un format lisible. Cette fonctionnalité est disponible depuis les paramètres de l'application.</li>
            <li><strong className="text-palier-ivory">Droit d'opposition :</strong> désactiver Firebase Analytics depuis les paramètres de l'application.</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@palier.app" className="text-palier-cyan hover:underline">privacy@palier.app</a>. Nous nous engageons à répondre dans un délai de 30 jours.</p>
        </Section>

        <Section title="8. Conservation des données">
          <p>
            Les données de plongée sont conservées tant que votre compte existe et que vous ne les supprimez pas explicitement. En cas de suppression de compte, toutes les données cloud associées sont effacées dans un délai de 30 jours. Les données de Firebase Analytics sont conservées 14 mois (paramètre par défaut Google, non lié à votre compte).
          </p>
        </Section>

        <Section title="9. Mineurs">
          <p>
            Palier n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si vous pensez qu'un mineur a créé un compte, contactez-nous pour que nous procédions à sa suppression.
          </p>
        </Section>

        <Section title="10. Modifications de cette politique">
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité. En cas de modification substantielle, nous vous en informerons via une notification dans l'application. La date de dernière mise à jour est indiquée en haut de ce document.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Pour toute question relative à la confidentialité ou pour exercer vos droits :<br />
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
