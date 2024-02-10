import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

type Family = {
  name: string;
  symbol: string;
  color: string;
  motto?: string;
  animal?: string;
  details?: string;
};

export async function POST(request: Request) {
  const family: Family = await request.json();
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

  return NextResponse.json({ url: res.data[0].url });
}
