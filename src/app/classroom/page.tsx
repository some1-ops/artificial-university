"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChatWindow from "@/components/classroom/ChatWindow";
import InputArea from "@/components/classroom/InputArea";
import AchievementToast from "@/components/classroom/AchievementToast";
import { useChat } from "@/hooks/useChat";
import { SKILLS_DATA } from "@/lib/skillsData";

function ClassroomContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get("skill") || "web-design";
  const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

  const [activeTab, setActiveTab] = useState("arena");
  const { messages, isTyping, sendMessage, showAchievement, dismissAchievement } = useChat(activeSkill.id);

  // Get current active lesson or fall back to skill name
  const activeLesson = activeSkill.curriculum
    .flatMap((m) => m.lessons)
    .find((l) => l.status === "active")?.title || activeSkill.name;

  return (
    <div className="h-screen flex flex-col bg-[#050505] overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center transition-all duration-200 group-hover:border-cyan-500/50">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-[10px]">AU</span>
            </div>
            <span className="text-white/60 text-sm font-medium hidden sm:block group-hover:text-white transition-colors">
              Artificial University by Algeris
            </span>
          </Link>

          {/* Go Back */}
          <Link href="/skills" className="ml-2 sm:ml-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="hidden sm:inline">Back to Skills</span>
          </Link>
        </div>

        {/* Module context */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-400/80 font-medium">{activeLesson}</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Progress
          </button>
          <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
            U
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Tabs (Replacing Sidebar) */}
        <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-[#050505] flex flex-col p-4 gap-2">
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2 mt-2">Command Center</h2>
          <button 
            onClick={() => setActiveTab("arena")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border ${
              activeTab === "arena" 
                ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "arena" ? "text-cyan-400" : "text-white/70"}`}>The Arena</span>
            <span className="text-[10px] text-white/40 mt-1 text-left">Core AI conversational skill stream</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("terminal")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border ${
              activeTab === "terminal" 
                ? "bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_rgba(138,43,226,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "terminal" ? "text-violet-400" : "text-white/70"}`}>The Terminal</span>
            <span className="text-[10px] text-white/40 mt-1 text-left">Live coding sandbox & automated assets</span>
          </button>

          <button 
            onClick={() => setActiveTab("leaderboard")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border ${
              activeTab === "leaderboard" 
                ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "leaderboard" ? "text-amber-400" : "text-white/70"}`}>The Leaderboard</span>
            <span className="text-[10px] text-white/40 mt-1 text-left">Active streaks & unlocked funding tiers</span>
          </button>
        </aside>

        {/* Main Area */}
        <div className="flex flex-col flex-1 overflow-hidden bg-[#0a0a0c]">
          
          {/* Live Execution Ticker */}
          <div className="flex-shrink-0 w-full overflow-hidden bg-cyan-950/20 border-b border-cyan-500/20 px-4 py-2 flex items-center relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10"></div>
            <div className="flex gap-8 whitespace-nowrap animate-marquee text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider">
              <span><span className="text-cyan-300 font-bold">LIVE:</span> User_0x94 just passed The Gauntlet (AI OFM Niche Validation)</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Student_442 unlocked $100 Dropshipping Seed Capital</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Axis Model Trade verified (+3.2% gain)</span>
              <span className="text-cyan-500/30">///</span>
              {/* Duplicate for seamless marquee effect */}
              <span><span className="text-cyan-300 font-bold">LIVE:</span> User_0x94 just passed The Gauntlet (AI OFM Niche Validation)</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Student_442 unlocked $100 Dropshipping Seed Capital</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Axis Model Trade verified (+3.2% gain)</span>
            </div>
          </div>

          {activeTab === "arena" && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Chat header context bar */}
              <div className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/5 bg-[#050505]/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <div>
                    <p className="text-xs font-semibold text-white">AI Mentor ({activeSkill.emoji})</p>
                    <p className="text-[10px] text-white/30">Active · {activeLesson}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-white/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span className="text-[10px]">Ask anything — your AI won&apos;t judge</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ChatWindow messages={messages} isTyping={isTyping} />

              {/* Input */}
              <InputArea onSend={sendMessage} disabled={isTyping} />
            </div>
          )}

          {activeTab === "terminal" && (
            <div className="flex flex-1 items-center justify-center text-white/30 text-sm">
              <div className="flex flex-col items-center gap-4">
                <svg className="w-12 h-12 text-violet-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M4 15V9a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
                </svg>
                <p>The Terminal is currently offline. Sandboxes provisioning...</p>
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="flex flex-1 items-center justify-center text-white/30 text-sm">
              <div className="flex flex-col items-center gap-4">
                <svg className="w-12 h-12 text-amber-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p>The Leaderboard is compiling streaks...</p>
              </div>
            </div>
          )}

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
      <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-lg">AU</span>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Configuring Mentor...</span>
        </div>
      </div>
    }>
      <ClassroomContent />
    </Suspense>
  );
}
