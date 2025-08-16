// app/api/claude/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { gameData } = await req.json();

  const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
    model: "claude-4-sonnet-20250514",
    max_tokens: 2048,
    system:
        "You are a professional game designer. Use the user's input to return a detailed and structured game design document. Include high level game structure, key mechanics, keyboard controls and suggestions for improvement. Format it clearly using headings. The game will be a web based game and it is in general a 2d game if not provided by the user. The game should be user friendly and all the controls should be checked and created properly. The game should be by default a single player game and nno cloud related ",
    messages: [
        {
        role: "user",
        content: JSON.stringify(gameData, null, 2),
        }
    ],
    }),

  });

  // Log the raw response body for debugging
  const raw = await anthropicResponse.clone().text();
  console.log("Anthropic raw response body:", raw);

  const data = JSON.parse(raw);
  console.log("Anthropic response (parsed):", data);

  // Try to extract the text from different possible structures
  let content = "";
  if (Array.isArray(data.content) && data.content[0]?.text) {
    content = data.content[0].text;
  } else if (typeof data.content === "string") {
    content = data.content;
  } else if (typeof data.content === "object" && data.content?.text) {
    content = data.content.text;
  } else if (data?.text) {
    content = data.text;
  }

  return NextResponse.json({ content });
}
