import { MouseEvent } from 'react';
import { getEquipmentContent, sportGuides } from '../data/public-content';
import { Equipment } from '../types';

type SportPageProps = {
  sportSlug: string;
  equipmentList: Equipment[];
  onNavigate: (path: string) => void;
};

type SportEditorial = {
  title: string;
  paragraphs: string[];
}[];

const sportEditorial: Record<string, SportEditorial> = {
  football: [
    {
      title: 'Commencer par le format de la séance',
      paragraphs: [
        'Le matériel utile dépend d’abord du format : match libre, entraînement technique, petit tournoi ou futsal. Un match simple demande surtout des ballons fiables et des chasubles, alors qu’une séance composée de plusieurs ateliers nécessite davantage de ballons et de cônes pour faire travailler les joueurs en parallèle.',
        'Avant de réserver, note le nombre de participants, la durée et le type de terrain. Ces informations suffisent souvent à éviter de prendre trop de matériel ou, au contraire, de découvrir au dernier moment qu’il manque un élément essentiel.',
      ],
    },
    {
      title: 'Salle et extérieur ne se préparent pas de la même façon',
      paragraphs: [
        'En salle, le contrôle du rebond, la surface et les limites du terrain ont beaucoup d’importance. Un ballon de futsal peut être plus adapté qu’un ballon classique. En extérieur, il faut davantage tenir compte de la surface, de la météo et du marquage disponible.',
        'Dans les deux cas, les chasubles et les cônes restent utiles dès que plusieurs équipes ou ateliers partagent l’espace. Ils rendent la séance plus lisible sans nécessiter une installation lourde.',
      ],
    },
  ],
  basket: [
    {
      title: 'Prévoir plusieurs ballons pour les ateliers',
      paragraphs: [
        'Un match peut se jouer avec un seul ballon, mais une séance d’entraînement devient vite lente si tous les participants doivent attendre leur tour. Pour le tir, le dribble ou les exercices en petits groupes, plusieurs ballons augmentent fortement le temps de pratique réel.',
        'La quantité idéale dépend du nombre d’ateliers qui fonctionnent en même temps. Il n’est pas nécessaire d’avoir un ballon par joueur : l’objectif est surtout de limiter les files d’attente et de garder un rythme régulier.',
      ],
    },
    {
      title: 'Organiser visuellement le gymnase',
      paragraphs: [
        'Des cônes ou repères simples permettent de séparer les zones de tir, les parcours de dribble et les espaces d’attente. Cette organisation devient particulièrement utile lorsque le niveau des participants est hétérogène ou que plusieurs groupes utilisent le même terrain.',
        'Avant la séance, vérifie également l’état du sol, les zones de dégagement et la hauteur des paniers. Le matériel réservé doit s’intégrer à un espace adapté au groupe.',
      ],
    },
  ],
  badminton: [
    {
      title: 'Compter les raquettes, mais aussi les volants',
      paragraphs: [
        'Le nombre de raquettes est facile à anticiper, mais les volants sont souvent le vrai point faible d’une séance. Ils s’usent, se déforment ou se perdent plus vite que les raquettes. Prévoir une réserve raisonnable évite de raccourcir l’activité alors que tout le reste du matériel est disponible.',
        'Pour les groupes débutants, les doubles permettent de faire jouer davantage de personnes avec moins de terrains. Le choix entre simple et double influence donc directement le nombre de raquettes et l’espace nécessaires.',
      ],
    },
    {
      title: 'Vérifier le filet et l’espace avant de réserver',
      paragraphs: [
        'Un filet réglable n’est utile que si l’espace permet de l’installer correctement. Vérifie les points de fixation, la hauteur et les zones de circulation autour du terrain. Dans une salle partagée, quelques repères au sol peuvent aussi aider à matérialiser les limites.',
        'Cette vérification préalable réduit le risque de réserver un équipement inutilisable sur place et permet de consacrer la séance au jeu plutôt qu’à résoudre des problèmes d’installation.',
      ],
    },
  ],
};

