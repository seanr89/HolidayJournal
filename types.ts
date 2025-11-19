export interface Activity {
  time: string;
  location: string;
  description: string;
  notes: string;
  type: 'food' | 'sightseeing' | 'relaxation' | 'adventure' | 'transit';
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
  days: DayPlan[];
}

export interface TripFormData {
  destination: string;
  days: number;
  budget: 'Budget' | 'Moderate' | 'Luxury';
  travelers: 'Solo' | 'Couple' | 'Family' | 'Friends';
  interests: string;
}