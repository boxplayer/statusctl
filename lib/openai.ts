import OpenAI from "openai";
import { ChatModel } from "openai/resources/shared.mjs";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"]!,
});

export default async function askGPT(model: ChatModel, prompt: string) {
  const completion = await openai.responses.create({
    model: model,
    input: prompt,
    store: true,
  });

  const text = completion.output_text;

  if (!text) {
    throw new Error("GPT: Failed to generate response");
  }

  return text;
}
