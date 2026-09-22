import { MouseEvent } from 'react';
import { sportGuides } from '../data/public-content';

type SportPageProps = {
  sportSlug: string;
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
        'Le besoin dépend d’abord du format : match libre, entraînement technique, petit tournoi ou futsal. Un match simple demande surtout un ballon adapté et des équipes clairement identifiées, alors qu’une séance composée de plusieurs ateliers nécessite davantage de préparation.',
        'Avant de commencer, note le nombre de participants, la durée et le type de terrain. Ces informations suffisent souvent à éviter une organisation trop lourde ou, au contraire, un élément essentiel oublié.',
      ],
    },
    {
      title: 'Salle et extérieur ne se préparent pas de la même façon',
      paragraphs: [
        'En salle, le rebond, la surface et les limites du terrain ont beaucoup d’importance. En extérieur, il faut davantage tenir compte de la surface, de la météo et du marquage disponible.',
        'Dans les deux cas, pense d’abord à ce qui existe déjà sur place avant d’ajouter ta propre checklist.',
      ],
    },
  ],
  basket: [
    {
      title: 'Prévoir les rotations avant la séance',
      paragraphs: [
        'Un match peut fonctionner avec peu de préparation, mais une séance d’entraînement devient vite lente si tous les participants attendent leur tour. Les ateliers en petits groupes augmentent le temps de pratique réel.',
        'Le nombre de ballons et de repères dépend surtout du nombre d’ateliers qui fonctionnent en même temps. L’objectif est de garder un rythme régulier.',
      ],
    },
    {
      title: 'Organiser visuellement le gymnase',
      paragraphs: [
        'Des repères simples permettent de séparer les zones de tir, les parcours de dribble et les espaces d’attente. Cette organisation devient particulièrement utile lorsque le niveau des participants est hétérogène.',
        'Avant la séance, vérifie aussi l’état du sol, les zones de dégagement et la hauteur des paniers.',
      ],
    },
  ],
  badminton: [
    {
      title: 'Anticiper le nombre de joueurs et de terrains',
      paragraphs: [
        'Le nombre de raquettes est facile à anticiper, mais les volants et la disponibilité des terrains changent souvent le déroulement réel. Les doubles permettent de faire jouer davantage de personnes quand l’espace est limité.',
        'Prévoir une organisation simple des rotations évite que certains participants attendent trop longtemps.',
      ],
    },
    {
      title: 'Vérifier le filet et l’espace avant de jouer',
      paragraphs: [
        'Un filet n’est utile que si l’espace permet de l’installer correctement. Vérifie la hauteur, les limites du terrain et les zones de circulation.',
        'Cette vérification préalable permet de consacrer la séance au jeu plutôt qu’à résoudre des problèmes d’installation.',
      ],
    },
  ],
};

export function SportPage({ sportSlug, onNavigate }: SportPageProps) {
  const guide = sportGuides.find((item) => item.slug === sportSlug);
  const editorialSections = sportEditorial[sportSlug] ?? [];

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  if (!guide) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="eyebrow">Sport introuvable</p>
          <h2>Aucun guide n’est publié pour ce sport</h2>
          <p className="description small">
            Consulte les guides SportLink ou utilise l’assistant pour préparer une autre activité.
          </p>
          <a
            className="primary-button link-button"
            href="/blog"
            onClick={(event) => handleNavigation(event, '/blog')}
          >
            Voir les guides
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="content sport-page">
      <header className="article-hero sport-hero">
        <p className="eyebrow">Guide sport</p>
        <h2>{guide.title}</h2>
        <p className="hero-description">{guide.intro}</p>
        <div className="article-meta">
          <span>Rédaction SportLink</span>
          <span>Préparation pratique</span>
        </div>
      </header>

      <section className="card prose-card">
        <p className="card-title">Checklist de préparation</p>
        <ul className="simple-list spacious-list">
          {guide.practicalAdvice.map((advice) => (
            <li key={advice}>{advice}</li>
          ))}
        </ul>
      </section>

      {editorialSections.map((section) => (
        <section className="card editorial-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.paragraphs.map((paragraph) => (
            <p className="description" key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <aside className="guide-highlight article-next">
        <div>
          <p className="eyebrow">Continuer</p>
          <h3>Transforme ces repères en plan de séance</h3>
          <p className="description small">
            Décris ton groupe, le lieu et la durée. L’Assistant SportLink te propose une checklist
            adaptée que tu peux ensuite sauvegarder dans ton compte.
          </p>
        </div>
        <a
          className="primary-button link-button"
          href="/assistant"
          onClick={(event) => handleNavigation(event, '/assistant')}
        >
          Ouvrir l’assistant
        </a>
      </aside>
    </article>
  );
}
