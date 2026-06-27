

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
  sendMessage: (text: string, file?: File | null) => void;
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

  const animateLogs = async (
    logs: { step: string; text: string }[],
    finalMessage: Message
  ) => {
    // Create a message placeholder for logs
    const logMsgId = `logs-${Date.now()}`;
    const initialLogMessage: Message = {
      id: logMsgId,
      role: "ai",
      content: "Initializing Algeris Sandbox Rig...",
      timestamp: new Date(),
      type: "logs",
      processingLogs: [],
    };

    setMessages((prev) => [...prev, initialLogMessage]);

    // Push logs one by one
    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === logMsgId) {
            return {
              ...msg,
              content: `Processing: ${logs[i].text}`,
              processingLogs: [...(msg.processingLogs || []), logs[i]],
            };
          }
          return msg;
        })
      );
    }

    // Finally append the completed message (video or persona card)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setMessages((prev) =>
      prev.filter((msg) => msg.id !== logMsgId).concat(finalMessage)
    );
    setIsTyping(false);
  };

  const sendMessage = useCallback(
    async (text: string, file?: File | null) => {
      userMessageCount.current += 1;
      const currentCount = userMessageCount.current;

      // 1. Handle File Upload (OFM Generator Flow)
      if (file) {
        const userMessage: Message = {
          id: `msg-user-${Date.now()}`,
          role: "user",
          content: `Uploaded reference image: **${file.name}** (${(file.size / 1024).toFixed(1)} KB)`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
          const body = new FormData();
          body.append("image", file);

          const res = await fetch("/api/ofm-generator", {
            method: "POST",
            body,
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          const finalPersonaMsg: Message = {
            id: `msg-ai-persona-${Date.now()}`,
            role: "ai",
            content: `AI Persona successfully generated. Image EXIF headers stripped, SHA-256 fingerprint spoofed. Wildcard staging link deployed to: **${data.subdomain}**`,
            timestamp: new Date(),
            type: "persona",
            personaData: data.persona,
            subdomain: data.subdomain,
          };

          await animateLogs(data.logs, finalPersonaMsg);
        } catch (err: any) {
          console.error("OFM generation failed:", err);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-ai-err-${Date.now()}`,
              role: "ai",
              content: `Failed to strip image headers & generate persona. Error: ${err.message}`,
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }
        return;
      }

      // If no text, return
      if (!text.trim()) return;

      const userMessage: Message = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsTyping(true);

      // 2. Handle YouTube Rendering Rig Command
      const isRenderCommand =
        text.toLowerCase().includes("render") &&
        (text.toLowerCase().includes("script") || text.toLowerCase().includes("voice"));

      if (isRenderCommand) {
        try {
          const res = await fetch("/api/render-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              script: text,
              voice: text.toLowerCase().includes("mysterious") ? "mysterious" : "standard narrative",
              background: text.toLowerCase().includes("dark") ? "dark atmospheric" : "cinematic loop",
            }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          const finalVideoMsg: Message = {
            id: `msg-ai-video-${Date.now()}`,
            role: "ai",
            content: `Stitched and compiled video. ElevenLabs audio stitched with Kling AI loops using FFMPEG.`,
            timestamp: new Date(),
            type: "video",
            videoUrl: data.videoUrl,
            fileName: data.fileName,
          };

          await animateLogs(data.logs, finalVideoMsg);
        } catch (err: any) {
          console.error("YouTube render failed:", err);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-ai-err-${Date.now()}`,
              role: "ai",
              content: `Failed to compile audio and video loops. Error: ${err.message}`,
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }
        return;
      }

      // 3. Regular Chat Completion Flow
      try {
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

