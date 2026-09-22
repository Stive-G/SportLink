import { MouseEvent } from 'react';
import { blogArticles } from '../data/public-content';

type ArticlePageProps = {
  slug: string;
  onNavigate: (path: string) => void;
};

type ExtraSection = {
  heading: string;
  paragraphs: string[];
};

const editorialExtensions: Record<string, ExtraSection[]> = {
  'choisir-materiel-sportif': [
    {
      heading: 'Adapter la quantité au rythme de la séance',
      paragraphs: [
        'La quantité utile ne dépend pas seulement du nombre total de participants. Elle dépend aussi de la manière dont la séance est organisée. Dix joueurs qui font un match ont besoin de moins de ballons que dix joueurs répartis sur plusieurs ateliers simultanés. Avant de préparer la séance, il faut donc imaginer le déroulement réel : échauffement, exercices, match, rotations et temps d’attente.',
        'Une règle simple consiste à prévoir assez de matériel pour que personne ne reste inactif trop longtemps, sans emporter inutilement trop de matériel. Pour les petits accessoires comme les cônes ou les chasubles, une petite marge est souvent utile. Pour le matériel plus rare, mieux vaut prévoir uniquement ce qui sera réellement utilisé.',
      ],
    },
    {
      heading: 'Contrôler l’état et les contraintes du lieu',
      paragraphs: [
        'Le lieu de pratique influence directement le choix du matériel. En salle, il faut penser au type de sol, à l’espace disponible et aux équipements déjà présents. En extérieur, la météo, la surface et les possibilités de fixation peuvent changer la préparation. Un filet réglable n’est utile que si son installation est possible et sécurisée sur place.',
        'Cette vérification évite le matériel inutile. Elle permet aussi de prévoir les éléments complémentaires : pompe, cônes de délimitation, chasubles, ballons de secours ou matériel de rangement. Le bon équipement est celui qui fonctionne dans le contexte réel de la séance, pas seulement celui qui correspond au nom du sport.',
      ],
    },
    {
      heading: 'Faire une dernière vérification avant de confirmer',
      paragraphs: [
        'Avant de finaliser le plan, vérifie quatre points : compatibilité avec le lieu, quantité utile, durée et organisation du rangement. Cette dernière étape est importante dans une activité collective, car une mauvaise préparation peut compliquer le déroulement de toute la séance.',
        'SportLink sert précisément à rendre ces informations visibles. Les fiches donnent un contexte d’usage, la bibliothèque explique les usages et les guides aident à anticiper les besoins. Le plan devient alors une préparation réfléchie plutôt qu’une liste faite au hasard.',
      ],
    },
  ],
  'equipement-football-debuter': [
    {
      heading: 'Combien de matériel prévoir pour un petit groupe ?',
      paragraphs: [
        'Pour un match entre amis, le minimum utile est généralement un ballon principal, un ballon de secours et deux jeux de chasubles bien différenciés. Si le terrain n’a pas de marquage clair ou si l’activité se déroule sur un espace partagé, quelques cônes permettent de matérialiser les limites, les buts temporaires ou une zone d’échauffement.',
        'Lors d’un entraînement, le besoin change : plusieurs ballons deviennent plus importants afin que les joueurs puissent travailler en parallèle. Le nombre de cônes augmente aussi lorsque plusieurs ateliers sont installés. Il vaut donc mieux partir du scénario de séance plutôt que d’appliquer une liste identique à tous les groupes.',
      ],
    },
    {
      heading: 'Futsal et extérieur : ne pas choisir le ballon de la même façon',
      paragraphs: [
        'Un ballon de futsal est conçu pour un jeu plus contrôlé sur une surface intérieure et présente généralement un rebond plus faible. Sur un terrain extérieur, le choix dépend davantage de la surface et des conditions de jeu. Utiliser un ballon adapté rend les passes plus prévisibles et améliore le confort des joueurs.',
        'Avant le départ, vérifie aussi la pression et l’état général du ballon. Le matériel n’est utile que s’il est adapté au lieu et prêt à l’emploi. Pour une activité longue ou un tournoi, prévoir une solution de secours évite qu’un simple problème de ballon interrompe toute la séance.',
      ],
    },
    {
      heading: 'Penser à l’organisation, pas seulement au ballon',
      paragraphs: [
        'Les petits équipements structurent beaucoup le jeu. Les chasubles évitent les confusions, les cônes permettent de définir des zones et un matériel de rangement facilite le retour. Pour un groupe qui change souvent de joueurs, identifier clairement les équipes et les espaces fait gagner du temps à chaque rotation.',
        'La meilleure préparation couvre le déroulement complet : installation, échauffement, match et rangement. Cette logique aide aussi à limiter les oublis et à terminer la séance de manière propre et organisée.',
      ],
    },
  ],
  'organiser-match-entre-amis': [
    {
      heading: 'Fixer les règles pratiques avant de préparer la séance',
      paragraphs: [
        'Un match improvisé devient beaucoup plus simple lorsqu’on fixe à l’avance le nombre de joueurs, la durée, le lieu et le format. Ces quatre informations déterminent presque tout le reste. Un cinq contre cinq en salle ne nécessite pas la même préparation qu’un match sur grand terrain ou qu’un tournoi avec plusieurs équipes qui se succèdent.',
        'Cette étape permet aussi d’éviter de prévoir trop de matériel. Si un groupe sait exactement combien d’équipes joueront en même temps, il peut choisir la quantité de chasubles et de ballons réellement nécessaire et garder une préparation légère et adaptée.',
      ],
    },
    {
      heading: 'Prévoir une petite marge pour les imprévus',
      paragraphs: [
        'Une séance collective comporte souvent quelques imprévus : un ballon qui se dégonfle, un joueur supplémentaire, une zone du terrain qui doit être redélimitée. Une petite marge sur le matériel léger peut donc être utile. L’objectif n’est pas d’emporter tout ce qui existe, mais d’éviter qu’un incident mineur bloque l’activité.',
        'Pour le matériel rare ou volumineux, la logique inverse s’applique : prévois seulement ce qui est indispensable. Une préparation équilibrée améliore l’expérience du groupe sans ajouter de matériel inutile.',
      ],
    },
    {
      heading: 'Organiser le rangement dès le départ',
      paragraphs: [
        'Le rangement ne doit pas être une question posée à la fin du match. Dès la préparation, désigne une personne responsable du matériel, prévois un temps de rangement et vérifie que chaque élément est récupéré avant de quitter le lieu. Les petits accessoires sont ceux qui se perdent le plus facilement lorsque personne n’en a la responsabilité.',
        'Une fois la séance terminée, une checklist simple permet de vérifier que rien n’a été oublié et de conserver un plan clair pour une prochaine session.',
      ],
    },
  ],
  'preparer-seance-sportive': [
    {
      heading: 'Pourquoi une préparation centralisée change la séance',
      paragraphs: [
        'Quand l’organisation repose sur des messages dispersés, il devient facile d’oublier le lieu, le format ou le matériel. Un plan centralisé donne un point de référence commun pour retrouver l’activité et les éléments à prévoir.',
        'Cette visibilité réduit les oublis et facilite la préparation, car les utilisateurs peuvent comparer plusieurs équipements avant de choisir ceux qui correspondent réellement à leur activité.',
      ],
    },
    {
      heading: 'Le plan doit rester lié au contexte réel',
      paragraphs: [
        'Un plan n’est utile que s’il correspond au lieu, au groupe et au déroulement réel. Si le contexte change, il faut ajuster le matériel et les conseils plutôt que suivre la fiche mécaniquement.',
        'Le meilleur fonctionnement repose sur une habitude simple : relire le plan juste avant la séance et l’adapter aux contraintes réellement rencontrées sur place.',
      ],
    },
    {
      heading: 'Sauvegarder les plans qui fonctionnent',
      paragraphs: [
        'Un plan sauvegardé permet de retrouver rapidement une séance qui a bien fonctionné : matériel utilisé, structure générale et conseils utiles. Il peut ensuite être adapté à un autre groupe ou à un autre lieu.',
        'Pour un membre, retrouver ses plans précédents facilite également la répétition d’une activité réussie. Il peut repartir d’un choix connu, puis l’adapter au nombre de participants ou au lieu de la prochaine séance.',
      ],
    },
  ],
  'ia-recommandation-sportive': [
    {
      heading: 'Une recommandation utile doit rester ancrée dans des données réelles',
      paragraphs: [
        'Une IA peut proposer beaucoup d’idées, mais elles ne sont utiles que si elles correspondent à la bibliothèque de matériel. Dans SportLink, l’objectif est de rapprocher la demande de l’utilisateur de la bibliothèque SportLink. Une suggestion qui recommande un équipement absent de la bibliothèque doit être vérifiée avant d’être retenue.',
        'Le contexte d’utilisation, le lieu et le nombre de participants restent donc des critères essentiels. L’IA aide à formuler une première sélection, puis l’utilisateur vérifie les fiches et les contraintes du lieu avant de confirmer son choix.',
      ],
    },
    {
      heading: 'Bien formuler sa demande améliore la pertinence du résultat',
      paragraphs: [
        'Une phrase comme « je veux faire du sport » donne peu d’informations. Une demande plus précise — sport, nombre de personnes, lieu et type de séance — permet d’obtenir une recommandation beaucoup plus utile. Par exemple, un match de futsal à dix personnes en salle ne conduit pas aux mêmes besoins qu’un atelier technique pour quatre joueurs.',
        'Il n’est pas nécessaire de transmettre des données personnelles. Les informations utiles concernent surtout l’activité elle-même : format, nombre de participants, environnement et objectif de la séance.',
      ],
    },
    {
      heading: 'Toujours garder une vérification humaine',
      paragraphs: [
        'Une recommandation automatique ne connaît pas toutes les contraintes du terrain, les règles internes d’un club ou l’état physique réel du matériel. Elle doit donc être utilisée comme une aide à la préparation, pas comme une décision automatique. L’utilisateur garde la responsabilité de vérifier que l’équipement proposé est adapté au contexte.',
        'Cette combinaison est la plus utile : l’IA accélère la recherche, les contenus éditoriaux expliquent les choix et la bibliothèque aide à vérifier ce qui est pertinent.',
      ],
    },
  ],
  'basket-amateur-materiel': [
    {
      heading: 'Prévoir plusieurs situations dans une même séance',
      paragraphs: [
        'Une séance de basket amateur alterne souvent échauffement, dribble, tir, exercices en petits groupes et match. Le nombre de ballons doit donc être pensé pour les phases où plusieurs joueurs travaillent en même temps. Un seul ballon peut suffire pour un match, mais devient vite une contrainte pendant un atelier technique.',
        'Si le groupe dispose de plusieurs ballons, répartir plusieurs ballons entre de petits groupes améliore fortement le temps de pratique. Les cônes ou repères au sol aident ensuite à organiser les rotations sans que les groupes se croisent constamment.',
      ],
    },
    {
      heading: 'Sécuriser les zones d’attente et de rotation',
      paragraphs: [
        'Dans un gymnase partagé, une mauvaise organisation de l’espace peut être plus gênante qu’un manque de matériel. Délimiter les zones de tir, de course et d’attente rend la séance plus lisible et réduit les croisements inutiles. Les cônes sont particulièrement utiles lorsqu’un terrain accueille plusieurs ateliers simultanément.',
        'Avant de commencer, vérifie aussi que les paniers, le sol et les zones de dégagement sont adaptés au niveau des participants. Le matériel prévu doit compléter un environnement déjà praticable et sûr.',
      ],
    },
    {
      heading: 'Adapter le plan au niveau du groupe',
      paragraphs: [
        'Un groupe débutant bénéficie souvent d’exercices simples et de davantage de répétitions individuelles. Cela augmente le besoin en ballons. Un groupe plus expérimenté peut consacrer plus de temps au jeu collectif, ce qui réduit la quantité nécessaire pendant certaines phases.',
        'Le niveau n’est donc pas un détail : il influence la manière dont le matériel sera utilisé. En décrivant correctement le groupe et le format de séance, on peut préparer moins au hasard et mieux structurer la séance.',
      ],
    },
  ],
};

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const article = blogArticles.find((item) => item.slug === slug);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  if (!article) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="eyebrow">Guide introuvable</p>
          <h2>Ce contenu n’est pas disponible</h2>
          <p className="description small">
            Le lien consulté ne correspond à aucun guide publié. Retourne à la bibliothèque pour
            accéder aux contenus disponibles.
          </p>
          <a className="primary-button link-button" href="/blog" onClick={(event) => handleNavigation(event, '/blog')}>
            Voir les guides
          </a>
        </div>
      </section>
    );
  }

  const extraSections = editorialExtensions[article.slug] ?? [];

  return (
    <article className="content article-page">
      <header className="article-hero">
        <p className="eyebrow">{article.category} · {article.readingTime}</p>
        <h2>{article.title}</h2>
        <p className="hero-description">{article.summary}</p>
        <div className="article-meta">
          <span>Rédaction SportLink</span>
          <span>Guide pratique</span>
        </div>
        {article.relatedSport ? (
          <a
            className="secondary-button link-button"
            href={`/sports/${article.relatedSport}`}
            onClick={(event) => handleNavigation(event, `/sports/${article.relatedSport}`)}
          >
            Voir le guide {article.relatedSport}
          </a>
        ) : null}
      </header>

      <div className="article-toc card">
        <p className="card-title">Dans ce guide</p>
        <ol className="simple-list ordered">
          {article.sections.map((section) => (
            <li key={section.heading}>{section.heading}</li>
          ))}
          {extraSections.map((section) => (
            <li key={section.heading}>{section.heading}</li>
          ))}
        </ol>
      </div>

      {article.sections.map((section) => (
        <section className="card editorial-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p className="description">{section.body}</p>
        </section>
      ))}

      {extraSections.map((section) => (
        <section className="card editorial-section" key={section.heading}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((paragraph) => (
            <p className="description" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <aside className="guide-highlight article-next">
        <div>
          <p className="eyebrow">Continuer la préparation</p>
          <h3>Relier les conseils à un plan concret</h3>
          <p className="description small">
            Consulte la bibliothèque matériel puis utilise l’assistant si tu veux transformer une
            description libre de ton activité en plan de séance.
          </p>
        </div>
        <div className="button-row">
          <a className="primary-button link-button" href="/assistant" onClick={(event) => handleNavigation(event, '/assistant')}>
            Voir le catalogue
          </a>
          <a
            className="secondary-button link-button"
            href="/assistant"
            onClick={(event) => handleNavigation(event, '/assistant')}
          >
            Ouvrir l’assistant
          </a>
        </div>
      </aside>
    </article>
  );
}
