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
