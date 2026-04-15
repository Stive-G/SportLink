type HomePageProps = {
  apiUrl: string;
  equipmentCount: number;
  availableCount: number;
  userRole: string;
  onNavigate: (path: string) => void;
};

export function HomePage({
  apiUrl,
  equipmentCount,
  availableCount,
  userRole,
  onNavigate,
}: HomePageProps) {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Réservation de matériel sportif</p>
        <h2>SportLink aide à choisir, réserver et retourner le bon matériel</h2>
        <p className="description">
          SportLink centralise le catalogue sportif, les disponibilités, les réservations
          et les recommandations IA pour préparer une activité sans perdre de temps.
        </p>
        <div className="button-row">
          <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
            Explorer le catalogue
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate('/recommendations-demo')}
          >
            Tester la recommandation IA
          </button>
        </div>
      </div>

      <div className="grid">
        <article className="card">
          <p className="card-title">Catalogue public</p>
          <p className="description small">
            {equipmentCount} équipements présentés avec sport, catégorie, conseils d’usage
            et contexte d’utilisation.
          </p>
        </article>

        <article className="card">
          <p className="card-title">Disponibilité claire</p>
          <p className="description small">
            {availableCount} équipements sont actuellement disponibles ou représentés en démo
            si le backend n’est pas encore chargé.
          </p>
        </article>

        <article className="card">
          <p className="card-title">Réservation avec compte</p>
          <p className="description small">
            Rôle courant : {userRole}. Les visiteurs lisent le contenu public, les membres
            peuvent réserver et suivre leurs retours.
          </p>
        </article>
      </div>

      <div className="grid two-columns">
        <article className="card">
          <p className="card-title">Comment fonctionne SportLink ?</p>
          <ol className="simple-list ordered">
            <li>Le visiteur explore les sports, guides et fiches matériel.</li>
            <li>Le membre se connecte pour réserver un équipement disponible.</li>
            <li>L’administrateur suit le stock, les utilisateurs et les retours.</li>
          </ol>
        </article>

        <article className="card">
          <p className="card-title">Pourquoi une recommandation IA ?</p>
          <p className="description small">
            L’utilisateur peut décrire une activité en langage naturel. SportLink transforme
            cette demande en liste de matériel conseillée, en tenant compte du catalogue.
          </p>
          <button type="button" className="text-button" onClick={() => onNavigate('/blog/ia-recommandation-sportive')}>
            Lire le guide sur l’IA
          </button>
        </article>
      </div>

      <p className="description small technical-note">API cible : {apiUrl}</p>
    </section>
  );
}
