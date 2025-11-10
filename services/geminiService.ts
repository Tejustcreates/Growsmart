
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, Scheme } from '../types';

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 recent news headlines and short summaries relevant to farmers in India. Include a plausible source and a published date for each.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              publishedDate: { type: Type.STRING, description: "e.g., October 26, 2023" }
            },
            required: ["headline", "summary", "source", "publishedDate"]
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const articles = JSON.parse(jsonText);
    return articles;
  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    // Return mock data on failure
    return [
      { headline: "Failed to load news", summary: "Could not fetch live news at the moment. Please try again later.", source: "System", publishedDate: new Date().toLocaleDateString() }
    ];
  }
};

export const fetchSchemes = async (state: string): Promise<Scheme[]> => {
    if (!state) return [];
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `List 3 major government schemes for farmers in ${state}, India. For each scheme, provide a name, a brief description, key eligibility criteria, and main benefits.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            schemeName: { type: Type.STRING },
                            description: { type: Type.STRING },
                            eligibility: { type: Type.STRING },
                            benefits: { type: Type.STRING }
                        },
                        required: ["schemeName", "description", "eligibility", "benefits"]
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const schemes = JSON.parse(jsonText);
        return schemes;
    } catch (error) {
        console.error(`Error fetching schemes for ${state}:`, error);
        return [
            { schemeName: "Failed to load schemes", description: `Could not fetch schemes for ${state}. Please try again later.`, eligibility: "N/A", benefits: "N/A" }
        ];
    }
};