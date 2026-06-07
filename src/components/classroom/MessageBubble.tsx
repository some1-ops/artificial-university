"use client";

// ============================================================
// MessageBubble.tsx — Individual chat message renderer
// ============================================================
// Renders AI (dark slate, left-aligned) and user (neon outlined, right-aligned) bubbles
// Supports simple inline code and bold markdown formatting

import { Message } from "@/lib/mockData";

interface MessageBubbleProps {
  message: Message;
}

/** Render simple markdown: **bold**, `code`, newlines, and fenced code blocks */
function renderContent(content: string) {
  // Handle fenced code blocks ```...```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3).replace(/^\w*\n/, ""); // strip language hint
      return (
        <pre
          key={i}
          className="mt-3 p-3 rounded-lg bg-black/40 border border-white/10 text-xs text-neon/80 font-mono overflow-x-auto leading-relaxed whitespace-pre"
        >
          {code}
        </pre>
      );
    }

    // Handle inline formatting within regular text
    const inlineParts = part.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <span key={i}>
        {inlineParts.map((inline, j) => {
          if (inline.startsWith("**") && inline.endsWith("**")) {
            return <strong key={j} className="font-bold text-white">{inline.slice(2, -2)}</strong>;
          }
          if (inline.startsWith("`") && inline.endsWith("`")) {
            return (
              <code key={j} className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-neon/80 font-mono text-[0.8em]">
                {inline.slice(1, -1)}
              </code>
            );
          }
          // Handle newlines within plain text
          return inline.split("\n").map((line, k) => (
            <span key={k}>
              {line}
              {k < inline.split("\n").length - 1 && <br />}
            </span>
          ));
        })}
      </span>
    );
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.role === "ai";

  return (
    <div className={`flex items-end gap-2.5 ${isAI ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
          isAI
            ? "bg-[#1a1a1a] border-white/10 text-neon"
            : "bg-neon/10 border-neon/30 text-neon"
        }`}
      >
        {isAI ? "AI" : "U"}
      </div>

      {/* Bubble */}
      <div className={`group flex flex-col gap-1 max-w-[78%] md:max-w-[65%] ${isAI ? "items-start" : "items-end"}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isAI
              ? "bg-[#1c1c1c] text-white/80 border border-white/5 rounded-bl-md"
              : "bg-transparent text-white border border-neon/50 rounded-br-md shadow-[0_0_12px_rgba(57,255,20,0.1)]"
          }`}
        >
          {renderContent(message.content)}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-white/20 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
