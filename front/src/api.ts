import axios from 'axios';

const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export type AuthPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  plan: 'Starter' | 'Pro';
  joinedAt: string;
};

export type AuthResult = {
  access_token: string;
  user: User;
};

type ApiErrorPayload = {
  message?: string | string[];
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

function createMockResponse(email: string): AuthResult {
  const role = email.toLowerCase().includes('admin') ? 'ADMIN' : 'MEMBER';

  return {
    access_token: `demo-token-${Date.now()}`,
    user: {
      id: 'demo-user',
      email,
      role,
      plan: 'Starter',
      joinedAt: new Date().toISOString(),
    },
  };
}

async function mockAuth(payload: AuthPayload): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return createMockResponse(payload.email);
}

async function postAuth(path: string, payload: AuthPayload) {
  try {
    const response = await apiClient.post<{ access_token: string }>(path, payload);
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, 'Request failed'));
  }
}

export async function register(payload: AuthPayload) {
  if (API_MODE === 'mock') {
    return mockAuth(payload);
  }

  const response = await postAuth('/auth/register', payload);
  return {
    ...response,
    user: {
      id: 'pending-backend',
      email: payload.email,
      role: 'MEMBER',
      plan: 'Starter',
      joinedAt: new Date().toISOString(),
    },
  };
}

export async function login(payload: AuthPayload) {
  if (API_MODE === 'mock') {
    return mockAuth(payload);
  }

  const response = await postAuth('/auth/login', payload);
  return {
    ...response,
    user: {
      id: 'pending-backend',
      email: payload.email,
      role: 'MEMBER',
      plan: 'Starter',
      joinedAt: new Date().toISOString(),
    },
  };
}

export { API_MODE, API_URL };
