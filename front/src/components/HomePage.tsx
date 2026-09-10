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
        <span>SL / STOCK</span>
        <span className="scene-live">en service</span>
      </div>

      <div className="gear-rack">
        <div className="gear-ticket ticket-football">
          <span className="gear-code">FT-001</span>
          <strong>Ballons</strong>
          <small>football / futsal</small>
          <b>08</b>
        </div>
        <div className="gear-ticket ticket-team">
          <span className="gear-code">EQ-014</span>
          <strong>Chasubles</strong>
          <small>organisation équipe</small>
          <b>24</b>
        </div>
        <div className="gear-ticket ticket-racket">
          <span className="gear-code">BD-006</span>
          <strong>Raquettes</strong>
          <small>badminton</small>
          <b>12</b>
        </div>
      </div>

      <div className="booking-slip">
        <span>INVENTAIRE</span>
        <strong>{availableCount}/{equipmentCount || 0}</strong>
        <small>références disponibles</small>
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
          <p className="section-kicker">Réservation & stock sportif</p>
          <h1>Le matériel, les disponibilités et les réservations au même endroit.</h1>
          <p className="lead-copy">
            SportLink aide un club, une association ou un groupe à savoir ce qui est disponible,
            à préparer le bon équipement et à suivre son retour après l’activité.
          </p>

          <div className="button-row">
            <HomeLink path="/equipment" className="primary-button link-button" onNavigate={onNavigate}>
              Consulter le matériel
            </HomeLink>
            <HomeLink path="/blog" className="secondary-button link-button" onNavigate={onNavigate}>
              Lire les guides
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
            <p className="section-kicker">Fonctionnement</p>
            <h2 id="workflow-title">Du local matériel au terrain</h2>
          </div>
        </div>

        <div className="workflow-grid">
          <article>
            <span>01 — STOCK</span>
            <h3>Repérer ce qui est disponible</h3>
            <p>
              Le catalogue présente les quantités et l’état de disponibilité pour éviter les
              demandes faites au hasard ou les doubles réservations.
            </p>
          </article>
          <article>
            <span>02 — CHOIX</span>
            <h3>Préparer l’activité</h3>
            <p>
              Les fiches et guides expliquent le rôle du matériel selon le sport, le nombre de
              participants et le contexte de la séance.
            </p>
          </article>
          <article>
            <span>03 — RETOUR</span>
            <h3>Remettre le stock à jour</h3>
            <p>
              Une fois le matériel rendu, la réservation est clôturée pour que l’équipement
              redevienne visible et exploitable par le groupe suivant.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section sports-directory" aria-labelledby="sports-title">
        <div className="section-title-block">
          <span className="section-index">02</span>
          <div>
            <p className="section-kicker">Préparer par sport</p>
            <h2 id="sports-title">Partir du terrain, pas d’une liste générique</h2>
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
            <h2 id="prep-title">Quatre vérifications qui évitent la plupart des oublis</h2>
          </div>
        </div>

        <ol className="checklist-grid">
          <li><b>Activité</b><span>Match, entraînement ou tournoi ne demandent pas le même matériel.</span></li>
          <li><b>Participants</b><span>La quantité utile dépend du nombre de personnes actives en même temps.</span></li>
          <li><b>Lieu</b><span>Salle, extérieur et espace partagé changent les besoins et les contraintes.</span></li>
          <li><b>Retour</b><span>Prévoir le rangement et le retour évite de bloquer le stock inutilement.</span></li>
        </ol>
      </section>

      <section className="home-section editorial-section-home" aria-labelledby="guides-title">
        <div className="section-title-block">
          <span className="section-index">04</span>
          <div>
            <p className="section-kicker">Guides SportLink</p>
            <h2 id="guides-title">Lire avant de prendre le matériel</h2>
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
            Comment utiliser une recommandation IA sans oublier le stock réel
          </HomeLink>
        </div>

        <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>
          Parcourir tous les guides
        </HomeLink>
      </section>

      <aside className="recommendation-band">
        <div>
          <p className="section-kicker">Aide au choix</p>
          <h2>Tu décris la séance. SportLink rapproche la demande du catalogue.</h2>
          <p>
            La recommandation sert de point de départ. La disponibilité réelle et les règles du
            lieu restent toujours prioritaires avant de confirmer une réservation.
          </p>
        </div>
        <HomeLink path="/recommendations-demo" className="signal-button" onNavigate={onNavigate}>
          Tester l’aide au choix
        </HomeLink>
      </aside>
    </section>
  );
}
