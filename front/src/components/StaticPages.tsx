type StaticPageProps = {
  onNavigate: (path: string) => void;
};

export function AboutPage({ onNavigate }: StaticPageProps) {
  return (
    <section className="content static-page">
      <div className="card hero-card static-hero">
        <p className="eyebrow">À propos</p>
        <h2>SportLink organise le lien entre une activité sportive et le matériel dont elle a besoin</h2>
        <p className="description lead-copy">
          SportLink est une application de gestion et de réservation de matériel sportif pensée
          pour les clubs, associations, écoles et groupes qui partagent un stock. Le service
          rassemble catalogue, disponibilité, réservation et conseils de préparation dans une
          interface unique.
        </p>
      </div>

      <div className="grid two-columns">
        <article className="card prose-card">
          <p className="card-title">Le problème que SportLink cherche à résoudre</p>
          <p className="description small">
            Dans un stock collectif, savoir qu’un ballon, un filet ou un lot de chasubles existe
            ne suffit pas. Il faut aussi connaître sa disponibilité, comprendre dans quel contexte
            il est utile et éviter que plusieurs personnes comptent sur le même matériel au même
            moment. SportLink centralise ces informations pour rendre la préparation plus lisible.
          </p>
          <p className="description small">
            L’objectif est simple : permettre à un visiteur de comprendre le matériel avant de
            créer un compte, puis donner aux membres les outils nécessaires pour réserver et suivre
            les retours.
          </p>
        </article>

        <article className="card prose-card">
          <p className="card-title">Une partie éditoriale, pas seulement un outil</p>
          <p className="description small">
            Le catalogue est complété par des guides originaux consacrés au choix du matériel,
            à l’organisation d’une séance et aux usages propres à plusieurs sports. Ces contenus
            servent à expliquer les décisions à prendre avant une réservation plutôt qu’à afficher
            uniquement des fiches techniques.
          </p>
          <p className="description small">
            La recommandation IA reste une aide au choix. Les guides, la disponibilité du stock et
            les contraintes réelles de l’activité gardent la priorité au moment de décider quoi
            réserver.
          </p>
        </article>
      </div>

      <div className="grid feature-grid">
        <article className="card feature-card">
          <span className="feature-number">01</span>
          <p className="card-title">Visiteurs</p>
          <p className="description small">
            Consultation libre du catalogue, des fiches matériel et des guides de préparation.
          </p>
        </article>
        <article className="card feature-card">
          <span className="feature-number">02</span>
          <p className="card-title">Membres</p>
          <p className="description small">
            Réservation d’un équipement disponible, suivi des emprunts et déclaration des retours.
          </p>
        </article>
        <article className="card feature-card">
          <span className="feature-number">03</span>
          <p className="card-title">Administrateurs</p>
          <p className="description small">
            Vision centralisée du stock, des utilisateurs et des réservations d’une organisation.
          </p>
        </article>
      </div>

      <div className="button-row">
        <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
          Explorer le catalogue
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate('/blog')}>
          Lire les guides
        </button>
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="content static-page">
      <div className="card hero-card static-hero">
        <p className="eyebrow">Contact</p>
        <h2>Contacter SportLink</h2>
        <p className="description lead-copy">
          Une question sur le catalogue, une réservation, un retour de matériel ou le fonctionnement
          du service ? Tu peux contacter SportLink par e-mail.
        </p>
      </div>

      <div className="grid two-columns">
        <article className="card prose-card contact-card">
          <p className="card-title">Adresse de contact</p>
          <a className="contact-link" href="mailto:contact@sportlink-app.site">
            contact@sportlink-app.site
          </a>
          <p className="description small">
            Pour faciliter le traitement, indique l’équipement concerné, la date de réservation et
            l’adresse e-mail du compte lorsqu’ils sont pertinents pour ta demande.
          </p>
        </article>

        <article className="card prose-card">
          <p className="card-title">Pour quel type de demande ?</p>
          <ul className="simple-list spacious-list">
            <li>problème de disponibilité ou de réservation ;</li>
            <li>question sur un retour de matériel ;</li>
            <li>signalement d’une information de catalogue incorrecte ;</li>
            <li>question liée à la confidentialité ou aux données personnelles ;</li>
            <li>suggestion concernant un guide ou une fonctionnalité.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export function PrivacyPage() {
  return (
    <section className="content static-page legal-page">
      <div className="card hero-card static-hero">
        <p className="eyebrow">Confidentialité</p>
        <h2>Politique de confidentialité SportLink</h2>
        <p className="description lead-copy">
          Cette politique présente les principales données traitées par SportLink et la manière
          dont elles sont utilisées pour fournir le catalogue, les réservations et les fonctions
          de recommandation.
        </p>
        <p className="legal-update">Dernière mise à jour : 10 septembre 2026</p>
      </div>

      <article className="card editorial-section">
        <h3>1. Données de compte</h3>
        <p className="description">
          Lorsqu’un compte est créé, SportLink utilise les informations nécessaires à
          l’identification du membre, notamment le nom, l’adresse e-mail et le rôle associé au
          compte. Ces données servent à protéger les espaces réservés et à rattacher les actions
          réalisées dans l’application au bon utilisateur.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>2. Réservations et historique d’utilisation</h3>
        <p className="description">
          Une réservation contient les informations utiles au suivi de l’emprunt : matériel,
          dates, statut et utilisateur concerné. Cet historique permet d’éviter les conflits de
          disponibilité, de suivre les retours et de conserver une trace cohérente des mouvements
          du stock.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>3. Demandes de recommandation</h3>
        <p className="description">
          Lorsqu’un utilisateur saisit une demande dans l’outil de recommandation, le texte peut
          être traité afin de proposer une sélection de matériel cohérente avec le catalogue.
          Évite d’inscrire dans ce champ des données personnelles qui ne sont pas nécessaires à la
          préparation de l’activité sportive.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>4. Publicité, cookies et technologies similaires</h3>
        <p className="description">
          SportLink utilise Google AdSense sur certaines pages éditoriales. Google et ses partenaires
          peuvent utiliser des cookies, du stockage local ou des identifiants similaires pour mesurer
          la diffusion des annonces et, lorsque la réglementation et le choix de l’utilisateur le
          permettent, personnaliser la publicité.
        </p>
        <p className="description">
          Pour les visiteurs situés dans l’Espace économique européen, au Royaume-Uni ou en Suisse,
          le consentement publicitaire doit être recueilli au moyen d’une plate-forme de gestion du
          consentement compatible avec les exigences de Google. Les choix proposés dans cette
          interface déterminent les traitements publicitaires autorisés.
        </p>
        <p className="description small">
          En savoir plus :{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
            utilisation des données par Google pour la publicité
          </a>.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>5. Durée de conservation et sécurité</h3>
        <p className="description">
          Les données sont conservées pendant la durée nécessaire au fonctionnement du service,
          au suivi des réservations et au respect des obligations applicables. Des mesures techniques
          et organisationnelles sont mises en place pour limiter l’accès non autorisé aux données
          stockées par l’application.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>6. Questions et demandes relatives aux données</h3>
        <p className="description">
          Pour une question sur cette politique ou une demande concernant tes données, écris à{' '}
          <a href="mailto:contact@sportlink-app.site">contact@sportlink-app.site</a>. La demande doit
          contenir suffisamment d’informations pour identifier le compte concerné sans transmettre
          de mot de passe ou d’information sensible inutile.
        </p>
      </article>
    </section>
  );
}

export function TermsPage() {
  return (
    <section className="content static-page legal-page">
      <div className="card hero-card static-hero">
        <p className="eyebrow">Conditions</p>
        <h2>Conditions d’utilisation de SportLink</h2>
        <p className="description lead-copy">
          SportLink facilite la consultation, la réservation et le suivi de matériel sportif.
          L’utilisation du service implique de respecter le stock partagé, les autres membres et
          les règles définies par l’organisation qui met le matériel à disposition.
        </p>
        <p className="legal-update">Dernière mise à jour : 10 septembre 2026</p>
      </div>

      <article className="card editorial-section">
        <h3>1. Accès au contenu public</h3>
        <p className="description">
          Le catalogue, les fiches matériel et les guides peuvent être consultés sans compte. Les
          informations publiées ont pour objectif d’aider à préparer une activité sportive et à
          comprendre l’usage du matériel présenté.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>2. Compte membre et réservation</h3>
        <p className="description">
          Un compte est nécessaire pour réserver. L’utilisateur doit fournir des informations
          exactes, protéger l’accès à son compte et réserver uniquement du matériel qu’il prévoit
          réellement d’utiliser. Une réservation peut réduire temporairement la disponibilité pour
          les autres membres.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>3. Utilisation et retour du matériel</h3>
        <p className="description">
          Le matériel réservé doit être utilisé conformément à sa destination et aux consignes de
          l’organisation qui le fournit. Le retour doit être signalé dès que l’équipement est rendu
          afin que le stock puisse être mis à jour et redevenir disponible pour les autres membres.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>4. Recommandations et guides</h3>
        <p className="description">
          Les guides et recommandations sont des aides à la préparation. Ils ne remplacent ni les
          règles d’un club, ni les consignes d’un encadrant, ni les vérifications de sécurité propres
          au lieu de pratique. L’utilisateur reste responsable d’adapter le matériel au niveau des
          participants et aux conditions réelles de l’activité.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>5. Disponibilité du service</h3>
        <p className="description">
          SportLink cherche à présenter des informations de stock à jour, mais une indisponibilité
          technique ou une mise à jour tardive peut exceptionnellement créer un écart entre le
          catalogue affiché et la situation réelle. En cas de doute, l’administrateur de
          l’organisation reste le point de référence pour confirmer une réservation.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>6. Contact</h3>
        <p className="description">
          Pour toute question concernant ces conditions ou le fonctionnement général du service,
          contacte SportLink à <a href="mailto:contact@sportlink-app.site">contact@sportlink-app.site</a>.
        </p>
      </article>
    </section>
  );
}
