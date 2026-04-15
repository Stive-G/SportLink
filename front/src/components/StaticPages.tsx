type StaticPageProps = {
  onNavigate: (path: string) => void;
};

export function AboutPage({ onNavigate }: StaticPageProps) {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">À propos</p>
        <h2>SportLink rend la réservation de matériel sportif plus simple</h2>
        <p className="description">
          SportLink est une application de gestion de matériel sportif pour les clubs,
          associations, écoles et groupes qui veulent partager un stock sans perdre la
          trace des emprunts.
        </p>
      </div>
      <div className="grid two-columns">
        <article className="card">
          <p className="card-title">Pour les membres</p>
          <p className="description small">
            Les membres consultent le catalogue, vérifient la disponibilité et réservent
            le matériel adapté à leur activité. Ils retrouvent aussi leur historique et
            peuvent signaler le retour du matériel.
          </p>
        </article>
        <article className="card">
          <p className="card-title">Pour les admins</p>
          <p className="description small">
            Les admins suivent les utilisateurs, les réservations et les stocks. L’objectif
            est de limiter les pertes, les doublons et les informations dispersées.
          </p>
        </article>
      </div>
      <button type="button" className="primary-button fit-button" onClick={() => onNavigate('/equipment')}>
        Explorer le catalogue
      </button>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Contact</p>
        <h2>Contacter l’équipe SportLink</h2>
        <p className="description">
          Pour une question sur une réservation, un retour de matériel ou la gestion du
          catalogue, contacte l’administrateur de ton organisation SportLink.
        </p>
      </div>
      <div className="card">
        <p className="card-title">Informations utiles</p>
        <ul className="simple-list">
          <li>Email support : contact@sportlink.local</li>
          <li>Objet conseillé : réservation, catalogue, compte membre ou suggestion IA</li>
          <li>Indique si possible le matériel concerné et la date de réservation</li>
        </ul>
      </div>
    </section>
  );
}

export function PrivacyPage() {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Confidentialité</p>
        <h2>Politique de confidentialité SportLink</h2>
        <p className="description">
          Cette page explique les données nécessaires au fonctionnement de SportLink :
          compte utilisateur, réservations et demandes de recommandation.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <p className="card-title">Données de compte</p>
          <p className="description small">
            SportLink utilise le nom, l’email et le rôle pour identifier les membres et
            protéger les espaces réservés.
          </p>
        </article>
        <article className="card">
          <p className="card-title">Données de réservation</p>
          <p className="description small">
            Les réservations enregistrent le matériel, les dates et le statut afin de
            suivre les emprunts et les retours.
          </p>
        </article>
        <article className="card">
          <p className="card-title">Demandes IA</p>
          <p className="description small">
            Les demandes envoyées à l’assistant servent uniquement à proposer du matériel
            adapté au catalogue disponible.
          </p>
        </article>
      </div>
    </section>
  );
}

export function TermsPage() {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Conditions</p>
        <h2>Conditions d’utilisation de SportLink</h2>
        <p className="description">
          SportLink aide à organiser le partage de matériel sportif. Chaque utilisateur
          doit réserver uniquement le matériel dont il a besoin et respecter les dates de retour.
        </p>
      </div>
      <div className="grid">
        <article className="card">
          <p className="card-title">Réservation responsable</p>
          <p className="description small">
            Une réservation bloque temporairement un équipement. Il faut donc éviter les
            réservations inutiles qui réduisent la disponibilité pour les autres membres.
          </p>
        </article>
        <article className="card">
          <p className="card-title">Retour du matériel</p>
          <p className="description small">
            Le matériel doit être rendu en bon état. Le retour met à jour le stock et rend
            l’équipement à nouveau visible pour les autres utilisateurs.
          </p>
        </article>
        <article className="card">
          <p className="card-title">Recommandation IA</p>
          <p className="description small">
            Les suggestions IA restent des aides à la décision. L’utilisateur doit toujours
            vérifier la disponibilité et adapter le choix à son activité réelle.
          </p>
        </article>
      </div>
    </section>
  );
}
