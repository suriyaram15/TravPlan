export interface Destination {
  id: string;
  name: string;
  state: string;
  region: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  rating: number;
  reviews: number;
  price: number;
  trending?: boolean;
  offer?: {
    discount: number;
    validUntil: string;
  } | null;
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  destinations: {
    destinationId: string;
    days: number;
    activities: string[];
  }[];
  totalBudget: number;
  createdAt: string;
  isAIGenerated: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AIPrompt {
  destinationIds: string[];
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  travelStyle: 'relaxed' | 'moderate' | 'active';
  accommodation: 'budget' | 'mid-range' | 'luxury';
}

// TravoBot specific interfaces
export interface TravoBotPrompt {
  startCity: string;
  destinations: string[];
  numDays: number;
  totalBudget: number;
  interests: string[];
  groupType: 'solo' | 'couple' | 'family' | 'friends';
  startDate?: string;
  userName?: string;
}

export interface TravoBotSpot {
  name: string;
  description: string;
  distance_km: number;
  entry_fee?: number;
  time_required?: string;
}

export interface TravoBotDailyPlan {
  day: number;
  date: string;
  location: string;
  weather: {
    temperature: string;
    condition: string;
    recommendation?: string;
  };
  spots: TravoBotSpot[];
  activities: string[];
  meals?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  budget: {
    stay: number;
    travel: number;
    food: number;
    entry_fees?: number;
    misc: number;
  };
}

export interface TravoBotBudgetChart {
  labels: string[];
  datasets: {
    stay: number[];
    travel: number[];
    food: number[];
    entry_fees?: number[];
    misc: number[];
  };
}

export interface TravoBotPlan {
  summary: {
    destination: string;
    start_date: string;
    end_date: string;
    total_budget: number;
    estimated_kms: number;
    userName?: string;
  };
  daily_plan: TravoBotDailyPlan[];
  budget_chart: TravoBotBudgetChart;
  recommendations?: {
    similar_destinations?: string[];
    content_based?: string[];
  };
}
