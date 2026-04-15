import { BlogArticle, Equipment, RecommendationResult, SportGuide } from '../types';

export const fallbackEquipment: Equipment[] = [
  {
    id: 'demo-futsal-ball',
    name: 'Ballon de futsal',
    sport: 'football',
    category: 'ballon',
    quantity: 8,
    available: true,
    description:
      'Ballon adapté au jeu en salle, avec un rebond plus contrôlé pour les matchs rapides sur terrain réduit.',
    usageAdvice:
      'À réserver pour un match de foot en salle, un tournoi étudiant ou une séance technique avec peu d’espace.',
    practicalTips: [
      'Prévoir au moins deux ballons pour éviter les interruptions.',
      'Vérifier la pression avant le début de la séance.',
    ],
    contexts: ['foot en salle', 'tournoi entre amis', 'entraînement technique'],
  },
  {
    id: 'demo-bibs',
    name: 'Lot de chasubles',
    sport: 'multisport',
    category: 'organisation',
    quantity: 24,
    available: true,
    description:
      'Chasubles légères pour distinguer rapidement les équipes pendant un match ou un exercice collectif.',
    usageAdvice:
      'Utile dès qu’une activité regroupe plusieurs équipes, surtout quand les joueurs portent des tenues proches.',
    practicalTips: [
      'Choisir deux couleurs bien visibles.',
      'Prévoir quelques chasubles en plus pour les remplaçants.',
    ],
    contexts: ['football', 'basket', 'handball', 'tournoi scolaire'],
  },
  {
    id: 'demo-cones',
    name: 'Cônes de délimitation',
    sport: 'multisport',
    category: 'entraînement',
    quantity: 40,
    available: true,
    description:
      'Cônes souples pour délimiter un terrain, organiser un atelier ou construire un parcours d’échauffement.',
    usageAdvice:
      'Recommandé pour préparer une séance structurée et éviter les zones floues pendant les exercices.',
    practicalTips: [
      'Utiliser des couleurs différentes pour séparer les ateliers.',
      'Prévoir plus de cônes si le terrain est partagé.',
    ],
    contexts: ['entraînement', 'échauffement', 'sport collectif'],
  },
  {
    id: 'demo-basket-ball',
    name: 'Ballon de basket taille 7',
    sport: 'basket',
    category: 'ballon',
    quantity: 6,
    available: true,
    description:
      'Ballon de basket pour match amateur, entraînement au tir ou ateliers de dribble en gymnase.',
    usageAdvice:
      'À réserver pour une séance de basket adulte ou un match 5 contre 5 en intérieur.',
    practicalTips: [
      'Prévoir un ballon par petit groupe pendant les ateliers.',
      'Choisir un gymnase avec paniers réglés à la bonne hauteur.',
    ],
    contexts: ['basket amateur', 'gymnase', 'entraînement tir'],
  },
  {
    id: 'demo-volleyball-net',
    name: 'Filet de volley réglable',
    sport: 'volley',
    category: 'terrain',
    quantity: 2,
    available: true,
    description:
      'Filet réglable pour transformer un espace sportif en terrain de volley ou de badminton loisir.',
    usageAdvice:
      'Idéal pour une activité collective en salle ou en extérieur avec un minimum de préparation.',
    practicalTips: [
      'Vérifier les points d’accroche avant la réservation.',
      'Associer le filet avec des lignes ou cônes de délimitation.',
    ],
    contexts: ['volley loisir', 'sport collectif', 'événement associatif'],
  },
  {
    id: 'demo-badminton-rackets',
    name: 'Raquettes de badminton',
    sport: 'badminton',
    category: 'raquette',
    quantity: 12,
    available: true,
    description:
      'Set de raquettes légères pour organiser des matchs simples, doubles ou ateliers débutants.',
    usageAdvice:
      'Recommandé pour une activité accessible à tous, en particulier quand le niveau des participants est varié.',
    practicalTips: [
      'Ajouter des volants en quantité suffisante.',
      'Prévoir un filet ou une ligne centrale claire.',
    ],
    contexts: ['badminton débutant', 'sport loisir', 'double mixte'],
  },
  {
    id: 'demo-handball',
    name: 'Ballon de handball',
    sport: 'handball',
    category: 'ballon',
    quantity: 5,
    available: false,
    description:
      'Ballon avec bonne prise en main pour les entraînements de passes, tirs et matchs en salle.',
    usageAdvice:
      'À utiliser avec des buts ou une zone de tir clairement délimitée.',
    practicalTips: [
      'Vérifier la disponibilité avant de planifier le match.',
      'Ajouter des chasubles pour distinguer les lignes.',
    ],
    contexts: ['handball', 'gymnase', 'entraînement tir'],
  },
];

