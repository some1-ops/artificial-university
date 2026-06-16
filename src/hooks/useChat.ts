

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
  isDemoMode: boolean;
}

export function useChat(skillId: string): UseChatReturn {
  const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const userMessageCount = useRef(0);
  const replyIndex = useRef(0);

  // Sync state if activeSkill changes
  useEffect(() => {
    setMessages(activeSkill.initialMessages);
    userMessageCount.current = 0;
    replyIndex.current = 0;
    setShowAchievement(false);
  }, [activeSkill]);

  const simulateAIReply = useCallback((currentCount: number) => {
    setIsTyping(true);
    setIsDemoMode(true);

    const delay = 800 + Math.random() * 800; // 0.8s–1.6s typing feel

    setTimeout(() => {
      const reply = activeSkill.replies[replyIndex.current % activeSkill.replies.length];
      replyIndex.current += 1;

      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        role: "ai",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Trigger achievement toast after the user's 2nd message exchange
      if (currentCount === 2) {
        setTimeout(() => setShowAchievement(true), 500);
      }
    }, delay);
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
          }),
        });

        if (!response.ok) {
          throw new Error("AI Endpoint returned an error response");
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
        setIsDemoMode(false);

        // Trigger achievement toast after the user's 2nd message exchange
        if (currentCount === 2) {
          setTimeout(() => setShowAchievement(true), 500);
        }

      } catch (error) {
        console.warn("API failure, falling back to simulated reply:", error);
        simulateAIReply(currentCount);
      }
    },
    [messages, activeSkill, simulateAIReply]
  );

  const dismissAchievement = useCallback(() => {
    setShowAchievement(false);
  }, []);

  return { messages, isTyping, sendMessage, showAchievement, dismissAchievement, isDemoMode };
}

