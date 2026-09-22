import axios from 'axios';
import {
  Credentials,
  Equipment,
  RecommendationResult,
  ActivityPlan,
  User,
  UserRole,
  SportsPlacesResponse,
} from './types';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type AuthTokenResponse = {
  access_token: string;
};

export type Session = {
  access_token: string;
  user: User;
};

type ApiErrorPayload = {
  message?: string | string[];
};

type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

type EquipmentApiItem = {
  _id: string;
  name: string;
  sport: string;
  category: string;
  description: string;
  usageAdvice?: string;
  practicalTips?: string[];
  contexts?: string[];
  imageUrl?: string;
};

type ActivityPlanApiItem = {
  _id: string;
  title: string;
  activity: string;
  sport?: string;
  placeName?: string;
  peopleCount?: number;
  durationMinutes?: number;
  equipment: { name: string; reason?: string }[];
  tips: string[];
  notes?: string;
  createdAt?: string;
  userId?: string | { _id: string; email: string };
};

type UserApiItem = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
};

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function normalizeError(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return fallback;
  }

  const message = error.response?.data?.message;
  if (!message) {
    return fallback;
  }

  return Array.isArray(message) ? message.join(', ') : message;
}

function parseJwt(token: string): JwtPayload {
  const [, payload] = token.split('.');
  const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(normalizedPayload)) as JwtPayload;
}

function createSession(token: string, nameFallback?: string): Session {
  const payload = parseJwt(token);

  return {
    access_token: token,
    user: {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: nameFallback || payload.email.split('@')[0],
    },
  };
}

function mapEquipment(item: EquipmentApiItem): Equipment {
  return {
    id: item._id,
    name: item.name,
    sport: item.sport,
    category: item.category,
    description: item.description,
    usageAdvice: item.usageAdvice,
    practicalTips: item.practicalTips,
    contexts: item.contexts,
    imageUrl: item.imageUrl,
  };
}

function mapActivityPlan(item: ActivityPlanApiItem): ActivityPlan {
  const user = item.userId && typeof item.userId !== 'string' ? item.userId : undefined;
  return {
    id: item._id,
    title: item.title,
    activity: item.activity,
    sport: item.sport,
    placeName: item.placeName,
    peopleCount: item.peopleCount,
    durationMinutes: item.durationMinutes,
    equipment: item.equipment ?? [],
    tips: item.tips ?? [],
    notes: item.notes,
    createdAt: item.createdAt,
    userEmail: user?.email,
  };
}

function authConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function register(payload: Credentials): Promise<Session> {
  try {
    const response = await apiClient.post<AuthTokenResponse>('/auth/register', payload);
    return createSession(response.data.access_token, payload.name);
  } catch (error) {
    throw new Error(normalizeError(error, 'Inscription impossible.'));
  }
}

export async function login(payload: Credentials): Promise<Session> {
  try {
    const response = await apiClient.post<AuthTokenResponse>('/auth/login', {
      email: payload.email,
      password: payload.password,
    });

    return createSession(response.data.access_token);
  } catch (error) {
    throw new Error(normalizeError(error, 'Connexion impossible.'));
  }
}

export async function getEquipment() {
  try {
    const response = await apiClient.get<EquipmentApiItem[]>('/equipment');
    return response.data.map(mapEquipment);
  } catch (error) {
    throw new Error(normalizeError(error, 'Catalogue indisponible.'));
  }
}

export async function getMyPlans(token: string) {
  try {
    const response = await apiClient.get<ActivityPlanApiItem[]>('/plans/me', authConfig(token));
    return response.data.map(mapActivityPlan);
  } catch (error) {
    throw new Error(normalizeError(error, 'Plans indisponibles.'));
  }
}

export async function createPlan(token: string, payload: {
  title: string;
  activity: string;
  sport?: string;
  placeName?: string;
  peopleCount?: number;
  durationMinutes?: number;
  equipment: { name: string; reason?: string }[];
  tips: string[];
  notes?: string;
}) {
  try {
    const response = await apiClient.post<ActivityPlanApiItem>('/plans', payload, authConfig(token));
    return mapActivityPlan(response.data);
  } catch (error) {
    throw new Error(normalizeError(error, 'Enregistrement du plan impossible.'));
  }
}

export async function deletePlan(token: string, planId: string) {
  try {
    await apiClient.delete('/plans/' + planId, authConfig(token));
  } catch (error) {
    throw new Error(normalizeError(error, 'Suppression du plan impossible.'));
  }
}

export async function getAllPlans(token: string) {
  try {
    const response = await apiClient.get<ActivityPlanApiItem[]>('/plans', authConfig(token));
    return response.data.map(mapActivityPlan);
  } catch (error) {
    throw new Error(normalizeError(error, 'Vue admin des plans indisponible.'));
  }
}

export async function getRecommendations(token: string, prompt: string) {
  try {
    const response = await apiClient.post<RecommendationResult>(
      '/recommendations',
      { prompt },
      authConfig(token),
    );

    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, 'Recommandation indisponible.'));
  }
}

export async function getPublicRecommendations(prompt: string) {
  try {
    const response = await apiClient.post<RecommendationResult>(
      '/recommendations/demo',
      { prompt },
    );

    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, 'Démo de recommandation indisponible.'));
  }
}

export async function getUsers(token: string) {
  try {
    const response = await apiClient.get<UserApiItem[]>('/users', authConfig(token));
    return response.data.map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
    }));
  } catch (error) {
    throw new Error(normalizeError(error, 'Liste des utilisateurs indisponible.'));
  }
}

export async function getSportsPlaces(location: string, sport = 'all') {
  try {
    const response = await apiClient.get<SportsPlacesResponse>('/places', {
      params: { location, sport },
    });
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, 'Recherche de lieux sportifs indisponible.'));
  }
}
