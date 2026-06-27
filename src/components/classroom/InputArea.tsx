"use client";

// ============================================================
// InputArea.tsx — Chat message input bar
// ============================================================

import { useState, useRef, KeyboardEvent } from "react";

interface InputAreaProps {
  onSend: (text: string, file?: File | null) => void;
  disabled: boolean;
}

// Paper airplane SVG icon
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

export default function InputArea({ onSend, disabled }: InputAreaProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }
  };

  return (
    <div className="flex-shrink-0 px-4 md:px-8 py-4 border-t border-white/5 bg-[#050505]">
      <div
        className={`flex items-end gap-3 p-3 rounded-2xl bg-[#161616] border transition-all duration-200 ${
          disabled
            ? "border-white/5 opacity-60"
            : "border-white/10 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        }`}
      >
        {/* Attachment button */}
        <label
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${
            disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5 text-white/40 hover:text-white"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={disabled}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onSend("", file);
              }
            }}
          />
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0l-3.536 3.536m3.536-3.536L14.828 4.22a5 5 0 00-7.072 0l-4.95 4.95a5 5 0 000 7.072l3.182 3.182a5 5 0 007.071 0l4.95-4.95a5 5 0 000-7.07l-3.181-3.182z" />
          </svg>
        </label>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          rows={1}
          placeholder="Ask a question or explain what you learned..."
          className="flex-1 resize-none bg-transparent text-white/80 placeholder:text-white/20 text-sm leading-relaxed outline-none min-h-[24px] max-h-[140px] scrollbar-none"
          style={{ height: "24px" }}
        />

        {/* Shift+Enter hint */}
        {value.length > 0 && !disabled && (
          <span className="hidden md:block text-[10px] text-white/15 self-center whitespace-nowrap flex-shrink-0">
            Shift+↵ newline
          </span>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          id="chat-send-btn"
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            value.trim() && !disabled
              ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:scale-105 hover:shadow-[0_0_16px_rgba(0,240,255,0.5)] active:scale-95"
              : "bg-white/5 text-white/20 cursor-not-allowed"
          }`}
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-center text-[10px] text-white/15 mt-2">
        AI mentor · powered by your personalized curriculum
      </p>
    </div>
  );
}
