import { GoogleGenAI, Type } from "@google/genai";
import { AIActivitySuggestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getDestinationSuggestions = async (
  city: string,
  interests: string[]
): Promise<AIActivitySuggestion[]> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return [];
  }

  try {
    const prompt = `Suggest 5 distinct travel activities for ${city}. 
    Focus on these interests: ${interests.join(', ') || 'General Sightseeing'}.
    Return a JSON array where each object has 'name', 'description', 'estimatedCost' (number in USD), and 'type'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              estimatedCost: { type: Type.NUMBER },
              type: { type: Type.STRING }
            },
            required: ["name", "description", "estimatedCost", "type"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIActivitySuggestion[];
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const getItineraryInsight = async (tripName: string, stops: string[]): Promise<string> => {
  if (!apiKey) return "Add your API Key to get AI insights about your trip!";

  try {
    const prompt = `I am planning a trip called "${tripName}" visiting: ${stops.join(', ')}. 
    Give me a one-paragraph exciting summary of what to expect and one specific "pro-tip" for this route.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate insight.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Insight temporarily unavailable.";
  }
};
