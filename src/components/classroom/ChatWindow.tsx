"use client";

// ============================================================
// ChatWindow.tsx — Scrollable message list + typing indicator
// ============================================================

import { useEffect, useRef } from "react";
import { Message } from "@/lib/mockData";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-xs font-bold text-neon flex-shrink-0">
        AI
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-[#1c1c1c] border border-white/5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4 scrollbar-thin"
    >
      {/* Date marker */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[11px] text-white/20 font-medium px-2">Today</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Messages */}
      {messages.map((message) => (
        <div
          key={message.id}
          className="animate-fade-up"
        >
          <MessageBubble message={message} />
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="animate-fade-up">
          <TypingIndicator />
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
