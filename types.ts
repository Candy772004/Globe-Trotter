export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export enum ActivityType {
  SIGHTSEEING = 'Sightseeing',
  FOOD = 'Food',
  ADVENTURE = 'Adventure',
  RELAXATION = 'Relaxation',
  CULTURE = 'Culture',
  OTHER = 'Other'
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  cost: number;
  durationMinutes: number; // Duration in minutes
  type: ActivityType;
  startTime?: string; // ISO String or HH:MM
}

export interface ItineraryDay {
  date: string; // ISO Date String (YYYY-MM-DD)
  activities: Activity[];
}

export interface CityStop {
  id: string;
  cityName: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  imageUrl: string;
  days: ItineraryDay[];
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  stops: CityStop[];
  totalBudget: number;
  travelers: number;
}

export interface BudgetStats {
  totalEstimated: number;
  byCategory: { name: string; value: number; color: string }[];
  dailyAverage: number;
}

// Gemini specific types
export interface AIActivitySuggestion {
  name: string;
  description: string;
  estimatedCost: number;
  type: string;
}
