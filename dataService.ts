import { Trip, CityStop, ActivityType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate IDs if uuid package fails in some envs (fallback)
const generateId = () => Math.random().toString(36).substr(2, 9);

const STORAGE_KEY = 'global_trotters_trips';

const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Euro Summer Dream',
    description: 'Backpacking through Western Europe',
    startDate: '2024-06-15',
    endDate: '2024-06-25',
    coverImage: 'https://picsum.photos/800/400',
    totalBudget: 3000,
    travelers: 2,
    stops: [
      {
        id: 's1',
        cityName: 'Paris',
        country: 'France',
        arrivalDate: '2024-06-15',
        departureDate: '2024-06-19',
        imageUrl: 'https://picsum.photos/id/101/800/600',
        days: [
          {
            date: '2024-06-15',
            activities: [
              { id: 'a1', name: 'Eiffel Tower Tour', description: 'Summit access', cost: 50, durationMinutes: 180, type: ActivityType.SIGHTSEEING, startTime: '10:00' },
              { id: 'a2', name: 'Seine River Cruise', description: 'Sunset cruise', cost: 25, durationMinutes: 60, type: ActivityType.RELAXATION, startTime: '19:00' }
            ]
          }
        ]
      },
      {
        id: 's2',
        cityName: 'Rome',
        country: 'Italy',
        arrivalDate: '2024-06-20',
        departureDate: '2024-06-25',
        imageUrl: 'https://picsum.photos/id/102/800/600',
        days: []
      }
    ]
  }
];

export const getTrips = (): Trip[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTrips));
    return mockTrips;
  }
  return JSON.parse(stored);
};

export const getTripById = (id: string): Trip | undefined => {
  const trips = getTrips();
  return trips.find(t => t.id === id);
};

export const saveTrip = (trip: Trip): void => {
  const trips = getTrips();
  const existingIndex = trips.findIndex(t => t.id === trip.id);
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
};

export const deleteTrip = (id: string): void => {
  const trips = getTrips();
  const filtered = trips.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const createNewTrip = (partial: Partial<Trip>): Trip => {
  const newTrip: Trip = {
    id: generateId(),
    name: partial.name || 'New Trip',
    description: partial.description || '',
    startDate: partial.startDate || new Date().toISOString().split('T')[0],
    endDate: partial.endDate || new Date().toISOString().split('T')[0],
    coverImage: 'https://picsum.photos/800/400',
    stops: [],
    totalBudget: 0,
    travelers: 1,
    ...partial
  };
  saveTrip(newTrip);
  return newTrip;
};
