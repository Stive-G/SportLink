import axios from 'axios';
import { Credentials, Equipment, Reservation, User, UserRole } from './types';

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
  quantity: number;
  available: boolean;
  description: string;
  imageUrl?: string;
};

type ReservationApiItem = {
  _id: string;
  equipmentId:
    | string
    | {
        _id: string;
        name: string;
      };
  userId?:
    | string
    | {
        _id: string;
        email: string;
      };
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'ACTIVE' | 'RETURNED';
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
    quantity: item.quantity,
    available: item.available,
    description: item.description,
    imageUrl: item.imageUrl,
  };
}

function mapReservation(item: ReservationApiItem): Reservation {
  const equipment =
    typeof item.equipmentId === 'string'
      ? { _id: item.equipmentId, name: 'Materiel inconnu' }
      : item.equipmentId;

  const user =
    item.userId && typeof item.userId !== 'string'
      ? item.userId
      : undefined;

  return {
    id: item._id,
    equipmentId: equipment._id,
    equipmentName: equipment.name,
    userEmail: user?.email,
    startDate: item.startDate,
    endDate: item.endDate,
    status: item.status,
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

export async function getMyReservations(token: string) {
  try {
    const response = await apiClient.get<ReservationApiItem[]>(
      '/reservations/me',
      authConfig(token),
    );
    return response.data.map(mapReservation);
  } catch (error) {
    throw new Error(normalizeError(error, 'Reservations indisponibles.'));
  }
}

export async function createReservation(token: string, equipmentId: string) {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  try {
    await apiClient.post(
      '/reservations',
      {
        equipmentId,
        startDate: now.toISOString().slice(0, 10),
        endDate: tomorrow.toISOString().slice(0, 10),
      },
      authConfig(token),
    );
  } catch (error) {
    throw new Error(normalizeError(error, 'Creation de reservation impossible.'));
  }
}

export async function returnReservation(token: string, reservationId: string) {
  try {
    await apiClient.patch(
      `/reservations/${reservationId}/return`,
      {},
      authConfig(token),
    );
  } catch (error) {
    throw new Error(normalizeError(error, 'Retour du materiel impossible.'));
  }
}

export async function getRecommendations(token: string, prompt: string) {
  try {
    const response = await apiClient.post<string>(
      '/recommendations',
      { prompt },
      authConfig(token),
    );

    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, 'Recommandation indisponible.'));
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

export async function getAllReservations(token: string) {
  try {
    const response = await apiClient.get<ReservationApiItem[]>(
      '/reservations',
      authConfig(token),
    );
    return response.data.map(mapReservation);
  } catch (error) {
    throw new Error(normalizeError(error, 'Vue admin des reservations indisponible.'));
  }
}