export const sportGuides: SportGuide[] = [
  {
    slug: 'football',
    sport: 'football',
    title: 'Organiser une séance de football avec le bon matériel',
    intro:
      'Pour un match de football fluide, le matériel ne se limite pas au ballon. Il faut aussi penser aux chasubles, aux cônes et à la gestion des équipes.',
    recommendedCategories: ['ballon', 'organisation', 'entraînement'],
    practicalAdvice: [
      'Prévoir un ballon de secours si le match dure plus d’une heure.',
      'Utiliser des chasubles pour éviter les confusions entre équipes.',
      'Ajouter des cônes pour délimiter les buts, les zones ou les ateliers.',
    ],
  },
  {
    slug: 'basket',
    sport: 'basket',
    title: 'Préparer une activité basket en gymnase',
    intro:
      'Le basket demande peu de matériel, mais la qualité du ballon et l’organisation des ateliers changent beaucoup le confort de jeu.',
    recommendedCategories: ['ballon', 'entraînement', 'organisation'],
    practicalAdvice: [
      'Prévoir plusieurs ballons pour travailler le tir et le dribble.',
      'Organiser les participants en petits groupes pour limiter l’attente.',
      'Utiliser des plots pour les parcours de coordination.',
    ],
  },
  {
    slug: 'badminton',
    sport: 'badminton',
    title: 'Démarrer une séance de badminton sans oublier l’essentiel',
    intro:
      'Le badminton est idéal pour une activité accessible, mais il faut anticiper les raquettes, les volants, le filet et l’espace disponible.',
    recommendedCategories: ['raquette', 'terrain', 'organisation'],
    practicalAdvice: [
      'Prévoir plus de volants que de joueurs.',
      'Vérifier la hauteur du filet et la zone de jeu.',
      'Mélanger les niveaux en double pour garder une activité équilibrée.',
    ],
  },
];

