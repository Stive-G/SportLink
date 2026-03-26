export type AuthMode = 'login' | 'register';

export type Page = 
  | 'accueil'
  | 'auth'
  | 'catalogue'
  | 'reservations'
  | 'admin'
  | 'recommandations';

export type Credentials = {
  email: string;
  password: string;
};

export type Equipment = {
  id: number;
  name: string;
  sport: string;
  category: string;
  quantity: number;
  available: boolean;
  description: string;
};

export type Reservation = {
  id: number;
  equipment: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'ACTIVE' | 'RETURNED';
};
