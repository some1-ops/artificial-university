import { NextResponse } from "next/server";
import { SKILLS_DATA } from "@/lib/skillsData";

export async function POST(request: Request) {
  try {
    const { messages, skillId } = await request.json();
    const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "HF_TOKEN_MISSING", message: "Hugging Face token is not configured." },
        { status: 400 }
      );
    }

    // Use the skill's hardcoded system prompt (locks AI inside the proprietary curriculum).
    // Falls back to a generic mentor prompt if a skill somehow lacks one.
    const systemPrompt =
      activeSkill.systemPrompt ||
      `You are a direct, encouraging AI Mentor teaching "${activeSkill.name}".
Your persona: Talk in a casual, conversational, and direct style (like a supportive peer who is an expert). Avoid dry academic lectures, walls of text, and formal numbered lists.
Guidelines:
1. Keep replies concise, punchy, and split into small paragraphs.
2. Use markdown formatting (bold, italic) and write clean code blocks for examples.
3. Keep the user engaged by checking their understanding and asking one relevant question at the end.
4. Integrate emojis naturally.`;

    // Build the HF messages array: system prompt first, then full conversation history
    const hfMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://api-inference.huggingface.co/v1/chat/completions",
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "HF_API_ERROR", message: errorData.error || "Failed to query Hugging Face API" },
        { status: response.status }
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
