"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/classroom/Sidebar";
import ChatWindow from "@/components/classroom/ChatWindow";
import InputArea from "@/components/classroom/InputArea";
import AchievementToast from "@/components/classroom/AchievementToast";
import { useChat } from "@/hooks/useChat";
import { SKILLS_DATA } from "@/lib/skillsData";

function ClassroomContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get("skill") || "web-design";
  const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, isTyping, sendMessage, showAchievement, dismissAchievement } = useChat(activeSkill.id);

  // Get current active lesson or fall back to skill name
  const activeLesson = activeSkill.curriculum
    .flatMap((m) => m.lessons)
    .find((l) => l.status === "active")?.title || activeSkill.name;

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            aria-label="Open curriculum"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-neon/10 border border-neon/30 flex items-center justify-center transition-all duration-200 group-hover:border-neon/50">
              <span className="text-neon font-black text-[10px]">AU</span>
            </div>
            <span className="text-white/60 text-sm font-medium hidden sm:block group-hover:text-white transition-colors">
              artificial university
            </span>
          </Link>
        </div>

        {/* Module context */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon/5 border border-neon/15">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          <span className="text-xs text-neon/80 font-medium">{activeLesson}</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Progress
          </button>
          <div className="w-7 h-7 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center text-xs font-bold text-neon">
            U
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          curriculum={activeSkill.curriculum}
          skillName={activeSkill.name}
        />

        {/* Chat Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Chat header context bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-white">AI Mentor ({activeSkill.emoji})</p>
                <p className="text-[10px] text-white/30">Active · {activeLesson}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span className="text-[10px]">Ask anything — your AI won&apos;t judge</span>
            </div>
          </div>

          {/* Messages */}
          <ChatWindow messages={messages} isTyping={isTyping} />

          {/* Input */}
          <InputArea onSend={sendMessage} disabled={isTyping} />
        </div>
      </div>

      {/* Achievement Toast */}
      <AchievementToast
        show={showAchievement}
        onDismiss={dismissAchievement}
        title="Skill Verified"
        subtitle={activeLesson}
      />
    </div>
  );
}

export default function ClassroomPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-neon/10 border border-neon/30">
            <span className="text-neon font-black text-lg">AU</span>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-neon">Configuring Mentor...</span>
        </div>
      </div>
    }>
      <ClassroomContent />
    </Suspense>
  );
}
