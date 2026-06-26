import { NextResponse } from "next/server";
import { SKILLS_DATA } from "@/lib/skillsData";

export async function POST(request: Request) {
  try {
    const { messages, skillId, isGauntletMode } = await request.json();
    const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "HF_TOKEN_MISSING", message: "Hugging Face token is not configured." },
        { status: 400 }
      );
    }

    let systemPrompt =
      activeSkill.systemPrompt ||
      `You are a direct, encouraging AI Mentor teaching "${activeSkill.name}".
Your persona: Talk in a casual, conversational, and direct style (like a supportive peer who is an expert). Avoid dry academic lectures, walls of text, and formal numbered lists.
Guidelines:
1. Keep replies concise, punchy, and split into small paragraphs.
2. Use markdown formatting (bold, italic) and write clean code blocks for examples.
3. Keep the user engaged by checking their understanding and asking one relevant question at the end.
4. Integrate emojis naturally.`;

    if (isGauntletMode) {
      systemPrompt = `You are a ruthless, highly critical client/market simulator testing the user on "${activeSkill.name}". 
Your persona: Toxic, demanding, unforgiving, impatient, and brutally honest. You are running a live simulation (a "Gauntlet").
Guidelines:
1. Attack their ideas and demand immediate, flawless results.
2. Do NOT be supportive. Act like money is on the line and they are failing.
3. Keep replies very short and punchy.
4. End with a demanding question or ultimatum.`;
    }

    // Build the HF messages array: system prompt first, then full conversation history
    const hfMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    let response;
    let retries = 3;
    let delay = 3000;

    for (let i = 0; i < retries; i++) {
      response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: hfMessages,
            max_tokens: 800,   // Increased from 500 to allow richer, multi-paragraph responses
            temperature: 0.75, // Slightly more expressive for the "bro" persona
          }),
        }
      );

      if (response.status === 503) {
        console.log(`Model is loading (503). Retrying in ${delay / 1000} seconds... (${i + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay += 2000; // Exponential-ish backoff
      } else {
        break;
      }
    }

    if (!response || !response.ok) {
      const errorData = response ? await response.json().catch(() => ({})) : {};
      return NextResponse.json(
        { error: "HF_API_ERROR", message: errorData.error || "Failed to query Hugging Face API" },
        { status: response ? response.status : 500 }
      );
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: err.message },
      { status: 500 }
    );
  }
}
