import { Equipment, Reservation } from './types';

export const equipmentList: Equipment[] = [
  {
    id: 1,
    name: 'Ballon de football',
    sport: 'Football',
    category: 'Ballon',
    quantity: 12,
    available: true,
    description: 'Ballon pour match ou entrainement.',
  },
  {
    id: 2,
    name: 'Raquette de tennis',
    sport: 'Tennis',
    category: 'Raquette',
    quantity: 6,
    available: true,
    description: 'Raquette adulte pour terrain exterieur.',
  },
  {
    id: 3,
    name: 'Chasubles',
    sport: 'Multisport',
    category: 'Accessoire',
    quantity: 0,
    available: false,
    description: 'Lot de chasubles pour equipes.',
  },
];

export const myReservations: Reservation[] = [
  {
    id: 1,
    equipment: 'Ballon de football',
    startDate: '2026-03-28',
    endDate: '2026-03-28',
    status: 'ACTIVE',
  },
  {
    id: 2,
    equipment: 'Raquette de tennis',
    startDate: '2026-03-20',
    endDate: '2026-03-20',
    status: 'RETURNED',
  },
];

export const allReservations: Reservation[] = [
  {
    id: 11,
    equipment: 'Ballon de football',
    startDate: '2026-03-28',
    endDate: '2026-03-28',
    status: 'ACTIVE',
  },
  {
    id: 12,
    equipment: 'Chasubles',
    startDate: '2026-03-29',
    endDate: '2026-03-29',
    status: 'PENDING',
  },
];