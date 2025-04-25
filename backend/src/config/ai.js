import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEN_AI_API_KEY,
});
