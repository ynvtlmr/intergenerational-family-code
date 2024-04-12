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
    ` A unique family crest for the ${family.name} family. ` +
    ` Please do not generate text of any kind.` +
    ` Use the following symbol for the family crest: ${family.symbol}.` +
    ` Use the following colors for the family crest: ${family.color}.`;

  if (family.motto) {
    prompt += ` Their family motto is: ${family.motto}.`;
  }
  if (family.animal) {
    prompt += ` Please use the following animal for the family crest: ${family.animal}.`;
  }
  if (family.details) {
    prompt += ` Please add the following details to the family crest: ${family.details}.`;
  }
  const res = await openai.images.generate({
    prompt,
    model: "dall-e-3",
    response_format: "b64_json",
  });
  return NextResponse.json(res.data[0].b64_json);
}
