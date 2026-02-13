
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, TripFormData } from "../types";

export const generateItinerary = async (formData: TripFormData): Promise<Itinerary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a detailed ${formData.days}-day travel itinerary for ${formData.destination}, starting from ${formData.startingPoint}.
    The traveler profile is: ${formData.travelers}.
    Budget level: ${formData.budget}.
    Interests/Preferences: ${formData.interests}.
    
    CRITICAL REQUIREMENTS:
    1. For each activity, search for and provide a valid Google Search URL or official website URL in the 'searchUrl' field.
    2. Provide a Google Maps search URL for each location in the 'mapsUrl' field.
    3. Calculate or estimate the 'distanceFromPrevious' (e.g., "2km / 15m walk") between consecutive activities. 
       The first activity of Day 1 should calculate distance from the starting point: ${formData.startingPoint}.
    4. Ensure all locations are real and links are relevant.
    5. Assign a type: food, sightseeing, relaxation, adventure, or transit.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          tripTitle: { type: Type.STRING },
          duration: { type: Type.STRING },
          budgetLevel: { type: Type.STRING },
          overallVibe: { type: Type.STRING },
          startingLocation: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      location: { type: Type.STRING },
                      description: { type: Type.STRING },
                      notes: { type: Type.STRING },
                      type: { type: Type.STRING, enum: ['food', 'sightseeing', 'relaxation', 'adventure', 'transit'] },
                      searchUrl: { type: Type.STRING },
                      mapsUrl: { type: Type.STRING },
                      distanceFromPrevious: { type: Type.STRING }
                    },
                    required: ['time', 'location', 'description', 'type']
                  }
                }
              },
              required: ['day', 'title', 'activities']
            }
          }
        },
        required: ['destination', 'tripTitle', 'days', 'startingLocation']
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  // Handle potential JSON markers in Markdown output
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const cleanJson = jsonMatch ? jsonMatch[0] : text;

  return JSON.parse(cleanJson) as Itinerary;
};
