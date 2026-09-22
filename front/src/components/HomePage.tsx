import { MouseEvent } from 'react';

type HomePageProps = {
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

  return <a className={className} href={path} onClick={handleClick}>{children}</a>;
}

function SportScene() {
  return (
    <div className="gear-scene" aria-hidden="true">
      <div className="gear-scene-head">
        <span>PRÉPARATION / TERRAIN</span>
        <span className="scene-live">assistant prêt</span>
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
        <div className="scene-football"><span /></div>
        <div className="scene-basketball" />
        <div className="scene-cone" />
        <div className="scene-racket"><span className="racket-head" /><span className="racket-handle" /></div>
        <div className="scene-bibs"><span>TEAM</span></div>
      </div>

      <div className="booking-slip">
        <span>SPORTLINK</span>
        <strong>3</strong>
        <small>lieu · assistant · plans</small>
      </div>
    </div>
  );
}

export function HomePage({ userRole, onNavigate }: HomePageProps) {
  const accessLabel = userRole === 'Invite' ? 'accès public' : 'plans sauvegardés';

  return (
    <section className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="section-kicker">Lieu · séance · plan</p>
          <h1>Prépare ton activité avant d’arriver sur le terrain.</h1>
          <p className="lead-copy">
            SportLink t’aide à trouver où pratiquer et à construire une séance adaptée au groupe,
            au lieu et au temps disponible.
          </p>

          <div className="button-row">
            <HomeLink path="/places" className="primary-button link-button" onNavigate={onNavigate}>
              Trouver un lieu
            </HomeLink>
            <HomeLink path="/assistant" className="secondary-button link-button" onNavigate={onNavigate}>
              Préparer une séance
            </HomeLink>
            <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>
              Lire les guides
            </HomeLink>
          </div>

          <dl className="hero-strip" aria-label="Aperçu de SportLink">
            <div><dt>Lieux</dt><dd>Data ES</dd></div>
            <div><dt>Assistant</dt><dd>IA + fallback</dd></div>
            <div><dt>Compte</dt><dd>{accessLabel}</dd></div>
          </dl>
        </div>

        <SportScene />
      </section>

      <section className="home-section workflow-section">
        <div className="section-title-block">
          <span className="section-index">01</span>
          <div><p className="section-kicker">Le parcours</p><h2>De l’idée au plan de séance</h2></div>
        </div>

        <div className="workflow-grid">
          <article>
            <span>LIEU</span>
            <h3>Trouver où pratiquer</h3>
            <p>Recherche une ville, un code postal ou un sport dans les données publiques Data ES.</p>
          </article>
          <article>
            <span>ASSISTANT</span>
            <h3>Structurer la séance</h3>
            <p>Décris le groupe, la durée et le contexte pour obtenir une checklist et des conseils.</p>
          </article>
          <article>
            <span>PLAN</span>
            <h3>Sauvegarder ce qui fonctionne</h3>
            <p>Un compte permet de conserver les préparations utiles et de les retrouver plus tard.</p>
          </article>
        </div>
      </section>

      <section className="home-section sports-directory">
        <div className="section-title-block">
          <span className="section-index">02</span>
          <div><p className="section-kicker">Par activité</p><h2>Le besoin change selon le sport</h2></div>
        </div>
        <div className="sports-rows">
          <HomeLink path="/sports/football" className="sport-row" onNavigate={onNavigate}>Football</HomeLink>
          <HomeLink path="/sports/basket" className="sport-row" onNavigate={onNavigate}>Basket</HomeLink>
          <HomeLink path="/sports/badminton" className="sport-row" onNavigate={onNavigate}>Badminton</HomeLink>
        </div>
      </section>

      <section className="home-section prep-section">
        <div className="section-title-block">
          <span className="section-index">03</span>
          <div><p className="section-kicker">Avant de jouer</p><h2>Quatre informations qui changent la préparation</h2></div>
        </div>
        <ol className="checklist-grid">
          <li><b>Activité</b><span>Match, entraînement ou loisir ne demandent pas la même organisation.</span></li>
          <li><b>Participants</b><span>Le nombre de joueurs influence les rotations et la checklist.</span></li>
          <li><b>Lieu</b><span>Salle, extérieur et accès libre imposent des contraintes différentes.</span></li>
          <li><b>Durée</b><span>Une séance courte ou longue ne se structure pas de la même manière.</span></li>
        </ol>
      </section>

      <section className="home-section editorial-section-home">
        <div className="section-title-block">
          <span className="section-index">04</span>
          <div><p className="section-kicker">Guides SportLink</p><h2>Des repères pour préparer sans improviser</h2></div>
        </div>
        <div className="guide-table">
          <HomeLink path="/blog/choisir-materiel-sportif" className="guide-row" onNavigate={onNavigate}>Comment choisir son matériel sportif</HomeLink>
          <HomeLink path="/blog/organiser-match-entre-amis" className="guide-row" onNavigate={onNavigate}>Organiser un match entre amis</HomeLink>
          <HomeLink path="/blog/ia-recommandation-sportive" className="guide-row" onNavigate={onNavigate}>Utiliser l’assistant SportLink intelligemment</HomeLink>
        </div>
        <HomeLink path="/blog" className="text-link" onNavigate={onNavigate}>Tous les guides</HomeLink>
      </section>

      <aside className="recommendation-band">
        <div>
          <p className="section-kicker">Assistant SportLink</p>
          <h2>Décris la séance. SportLink t’aide à construire le plan.</h2>
          <p>Le résultat s’appuie sur ton contexte. Les règles du lieu restent toujours prioritaires.</p>
        </div>
        <HomeLink path="/assistant" className="signal-button" onNavigate={onNavigate}>Essayer l’assistant</HomeLink>
      </aside>
    </section>
  );
}