export const blogArticles: BlogArticle[] = [
  {
    slug: 'choisir-materiel-sportif',
    title: 'Comment choisir son matériel sportif avant une réservation',
    summary:
      'Une méthode simple pour choisir le bon matériel selon le sport, le nombre de participants et le lieu.',
    category: 'Guide pratique',
    readingTime: '5 min',
    sections: [
      {
        heading: 'Partir de l’activité réelle',
        body:
          'Le bon choix commence par une question simple : que veut-on organiser exactement ? Un match libre, un entraînement technique ou un tournoi ne demandent pas le même niveau de préparation. SportLink aide à relier la demande de l’utilisateur au catalogue disponible.',
      },
      {
        heading: 'Vérifier le nombre de participants',
        body:
          'Plus le groupe est grand, plus il faut penser au matériel d’organisation : chasubles, cônes, ballons supplémentaires et éléments de délimitation. Cela évite les temps morts et rend l’activité plus facile à encadrer.',
      },
      {
        heading: 'Penser au lieu',
        body:
          'Un gymnase, un terrain extérieur ou une salle réduite changent le choix du matériel. Un ballon de futsal est plus adapté au sol indoor, tandis qu’un ballon classique peut suffire dehors.',
      },
    ],
  },
  {
    slug: 'equipement-football-debuter',
    title: 'Quel équipement pour débuter le football entre amis',
    summary:
      'Ballon, chasubles, cônes : les indispensables pour organiser un match simple et clair.',
    category: 'Football',
    readingTime: '4 min',
    relatedSport: 'football',
    sections: [
      {
        heading: 'Le ballon adapté au terrain',
        body:
          'Pour du foot en salle, un ballon de futsal offre un meilleur contrôle et limite les rebonds trop hauts. Pour une séance extérieure, il faut surtout vérifier l’état du terrain et la pression du ballon.',
      },
      {
        heading: 'Les chasubles pour structurer les équipes',
        body:
          'Quand les joueurs viennent avec leurs propres tenues, les chasubles deviennent indispensables. Elles rendent le jeu plus lisible et évitent les interruptions pour reconnaître les partenaires.',
      },
      {
        heading: 'Les cônes pour délimiter',
        body:
          'Les cônes permettent de créer des buts temporaires, une zone d’échauffement ou un atelier de conduite de balle. C’est un petit matériel, mais il rend la séance beaucoup plus claire.',
      },
    ],
  },
  {
    slug: 'organiser-match-entre-amis',
    title: 'Organiser un match entre amis facilement avec SportLink',
    summary:
      'Les étapes simples pour transformer une idée de match en réservation de matériel concrète.',
    category: 'Organisation',
    readingTime: '5 min',
    sections: [
      {
        heading: 'Définir le format du match',
        body:
          'Avant de réserver, il faut savoir si le match se joue à 5, 7 ou 11, en salle ou dehors, avec un niveau loisir ou plus compétitif. Ces informations orientent le choix du matériel.',
      },
      {
        heading: 'Consulter les disponibilités',
        body:
          'Le catalogue SportLink indique les quantités et la disponibilité. Cela permet d’éviter de construire une activité autour d’un équipement qui n’est pas disponible.',
      },
      {
        heading: 'Prévoir le retour',
        body:
          'Une bonne réservation ne s’arrête pas au retrait du matériel. Le retour doit être prévu pour garder le stock à jour et permettre aux autres membres de réserver ensuite.',
      },
    ],
  },
  {
    slug: 'reservation-materiel-en-ligne',
    title: 'Pourquoi réserver du matériel sportif en ligne',
    summary:
      'La réservation en ligne donne de la visibilité sur le stock et simplifie la gestion pour les membres et les admins.',
    category: 'Réservation',
    readingTime: '4 min',
    sections: [
      {
        heading: 'Voir ce qui est disponible',
        body:
          'Un catalogue en ligne évite les demandes au hasard. Le membre consulte les équipements, filtre par sport et réserve seulement ce qui correspond à son activité.',
      },
      {
        heading: 'Suivre son historique',
        body:
          'L’historique de réservation aide l’utilisateur à retrouver ce qu’il a emprunté, quand le matériel doit être rendu et quel équipement il utilise le plus souvent.',
      },
      {
        heading: 'Aider l’administration',
        body:
          'Côté admin, les réservations centralisées rendent le stock plus fiable. Les retours sont suivis et les équipements indisponibles sont mieux identifiés.',
      },
    ],
  },
  {
    slug: 'ia-recommandation-sportive',
    title: 'Comment une IA peut aider à préparer une activité sportive',
    summary:
      'La recommandation IA transforme une phrase libre en liste de matériel utile basée sur le catalogue.',
    category: 'IA',
    readingTime: '6 min',
    sections: [
      {
        heading: 'Comprendre une demande naturelle',
        body:
          'Un utilisateur ne pense pas toujours en catégories de stock. Il dit plutôt : je veux faire du foot en salle avec 8 amis. L’IA peut convertir cette demande en besoins concrets.',
      },
      {
        heading: 'S’appuyer sur le catalogue réel',
        body:
          'La recommandation est utile seulement si elle tient compte des équipements disponibles. SportLink envoie le catalogue au modèle afin de proposer du matériel pertinent.',
      },
      {
        heading: 'Donner des conseils actionnables',
        body:
          'Une bonne réponse ne donne pas seulement des noms. Elle explique pourquoi réserver un ballon, des chasubles ou des cônes, et ajoute des conseils de préparation.',
      },
    ],
  },
  {
    slug: 'basket-amateur-materiel',
    title: 'Matériel conseillé pour une séance de basket amateur',
    summary:
      'Les équipements utiles pour une séance de basket claire, dynamique et accessible.',
    category: 'Basket',
    readingTime: '4 min',
    relatedSport: 'basket',
    sections: [
      {
        heading: 'Plusieurs ballons pour limiter l’attente',
        body:
          'Pendant les ateliers de tir ou de dribble, un seul ballon ralentit vite la séance. Prévoir plusieurs ballons permet à chacun de pratiquer davantage.',
      },
      {
        heading: 'Des groupes bien répartis',
        body:
          'Avec des chasubles ou des groupes fixes, les rotations sont plus faciles. Cela aide surtout quand le niveau des joueurs est hétérogène.',
      },
      {
        heading: 'Un espace sécurisé',
        body:
          'Les cônes peuvent servir à séparer les zones de tir, de course et d’attente. Cette organisation rend la séance plus fluide et plus sûre.',
      },
    ],
  },
];

