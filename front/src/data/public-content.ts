import { BlogArticle, RecommendationResult, SportGuide } from '../types';

const author = 'Rédaction SportLink';
const updatedAt = '2026-10-05';

export const sportGuides: SportGuide[] = [
  {
    slug: 'football',
    sport: 'football',
    title: 'Organiser une séance de football sans improviser',
    intro:
      'Le format du match, le nombre de joueurs, le niveau et le terrain changent complètement la préparation. Ce guide aide à structurer une séance simple sans transformer l’organisation en logistique lourde.',
    updatedAt,
    practicalAdvice: [
      'Définir d’abord le format : match libre, entraînement technique, tournoi ou futsal.',
      'Vérifier le terrain et ce qui est déjà présent avant de préparer une checklist.',
      'Prévoir les équipes, les rotations et le temps de jeu avant d’ajouter du matériel.',
      'Garder une petite marge pour les imprévus sans emporter inutilement trop de choses.',
    ],
    sections: [
      {
        heading: 'Commencer par le nombre de joueurs et le format',
        paragraphs: [
          'Un groupe de huit personnes ne s’organise pas comme un groupe de vingt. Pour une séance courte, un terrain réduit et deux équipes fixes suffisent souvent. Pour un groupe plus important, il faut penser aux rotations, au temps d’attente et à la manière dont les remplaçants restent impliqués.',
          'Avant de préparer le reste, fixe donc quatre informations : nombre de joueurs, durée, type de terrain et objectif de la séance. Cette base permet d’éviter une organisation disproportionnée par rapport au besoin réel.',
        ],
      },
      {
        heading: 'Adapter le jeu au terrain disponible',
        paragraphs: [
          'Un terrain synthétique extérieur, un city-stade et un gymnase ne demandent pas la même approche. La taille de l’espace influence le nombre de joueurs simultanés, la vitesse du jeu et la place disponible pour les zones d’attente.',
          'Si le terrain est plus petit que prévu, mieux vaut réduire le nombre de joueurs sur le terrain et organiser des rotations courtes plutôt que de conserver un grand format qui devient illisible ou dangereux.',
        ],
      },
      {
        heading: 'Préparer une séance qui garde tout le monde actif',
        paragraphs: [
          'Une séance fonctionne mieux quand les joueurs savent quand ils jouent, quand ils récupèrent et comment les équipes tournent. Sur un format loisir, des séquences de dix à quinze minutes sont souvent plus simples à gérer qu’un long match sans pause.',
          'Si plusieurs niveaux sont présents, évite de construire toute la séance autour des meilleurs joueurs. Des équipes équilibrées, des rotations régulières et quelques règles simples peuvent suffire à maintenir l’intérêt du groupe.',
        ],
      },
      {
        heading: 'Terminer proprement la séance',
        paragraphs: [
          'Prévoir cinq à dix minutes en fin de séance permet de récupérer les affaires, vérifier qu’aucun objet n’a été oublié et libérer le terrain à l’heure. Cette étape est particulièrement utile dans les équipements partagés.',
          'Le meilleur plan est celui qui couvre le début, le jeu et la fin. Une préparation simple mais complète évite que les dernières minutes deviennent désordonnées.',
        ],
      },
    ],
  },
  {
    slug: 'basket',
    sport: 'basket',
    title: 'Préparer une séance de basket amateur sans perdre du temps',
    intro:
      'Le basket est facile à lancer mais une mauvaise organisation crée rapidement de l’attente. L’objectif est de construire des rotations simples et de garder un maximum de joueurs actifs.',
    updatedAt,
    practicalAdvice: [
      'Définir combien de joueurs seront actifs en même temps.',
      'Prévoir plusieurs petits groupes pour les exercices plutôt qu’une seule file d’attente.',
      'Vérifier l’état du sol, les paniers et les zones de dégagement.',
      'Réserver les dernières minutes au rangement et au retour au calme.',
    ],
    sections: [
      {
        heading: 'Éviter les longues files d’attente',
        paragraphs: [
          'Une séance de basket devient vite frustrante si dix personnes attendent pour faire le même exercice. Il vaut mieux diviser le groupe en petits ateliers lorsque l’espace le permet. Même avec un seul panier, des rotations courtes entre tir, dribble et récupération peuvent réduire fortement l’inactivité.',
          'La question principale n’est donc pas seulement le nombre de participants, mais le nombre de personnes capables de pratiquer en même temps. Cette différence doit guider toute l’organisation.',
        ],
      },
      {
        heading: 'Structurer les rotations',
        paragraphs: [
          'Pour un groupe loisir, des séquences courtes et annoncées clairement fonctionnent mieux qu’un système compliqué. Une équipe joue, une autre récupère, puis les rôles changent. Quand le groupe est grand, note l’ordre de passage avant de commencer.',
          'Cette organisation limite les discussions pendant la séance et évite que certains joueurs restent longtemps sur le côté sans savoir quand ils reviennent.',
        ],
      },
      {
        heading: 'Tenir compte du niveau des joueurs',
        paragraphs: [
          'Des débutants ont besoin de plus de répétitions simples, tandis qu’un groupe expérimenté peut passer plus rapidement au jeu collectif. Mélanger les deux niveaux sans adaptation peut créer un rythme inconfortable pour tout le monde.',
          'Il est souvent plus efficace de conserver un objectif commun, puis d’ajuster la difficulté : distance de tir, vitesse, opposition ou nombre de touches autorisées.',
        ],
      },
      {
        heading: 'Vérifier le gymnase avant de jouer',
        paragraphs: [
          'Un sol glissant, une zone encombrée derrière le panier ou un équipement endommagé peuvent rendre une séance inadaptée. Avant de démarrer, fais un tour rapide de l’espace et identifie les zones qui ne doivent pas être utilisées.',
          'Cette vérification prend peu de temps et vaut davantage qu’une séance parfaitement planifiée sur le papier mais incompatible avec le lieu réel.',
        ],
      },
    ],
  },
  {
    slug: 'badminton',
    sport: 'badminton',
    title: 'Organiser une séance de badminton pour plusieurs joueurs',
    intro:
      'Quand il y a moins de terrains que de joueurs, l’organisation des rotations devient plus importante que la technique elle-même. Ce guide propose une méthode simple pour garder la séance fluide.',
    updatedAt,
    practicalAdvice: [
      'Compter les terrains disponibles avant de définir le format de jeu.',
      'Utiliser les doubles si le groupe est nombreux.',
      'Prévoir plusieurs volants et vérifier l’état des raquettes avant la séance.',
      'Organiser un ordre de passage clair pour éviter les discussions permanentes.',
    ],
    sections: [
      {
        heading: 'Partir du nombre de terrains disponibles',
        paragraphs: [
          'En badminton, le nombre de terrains disponibles fixe immédiatement la capacité de jeu. Deux terrains accueillent huit joueurs en double, mais seulement quatre en simple. Cette différence doit être décidée avant le début de la séance.',
          'Si le groupe est plus grand, prévois des rotations courtes ou des ateliers hors terrain afin que l’attente reste utile et compréhensible.',
        ],
      },
      {
        heading: 'Choisir entre simple et double',
        paragraphs: [
          'Le simple permet davantage de déplacements individuels, mais le double augmente fortement le nombre de joueurs actifs. Pour une séance de loisir, alterner les deux formats peut être une bonne solution.',
          'Lorsque les niveaux sont très différents, le double aide aussi à constituer des équipes plus équilibrées et à limiter les écarts trop importants.',
        ],
      },
      {
        heading: 'Prévoir les interruptions',
        paragraphs: [
          'Les volants s’abîment, se coincent ou se perdent rapidement. Prévoir plusieurs volants évite que toute la séance s’arrête pour un incident mineur. Vérifie également que les raquettes sont en bon état avant de lancer les premiers échanges.',
          'Une séance fluide dépend souvent davantage de ces petits détails que d’un programme complexe.',
        ],
      },
      {
        heading: 'Rendre les rotations visibles',
        paragraphs: [
          'Quand plusieurs groupes attendent, les rotations doivent être claires. Tu peux définir une durée fixe, un nombre de points ou un ordre de passage affiché avant le début de la séance.',
          'Le but est que chacun sache quand il joue sans avoir besoin de rediscuter l’organisation après chaque match.',
        ],
      },
    ],
  },
];

