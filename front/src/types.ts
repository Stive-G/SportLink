export type AuthMode = 'login' | 'register';

export type Page =
  | 'accueil'
  | 'auth'
  | 'catalogue'
  | 'reservations'
  | 'admin'
  | 'recommandations';

export type Credentials = {
  name: string;
  email: string;
  password: string;
};

export type UserRole = 'ADMIN' | 'MEMBER';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Equipment = {
  id: string;
  name: string;
  sport: string;
  category: string;
  quantity: number;
  available: boolean;
  description: string;
  usageAdvice?: string;
  practicalTips?: string[];
  contexts?: string[];
  imageUrl?: string;
};

export type Reservation = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userEmail?: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'ACTIVE' | 'RETURNED';
};

export type RecommendationEquipment = {
  id?: string;
  name: string;
  sport?: string;
  category?: string;
  reason: string;
};

export type RecommendationResult = {
  activity: string;
  recommendedEquipment: RecommendationEquipment[];
  explanation: string;
  optionalTips: string[];
  source?: 'llm' | 'fallback';
};

export type BlogArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  relatedSport?: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export type SportGuide = {
  slug: string;
  sport: string;
  title: string;
  intro: string;
  recommendedCategories: string[];
  practicalAdvice: string[];
};
