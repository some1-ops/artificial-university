

// ============================================================
// FUTURE HOOK: Replace simulateAIReply with Hugging Face Inference API
//   - POST to: https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
//   - Pass full message history as context (trim to last N tokens for context window)
//   - For long-term memory: use RAG with Pinecone/pgvector to retrieve relevant past messages

import { useState, useCallback, useRef } from "react";
import { Message, INITIAL_MESSAGES, AI_REPLIES } from "@/lib/mockData";

interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  showAchievement: boolean;
  dismissAchievement: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const userMessageCount = useRef(0);
  const replyIndex = useRef(0);

  const simulateAIReply = useCallback((currentCount: number) => {
    // FUTURE HOOK: Replace this entire function with a fetch() call to your API route
    //   which calls the Hugging Face Inference API with the full message history
    setIsTyping(true);

    const delay = 800 + Math.random() * 800; // 0.8s–1.6s typing feel

    setTimeout(() => {
      const reply = AI_REPLIES[replyIndex.current % AI_REPLIES.length];
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
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      userMessageCount.current += 1;
      const currentCount = userMessageCount.current;

      const userMessage: Message = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      simulateAIReply(currentCount);
    },
    [simulateAIReply]
  );

  const dismissAchievement = useCallback(() => {
    setShowAchievement(false);
  }, []);

  return { messages, isTyping, sendMessage, showAchievement, dismissAchievement };
}