export const blogArticles: BlogArticle[] = [
  {
    slug: 'choisir-materiel-sportif',
    title: 'Comment choisir le matériel utile pour une séance sportive',
    summary:
      'Une méthode concrète pour préparer uniquement ce qui sert vraiment selon le sport, le groupe, la durée et le lieu.',
    category: 'Guide pratique',
    readingTime: '8 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    keyTakeaways: [
      'Partir du déroulement réel de la séance avant de faire une liste.',
      'Vérifier ce que le lieu fournit déjà avant d’ajouter du matériel.',
      'Prévoir une petite marge pour les éléments légers, pas pour tout.',
      'Adapter la quantité au nombre d’ateliers actifs en même temps.',
    ],
    sections: [
      {
        heading: 'Commencer par le scénario de la séance',
        paragraphs: [
          'Le même sport peut demander des préparations très différentes. Dix personnes qui jouent un match continu n’ont pas les mêmes besoins que dix personnes réparties sur trois ateliers. Avant de penser au matériel, écris simplement le déroulement prévu : arrivée, échauffement, exercices, jeu principal, pauses et rangement.',
          'Cette étape évite de dresser une liste générique qui ne correspond à rien de concret. Elle permet aussi de distinguer ce qui est indispensable de ce qui est seulement pratique.',
        ],
      },
      {
        heading: 'Compter les personnes actives, pas seulement les inscrits',
        paragraphs: [
          'Le nombre total de participants n’est pas toujours le bon indicateur. Si douze joueurs sont présents mais seulement six pratiquent en même temps, le besoin réel peut être plus faible. À l’inverse, si tout le monde réalise un exercice individuel simultanément, il faut davantage de matériel.',
          'La bonne question est donc : combien de personnes utilisent le même type d’élément au même moment ? Cette logique fonctionne pour les ballons, les raquettes, les chasubles ou les petits repères de terrain.',
        ],
      },
      {
        heading: 'Regarder ce qui existe déjà sur place',
        paragraphs: [
          'Un gymnase peut déjà avoir des paniers, des buts, un filet ou des lignes adaptées. Un terrain extérieur peut au contraire être très minimal. Vérifier le lieu évite d’apporter ce qui ne servira pas et permet de se concentrer sur les éléments réellement manquants.',
          'Sur SportLink, la recherche de lieux s’appuie sur Data ES pour afficher des informations publiques sur les installations. Ces données aident à préparer la visite, mais elles ne remplacent pas une vérification du site ou des règles du gestionnaire.',
        ],
      },
      {
        heading: 'Prévoir une marge raisonnable',
        paragraphs: [
          'Une petite marge est utile pour les éléments faciles à transporter : un ballon de secours, quelques chasubles supplémentaires ou quelques cônes en plus. Cette marge absorbe les imprévus sans compliquer la logistique.',
          'En revanche, multiplier les éléments volumineux ou inutiles rend la préparation plus lourde. La marge doit servir à sécuriser la séance, pas à reproduire un stock complet.',
        ],
      },
      {
        heading: 'Faire une dernière vérification avant de partir',
        paragraphs: [
          'Relis ton plan avec quatre questions : est-ce compatible avec le lieu ? est-ce adapté au nombre de participants ? est-ce cohérent avec la durée ? qui s’occupe du rangement ? Si ces quatre points sont clairs, la séance a de bonnes chances de démarrer sans perte de temps.',
          'Une préparation utile reste courte et lisible. Le but n’est pas de documenter chaque minute mais de supprimer les oublis qui perturbent réellement l’activité.',
        ],
      },
    ],
  },
  {
    slug: 'equipement-football-debuter',
    title: 'Quel matériel prévoir pour un match de football entre amis',
    summary:
      'Ballon, chasubles, cônes et organisation : ce qui est réellement utile pour préparer un match amateur.',
    category: 'Football',
    readingTime: '8 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    relatedSport: 'football',
    keyTakeaways: [
      'Un ballon principal et une solution de secours suffisent souvent pour un match simple.',
      'Les chasubles deviennent utiles quand les tenues se ressemblent.',
      'Les cônes servent surtout quand le terrain doit être adapté.',
      'Le format du match doit être défini avant la checklist.',
    ],
    sections: [
      {
        heading: 'Définir le format avant de préparer quoi que ce soit',
        paragraphs: [
          'Un cinq contre cinq sur city-stade, un futsal en gymnase et un match à onze sur grand terrain n’ont pas les mêmes contraintes. Commence par fixer le nombre de joueurs actifs, la durée et le type de surface.',
          'Cette décision détermine le reste : rotations, zones d’attente, besoin de repères, quantité de ballons et éventuelle nécessité de distinguer clairement les équipes.',
        ],
      },
      {
        heading: 'Choisir un ballon adapté au terrain',
        paragraphs: [
          'En salle, un ballon de futsal est généralement plus adapté à un jeu contrôlé et présente un rebond réduit. En extérieur, le choix dépend davantage de la surface, des conditions météo et du niveau des joueurs.',
          'Avant le début du match, vérifie la pression et l’état du ballon. Une seconde solution de jeu est utile pour éviter qu’un incident mineur interrompe toute la séance.',
        ],
      },
      {
        heading: 'Utiliser les chasubles quand elles apportent vraiment quelque chose',
        paragraphs: [
          'Si deux équipes portent déjà des couleurs très différentes, les chasubles sont parfois inutiles. En revanche, sur un groupe composé à la dernière minute, elles permettent d’identifier immédiatement les partenaires et réduisent les confusions.',
          'Pour les rotations fréquentes, deux couleurs bien distinctes sont plus pratiques qu’un système où les joueurs changent constamment de tenue.',
        ],
      },
      {
        heading: 'Adapter les cônes au terrain',
        paragraphs: [
          'Les cônes sont utiles lorsqu’il faut réduire un terrain, créer des buts temporaires, organiser l’échauffement ou matérialiser une zone d’attente. Sur un terrain déjà parfaitement marqué, leur utilité peut être beaucoup plus faible.',
          'Il vaut mieux quelques repères bien placés qu’un grand nombre de cônes qui compliquent la lecture du jeu.',
        ],
      },
      {
        heading: 'Prévoir les rotations avant le coup d’envoi',
        paragraphs: [
          'Quand il y a plus de joueurs que de places sur le terrain, décide du système de rotation avant de commencer. Une durée fixe ou un changement à chaque but sont faciles à comprendre.',
          'Le match devient plus fluide lorsque chacun sait quand il entre et sort. Cette organisation est souvent plus importante que le matériel lui-même.',
        ],
      },
    ],
  },
  {
    slug: 'organiser-match-entre-amis',
    title: 'Organiser un match entre amis sans perdre du temps',
    summary:
      'Une méthode simple pour passer d’un groupe de joueurs motivés à un match réellement prêt à démarrer.',
    category: 'Organisation',
    readingTime: '9 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    keyTakeaways: [
      'Fixer lieu, heure, durée et nombre de joueurs avant le reste.',
      'Prévoir un plan B simple en cas de désistement ou de terrain occupé.',
      'Définir les équipes ou les rotations avant le début du match.',
      'Garder quelques minutes pour la fin de séance et le rangement.',
    ],
    sections: [
      {
        heading: 'Valider les quatre informations qui bloquent tout',
        paragraphs: [
          'La plupart des matchs improvisés deviennent compliqués pour les mêmes raisons : l’heure change, le lieu n’est pas clair, le nombre de joueurs reste incertain ou personne ne sait combien de temps la séance doit durer. Fixe ces quatre points avant de discuter du reste.',
          'Un message simple avec lieu, heure de rendez-vous, heure de fin et nombre de places disponibles suffit souvent à éviter une longue chaîne de messages contradictoires.',
        ],
      },
      {
        heading: 'Choisir un lieu réellement adapté au groupe',
        paragraphs: [
          'Un terrain proche n’est pas forcément le meilleur terrain. Regarde sa taille, son accès, son type de surface et, quand l’information est disponible, les activités auxquelles il est destiné. Un petit city-stade peut être parfait pour huit personnes et frustrant pour un groupe beaucoup plus grand.',
          'SportLink permet de rechercher des installations via Data ES, puis d’ouvrir le lieu dans Google Maps pour confirmer son emplacement. Cette double vérification réduit les mauvaises surprises.',
        ],
      },
      {
        heading: 'Préparer les équipes sans créer de débat interminable',
        paragraphs: [
          'Pour un groupe loisir, il n’est pas nécessaire de chercher un équilibre parfait. Répartis les joueurs de manière raisonnable puis ajuste après quelques minutes si l’écart est trop important.',
          'Quand les niveaux sont très différents, évite de concentrer tous les joueurs expérimentés dans la même équipe. Un match légèrement équilibré est généralement plus intéressant pour tout le monde.',
        ],
      },
      {
        heading: 'Prévoir les désistements et les arrivées tardives',
        paragraphs: [
          'Un ou deux désistements ne devraient pas annuler toute la séance. Prévois un format flexible : terrain réduit, équipes plus petites ou rotations adaptées. Cela permet de conserver l’activité même si le nombre final diffère légèrement de ce qui était prévu.',
          'À l’inverse, si des joueurs supplémentaires arrivent, fixe une règle de rotation claire pour éviter que certains restent longtemps sans jouer.',
        ],
      },
      {
        heading: 'Finir à l’heure',
        paragraphs: [
          'Un match qui se termine exactement à l’heure de libération du terrain finit souvent dans la précipitation. Garde quelques minutes pour le retour au calme, récupérer les affaires et laisser l’espace propre.',
          'Cette marge est particulièrement importante dans les gymnases ou les installations où un autre groupe prend la suite immédiatement.',
        ],
      },
    ],
  },
  {
    slug: 'preparer-seance-sportive',
    title: 'Pourquoi préparer sa séance sportive à l’avance',
    summary:
      'Un plan léger aide à relier le lieu, le groupe, la durée et les besoins pratiques sans rigidifier la séance.',
    category: 'Préparation',
    readingTime: '8 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    keyTakeaways: [
      'Une préparation utile tient en quelques décisions concrètes.',
      'Le plan doit pouvoir être adapté si le contexte change.',
      'La durée, le lieu et le nombre de personnes sont les trois informations les plus importantes.',
      'Sauvegarder une séance réussie facilite sa réutilisation.',
    ],
    sections: [
      {
        heading: 'Préparer ne veut pas dire tout prévoir',
        paragraphs: [
          'Le but d’un plan n’est pas de contrôler chaque minute. Il sert surtout à éviter les hésitations qui font perdre du temps au début de la séance : où joue-t-on, combien sommes-nous, combien de temps avons-nous et quel est l’objectif principal ?',
          'Une préparation trop détaillée devient fragile dès qu’un joueur est absent ou qu’une partie du terrain est indisponible. Une bonne préparation reste donc volontairement simple.',
        ],
      },
      {
        heading: 'Relier le plan au lieu réel',
        paragraphs: [
          'Une séance pensée pour une grande salle peut être impossible sur un petit terrain extérieur. Avant de conserver un plan existant, vérifie l’espace, la surface, les équipements fixes et les règles du lieu.',
          'Les informations Data ES peuvent aider à comprendre le type d’installation, mais elles doivent être complétées par une vérification du lieu quand un détail est important.',
        ],
      },
      {
        heading: 'Prévoir une version courte et une version complète',
        paragraphs: [
          'Une méthode pratique consiste à avoir un noyau indispensable et quelques éléments optionnels. Si le groupe arrive en retard ou si la séance doit être raccourcie, le noyau reste réalisable.',
          'Cette approche évite d’abandonner toute l’organisation lorsqu’une contrainte apparaît au dernier moment.',
        ],
      },
      {
        heading: 'Noter ce qui a réellement fonctionné',
        paragraphs: [
          'Après la séance, quelques notes suffisent : durée réellement utilisée, nombre de joueurs, activité qui a bien fonctionné et problème rencontré. Ces informations rendent la prochaine préparation beaucoup plus rapide.',
          'Dans SportLink, les plans sauvegardés servent précisément à conserver ce contexte sans transformer le compte en journal détaillé de chaque activité.',
        ],
      },
      {
        heading: 'Réutiliser sans copier aveuglément',
        paragraphs: [
          'Un bon plan peut servir de base plusieurs fois, mais il faut toujours le relire. Le nombre de participants, le terrain, la météo ou le niveau du groupe peuvent changer.',
          'La réutilisation est utile lorsqu’elle fait gagner du temps, pas lorsqu’elle empêche d’adapter la séance au contexte réel.',
        ],
      },
    ],
  },
  {
    slug: 'ia-recommandation-sportive',
    title: 'Comment utiliser une IA pour préparer une activité sportive sans lui faire aveuglément confiance',
    summary:
      'Ce que l’assistant SportLink peut réellement aider à faire, ce qu’il ne sait pas vérifier et comment garder une validation humaine.',
    category: 'IA',
    readingTime: '9 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    keyTakeaways: [
      'Une demande précise produit une préparation plus utile.',
      'L’assistant ne connaît pas automatiquement l’état réel du lieu.',
      'Il ne faut pas saisir de données personnelles inutiles.',
      'Une recommandation reste une aide, pas une décision automatique.',
    ],
    sections: [
      {
        heading: 'Ce que l’assistant essaie de comprendre',
        paragraphs: [
          'Une phrase comme « basket, 12 personnes, gymnase, 1 h 30, débutants » contient déjà beaucoup d’informations utiles. Le sport indique le type d’activité, le nombre de personnes influence les rotations, le lieu pose des contraintes d’espace et la durée détermine le niveau de détail raisonnable.',
          'Plus ces éléments sont explicites, moins l’assistant doit deviner. Une demande courte mais précise est donc plus utile qu’un long texte vague.',
        ],
      },
      {
        heading: 'Ce que l’assistant ne peut pas vérifier seul',
        paragraphs: [
          'Il ne voit pas automatiquement si un terrain est occupé, si un panier est endommagé, si un filet est installé ou si le règlement du lieu interdit certains usages. Ces informations restent extérieures à la recommandation.',
          'C’est pourquoi SportLink présente l’assistant comme un outil de préparation. Le résultat doit toujours être confronté au lieu réel et aux règles du gestionnaire.',
        ],
      },
      {
        heading: 'Éviter les données personnelles inutiles',
        paragraphs: [
          'Pour préparer une séance, l’assistant a rarement besoin de noms, d’adresses personnelles ou d’informations sensibles. Le sport, le nombre de personnes, la durée, le niveau et le type de lieu suffisent généralement.',
          'Limiter les informations envoyées améliore aussi la confidentialité : la demande reste centrée sur l’activité plutôt que sur les personnes qui participent.',
        ],
      },
      {
        heading: 'Reconnaître une recommandation trop générique',
        paragraphs: [
          'Une réponse utile doit être liée au contexte. Si elle propose exactement la même organisation pour quatre personnes et pour vingt, ou pour une salle et pour un terrain extérieur, elle mérite d’être corrigée.',
          'La bonne pratique consiste à reformuler la demande avec l’élément manquant : taille du groupe, durée, objectif ou type de lieu.',
        ],
      },
      {
        heading: 'Garder le dernier mot',
        paragraphs: [
          'Une IA peut accélérer la préparation, mais elle n’a pas la responsabilité de la séance. Le choix final appartient toujours à la personne qui connaît le groupe et l’environnement.',
          'SportLink combine donc l’assistant avec des guides éditoriaux et des informations de lieux. Chaque source apporte un angle différent, et aucune ne doit être suivie mécaniquement.',
        ],
      },
    ],
  },
  {
    slug: 'basket-amateur-materiel',
    title: 'Préparer une séance de basket amateur pour un groupe hétérogène',
    summary:
      'Comment organiser ballons, rotations, zones de travail et temps de jeu lorsque les niveaux sont différents.',
    category: 'Basket',
    readingTime: '8 min',
    author,
    publishedAt: '2026-09-22',
    updatedAt,
    relatedSport: 'basket',
    keyTakeaways: [
      'Multiplier les petits groupes réduit l’attente.',
      'Les débutants ont besoin de davantage de répétitions simples.',
      'Les rotations doivent être annoncées avant le jeu principal.',
      'L’état du sol et des paniers doit être vérifié avant la séance.',
    ],
    sections: [
      {
        heading: 'Commencer avec une activité commune',
        paragraphs: [
          'Quand les niveaux sont différents, une activité simple commune permet de démarrer sans exclure personne. Un échauffement avec ballon, quelques déplacements et des exercices courts créent un rythme partagé.',
          'La difficulté peut ensuite être adaptée sans changer complètement l’organisation : distance, vitesse, opposition ou contrainte de dribble.',
        ],
      },
      {
        heading: 'Créer plusieurs zones de travail',
        paragraphs: [
          'Une seule file devant le panier crée de l’attente. Si l’espace le permet, répartis le groupe entre tir, dribble et jeu en petit nombre. Chaque zone doit être suffisamment claire pour éviter les croisements inutiles.',
          'Cette structure augmente le temps de pratique réel sans demander une organisation compliquée.',
        ],
      },
      {
        heading: 'Adapter le nombre de ballons au type d’exercice',
        paragraphs: [
          'Un match utilise peu de ballons, alors qu’un atelier individuel en demande davantage. Il est donc inutile de choisir une quantité fixe pour toute la séance.',
          'Le besoin doit être évalué au moment où le plus grand nombre de joueurs utilise un ballon simultanément.',
        ],
      },
      {
        heading: 'Préparer les rotations de match',
        paragraphs: [
          'Si le groupe est supérieur à dix joueurs, décide avant le début comment les remplacements seront gérés. Des périodes courtes ou des changements à intervalles fixes sont faciles à comprendre.',
          'Une règle connue de tous limite les frustrations et évite d’interrompre le jeu pour discuter des changements.',
        ],
      },
      {
        heading: 'Finir par une phase simple',
        paragraphs: [
          'Les dernières minutes peuvent servir à un retour au calme, quelques tirs libres ou un bilan très court. Cela aide à terminer progressivement plutôt qu’à interrompre brutalement la séance.',
          'C’est aussi le bon moment pour vérifier le matériel, récupérer les affaires et préparer la sortie du gymnase.',
        ],
      },
    ],
  },
  {
    slug: 'choisir-lieu-sportif-data-es',
    title: 'Comment choisir un lieu de pratique sportive avec Data ES',
    summary:
      'Comprendre les informations affichées dans SportLink et savoir lesquelles vérifier avant de se déplacer.',
    category: 'Lieux',
    readingTime: '10 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    keyTakeaways: [
      'Data ES aide à découvrir des installations mais ne remplace pas une vérification locale.',
      'Le type, la surface et les activités déclarées sont plus utiles que le nom seul.',
      'Une adresse incomplète peut être compensée par le nom du lieu dans Google Maps.',
      'Les données affichées ne sont pas enregistrées dans le compte SportLink.',
    ],
    sections: [
      {
        heading: 'Ce que SportLink récupère depuis Data ES',
        paragraphs: [
          'La recherche « Où pratiquer » interroge Data ES à la demande. SportLink affiche notamment le nom de l’équipement, le nom de l’installation, la commune, le code postal, le type d’équipement, certaines activités déclarées, la nature du lieu, la surface et, lorsqu’elles existent, des informations d’accessibilité ou d’accès libre.',
          'Ces données sont utiles pour comparer plusieurs lieux sans ouvrir immédiatement plusieurs sites. Elles constituent toutefois un point de départ, pas une garantie sur l’état actuel de l’installation.',
        ],
      },
      {
        heading: 'Lire le type et les activités avant le nom',
        paragraphs: [
          'Deux lieux peuvent avoir des noms très proches mais des usages différents. Le type d’équipement et la liste des activités déclarées permettent souvent de comprendre plus précisément ce qui est disponible.',
          'Pour un sport collectif, la surface et la nature du lieu donnent également des indications importantes. Un équipement couvert, un terrain extérieur et un plateau multisports n’offrent pas la même expérience.',
        ],
      },
      {
        heading: 'Pourquoi l’adresse peut être incomplète',
        paragraphs: [
          'Certaines fiches Data ES indiquent une rue sans numéro, un lieu-dit ou seulement une commune. Dans ce cas, une simple recherche par adresse peut pointer vers une zone trop large.',
          'SportLink combine donc le nom de l’installation, le nom de l’équipement, l’adresse, le code postal et la ville lorsqu’il ouvre Google Maps. Cette recherche textuelle donne davantage de contexte à Google pour retrouver le bon établissement.',
        ],
      },
      {
        heading: 'Ce qu’il faut vérifier avant de partir',
        paragraphs: [
          'Même lorsqu’un lieu apparaît dans Data ES, vérifie si possible les horaires, les conditions d’accès et les règles du gestionnaire. Un équipement recensé peut être réservé à une association, fermé temporairement ou soumis à des horaires particuliers.',
          'Le lien vers le site du lieu, lorsqu’il est fourni par Data ES, peut apporter ce complément. À défaut, Google Maps ou le site de la commune peuvent aider à confirmer les informations pratiques.',
        ],
      },
      {
        heading: 'Ce que SportLink enregistre',
        paragraphs: [
          'Les recherches Data ES sont effectuées en direct et les résultats ne sont pas importés dans la base SportLink. Le simple fait de consulter un lieu ne crée donc pas d’historique de recherche dans le compte.',
          'Si un membre sauvegarde un plan de séance, seules les informations qu’il choisit d’ajouter à ce plan sont conservées. Cette séparation évite de transformer la recherche de lieux en suivi automatique des déplacements ou des préférences.',
        ],
      },
    ],
    sources: [
      {
        label: 'Data ES — équipements sportifs',
        url: 'https://equipements.sports.gouv.fr/',
      },
      {
        label: 'Ministère chargé des Sports',
        url: 'https://www.sports.gouv.fr/',
      },
    ],
  },
  {
    slug: 'organiser-seance-football-8-joueurs',
    title: 'Comment organiser une séance de football à 8 joueurs',
    summary:
      'Un exemple concret de format, rotations, durée et préparation pour un petit groupe de huit personnes.',
    category: 'Football',
    readingTime: '8 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    relatedSport: 'football',
    keyTakeaways: [
      'Le quatre contre quatre fonctionne bien sur terrain réduit.',
      'Deux à trois séquences principales suffisent pour une séance loisir.',
      'Un ballon de secours et quelques repères couvrent la majorité des imprévus.',
      'Le terrain doit être réduit si l’espace est trop grand pour huit joueurs.',
    ],
    sections: [
      {
        heading: 'Choisir un format simple : quatre contre quatre',
        paragraphs: [
          'Avec huit joueurs, le quatre contre quatre permet à chacun de toucher régulièrement le ballon et limite les temps morts. Sur un grand terrain, réduis l’espace pour conserver un jeu compact et éviter de transformer la séance en course permanente.',
          'Si des gardiens sont prévus, vérifie que la taille des buts et du terrain reste cohérente. Sinon, des petits buts ou des zones de marque peuvent être plus adaptés.',
        ],
      },
      {
        heading: 'Structurer une séance de 60 à 90 minutes',
        paragraphs: [
          'Une structure simple peut suffire : dix minutes d’échauffement, quinze à vingt minutes d’exercice avec ballon, puis plusieurs séquences de match avec de courtes pauses. Il n’est pas nécessaire d’ajouter de nombreux ateliers si le groupe cherche surtout à jouer.',
          'Sur une séance plus longue, fais varier le format plutôt que d’allonger simplement le match : terrain plus petit, touches limitées ou objectif technique spécifique.',
        ],
      },
      {
        heading: 'Préparer le minimum utile',
        paragraphs: [
          'Un ballon principal, un ballon de secours, deux couleurs pour distinguer les équipes et quelques repères de terrain couvrent généralement le besoin. Si le lieu possède déjà des buts et un marquage adapté, la préparation peut rester très légère.',
          'Le bon réflexe est de vérifier le terrain avant de compléter la checklist. Plus le lieu est équipé, moins il faut apporter.',
        ],
      },
      {
        heading: 'Éviter les pauses trop longues',
        paragraphs: [
          'Avec seulement huit joueurs, les longues pauses cassent rapidement le rythme. Préfère de courtes interruptions pour boire, ajuster les équipes ou changer une règle.',
          'Si un joueur a besoin de récupérer plus longtemps, adapte temporairement le format plutôt que d’arrêter tout le groupe.',
        ],
      },
      {
        heading: 'Prévoir le cas d’un absent',
        paragraphs: [
          'À sept joueurs, tu peux jouer en trois contre quatre et faire tourner le joueur supplémentaire, ou réduire les séquences. Le plan doit rester flexible plutôt que dépendre d’un nombre exact.',
          'Prévoir cette variante avant la séance permet de démarrer immédiatement même si une personne se désiste au dernier moment.',
        ],
      },
    ],
  },
  {
    slug: 'preparer-sport-exterieur',
    title: 'Préparer une séance sportive en extérieur : météo, terrain et sécurité',
    summary:
      'Les vérifications qui changent réellement une séance dehors, avant de partir et une fois sur place.',
    category: 'Extérieur',
    readingTime: '9 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    keyTakeaways: [
      'La météo modifie le terrain autant que le confort des participants.',
      'Il faut vérifier la surface sur place avant de lancer la séance.',
      'Une solution de repli simple évite d’annuler au dernier moment.',
      'Hydratation et visibilité deviennent plus importantes selon la saison.',
    ],
    sections: [
      {
        heading: 'Regarder la météo avec le terrain en tête',
        paragraphs: [
          'Une pluie légère n’a pas le même impact sur un synthétique, un terrain stabilisé ou une pelouse naturelle. La météo doit donc être interprétée avec la surface. Un terrain peut rester praticable tout en devenant plus glissant ou plus lent.',
          'Le vent compte également pour les sports où la trajectoire du ballon ou du volant est importante. Une séance de badminton extérieur peut devenir très difficile alors qu’un football loisir reste possible.',
        ],
      },
      {
        heading: 'Vérifier la surface avant l’échauffement',
        paragraphs: [
          'Même si le terrain semble correct à distance, fais un tour rapide avant de commencer. Flaques, zones glissantes, trous, objets au sol ou parties endommagées peuvent imposer de réduire l’espace utilisé.',
          'Cette vérification est plus importante qu’un plan parfaitement respecté. Si une zone est douteuse, adapte immédiatement le terrain.',
        ],
      },
      {
        heading: 'Prévoir l’hydratation selon la durée',
        paragraphs: [
          'Pour une séance extérieure, chacun doit pouvoir accéder facilement à de l’eau. Plus la durée et la température augmentent, plus les pauses doivent être anticipées.',
          'Le plan n’a pas besoin de fixer une quantité universelle. L’objectif est surtout d’éviter que l’hydratation dépende d’un imprévu ou d’un point d’eau qui n’existe finalement pas sur place.',
        ],
      },
      {
        heading: 'Penser à la lumière et à la visibilité',
        paragraphs: [
          'À l’automne ou en hiver, une séance en fin de journée peut rapidement se terminer dans une luminosité insuffisante. Vérifie si le lieu dispose d’un éclairage utilisable et s’il est réellement accessible au public.',
          'Si ce n’est pas certain, prévois une heure de fin plus tôt. Mieux vaut raccourcir la séance que terminer dans de mauvaises conditions de visibilité.',
        ],
      },
      {
        heading: 'Avoir un plan B raisonnable',
        paragraphs: [
          'Un plan B ne signifie pas forcément trouver un autre terrain. Cela peut être un format plus court, un espace plus réduit ou une activité différente si les conditions deviennent mauvaises.',
          'L’essentiel est de décider à l’avance à partir de quel niveau de pluie, de vent ou de dégradation du terrain la séance doit être adaptée ou annulée.',
        ],
      },
    ],
  },
  {
    slug: 'rotations-basket-groupe',
    title: 'Gérer les rotations au basket quand le groupe est nombreux',
    summary:
      'Des méthodes simples pour faire jouer tout le monde sans transformer la séance en tableau de calcul.',
    category: 'Basket',
    readingTime: '8 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    relatedSport: 'basket',
    keyTakeaways: [
      'La règle de rotation doit être connue avant le début du match.',
      'Des séquences courtes sont plus faciles à gérer qu’un temps de jeu individuel complexe.',
      'Un groupe en attente peut rester actif avec un atelier simple.',
      'La rotation doit être lisible pour être perçue comme équitable.',
    ],
    sections: [
      {
        heading: 'Choisir une règle que tout le monde comprend',
        paragraphs: [
          'Avec douze à quinze joueurs, une rotation individuelle détaillée devient vite difficile à suivre. Une règle collective est souvent plus simple : changement toutes les cinq minutes, à chaque panier défini ou après une courte séquence.',
          'La régularité compte davantage que la précision absolue. Les joueurs acceptent mieux l’attente lorsqu’ils savent exactement quand leur groupe revient.',
        ],
      },
      {
        heading: 'Faire tourner des groupes plutôt que des personnes',
        paragraphs: [
          'Créer trois équipes permet d’organiser un système simple : deux jouent, une récupère, puis l’équipe qui attend remplace l’une des deux. Ce format fonctionne particulièrement bien lorsque la séance est orientée match.',
          'Pour équilibrer les niveaux, constitue les groupes avant de commencer plutôt que de les reconstruire après chaque séquence.',
        ],
      },
      {
        heading: 'Utiliser le temps d’attente intelligemment',
        paragraphs: [
          'Le groupe qui ne joue pas peut effectuer un atelier court de tir, de dribble ou de mobilité si l’espace le permet. L’objectif n’est pas d’ajouter une seconde séance, mais d’éviter une attente totalement passive.',
          'Cette option doit rester simple pour ne pas distraire les joueurs de la rotation principale.',
        ],
      },
      {
        heading: 'Éviter les changements trop fréquents',
        paragraphs: [
          'Une rotation toutes les trente secondes casse le jeu et crée plus de confusion que d’équité. Laisse suffisamment de temps pour que chaque équipe entre réellement dans la séquence.',
          'Des blocs de plusieurs minutes sont généralement plus faciles à suivre et permettent de conserver un rythme de jeu naturel.',
        ],
      },
      {
        heading: 'Réajuster si les équipes sont déséquilibrées',
        paragraphs: [
          'Si une équipe domine systématiquement, change un ou deux joueurs plutôt que de reconstruire tout le système. Un petit ajustement peut suffire à rendre les séquences plus intéressantes.',
          'Le but d’une séance loisir n’est pas de produire un équilibre statistique parfait, mais de maintenir un niveau de jeu motivant pour le groupe.',
        ],
      },
    ],
  },
  {
    slug: 'debuter-badminton-groupe',
    title: 'Débuter le badminton en groupe : terrains, doubles et rotations',
    summary:
      'Comment organiser une première séance quand tout le monde n’a pas le même niveau et que les terrains sont limités.',
    category: 'Badminton',
    readingTime: '8 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    relatedSport: 'badminton',
    keyTakeaways: [
      'Le nombre de terrains détermine le format avant le nombre de joueurs.',
      'Le double est utile pour faire jouer plus de personnes.',
      'Des rotations prévisibles évitent les longues attentes.',
      'Le matériel de secours doit rester léger et simple.',
    ],
    sections: [
      {
        heading: 'Compter les places de jeu disponibles',
        paragraphs: [
          'Avant la séance, calcule combien de personnes peuvent jouer simultanément. Un terrain accueille deux joueurs en simple et quatre en double. Cette différence est déterminante quand le groupe est nombreux.',
          'Une fois la capacité connue, tu peux construire une rotation réaliste au lieu de découvrir l’attente après le début de la séance.',
        ],
      },
      {
        heading: 'Utiliser le double pour les grands groupes',
        paragraphs: [
          'Le double permet d’augmenter rapidement le nombre de joueurs actifs. Pour des débutants, il réduit aussi la surface individuelle à couvrir et peut rendre les premiers échanges plus accessibles.',
          'Il faut toutefois clarifier les zones de service et le placement pour éviter que quatre joueurs débutants se gênent constamment.',
        ],
      },
      {
        heading: 'Organiser les rotations par durée ou par score',
        paragraphs: [
          'Une rotation de dix minutes est facile à comprendre et fonctionne quel que soit le niveau. Une rotation par score peut être plus dynamique mais produit parfois des durées très différentes entre les groupes.',
          'Pour une première séance, le temps fixe est souvent la solution la plus simple et la plus équitable.',
        ],
      },
      {
        heading: 'Prévoir les volants et l’état des raquettes',
        paragraphs: [
          'Les volants sont les éléments qui interrompent le plus facilement une séance lorsqu’ils manquent ou sont trop abîmés. Prévoir plusieurs unités évite de stopper les rotations.',
          'Vérifie également les cordages et les poignées des raquettes avant le début. Une petite vérification en amont vaut mieux qu’une réparation improvisée pendant la séance.',
        ],
      },
      {
        heading: 'Garder une progression simple',
        paragraphs: [
          'Pour les débutants, commence par des échanges courts, puis introduis progressivement le service et le déplacement. Le but de la première séance est surtout de construire des repères.',
          'Une séance trop chargée en règles ou en exercices devient rapidement difficile à suivre. Quelques objectifs simples donnent souvent de meilleurs résultats.',
        ],
      },
    ],
  },
  {
    slug: 'verifier-lieu-sportif-avant-seance',
    title: '7 vérifications à faire avant de choisir un lieu sportif',
    summary:
      'Accès, surface, horaires, éclairage, équipements fixes : les points à confirmer avant d’organiser le groupe.',
    category: 'Lieux',
    readingTime: '9 min',
    author,
    publishedAt: '2026-10-05',
    updatedAt,
    keyTakeaways: [
      'Un lieu recensé n’est pas forcément accessible à n’importe quelle heure.',
      'La surface et la taille doivent correspondre au format prévu.',
      'L’éclairage mérite une vérification spécifique en fin de journée.',
      'Le site du gestionnaire reste la meilleure source pour les règles locales.',
    ],
    sections: [
      {
        heading: '1. Confirmer l’accès réel au lieu',
        paragraphs: [
          'Un équipement peut être recensé publiquement tout en ayant des conditions d’accès particulières. Certains lieux sont réservés à des clubs sur certaines plages horaires, d’autres nécessitent une inscription ou ferment à certaines périodes.',
          'Avant de réunir un groupe, vérifie si le lieu est librement accessible au moment prévu. Cette information peut venir du site du gestionnaire, de la commune ou d’un contact local.',
        ],
      },
      {
        heading: '2. Vérifier la surface',
        paragraphs: [
          'La surface influence le confort, le type de chaussures, la vitesse du jeu et parfois la sécurité. Un synthétique, un parquet, une pelouse ou un sol stabilisé ne se préparent pas de la même manière.',
          'Lorsque Data ES fournit la surface, utilise cette information comme première indication puis confirme sur place si elle est importante pour ton activité.',
        ],
      },
      {
        heading: '3. Regarder la taille et la configuration',
        paragraphs: [
          'Un plateau multisports peut être parfait pour une petite activité et insuffisant pour un grand groupe. La présence de plusieurs terrains ou d’un espace partagé change aussi l’organisation.',
          'Si tu ne connais pas la taille exacte, les photos Google Maps ou le site du lieu peuvent aider à estimer la configuration avant le déplacement.',
        ],
      },
      {
        heading: '4. Contrôler l’éclairage',
        paragraphs: [
          'Un terrain doté de projecteurs n’est pas forcément éclairé librement chaque soir. L’éclairage peut dépendre d’un planning, d’un interrupteur réservé au gestionnaire ou d’horaires précis.',
          'Pour une séance en soirée, cette vérification doit être faite avant de choisir l’heure de rendez-vous.',
        ],
      },
      {
        heading: '5. Identifier les équipements fixes',
        paragraphs: [
          'Buts, paniers, filets, lignes ou vestiaires peuvent être présents, absents ou temporairement indisponibles. Le nom du lieu ne suffit pas toujours à le savoir.',
          'Plus le plan de séance dépend d’un équipement fixe, plus il est important de le confirmer avant le déplacement.',
        ],
      },
      {
        heading: '6. Vérifier l’adresse et l’entrée réelle',
        paragraphs: [
          'Une adresse administrative peut correspondre à un grand complexe avec plusieurs entrées. Lorsque c’est le cas, utilise le nom du lieu dans Google Maps et regarde les accès visibles plutôt que de te fier uniquement au numéro de rue.',
          'SportLink combine le nom et l’adresse quand il ouvre Google Maps afin d’améliorer cette correspondance.',
        ],
      },
      {
        heading: '7. Prévoir une solution de repli',
        paragraphs: [
          'Un terrain peut être occupé, fermé ou impraticable malgré une préparation correcte. Avoir un second lieu proche ou un format adaptable évite de perdre toute la séance.',
          'Le plan B n’a pas besoin d’être parfait. Il doit seulement être suffisamment clair pour que le groupe sache quoi faire si le premier choix ne fonctionne pas.',
        ],
      },
    ],
    sources: [
      {
        label: 'Data ES — équipements sportifs',
        url: 'https://equipements.sports.gouv.fr/',
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
