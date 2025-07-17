import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env["GEMINI_API_KEY"],
});

export default async function askGemini(prompt: string) {
  const completion = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const text = completion.text;

  if (!text) {
    throw new Error("Gemini: Failed to generate response");
  }

  return text;
}
