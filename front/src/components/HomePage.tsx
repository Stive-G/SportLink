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

function EquipmentScene({ equipmentCount, availableCount }: Pick<HomePageProps, 'equipmentCount' | 'availableCount'>) {
  return (
    <div className="gear-scene" aria-hidden="true">
      <div className="gear-scene-head">
        <span>LOCAL MATÉRIEL / A-02</span>
        <span className="scene-live">stock ouvert</span>
      </div>

      <div className="locker-stage">
        <div className="locker-backdrop">
          <span className="court-line court-line-a" />
          <span className="court-line court-line-b" />
          <span className="court-circle" />
        </div>

        <span className="locker-upright locker-upright-left" />
        <span className="locker-upright locker-upright-right" />
        <span className="locker-shelf locker-shelf-top" />
        <span className="locker-shelf locker-shelf-bottom" />

        <div className="scene-football" title="Ballon de football">
          <span />
        </div>
        <div className="scene-basketball" title="Ballon de basket" />
        <div className="scene-cone" title="Cône de délimitation" />
        <div className="scene-racket" title="Raquette de badminton">
          <span className="racket-head" />
          <span className="racket-handle" />
        </div>
        <div className="scene-bibs" title="Chasubles">
          <span>TEAM</span>
        </div>
      </div>

      <div className="booking-slip">
        <span>DISPONIBILITÉ</span>
        <strong>{availableCount}/{equipmentCount || 0}</strong>
        <small>références prêtes</small>
      </div>
    </div>
  );
}

export function HomePage({ equipmentCount, availableCount, userRole, onNavigate }: HomePageProps) {
  const accessLabel = userRole === 'Invite' ? 'consultation publique' : `session ${userRole.toLowerCase()}`;

  return (
    <section className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="section-kicker">Stock · réservation · retour</p>
          <h1>Le local matériel, sans le cahier posé sur l’étagère.</h1>
          <p className="lead-copy">
            SportLink regroupe le stock sportif, les disponibilités et les réservations dans un
            même espace. Tu vois ce qui est là, ce qui peut partir et ce qui doit revenir.
          </p>

          <div className="button-row">
            <HomeLink path="/equipment" className="primary-button link-button" onNavigate={onNavigate}>
              Voir le matériel
            </HomeLink>
            <HomeLink path="/blog" className="secondary-button link-button" onNavigate={onNavigate}>
              Préparer une séance
            </HomeLink>
          </div>

          <dl className="hero-strip" aria-label="Aperçu de SportLink">
            <div>
              <dt>Références</dt>
              <dd>{equipmentCount}</dd>
            </div>
            <div>
              <dt>Disponibles</dt>
              <dd>{availableCount}</dd>
            </div>
            <div>
              <dt>Accès</dt>
              <dd>{accessLabel}</dd>
            </div>
          </dl>
        </div>

        <EquipmentScene equipmentCount={equipmentCount} availableCount={availableCount} />
      </section>

      <section className="home-section workflow-section" aria-labelledby="workflow-title">
        <div className="section-title-block">
          <span className="section-index">01</span>
          <div>
            <p className="section-kicker">Le parcours</p>
            <h2 id="workflow-title">Du rayon au terrain, puis retour au stock</h2>
          </div>
        </div>

        <div className="workflow-grid">
          <article>
            <span>STOCK</span>
            <h3>Repérer ce qui est disponible</h3>
            <p>
              Quantité, sport, catégorie et état de disponibilité sont visibles avant de lancer
              une réservation.
            </p>
          </article>
          <article>
            <span>CHOIX</span>
            <h3>Prendre ce qui sert vraiment</h3>
            <p>
              Les fiches et les guides aident à dimensionner le matériel selon la séance et le
              nombre de participants.
            </p>
          </article>
          <article>
            <span>RETOUR</span>
            <h3>Rendre le stock fiable</h3>
            <p>
              Quand le matériel revient, la réservation est clôturée pour que la disponibilité
              redevienne correcte pour le groupe suivant.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section sports-directory" aria-labelledby="sports-title">
        <div className="section-title-block">
          <span className="section-index">02</span>
          <div>
            <p className="section-kicker">Par activité</p>
            <h2 id="sports-title">Le besoin change selon le terrain</h2>
          </div>
        </div>

        <div className="sports-rows">
          <HomeLink path="/sports/football" className="sport-row" onNavigate={onNavigate}>
            Football
          </HomeLink>
          <HomeLink path="/sports/basket" className="sport-row" onNavigate={onNavigate}>
            Basket
          </HomeLink>
          <HomeLink path="/sports/badminton" className="sport-row" onNavigate={onNavigate}>
            Badminton
          </HomeLink>
        </div>
      </section>

      <section className="home-section prep-section" aria-labelledby="prep-title">
        <div className="section-title-block">
          <span className="section-index">03</span>
          <div>
            <p className="section-kicker">Avant de réserver</p>
            <h2 id="prep-title">Quatre points à vérifier</h2>
          </div>
        </div>

        <ol className="checklist-grid">
          <li><b>Activité</b><span>Match, entraînement ou tournoi ne demandent pas le même matériel.</span></li>
          <li><b>Participants</b><span>La quantité dépend surtout du nombre de personnes actives en même temps.</span></li>
          <li><b>Lieu</b><span>Salle, extérieur et espace partagé imposent des contraintes différentes.</span></li>
          <li><b>Retour</b><span>Le rangement et le retour font partie de la réservation.</span></li>
        </ol>
      </section>

      <section className="home-section editorial-section-home" aria-labelledby="guides-title">
        <div className="section-title-block">
          <span className="section-index">04</span>
          <div>
            <p className="section-kicker">Guides SportLink</p>
            <h2 id="guides-title">Quelques repères avant de prendre le matériel</h2>
          </div>
        </div>

        <div className="guide-table">
          <HomeLink path="/blog/choisir-materiel-sportif" className="guide-row" onNavigate={onNavigate}>
            Comment choisir son matériel sportif avant une réservation
          </HomeLink>
          <HomeLink path="/blog/organiser-match-entre-amis" className="guide-row" onNavigate={onNavigate}>
            Organiser un match entre amis facilement avec SportLink
          </HomeLink>
          <HomeLink path="/blog/reservation-materiel-en-ligne" className="guide-row" onNavigate={onNavigate}>
            Pourquoi réserver du matériel sportif en ligne
          </HomeLink>
          <HomeLink path="/blog/ia-recommandation-sportive" className="guide-row" onNavigate={onNavigate}>
            Utiliser une recommandation IA sans oublier le stock réel
          </HomeLink>
        </div>

        <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>
          Tous les guides
        </HomeLink>
      </section>

      <aside className="recommendation-band">
        <div>
          <p className="section-kicker">Aide au choix</p>
          <h2>Décris la séance, puis compare la proposition au stock.</h2>
          <p>
            L’outil peut proposer une première sélection. La disponibilité réelle et les règles
            du lieu restent prioritaires avant de réserver.
          </p>
        </div>
        <HomeLink path="/recommendations-demo" className="signal-button" onNavigate={onNavigate}>
          Essayer
        </HomeLink>
      </aside>
    </section>
  );
}
