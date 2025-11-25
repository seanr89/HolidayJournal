import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, TripFormData } from "../types";

export const generateItinerary = async (formData: TripFormData): Promise<Itinerary> => {
  // Initialize the client inside the function to ensure process.env is ready and avoid top-level side effects
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  //console.log("API Key: ", process.env.API_KEY);

  const prompt = `
    Create a detailed ${formData.days}-day travel itinerary for ${formData.destination}.
    The traveler profile is: ${formData.travelers}.
    Budget level: ${formData.budget}.
    Interests/Preferences: ${formData.interests}.
    
    For each day, provide a title, a summary, and a list of specific activities with approximate times, locations, and brief descriptions.
    Also include a 'notes' field for practical tips (e.g., "Book in advance", "Wear comfortable shoes").
    Assign a type to each activity (food, sightseeing, relaxation, adventure, transit).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          tripTitle: { type: Type.STRING },
          duration: { type: Type.STRING },
          budgetLevel: { type: Type.STRING },
          overallVibe: { type: Type.STRING },
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
                      type: { type: Type.STRING, enum: ['food', 'sightseeing', 'relaxation', 'adventure', 'transit'] }
                    },
                    required: ['time', 'location', 'description', 'type']
                  }
                }
              },
              required: ['day', 'title', 'activities']
            }
          }
        },
        required: ['destination', 'tripTitle', 'days']
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(text) as Itinerary;
};