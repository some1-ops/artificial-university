"use client";

// ============================================================
// AchievementToast.tsx — Gamification "Skill Verified" toast
// ============================================================

import { useEffect } from "react";

interface AchievementToastProps {
  show: boolean;
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
}

export default function AchievementToast({
  show,
  onDismiss,
  title = "Skill Verified",
  subtitle = "CSS Grid Fundamentals",
}: AchievementToastProps) {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDismiss, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div
      id="achievement-toast"
      className="fixed bottom-6 right-6 z-50 animate-slide-in-right"
    >
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#111] border border-neon/40 shadow-[0_0_30px_rgba(57,255,20,0.2),0_0_60px_rgba(57,255,20,0.08)] min-w-[260px]">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center">
          <span className="text-xl">⚡</span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neon/70">Achievement Unlocked</span>
          <span className="text-sm font-bold text-white">{title}</span>
          <span className="text-xs text-white/40">{subtitle}</span>
        </div>

        {/* Close button */}
        <button
          onClick={onDismiss}
          className="ml-auto flex-shrink-0 p-1 rounded-lg hover:bg-white/10 text-white/30 hover:text-white/60 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar for auto-dismiss countdown */}
      <div className="mt-1.5 h-0.5 rounded-full bg-white/5 overflow-hidden mx-2">
        <div className="h-full bg-neon/50 rounded-full animate-shrink-width" style={{ animationDuration: "4s" }} />
      </div>
    </div>
  );
}
