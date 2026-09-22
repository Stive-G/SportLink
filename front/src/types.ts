export type AuthMode = 'login' | 'register';

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

export type ActivityPlan = {
  id: string;
  title: string;
  activity: string;
  sport?: string;
  placeName?: string;
  peopleCount?: number;
  durationMinutes?: number;
  materials: { name: string; reason?: string }[];
  tips: string[];
  notes?: string;
  createdAt?: string;
  userEmail?: string;
};

export type RecommendationItem = {
  name: string;
  reason: string;
};

export type RecommendationResult = {
  activity: string;
  recommendedItems: RecommendationItem[];
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
  practicalAdvice: string[];
};

export type SportsPlace = {
  id: string;
  name: string;
  facilityName: string | null;
  type: string | null;
  family: string | null;
  activities: string[];
  address: string | null;
  postalCode: string | null;
  city: string;
  department: string | null;
  region: string | null;
  nature: string | null;
  surface: string | null;
  freeAccess: boolean | null;
  accessible: boolean | null;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  updatedAt: string | null;
};

export type SportsPlacesResponse = {
  query: {
    location: string;
    sport: string | null;
  };
  total: number;
  results: SportsPlace[];
  source: {
    name: string;
    publisher: string;
    url: string;
    license: string;
  };
};
