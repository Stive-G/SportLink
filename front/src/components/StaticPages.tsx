type StaticPageProps = {
  onNavigate: (path: string) => void;
};

export function AboutPage({ onNavigate }: StaticPageProps) {
  return (
    <section className="content static-page">
      <div className="card hero-card static-hero">
        <p className="eyebrow">À propos</p>
        <h2>SportLink aide à passer de l’idée de sport à une séance réellement préparée</h2>
        <p className="description lead-copy">
          SportLink rassemble des lieux de pratique issus de données publiques, des guides et un
          assistant de préparation. Le service ne possède pas de local,
          ne loue pas de matériel et ne réserve pas de terrain.
        </p>
      </div>

      <div className="grid two-columns">
        <article className="card prose-card">
          <p className="card-title">Trouver, comprendre, préparer</p>
          <p className="description small">
            La page « Où pratiquer » interroge Data ES en direct pour trouver des équipements
            sportifs en France. Les guides et l’assistant aident ensuite à préparer la séance selon
            le sport, le groupe, la durée et les contraintes du lieu.
          </p>
        </article>

        <article className="card prose-card">
          <p className="card-title">Un compte pour garder ce qui compte</p>
          <p className="description small">
            Le compte membre sert à sauvegarder des plans de séance générés avec l’assistant :
            contexte, matériel conseillé et repères d’organisation. Les recherches Data ES ne sont
            pas enregistrées automatiquement.
          </p>
        </article>
      </div>

      <div className="grid feature-grid">
        <article className="card feature-card">
          <span className="feature-number">01</span>
          <p className="card-title">Lieux</p>
          <p className="description small">Recherche publique de lieux de pratique via Data ES.</p>
        </article>
        <article className="card feature-card">
          <span className="feature-number">02</span>
          <p className="card-title">Assistant</p>
          <p className="description small">Préparation d’une séance à partir du contexte saisi.</p>
        </article>
        <article className="card feature-card">
          <span className="feature-number">03</span>
          <p className="card-title">Plans</p>
          <p className="description small">Sauvegarde privée des préparations utiles au membre.</p>
        </article>
      </div>

      <div className="button-row">
        <button type="button" className="primary-button" onClick={() => onNavigate('/places')}>
          Trouver un lieu
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate('/assistant')}>
          Ouvrir l’assistant
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
          Une question sur un guide, un lieu, un plan sauvegardé, l’assistant ou tes données
          personnelles ? Tu peux contacter SportLink par e-mail.
        </p>
      </div>

      <div className="grid two-columns">
        <article className="card prose-card contact-card">
          <p className="card-title">Adresse de contact</p>
          <a className="contact-link" href="mailto:contact@sportlink-app.site">
            contact@sportlink-app.site
          </a>
          <p className="description small">
            Pour une demande liée à ton compte, indique l’adresse e-mail concernée sans transmettre
            de mot de passe ni d’information sensible inutile.
          </p>
        </article>

        <article className="card prose-card">
          <p className="card-title">Demandes possibles</p>
          <ul className="simple-list spacious-list">
            <li>information de lieu ou de matériel incorrecte ;</li>
            <li>question sur un plan sauvegardé ou l’assistant ;</li>
            <li>demande relative aux données personnelles ;</li>
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
          Cette politique décrit les principales données traitées par SportLink pour les comptes,
          les plans sauvegardés, l’assistant, les données publiques de lieux et la publicité.
        </p>
        <p className="legal-update">Dernière mise à jour : 22 septembre 2026</p>
      </div>

      <article className="card editorial-section">
        <h3>1. Données de compte</h3>
        <p className="description">
          Lorsqu’un compte est créé, SportLink traite le nom, l’adresse e-mail et le rôle associé au
          compte. Ces informations sont utilisées pour l’authentification, l’accès aux fonctions
          réservées aux membres et la protection des espaces privés.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>2. Plans sauvegardés</h3>
        <p className="description">
          Un membre peut choisir de sauvegarder un plan de séance. Le plan peut contenir un titre,
          la description de l’activité, le sport, un lieu saisi volontairement, le matériel
          conseillé, des repères d’organisation et des notes. Aucun lieu Data ES n’est enregistré
          automatiquement simplement parce qu’il a été consulté.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>3. Assistant et fournisseur de modèle</h3>
        <p className="description">
          Le texte saisi dans l’Assistant SportLink peut être transmis au fournisseur de modèle
          configuré par le service afin de produire une recommandation. SportLink demande aux
          utilisateurs de ne pas saisir de données sensibles ou de données personnelles inutiles
          dans ce champ. Si le fournisseur IA est indisponible, une logique locale peut produire une
          suggestion simplifiée à partir de règles générales de préparation.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>4. Recherche de lieux et Data ES</h3>
        <p className="description">
          Les recherches de lieux sont envoyées à l’API publique Data ES via le serveur SportLink.
          Les résultats sont affichés à la demande et ne sont pas importés dans la base de données
          SportLink. Les critères de recherche ne sont pas utilisés pour créer un historique de
          lieux dans le compte.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>5. Google AdSense, cookies et consentement</h3>
        <p className="description">
          SportLink peut afficher des annonces Google AdSense sur certaines pages publiques
          éditoriales. Google et ses partenaires peuvent utiliser des cookies, du stockage local ou
          d’autres identifiants pour mesurer la diffusion des annonces et, lorsque le droit
          applicable et le choix de l’utilisateur le permettent, personnaliser la publicité.
        </p>
        <p className="description">
          Pour les visiteurs de l’Espace économique européen, du Royaume-Uni et de Suisse, une
          plate-forme de gestion du consentement certifiée par Google et compatible avec le TCF de
          l’IAB doit être activée avant la diffusion d’annonces personnalisées. L’utilisateur peut
          accepter ou refuser les finalités proposées. SportLink réserve ses emplacements
          publicitaires aux pages publiques éditoriales, pas aux pages privées du compte ni aux
          formulaires d’authentification.
        </p>
        <p className="description small">
          En savoir plus :{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
            technologies publicitaires de Google
          </a>.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>6. Conservation et sécurité</h3>
        <p className="description">
          Les données de compte et les plans sont conservés aussi longtemps qu’ils sont nécessaires
          au fonctionnement du service ou jusqu’à leur suppression lorsque cette possibilité est
          proposée. Des mesures techniques sont utilisées pour limiter l’accès non autorisé aux
          données. SportLink ne vend pas les données personnelles des utilisateurs.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>7. Questions et droits</h3>
        <p className="description">
          Pour toute question ou demande concernant tes données, écris à{' '}
          <a href="mailto:contact@sportlink-app.site">contact@sportlink-app.site</a>. N’envoie jamais
          ton mot de passe dans un e-mail.
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
          SportLink est un outil d’information et de préparation sportive. Il ne constitue ni un
          service de location, ni une centrale de réservation de terrain, ni un encadrement sportif.
        </p>
        <p className="legal-update">Dernière mise à jour : 22 septembre 2026</p>
      </div>

      <article className="card editorial-section">
        <h3>1. Contenu public</h3>
        <p className="description">
          Les lieux et guides sont proposés pour aider à préparer une activité.
          Certaines informations de lieux proviennent de sources publiques externes et peuvent
          évoluer indépendamment de SportLink.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>2. Comptes et plans</h3>
        <p className="description">
          Un compte permet de sauvegarder des plans personnels. L’utilisateur est responsable de
          l’exactitude des informations qu’il ajoute à ses plans et de la confidentialité de ses
          identifiants de connexion.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>3. Assistant SportLink</h3>
        <p className="description">
          Les recommandations générées sont des aides à la préparation. Elles peuvent être
          incomplètes ou inadaptées à une situation particulière. Elles ne remplacent pas les
          règles du lieu, les consignes d’un encadrant ni les vérifications de sécurité.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>4. Services et données externes</h3>
        <p className="description">
          La disponibilité de certaines fonctions dépend de services tiers, notamment Data ES et le
          fournisseur de modèle utilisé par l’assistant. SportLink ne garantit pas l’absence
          d’interruption ni l’exactitude permanente des données fournies par ces services.
        </p>
      </article>

      <article className="card editorial-section">
        <h3>5. Contact</h3>
        <p className="description">
          Pour toute question concernant ces conditions, contacte SportLink à{' '}
          <a href="mailto:contact@sportlink-app.site">contact@sportlink-app.site</a>.
        </p>
      </article>
    </section>
  );
}
