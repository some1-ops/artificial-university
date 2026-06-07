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

    // Build the skill-specific system prompt
    const systemPrompt = `You are a direct, encouraging AI Mentor teaching "${activeSkill.name}".
Your persona: Talk in a casual, conversational, and direct texting style (like a supportive friend or peer who is an expert). Avoid dry academic lectures, walls of text, and formal numbered lists.
Guidelines:
1. Keep replies concise, punchy, and split into small paragraphs.
2. Use markdown formatting (bold, italic) and write clean code blocks for examples.
3. Keep the user engaged by checking their understanding and asking one relevant question at the end of your response.
4. Integrate emojis naturally.`;

    // Map messages: system prompt, followed by user/assistant role mapping
    const hfMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
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
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: hfMessages,
          max_tokens: 500,
          temperature: 0.7,
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
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: error.message },
      { status: 500 }
    );
  }
}
