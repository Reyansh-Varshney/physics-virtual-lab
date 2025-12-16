/// <reference types="vite/client" />
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found in environment variables. The AI Tutor will not function.");
}

export const getTutorResponse = async (context: string, question: string): Promise<string> => {
  if (!API_KEY) {
    return "I ran into a problem.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY as string });
    const fullPrompt = `${context}\n\nUser's question: "${question}"\n\nYour answer:`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: fullPrompt,
    });

    return response.text || "I ran into a problem.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I ran into a problem.";
  }
};