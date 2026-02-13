
export interface Activity {
  time: string;
  location: string;
  description: string;
  notes: string;
  type: 'food' | 'sightseeing' | 'relaxation' | 'adventure' | 'transit';
  searchUrl?: string;
  mapsUrl?: string;
  distanceFromPrevious?: string; // e.g. "1.5 km", "10 min walk"
}

export interface DayPlan {
  day: number;
  title: string;
  summary: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  tripTitle: string;
  duration: string;
  budgetLevel: string;
  overallVibe: string;
  startingLocation: string;
  days: DayPlan[];
}

export interface TripFormData {
  destination: string;
  startingPoint: string;
  days: number;
  budget: 'Budget' | 'Moderate' | 'Luxury';
  travelers: 'Solo' | 'Couple' | 'Family' | 'Friends';
  interests: string;
}