export function getEquipmentContent(equipment: Equipment): Equipment {
  const fallback = fallbackEquipment.find(
    (item) =>
      item.name.toLowerCase() === equipment.name.toLowerCase() ||
      item.category.toLowerCase() === equipment.category.toLowerCase(),
  );

  return {
    ...equipment,
    usageAdvice:
      equipment.usageAdvice ||
      fallback?.usageAdvice ||
      `Ce matériel est conseillé pour les activités de ${equipment.sport}, surtout lorsque le groupe veut réserver rapidement un équipement fiable.`,
    practicalTips:
      equipment.practicalTips ||
      fallback?.practicalTips || [
        'Vérifier la disponibilité avant de planifier la séance.',
        'Adapter la quantité au nombre de participants.',
      ],
    contexts:
      equipment.contexts ||
      fallback?.contexts || [equipment.sport, equipment.category, 'activité sportive'],
  };
}

export function buildLocalRecommendation(prompt: string, equipmentList: Equipment[]): RecommendationResult {
  const words = prompt.toLowerCase().split(/\W+/).filter(Boolean);
  const availableEquipment = equipmentList.filter((item) => item.available && item.quantity > 0);
  const source = availableEquipment.length > 0 ? availableEquipment : equipmentList;

  const scored = source
    .map((item) => {
      const content = `${item.name} ${item.sport} ${item.category} ${item.description} ${
        item.contexts?.join(' ') ?? ''
      }`.toLowerCase();
      const score = words.reduce((total, word) => total + (content.includes(word) ? 1 : 0), 0);
      return { item: getEquipmentContent(item), score };
    })
    .sort((first, second) => second.score - first.score || first.item.name.localeCompare(second.item.name))
    .slice(0, 4);

  return {
    activity: prompt,
    recommendedEquipment: scored.map(({ item }) => ({
      id: item.id,
      name: item.name,
      sport: item.sport,
      category: item.category,
      reason:
        item.usageAdvice ||
        `Cet équipement correspond à une activité ${item.sport} et peut être réservé selon la disponibilité.`,
    })),
    explanation:
      'Voici une recommandation basée sur le catalogue SportLink et sur les équipements actuellement exploitables.',
    optionalTips: [
      'Vérifier la disponibilité avant de réserver.',
      'Adapter les quantités au nombre de participants.',
      'Ajouter du matériel d’organisation si plusieurs équipes jouent ensemble.',
    ],
    source: 'fallback',
  };
}
