import { MouseEvent } from 'react';

type HomePageProps = {
  equipmentCount: number;
  availableCount: number;
  userRole: string;
  onNavigate: (path: string) => void;
};

type HomeLinkProps = {
  path: string;
  className: string;
  onNavigate: (path: string) => void;
  children: string;
};

function HomeLink({ path, className, onNavigate, children }: HomeLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onNavigate(path);
  }

  return (
    <a className={className} href={path} onClick={handleClick}>
      {children}
    </a>
  );
}

export function HomePage({ equipmentCount, availableCount, userRole, onNavigate }: HomePageProps) {
  return (
    <section className="content home-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Réservation de matériel sportif</p>
          <h2>Préparer une activité sportive devient plus simple quand le matériel est clair.</h2>
          <p className="hero-description">
            SportLink réunit un catalogue public, des conseils pratiques et un système de
            réservation pour aider clubs, associations, écoles et groupes de joueurs à choisir
            le matériel adapté avant une séance.
          </p>
          <div className="button-row">
            <HomeLink path="/equipment" className="primary-button link-button" onNavigate={onNavigate}>
              Explorer le catalogue
            </HomeLink>
            <HomeLink path="/blog" className="secondary-button link-button" onNavigate={onNavigate}>
              Lire les guides
            </HomeLink>
          </div>
        </div>

        <div className="hero-summary" aria-label="Aperçu du catalogue SportLink">
          <div className="summary-stat">
            <strong>{equipmentCount}</strong>
            <span>références présentées</span>
          </div>
          <div className="summary-stat">
            <strong>{availableCount}</strong>
            <span>actuellement disponibles</span>
          </div>
          <div className="summary-stat">
            <strong>{userRole === 'Invite' ? 'Public' : userRole}</strong>
            <span>accès courant</span>
          </div>
        </div>
      </div>

      <section className="editorial-intro" aria-labelledby="sportlink-purpose">
        <p className="eyebrow">À quoi sert SportLink ?</p>
        <h2 id="sportlink-purpose">Un point de départ concret avant de réserver</h2>
        <p className="description lead-copy">
          Une activité peut échouer pour des détails simples : trop peu de ballons, aucune
          chasuble pour distinguer les équipes, un filet oublié ou un matériel mal adapté au
          terrain. SportLink met les informations essentielles au même endroit afin de préparer
          la séance avant le jour J.
        </p>
      </section>

      <div className="grid feature-grid">
        <article className="card feature-card">
          <span className="feature-number">01</span>
          <p className="card-title">Comprendre le matériel</p>
          <p className="description small">
            Chaque fiche explique l’usage d’un équipement, les contextes dans lesquels il est
            utile et les vérifications simples à faire avant la séance.
          </p>
        </article>

        <article className="card feature-card">
          <span className="feature-number">02</span>
          <p className="card-title">Vérifier la disponibilité</p>
          <p className="description small">
            Le catalogue permet de repérer rapidement ce qui peut être réservé et d’éviter de
            construire une activité autour d’un matériel indisponible.
          </p>
        </article>

        <article className="card feature-card">
          <span className="feature-number">03</span>
          <p className="card-title">Préparer une séance cohérente</p>
          <p className="description small">
            Les guides relient le sport, la taille du groupe, le lieu et le type d’activité pour
            proposer une préparation plus structurée qu’une simple liste de matériel.
          </p>
        </article>
      </div>

      <section className="section-block" aria-labelledby="sports-guides">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Guides par sport</p>
            <h2 id="sports-guides">Commencer par l’activité que tu veux organiser</h2>
          </div>
          <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>
            Tous les guides
          </HomeLink>
        </div>

        <div className="grid sport-grid">
          <article className="sport-card">
            <span className="sport-label">Football</span>
            <h3>Ballons, chasubles et délimitation du terrain</h3>
            <p>
              Prévoir le bon nombre de ballons et organiser visuellement les équipes limite les
              interruptions pendant un match ou une séance technique.
            </p>
            <HomeLink path="/sports/football" className="text-link" onNavigate={onNavigate}>
              Préparer une séance de football
            </HomeLink>
          </article>

          <article className="sport-card">
            <span className="sport-label">Basket</span>
            <h3>Organiser les rotations et les ateliers</h3>
            <p>
              Plusieurs ballons et des zones clairement identifiées permettent de faire jouer
              davantage de participants sans multiplier les temps d’attente.
            </p>
            <HomeLink path="/sports/basket" className="text-link" onNavigate={onNavigate}>
              Préparer une séance de basket
            </HomeLink>
          </article>

          <article className="sport-card">
            <span className="sport-label">Badminton</span>
            <h3>Anticiper raquettes, volants et espace de jeu</h3>
            <p>
              Une séance fluide dépend autant du nombre de raquettes que de la disponibilité des
              volants, du filet et d’un espace correctement organisé.
            </p>
            <HomeLink path="/sports/badminton" className="text-link" onNavigate={onNavigate}>
              Préparer une séance de badminton
            </HomeLink>
          </article>
        </div>
      </section>

      <div className="grid two-columns home-deep-dive">
        <article className="card prose-card">
          <p className="eyebrow">Avant la réservation</p>
          <h3>Les quatre questions qui évitent la plupart des oublis</h3>
          <ol className="simple-list ordered spacious-list">
            <li>Quel sport et quel format de séance sont prévus : match, entraînement ou tournoi ?</li>
            <li>Combien de personnes vont réellement utiliser le matériel en même temps ?</li>
            <li>La séance se déroule-t-elle en salle, dehors ou sur un espace partagé ?</li>
            <li>Quel matériel doit être rendu rapidement pour rester disponible aux autres membres ?</li>
          </ol>
        </article>

        <article className="card prose-card">
          <p className="eyebrow">Aide au choix</p>
          <h3>La recommandation IA complète le catalogue, elle ne le remplace pas</h3>
          <p className="description small">
            La démo permet de décrire une activité en langage naturel. La suggestion est ensuite
            rapprochée du catalogue SportLink afin de proposer des équipements pertinents. La
            disponibilité affichée et les contraintes réelles du lieu restent toujours à vérifier
            avant une réservation.
          </p>
          <HomeLink path="/recommendations-demo" className="text-link" onNavigate={onNavigate}>
            Tester la démonstration
          </HomeLink>
        </article>
      </div>

      <section className="guide-highlight" aria-labelledby="featured-guides">
        <div>
          <p className="eyebrow">À lire avant de réserver</p>
          <h2 id="featured-guides">Des guides conçus pour répondre à des situations concrètes</h2>
          <p className="description">
            Retrouve des explications détaillées sur le choix du matériel, l’organisation d’un
            match entre amis, la réservation en ligne et l’utilisation d’une recommandation IA.
          </p>
        </div>
        <div className="guide-links">
          <HomeLink path="/blog/choisir-materiel-sportif" className="guide-link" onNavigate={onNavigate}>
            Choisir son matériel avant une réservation
          </HomeLink>
          <HomeLink path="/blog/organiser-match-entre-amis" className="guide-link" onNavigate={onNavigate}>
            Organiser un match entre amis
          </HomeLink>
          <HomeLink path="/blog/reservation-materiel-en-ligne" className="guide-link" onNavigate={onNavigate}>
            Comprendre la réservation de matériel en ligne
          </HomeLink>
        </div>
      </section>
    </section>
  );
}
