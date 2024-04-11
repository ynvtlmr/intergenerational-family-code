"use server";

import { InsertFamilyCrest } from "./family-crest-form";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function generateCrest(family: InsertFamilyCrest) {
  let prompt =
    ` A family crest for the ${family.name}. ` +
    ` Please do not generate text of any kind, Instead add a place for text to be inserted.` +
    ` The symbol for the family crest: ${family.symbol}.` +
    ` The colors that I want on the crest are ${family.color}.`;

  if (family.motto) {
    prompt += ` The family motto is: ${family.motto}.`;
  }
  if (family.animal) {
    prompt += ` The crest also features the following animals: ${family.animal}.`;
  }
  if (family.details) {
    prompt += ` The crest also has these details: ${family.details}.`;
  }
  const res = await openai.images.generate({
    prompt,
    model: "dall-e-3",
  });

  return res.data[0].url;
}
