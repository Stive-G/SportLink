import { BlogArticle, RecommendationResult, SportGuide } from '../types';

export const sportGuides: SportGuide[] = [
  {
    slug: 'football',
    sport: 'football',
    title: 'Organiser une séance de football sans improviser',
    intro:
      'Le format du match, le nombre de joueurs et le terrain changent la préparation. L’objectif est de savoir quoi vérifier avant d’arriver sur place.',
    practicalAdvice: [
      'Prévoir un ballon adapté au terrain et un ballon de secours pour une séance longue.',
      'Utiliser des chasubles si les équipes ne portent pas déjà des couleurs distinctes.',
      'Ajouter des plots lorsque le terrain doit être réduit ou partagé en plusieurs ateliers.',
      'Vérifier les règles du lieu et ce qui est déjà mis à disposition.',
    ],
  },
  {
    slug: 'basket',
    sport: 'basket',
    title: 'Préparer une activité basket en gymnase',
    intro:
      'Le basket demande peu d’éléments, mais le nombre de ballons, l’organisation des rotations et les contraintes du gymnase ont un impact direct sur la séance.',
    practicalAdvice: [
      'Prévoir plusieurs ballons pour les ateliers de tir ou de dribble.',
      'Organiser les participants en petits groupes pour limiter l’attente.',
      'Utiliser des repères simples pour séparer les ateliers.',
      'Vérifier la hauteur des paniers et les zones de dégagement.',
    ],
  },
  {
    slug: 'badminton',
    sport: 'badminton',
    title: 'Démarrer une séance de badminton sans oublier l’essentiel',
    intro:
      'Raquettes, volants, filet et espace disponible doivent être anticipés avant la séance, surtout lorsque plusieurs niveaux jouent ensemble.',
    practicalAdvice: [
      'Prévoir plus de volants que de joueurs pour éviter les interruptions.',
      'Vérifier la hauteur du filet et la zone de jeu.',
      'Utiliser les doubles pour faire jouer davantage de personnes quand les terrains sont limités.',
      'Contrôler les zones de circulation autour des terrains.',
    ],
  },
];

export const blogArticles: BlogArticle[] = [
  {
    slug: 'choisir-materiel-sportif',
    title: 'Comment choisir son matériel sportif avant une séance',
    summary:
      'Une méthode simple pour choisir ce qui est utile selon le sport, le nombre de participants, la durée et le lieu.',
    category: 'Guide pratique',
    readingTime: '5 min',
    sections: [
      {
        heading: 'Partir de l’activité réelle',
        body:
          'Un match libre, un entraînement technique et un petit tournoi ne demandent pas la même préparation. Commence par définir ce que le groupe va réellement faire avant de dresser une liste de matériel.',
      },
      {
        heading: 'Vérifier le nombre de participants',
        body:
          'Plus le groupe est grand, plus il faut penser à la circulation, aux rotations et aux repères visuels. Des chasubles, des plots ou plusieurs ballons peuvent devenir utiles alors qu’ils seraient superflus pour un petit groupe.',
      },
      {
        heading: 'Penser au lieu',
        body:
          'Un gymnase, un terrain extérieur et une salle réduite imposent des contraintes différentes. Vérifie toujours ce qui existe déjà sur place avant de prévoir du matériel supplémentaire.',
      },
    ],
  },
  {
    slug: 'equipement-football-debuter',
    title: 'Quel matériel pour débuter le football entre amis',
    summary:
      'Ballon, chasubles, cônes et organisation : les éléments utiles pour préparer un match simple.',
    category: 'Football',
    readingTime: '4 min',
    relatedSport: 'football',
    sections: [
      {
        heading: 'Le ballon adapté au terrain',
        body:
          'Pour du foot en salle, un ballon de futsal offre un rebond plus contrôlé. En extérieur, le type de surface et l’état du terrain comptent davantage. Vérifie aussi la pression avant le début du match.',
      },
      {
        heading: 'Les chasubles pour structurer les équipes',
        body:
          'Quand les joueurs viennent avec leurs propres tenues, les chasubles rendent le jeu plus lisible et évitent les interruptions pour reconnaître les partenaires.',
      },
      {
        heading: 'Les cônes pour délimiter',
        body:
          'Quelques cônes suffisent pour créer des buts temporaires, réduire le terrain ou préparer un atelier d’échauffement. Ils sont surtout utiles quand le marquage du lieu ne correspond pas au format choisi.',
      },
    ],
  },
  {
    slug: 'organiser-match-entre-amis',
    title: 'Organiser un match entre amis facilement avec SportLink',
    summary:
      'Les étapes simples pour transformer une idée de match en plan de séance concret.',
    category: 'Organisation',
    readingTime: '5 min',
    sections: [
      {
        heading: 'Définir le format du match',
        body:
          'Avant de préparer quoi que ce soit, précise le nombre de joueurs, la durée, le niveau et le type de terrain. Ces informations orientent le format du jeu et la petite checklist à prévoir.',
      },
      {
        heading: 'Vérifier ce qui existe déjà sur place',
        body:
          'Le lieu peut déjà fournir des buts, paniers, lignes ou filets. Vérifier ce qui existe évite d’emporter des éléments inutiles et permet de se concentrer sur ce qui manque réellement.',
      },
      {
        heading: 'Prévoir le rangement',
        body:
          'Une bonne préparation ne s’arrête pas au coup de sifflet final. Garde quelques minutes pour rassembler les affaires, vérifier le petit matériel et quitter le lieu proprement.',
      },
    ],
  },
  {
    slug: 'preparer-seance-sportive',
    title: 'Pourquoi préparer sa séance sportive à l’avance',
    summary:
      'Un plan simple relie lieu, participants, matériel utile et déroulé avant d’arriver sur le terrain.',
    category: 'Préparation',
    readingTime: '4 min',
    sections: [
      {
        heading: 'Clarifier le contexte',
        body:
          'Définir le sport, le lieu, le nombre de participants et la durée permet d’éviter les choix au hasard et donne une base claire pour organiser la séance.',
      },
      {
        heading: 'Garder les plans qui fonctionnent',
        body:
          'Une séance réussie peut servir de modèle. Sauvegarder les grandes lignes permet ensuite de l’adapter à un autre groupe, un autre lieu ou une autre durée.',
      },
      {
        heading: 'Réduire les oublis',
        body:
          'Une checklist courte avant de partir évite d’oublier ballon, chasubles, eau ou accessoires utiles. Elle doit rester adaptée au contexte plutôt que devenir une liste systématique.',
      },
    ],
  },
  {
    slug: 'ia-recommandation-sportive',
    title: 'Comment une IA peut aider à préparer une activité sportive',
    summary:
      'L’assistant transforme une description libre en checklist et en conseils de préparation adaptés au contexte.',
    category: 'IA',
    readingTime: '6 min',
    sections: [
      {
        heading: 'Comprendre une demande naturelle',
        body:
          'Un utilisateur peut simplement écrire : « foot en salle, 8 personnes, 1 h 30, débutants ». L’assistant extrait le contexte et le transforme en une préparation plus structurée.',
      },
      {
        heading: 'Proposer une checklist, pas inventer un stock',
        body:
          'SportLink ne possède pas de matériel. L’assistant propose donc ce qui peut être utile, puis l’utilisateur vérifie ce qu’il possède déjà ou ce qui est fourni par le lieu.',
      },
      {
        heading: 'Garder une validation humaine',
        body:
          'Une réponse générée peut être incomplète ou inadaptée. Les règles du lieu, les consignes d’un encadrant et la sécurité du groupe restent toujours prioritaires.',
      },
    ],
  },
  {
    slug: 'basket-amateur-materiel',
    title: 'Matériel conseillé pour une séance de basket amateur',
    summary:
      'Les éléments utiles pour une séance de basket claire, dynamique et accessible.',
    category: 'Basket',
    readingTime: '4 min',
    relatedSport: 'basket',
    sections: [
      {
        heading: 'Plusieurs ballons pour limiter l’attente',
        body:
          'Pendant les ateliers de tir ou de dribble, un seul ballon ralentit vite la séance. Plusieurs ballons permettent de créer de petits groupes et d’augmenter le temps de pratique réel.',
      },
      {
        heading: 'Des groupes bien répartis',
        body:
          'Des équipes fixes ou des chasubles simplifient les rotations. C’est particulièrement utile quand le niveau des joueurs est hétérogène.',
      },
      {
        heading: 'Un espace lisible',
        body:
          'Des plots ou repères peuvent séparer les zones de tir, de course et d’attente. Cette organisation rend la séance plus fluide et réduit les croisements inutiles.',
      },
    ],
  },
];