export function SportPage({ sportSlug, equipmentList, onNavigate }: SportPageProps) {
  const guide = sportGuides.find((item) => item.slug === sportSlug);
  const sportEquipment = equipmentList
    .filter((item) => item.sport.toLowerCase() === sportSlug.toLowerCase())
    .map(getEquipmentContent);
  const editorialSections = sportEditorial[sportSlug] ?? [];

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  if (!guide && sportEquipment.length === 0) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="eyebrow">Sport introuvable</p>
          <h2>Aucun guide n’est publié pour ce sport</h2>
          <p className="description small">
            Consulte le catalogue général pour retrouver tous les équipements disponibles et les
            sports actuellement documentés dans SportLink.
          </p>
          <a className="primary-button link-button" href="/equipment" onClick={(event) => handleNavigation(event, '/equipment')}>
            Voir tous les équipements
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="content sport-page">
      <header className="article-hero sport-hero">
        <p className="eyebrow">Guide sport</p>
        <h2>{guide?.title ?? `Matériel pour ${sportSlug}`}</h2>
        <p className="hero-description">
          {guide?.intro ??
            `Retrouve les équipements SportLink disponibles pour organiser une activité ${sportSlug}.`}
        </p>
        <div className="article-meta">
          <span>Rédaction SportLink</span>
          <span>Préparation pratique</span>
        </div>
      </header>

      {guide ? (
        <div className="grid two-columns">
          <section className="card prose-card">
            <p className="card-title">Catégories utiles</p>
            <p className="description small">
              Ces catégories couvrent les besoins les plus fréquents pour préparer une séance de
              {` ${guide.sport}`} sans multiplier le matériel inutile.
            </p>
            <ul className="simple-list spacious-list">
              {guide.recommendedCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </section>
          <section className="card prose-card">
            <p className="card-title">Checklist de préparation</p>
            <ul className="simple-list spacious-list">
              {guide.practicalAdvice.map((advice) => (
                <li key={advice}>{advice}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {editorialSections.map((section) => (
        <section className="card editorial-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.paragraphs.map((paragraph) => (
            <p className="description" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="section-block" aria-labelledby="sport-equipment-list">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Matériel lié à ce sport</p>
            <h2 id="sport-equipment-list">Consulter les fiches avant de réserver</h2>
          </div>
          <a className="text-link" href="/equipment" onClick={(event) => handleNavigation(event, '/equipment')}>
            Catalogue complet
          </a>
        </div>

        <div className="grid">
          {sportEquipment.map((equipment) => (
            <article className="card equipment-summary-card" key={equipment.id}>
              <div className="card-row">
                <p className="card-title">{equipment.name}</p>
                <span className={equipment.available ? 'status ok' : 'status off'}>
                  {equipment.available ? 'Disponible' : 'Indisponible'}
                </span>
              </div>
              <p className="description small">{equipment.usageAdvice}</p>
              <a
                className="text-link"
                href={`/equipment/${equipment.id}`}
                onClick={(event) => handleNavigation(event, `/equipment/${equipment.id}`)}
              >
                Voir la fiche matériel
              </a>
            </article>
          ))}
        </div>
      </section>

      <aside className="guide-highlight article-next">
        <div>
          <p className="eyebrow">Continuer</p>
          <h3>Besoin d’une méthode plus générale pour choisir ?</h3>
          <p className="description small">
            Le guide de sélection explique comment croiser le sport, le nombre de participants,
            le lieu et le déroulement de la séance avant de confirmer une réservation.
          </p>
        </div>
        <a
          className="primary-button link-button"
          href="/blog/choisir-materiel-sportif"
          onClick={(event) => handleNavigation(event, '/blog/choisir-materiel-sportif')}
        >
          Lire le guide de sélection
        </a>
      </aside>
    </article>
  );
}
