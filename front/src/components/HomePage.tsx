import { MouseEvent } from 'react';

type HomePageProps = {
  equipmentCount: number;
  availableCount: number;
  userRole: string;
  onNavigate: (path: string) => void;
};

type HomeLinkProps = {
  path: string;
  className?: string;
  onNavigate: (path: string) => void;
  children: string;
};

function HomeLink({ path, className = '', onNavigate, children }: HomeLinkProps) {
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
      <section className="home-intro">
        <div className="home-intro-copy">
          <h2>Réserver du matériel sportif sans perdre du temps</h2>
          <p className="lead-copy">
            SportLink permet de consulter le matériel disponible, de comprendre à quoi il sert
            et de préparer une réservation avant une séance, un match ou un entraînement.
          </p>
          <div className="button-row">
            <HomeLink path="/equipment" className="primary-button link-button" onNavigate={onNavigate}>
              Voir le catalogue
            </HomeLink>
            <HomeLink path="/blog" className="secondary-button link-button" onNavigate={onNavigate}>
              Consulter les guides
            </HomeLink>
          </div>
        </div>

        <dl className="home-stats" aria-label="Aperçu du catalogue SportLink">
          <div>
            <dt>Matériel référencé</dt>
            <dd>{equipmentCount}</dd>
          </div>
          <div>
            <dt>Disponible maintenant</dt>
            <dd>{availableCount}</dd>
          </div>
          <div>
            <dt>Accès</dt>
            <dd>{userRole === 'Invite' ? 'Public' : userRole}</dd>
          </div>
        </dl>
      </section>

      <section className="plain-section" aria-labelledby="prepare-reservation">
        <h2 id="prepare-reservation">Bien préparer une réservation</h2>
        <p className="description section-copy">
          Avant de réserver, il faut surtout vérifier le type d’activité, le nombre de joueurs,
          le lieu et la quantité de matériel nécessaire. Le catalogue SportLink regroupe ces
          informations afin d’éviter les oublis simples qui peuvent gêner une séance.
        </p>

        <div className="info-columns">
          <div>
            <h3>Choisir le bon équipement</h3>
            <p>
              Les fiches décrivent l’usage du matériel, les contextes adaptés et quelques
              vérifications utiles avant de partir jouer.
            </p>
          </div>
          <div>
            <h3>Vérifier la disponibilité</h3>
            <p>
              Le catalogue indique ce qui est disponible afin de ne pas organiser une activité
              autour d’un équipement déjà réservé ou indisponible.
            </p>
          </div>
          <div>
            <h3>Prévoir le retour</h3>
            <p>
              Une réservation se termine avec le retour du matériel. Cela permet de remettre le
              stock à jour et de le rendre disponible aux autres membres.
            </p>
          </div>
        </div>
      </section>

      <section className="plain-section" aria-labelledby="sports-guides">
        <div className="section-heading-row">
          <div>
            <h2 id="sports-guides">Guides par sport</h2>
            <p className="description section-copy">
              Quelques repères simples pour préparer une séance selon l’activité choisie.
            </p>
          </div>
          <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>
            Voir tous les guides
          </HomeLink>
        </div>

        <div className="sport-list">
          <article>
            <div>
              <h3>Football</h3>
              <p>Ballons, chasubles, cônes et organisation du terrain.</p>
            </div>
            <HomeLink path="/sports/football" className="text-link" onNavigate={onNavigate}>
              Lire le guide
            </HomeLink>
          </article>

          <article>
            <div>
              <h3>Basket</h3>
              <p>Préparer les ballons, les rotations et les ateliers en gymnase.</p>
            </div>
            <HomeLink path="/sports/basket" className="text-link" onNavigate={onNavigate}>
              Lire le guide
            </HomeLink>
          </article>

          <article>
            <div>
              <h3>Badminton</h3>
              <p>Anticiper les raquettes, les volants, le filet et l’espace de jeu.</p>
            </div>
            <HomeLink path="/sports/badminton" className="text-link" onNavigate={onNavigate}>
              Lire le guide
            </HomeLink>
          </article>
        </div>
      </section>

      <section className="plain-section two-column-text" aria-label="Conseils SportLink">
        <div>
          <h2>Avant de réserver</h2>
          <ol className="simple-list ordered spacious-list">
            <li>Définir le sport et le format de la séance.</li>
            <li>Compter les participants qui utiliseront le matériel en même temps.</li>
            <li>Vérifier si l’activité se déroule en salle ou à l’extérieur.</li>
            <li>Prévoir le retour du matériel après l’activité.</li>
          </ol>
        </div>

        <div>
          <h2>Besoin d’aide pour choisir ?</h2>
          <p className="description">
            La démo IA peut proposer du matériel à partir d’une phrase libre. Elle sert d’aide au
            choix, mais la disponibilité et les contraintes réelles du lieu restent à vérifier.
          </p>
          <HomeLink path="/recommendations-demo" className="text-link" onNavigate={onNavigate}>
            Tester la démo
          </HomeLink>
        </div>
      </section>

      <section className="reading-section" aria-labelledby="featured-guides">
        <h2 id="featured-guides">Quelques guides utiles</h2>
        <div className="reading-links">
          <HomeLink path="/blog/choisir-materiel-sportif" onNavigate={onNavigate}>
            Comment choisir son matériel sportif avant une réservation
          </HomeLink>
          <HomeLink path="/blog/organiser-match-entre-amis" onNavigate={onNavigate}>
            Organiser un match entre amis facilement avec SportLink
          </HomeLink>
          <HomeLink path="/blog/reservation-materiel-en-ligne" onNavigate={onNavigate}>
            Pourquoi réserver du matériel sportif en ligne
          </HomeLink>
        </div>
      </section>
    </section>
  );
}
