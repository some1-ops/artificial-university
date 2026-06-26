"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CurriculumPanel from "@/components/classroom/CurriculumPanel";
import ChatWindow from "@/components/classroom/ChatWindow";
import InputArea from "@/components/classroom/InputArea";
import AchievementToast from "@/components/classroom/AchievementToast";
import { useChat } from "@/hooks/useChat";
import { SKILLS_DATA } from "@/lib/skillsData";
import { Sandpack } from "@codesandbox/sandpack-react";
import { supabase } from "@/lib/supabase";

interface LeaderboardUser {
  id: string;
  username: string;
  streak_count: number;
  capital_unlocked: string | null;
  stake_locked: number;
}

function ClassroomContent() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get("skill") || "web-design";
  const activeSkill = SKILLS_DATA.find((s) => s.id === skillId) || SKILLS_DATA[0];

  const [activeTab, setActiveTab] = useState("arena");
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isGauntletMode, setIsGauntletMode] = useState(false);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [dbError, setDbError] = useState(false);
  
  const { messages, isTyping, sendMessage, showAchievement, dismissAchievement } = useChat(activeSkill.id, isGauntletMode);

  // Fetch leaderboard data
  import { useEffect } from "react";
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, username, streak_count, capital_unlocked, stake_locked")
          .order("streak_count", { ascending: false })
          .limit(10);
        
        if (error) throw error;
        if (data) setLeaderboardUsers(data);
      } catch (err) {
        console.warn("Supabase not configured or error fetching leaderboard:", err);
        setDbError(true);
      }
    }
    fetchLeaderboard();
  }, []);

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
          <button 
            onClick={() => setIsCurriculumOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            Syllabus
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
              <div className={`flex-shrink-0 flex items-center justify-between px-4 md:px-8 py-3 border-b transition-colors duration-300 ${isGauntletMode ? 'bg-red-950/20 border-red-500/30' : 'bg-[#050505]/50 border-white/5'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isGauntletMode ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-cyan-400'}`} />
                  <div>
                    <p className={`text-xs font-bold ${isGauntletMode ? 'text-red-400 uppercase tracking-widest' : 'text-white'}`}>
                      {isGauntletMode ? 'GAUNTLET ACTIVE' : `AI Mentor (${activeSkill.emoji})`}
                    </p>
                    <p className={`text-[10px] ${isGauntletMode ? 'text-red-400/50' : 'text-white/30'}`}>
                      {isGauntletMode ? 'Live Simulation: High Stress Event' : `Active · ${activeLesson}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsGauntletMode(!isGauntletMode)}
                    className={`px-3 py-1 text-[10px] font-bold rounded border uppercase tracking-wider transition-colors ${
                      isGauntletMode 
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30' 
                        : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {isGauntletMode ? 'Exit Simulation' : 'Enter Gauntlet'}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <ChatWindow messages={messages} isTyping={isTyping} />

              {/* Input */}
              <InputArea onSend={sendMessage} disabled={isTyping} />
            </div>
          )}

          {activeTab === "terminal" && (
            <div className="flex-1 w-full h-full overflow-hidden bg-[#151515] [&_.sp-wrapper]:h-full [&_.sp-layout]:h-full [&_.sp-layout]:flex-1 [&_.sp-layout]:border-none [&_.sp-layout]:rounded-none">
              <Sandpack 
                template="react" 
                theme="dark"
                options={{
                  showNavigator: true,
                  showLineNumbers: true,
                  showTabs: true,
                  closableTabs: true,
                  editorHeight: "100%",
                }}
                files={{
                  "/App.js": `import React from "react";\n\nexport default function App() {\n  return (\n    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#050505", color: "white", minHeight: "100vh" }}>\n      <h1 style={{ color: "#00f0ff" }}>Algeris Sandbox</h1>\n      <p>This is your live staging environment. Build your funnel here.</p>\n    </div>\n  );\n}`,
                }}
              />
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="flex flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl w-full mx-auto flex flex-col gap-8">
                
                {/* Streak Stake Module */}
                <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] flex items-center justify-between">
                  <div>
                    <h3 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">Your Streak Stake</h3>
                    <div className="text-3xl font-black text-white">$29.00 <span className="text-sm font-medium text-white/40">Locked</span></div>
                    <p className="text-xs text-white/40 mt-2">Maintain your daily progress for 30 days to reclaim your deposit.</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-white mb-2">12 / 30 <span className="text-sm text-white/40">Days</span></div>
                    <div className="w-48 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 w-[40%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    </div>
                  </div>
                </div>

                {/* Black Market Capital Pool */}
                <div>
                  <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-4 px-2">The Black Market Capital Pool</h3>
                  <div className="rounded-xl border border-white/5 overflow-hidden bg-[#050505]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 font-medium">Rank</th>
                          <th className="px-4 py-3 font-medium">Operative</th>
                          <th className="px-4 py-3 font-medium">Win Rate / Grade</th>
                          <th className="px-4 py-3 font-medium">Capital Unlocked</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        {/* If Supabase returns users, render them. Otherwise show mock data */}
                        {leaderboardUsers.length > 0 ? (
                          leaderboardUsers.map((user, index) => (
                            <tr key={user.id} className={index === 0 ? "bg-amber-500/5" : ""}>
                              <td className={`px-4 py-3 font-mono ${index === 0 ? "text-amber-400" : "text-white/40"}`}>
                                {(index + 1).toString().padStart(2, '0')}
                              </td>
                              <td className={`px-4 py-3 ${index === 0 ? "font-bold" : ""}`}>{user.username || "Anonymous Operative"}</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">{user.streak_count} Days</td>
                              <td className="px-4 py-3">
                                {user.capital_unlocked ? (
                                  <span className={`px-2 py-1 border rounded text-xs ${index === 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/20 font-bold" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                                    {user.capital_unlocked}
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 bg-white/5 text-white/40 border border-white/5 rounded text-xs">
                                    In Review
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr className="bg-amber-500/5">
                              <td className="px-4 py-3 font-mono text-amber-400">01</td>
                              <td className="px-4 py-3 font-bold">User_0x94 (You)</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">82.4% WR</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded text-xs font-bold">
                                  $1,000 Prop Firm
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-white/40">02</td>
                              <td className="px-4 py-3">Student_442</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">A+ Storefront</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-white/5 text-white/40 border border-white/5 rounded text-xs">
                                  In Review
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-white/40">03</td>
                              <td className="px-4 py-3">Echo_88</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">79.1% WR</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">
                                  Internal Agency
                                </span>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Curriculum Panel */}
      <CurriculumPanel
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        curriculum={activeSkill.curriculum}
        skillName={activeSkill.name}
      />

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