export function buildLocalRecommendation(prompt: string): RecommendationResult {
  const normalized = prompt.toLowerCase();
  let recommendedItems = [
    {
      name: 'Eau et affaires personnelles',
      reason: 'Prévoir l’hydratation et les effets nécessaires à la durée de la séance.',
    },
  ];

  if (normalized.includes('foot') || normalized.includes('futsal')) {
    recommendedItems = [
      { name: 'Ballon adapté au terrain', reason: 'Indispensable pour le jeu et les exercices.' },
      { name: 'Chasubles', reason: 'Permettent de distinguer rapidement les équipes.' },
      { name: 'Plots ou cônes', reason: 'Utiles pour délimiter les zones ou les ateliers.' },
    ];
  } else if (normalized.includes('basket')) {
    recommendedItems = [
      { name: 'Ballon de basket', reason: 'Prévoir plusieurs ballons si des ateliers sont organisés.' },
      { name: 'Chasubles', reason: 'Pratiques pour les oppositions et les rotations.' },
      { name: 'Plots', reason: 'Utiles pour organiser les parcours ou les ateliers.' },
    ];
  } else if (normalized.includes('badminton')) {
    recommendedItems = [
      { name: 'Raquettes', reason: 'Une raquette par joueur simplifie les rotations.' },
      { name: 'Volants', reason: 'Prévoir plusieurs volants pour éviter les interruptions.' },
      { name: 'Filet', reason: 'À vérifier si le lieu n’en possède pas déjà un.' },
    ];
  } else if (normalized.includes('tennis')) {
    recommendedItems = [
      { name: 'Raquettes', reason: 'Une raquette adaptée par joueur.' },
      { name: 'Balles', reason: 'Plusieurs balles permettent de garder un rythme fluide.' },
    ];
  } else if (normalized.includes('volley')) {
    recommendedItems = [
      { name: 'Ballon de volley', reason: 'Choisir un ballon adapté au niveau du groupe.' },
      { name: 'Filet', reason: 'À vérifier selon ce qui est déjà présent sur le lieu.' },
    ];
  } else if (normalized.includes('handball')) {
    recommendedItems = [
      { name: 'Ballon de handball', reason: 'Choisir une taille adaptée au public.' },
      { name: 'Chasubles', reason: 'Utiles pour organiser les équipes.' },
      { name: 'Plots', reason: 'Pratiques pour les ateliers et les zones de travail.' },
    ];
  }

  return {
    activity: prompt,
    recommendedItems,
    explanation: 'Préparation générée localement à partir du sport détecté dans la demande.',
    optionalTips: [
      'Vérifier ce qui est déjà présent sur le lieu.',
      'Adapter les quantités au nombre de participants.',
      'Prévoir un échauffement et quelques minutes de rangement en fin de séance.',
    ],
    source: 'fallback',
  };
}
