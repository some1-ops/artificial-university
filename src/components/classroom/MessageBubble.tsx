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
  // Gracefully handle string dates or Date objects
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function LogsRenderer({ logs }: { logs?: { step: string; text: string }[] }) {
  if (!logs || logs.length === 0) return null;
  return (
    <div className="w-full max-w-xl font-mono text-[11px] bg-black/90 border border-cyan-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(0,240,255,0.05)] text-cyan-400 leading-relaxed">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <span className="font-bold text-white uppercase text-[9px] tracking-wider">Staging Container Logs</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
      </div>
      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-cyan-500/50">[{log.step}]</span>
            <span className="text-white/80">{log.text}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-3 bg-cyan-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

function PersonaRenderer({ data, subdomain }: { data: any; subdomain?: string }) {
  if (!data) return null;
  return (
    <div className="w-full max-w-xl bg-[#0d0d0f] border border-violet-500/20 rounded-2xl p-5 shadow-[0_8px_32px_rgba(138,43,226,0.15)] flex flex-col gap-4 text-white">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/25">AI Persona Generated</span>
          <h4 className="text-lg font-black mt-2 text-white">{data.name}</h4>
          <p className="text-xs text-white/40">{data.niche} · Age {data.age}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-sm">👤</div>
      </div>

      <div className="text-xs text-white/70 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
        <strong className="text-white">Aesthetic:</strong> {data.aesthetic}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Daily Routine</span>
        <ul className="text-xs text-white/60 list-disc list-inside flex flex-col gap-1">
          {data.daily_routine?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {subdomain && (
        <div className="flex flex-col gap-2 bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-3.5 mt-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Wildcard Staging Site</span>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xs font-mono text-cyan-300 truncate">{subdomain}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(subdomain);
                alert("Sandbox staging link copied to clipboard!");
              }}
              className="px-2.5 py-1 text-[10px] bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/30 text-cyan-300 font-bold rounded transition-colors cursor-pointer"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-white/5 pt-3 mt-1">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Midjourney Prompt</span>
        <div className="flex gap-2">
          <textarea
            readOnly
            value={data.prompts?.midjourney_base}
            className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono text-white/50 h-16 resize-none focus:outline-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(data.prompts?.midjourney_base);
              alert("Midjourney prompt copied!");
            }}
            className="px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoRenderer({ url, fileName }: { url?: string; fileName?: string }) {
  if (!url) return null;
  return (
    <div className="w-full max-w-xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-xs font-bold text-white">{fileName || "youtube_short.mp4"}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black tracking-widest uppercase rounded transition-colors cursor-pointer"
        >
          Download
        </a>
      </div>
      <video src={url} controls className="w-full aspect-[9/16] bg-[#050505] max-h-[360px] object-cover" />
    </div>
  );
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
        {message.type === "logs" ? (
          <LogsRenderer logs={message.processingLogs} />
        ) : message.type === "persona" ? (
          <PersonaRenderer data={message.personaData} subdomain={message.subdomain} />
        ) : message.type === "video" ? (
          <VideoRenderer url={message.videoUrl} fileName={message.fileName} />
        ) : (
          <div
            className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              isAI
                ? "bg-[#1c1c1c] text-white/80 border border-white/5 rounded-bl-md"
                : "bg-transparent text-white border border-neon/50 rounded-br-md shadow-[0_0_12px_rgba(57,255,20,0.1)]"
            }`}
          >
            {renderContent(message.content)}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-white/20 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
