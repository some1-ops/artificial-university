

// ============================================================
// FUTURE HOOK: Replace simulateAIReply with Hugging Face Inference API
//   - POST to: https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct
//   - Pass full message history as context (trim to last N tokens for context window)
//   - For long-term memory: use RAG with Pinecone/pgvector to retrieve relevant past messages

import { useState, useCallback, useRef, useEffect } from "react";
import { Message } from "@/lib/mockData";
import { SKILLS_DATA } from "@/lib/skillsData";

interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  showAchievement: boolean;
  dismissAchievement: () => void;
}

export function useChat(skillId: string, isGauntletMode: boolean = false): UseChatReturn {
  const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const userMessageCount = useRef(0);

  // Sync state if activeSkill changes
  useEffect(() => {
    setMessages(activeSkill.initialMessages);
    userMessageCount.current = 0;
    setShowAchievement(false);
  }, [activeSkill]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      userMessageCount.current += 1;
      const currentCount = userMessageCount.current;

      const userMessage: Message = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      // Stage user message locally
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsTyping(true);

      try {
        // Attempt live chat completion
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
            skillId: activeSkill.id,
            isGauntletMode,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.reply) {
          throw new Error("Empty reply text returned");
        }

        const aiMessage: Message = {
          id: `msg-ai-${Date.now()}`,
          role: "ai",
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);

        // Trigger achievement toast after the user's 2nd message exchange
        if (currentCount === 2) {
          setTimeout(() => setShowAchievement(true), 500);
        }

      } catch (error) {
        console.warn("API failure, inserting error message:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        const aiMessage: Message = {
          id: `msg-ai-${Date.now()}`,
          role: "ai",
          content: `Sorry, my brain seems to be disconnected right now. (Error: ${errorMessage}). Could you please try sending that again?`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }
    },
    [messages, activeSkill, isGauntletMode]
  );

  const dismissAchievement = useCallback(() => {
    setShowAchievement(false);
  }, []);

  return { messages, isTyping, sendMessage, showAchievement, dismissAchievement };
}

