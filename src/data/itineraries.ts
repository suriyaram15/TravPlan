
import { Destination, Itinerary } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for destinations (can be replaced with API calls)
const mockDestinations = [
  { destinationId: 'goa', days: 3, activities: ["Beach visit", "Water sports", "Nightlife"] },
  { destinationId: 'manali', days: 4, activities: ["Hiking", "Snow activities", "Sightseeing"] },
];

// Mock data for itineraries (can be replaced with database queries)
const mockItineraries: Itinerary[] = [
  {
    id: 'itinerary-1',
    userId: 'user-1',
    title: 'Goa & Manali Adventure',
    startDate: '2024-07-01',
    endDate: '2024-07-07',
    destinations: mockDestinations,
    totalBudget: 30000,
    createdAt: '2024-06-15',
    isAIGenerated: true,
  },
  {
    id: 'itinerary-2',
    userId: 'user-2',
    title: 'Kerala Backwaters Tour',
    startDate: '2024-08-10',
    endDate: '2024-08-15',
    destinations: [{ destinationId: 'kerala', days: 5, activities: ["Backwater cruise", "Ayurvedic spa", "Cultural show"] }],
    totalBudget: 25000,
    createdAt: '2024-06-20',
    isAIGenerated: false,
  },
  {
    id: 'itinerary-3',
    userId: 'user-1',
    title: 'Rajasthan Cultural Trip',
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    destinations: [
      { destinationId: 'jaipur', days: 4, activities: ["Fort visit", "Shopping", "City tour"] }, 
      { destinationId: 'udaipur', days: 6, activities: ["Lake visit", "Palace tour", "Boat ride"] }
    ],
    totalBudget: 40000,
    createdAt: '2024-07-01',
    isAIGenerated: true,
  },
];

// Function to fetch all itineraries
export const getAllItineraries = (): Itinerary[] => {
  return mockItineraries;
};

export const getItineraryById = (id: string) => {
  return getAllItineraries().find(itinerary => itinerary.id === id) || null;
};

// Add new function to create an itinerary
export const addItinerary = (itineraryData: Omit<Itinerary, 'id' | 'createdAt'>) => {
  const newItinerary: Itinerary = {
    ...itineraryData,
    id: uuidv4(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  mockItineraries.push(newItinerary);
  return newItinerary;
};
