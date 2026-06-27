"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CurriculumPanel from "@/components/classroom/CurriculumPanel";
import ChatWindow from "@/components/classroom/ChatWindow";
import InputArea from "@/components/classroom/InputArea";
import AchievementToast from "@/components/classroom/AchievementToast";
import { useChat } from "@/hooks/useChat";
import { SKILLS_DATA } from "@/lib/skillsData";
import { Sandpack } from "@codesandbox/sandpack-react";
import { createClient } from "@/lib/supabase/client";
import KtlGauntlet from "@/components/classroom/KtlGauntlet";

interface LeaderboardUser {
  id: string;
  username: string;
  streak_count: number;
  capital_unlocked: string | null;
  stake_locked: number;
  elo_rating?: number;
}

function PaystackModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm bg-[#0d0d0f] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          ✕
        </button>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded bg-cyan-500 flex items-center justify-center text-black font-black text-xs">P</div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-400">Paystack Secured Gateway</span>
        </div>

        {isCompleted ? (
          <div className="py-8 text-center flex flex-col items-center gap-3 animate-fade-up">
            <span className="text-4xl">✅</span>
            <h4 className="text-sm font-bold text-emerald-400">Staking Hold Authorized</h4>
            <p className="text-[10px] text-white/40">Your $10 commitment hold is locked in the contract.</p>
          </div>
        ) : isProcessing ? (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
            <p className="text-xs text-white/60">Securing auth hold on Paystack API...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Streak Stake Lock</h3>
              <p className="text-[10px] text-white/40 mt-1 leading-relaxed">Lock a $10 commitment stake. Maintain your streak for 30 days to release the hold, or break it to forfeit it to the community pool.</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Card Number</label>
              <input
                type="text"
                placeholder="4000 1234 5678 9010"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Expiration</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={!cardNumber || !expiry || !cvv}
              className="mt-2 w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/5 disabled:text-white/20 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
            >
              Stake $10.00
            </button>
          </div>
        )}
      </div>
    </div>
  );
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
  const [currentUserInitial, setCurrentUserInitial] = useState("U");
  const [communityPool, setCommunityPool] = useState(1430.00);

  // Staging Subdomain Storing
  const [stagingUrl, setStagingUrl] = useState("https://operative.algeris-sandbox.com");

  // User DB States
  const [userProfile, setUserProfile] = useState<{
    id: string;
    username: string;
    email: string;
    streak_count: number;
    stake_locked: number;
    stake_status: string;
    capital_unlocked: string | null;
    prop_challenge_wins: number;
    prop_challenge_total: number;
    elo_rating: number;
  } | null>(null);

  // Paystack Modal State
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  const { messages, isTyping, sendMessage, showAchievement, dismissAchievement } = useChat(activeSkill.id, isGauntletMode);

  // Fetch user profile and leaderboard
  async function fetchProfileAndLeaderboard() {
    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('id, username, email, streak_count, stake_locked, stake_status, capital_unlocked, prop_challenge_wins, prop_challenge_total, elo_rating')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile({
            id: profile.id,
            username: profile.username || "User_0x94",
            email: profile.email || user.email || "",
            streak_count: profile.streak_count ?? 0,
            stake_locked: Number(profile.stake_locked ?? 0),
            stake_status: profile.stake_status || "idle",
            capital_unlocked: profile.capital_unlocked || null,
            prop_challenge_wins: profile.prop_challenge_wins ?? 0,
            prop_challenge_total: profile.prop_challenge_total ?? 0,
            elo_rating: profile.elo_rating ?? 1000,
          });
          setCurrentUserInitial((profile.username || "U").charAt(0).toUpperCase());
          setStagingUrl(`https://${(profile.username || "operative").toLowerCase().replace(/[^a-z0-9]/g, "")}.algeris-sandbox.com`);
        }
      }

      // Fetch leaderboard
      const { data: leaderboard, error } = await supabase
        .from("users")
        .select("id, username, streak_count, capital_unlocked, stake_locked, elo_rating")
        .order("streak_count", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      if (leaderboard) setLeaderboardUsers(leaderboard);

      // Fetch platform community pool
      const { data: stats } = await supabase.from("platform_stats").select("community_pool").single();
      if (stats?.community_pool) {
        setCommunityPool(Number(stats.community_pool));
      }
    } catch (err) {
      console.warn("Supabase load error or not configured:", err);
      setDbError(true);
    }
  }

  useEffect(() => {
    fetchProfileAndLeaderboard();
  }, [skillId]);

  // Handle Paystack payment completion
  const handlePaystackSuccess = async () => {
    if (!userProfile) return;
    try {
      const supabase = createClient();
      const newStake = 10.00;
      const { error } = await supabase
        .from("users")
        .update({
          stake_locked: newStake,
          stake_status: "locked",
        })
        .eq("id", userProfile.id);

      if (error) throw error;
      fetchProfileAndLeaderboard();
    } catch (err) {
      console.error("Failed to update stake locked:", err);
    }
  };

  // Handle Forex Gauntlet Success
  const handleGauntletSuccess = async () => {
    if (!userProfile) return;
    try {
      const supabase = createClient();
      const nextWins = userProfile.prop_challenge_wins + 1;
      const nextTotal = userProfile.prop_challenge_total + 1;
      const winRate = (nextWins / nextTotal) * 100;
      const unlockCapital = winRate >= 70 && nextTotal >= 1 // simplified check for demo
        ? "$1,000 Prop Firm"
        : userProfile.capital_unlocked;

      const { error } = await supabase
        .from("users")
        .update({
          prop_challenge_wins: nextWins,
          prop_challenge_total: nextTotal,
          capital_unlocked: unlockCapital,
          elo_rating: userProfile.elo_rating + 50, // bonus ELO for passing gauntlet
        })
        .eq("id", userProfile.id);

      if (error) throw error;
      
      sendMessage("GAUNTLET COMPLETED. The trade executed flawlessly. I mapped the KTL Axis.");
      setIsGauntletMode(false);
      fetchProfileAndLeaderboard();
    } catch (err) {
      console.error("Failed to update gauntlet status:", err);
    }
  };

  // Handle Forex Gauntlet Failure
  const handleGauntletFailure = async () => {
    if (!userProfile) return;
    try {
      const supabase = createClient();
      const nextTotal = userProfile.prop_challenge_total + 1;
      const { error } = await supabase
        .from("users")
        .update({
          prop_challenge_total: nextTotal,
          elo_rating: Math.max(800, userProfile.elo_rating - 30),
        })
        .eq("id", userProfile.id);

      if (error) throw error;

      sendMessage("GAUNTLET FAILED. Margin Call triggered. My account was blown.");
      setIsGauntletMode(false);
      fetchProfileAndLeaderboard();
    } catch (err) {
      console.error("Failed to update gauntlet failure status:", err);
    }
  };

  // Helper to extract the last code block in messages
  const getLastCodeBlock = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const content = messages[i].content;
      const match = content.match(/```(?:html|jsx|tsx|css|javascript|js)?\n([\s\S]*?)```/);
      if (match) return match[1];
    }
    return null;
  };

  const code = getLastCodeBlock();
  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { background: #050505; color: #fff; margin: 0; padding: 0; min-height: 100vh; font-family: system-ui, sans-serif; }
        </style>
      </head>
      <body class="bg-neutral-950 text-white min-h-screen">
        ${
          code
            ? code
            : `
          <div class="h-screen flex flex-col justify-center items-center p-6 text-center">
            <h1 class="text-3xl font-black text-cyan-400 mb-2">Algeris Sandbox</h1>
            <p class="text-white/40 max-w-sm text-xs leading-relaxed">Staging wildcard server running. Ask the AI mentor in the chat to generate HTML/Tailwind templates and see them render instantly here.</p>
          </div>
          `
        }
      </body>
    </html>
  `;

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
          <Link href="/profile" className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer">
            {currentUserInitial}
          </Link>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Tabs (Replacing Sidebar) */}
        <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-[#050505] flex flex-col p-4 gap-2">
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2 mt-2">Command Center</h2>
          <button 
            onClick={() => setActiveTab("arena")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border w-full text-left cursor-pointer ${
              activeTab === "arena" 
                ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10 text-white"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "arena" ? "text-cyan-400" : "text-white/70"}`}>The Arena</span>
            <span className="text-[10px] text-white/40 mt-1">Core AI conversational skill stream</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("terminal")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border w-full text-left cursor-pointer ${
              activeTab === "terminal" 
                ? "bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_rgba(138,43,226,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10 text-white"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "terminal" ? "text-violet-400" : "text-white/70"}`}>The Terminal</span>
            <span className="text-[10px] text-white/40 mt-1">Live coding sandbox & automated assets</span>
          </button>

          <button 
            onClick={() => setActiveTab("leaderboard")}
            className={`flex flex-col items-start p-3 rounded-xl transition-all duration-200 border w-full text-left cursor-pointer ${
              activeTab === "leaderboard" 
                ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                : "border-transparent hover:bg-white/5 hover:border-white/10 text-white"
            }`}
          >
            <span className={`text-sm font-bold ${activeTab === "leaderboard" ? "text-amber-400" : "text-white/70"}`}>The Leaderboard</span>
            <span className="text-[10px] text-white/40 mt-1">Active streaks & unlocked funding tiers</span>
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
              <span><span className="text-cyan-300 font-bold">LIVE:</span> User_0x94 just passed The Gauntlet (AI OFM Niche Validation)</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Student_442 unlocked $100 Dropshipping Seed Capital</span>
              <span className="text-cyan-500/30">///</span>
              <span><span className="text-cyan-300 font-bold">LIVE:</span> Axis Model Trade verified (+3.2% gain)</span>
            </div>
          </div>

          {activeTab === "arena" && (
            <div className="flex flex-1 overflow-hidden">
              
              {/* Left Side: Conversational Stream */}
              <div className="flex flex-col flex-1 overflow-hidden border-r border-white/5">
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
                      className={`px-3 py-1 text-[10px] font-bold rounded border uppercase tracking-wider transition-colors cursor-pointer ${
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

              {/* Right Side: Contextual Sandbox/Chart Panels */}
              {/* Web Design Path Preview */}
              {activeSkill.id === "web-design" && (
                <div className="w-1/2 hidden lg:flex flex-col bg-[#050508] overflow-hidden">
                  <div className="h-12 border-b border-white/5 px-4 flex items-center justify-between bg-[#0b0b0e]">
                    <div className="flex items-center gap-2 w-full max-w-xs bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-[10px] text-white/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="truncate">{stagingUrl}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(stagingUrl);
                        alert("wildcard subdomain copied!");
                      }}
                      className="px-2.5 py-1 text-[9px] font-bold bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 rounded transition-colors cursor-pointer"
                    >
                      Copy link
                    </button>
                  </div>
                  <div className="flex-1 w-full bg-[#111]">
                    <iframe
                      srcDoc={iframeSrcDoc}
                      className="w-full h-full border-none"
                      title="Algeris Live Sandbox"
                    />
                  </div>
                </div>
              )}

              {/* Forex Path KTL Gauntlet Live Chart */}
              {activeSkill.id === "forex" && isGauntletMode && (
                <div className="w-1/2 hidden lg:block">
                  <KtlGauntlet
                    onSuccess={handleGauntletSuccess}
                    onFailure={handleGauntletFailure}
                    onClose={() => setIsGauntletMode(false)}
                  />
                </div>
              )}

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
                <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">Your Streak Stake</h3>
                    {userProfile?.stake_status === "locked" ? (
                      <>
                        <div className="text-3xl font-black text-white">${Number(userProfile?.stake_locked || 0).toFixed(2)} <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded ml-2">Locked</span></div>
                        <p className="text-xs text-white/40 mt-2">Maintain your daily progress for 30 days to reclaim your deposit. If you break it, capital forfeits.</p>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-black text-white/30">$0.00 <span className="text-xs font-bold text-white/20 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded ml-2">Idle</span></div>
                        <p className="text-xs text-white/40 mt-2">Lock a commitment hold to secure discipline stakes via Paystack.</p>
                        <button
                          onClick={() => setIsPaystackOpen(true)}
                          className="mt-3 px-4 py-2 bg-amber-500 text-black text-xs font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all cursor-pointer"
                        >
                          Lock $10 Streak Hold
                        </button>
                      </>
                    )}
                  </div>
                  
                  {userProfile?.stake_status === "locked" && (
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-white mb-2">{userProfile?.streak_count || 0} / 30 <span className="text-sm text-white/40">Days</span></div>
                      <div className="w-48 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                          style={{ width: `${Math.min(((userProfile?.streak_count || 0) / 30) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Black Market Capital Pool */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prop Challenge Win Rate */}
                  <div className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0c]">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Prop Challenge Win Rate</span>
                    <div className="text-3xl font-black mt-2 text-white">
                      {userProfile && userProfile.prop_challenge_total > 0
                        ? `${((userProfile.prop_challenge_wins / userProfile.prop_challenge_total) * 100).toFixed(1)}%`
                        : "0%"}
                    </div>
                    <p className="text-xs text-white/40 mt-1">Wins: {userProfile?.prop_challenge_wins || 0} / {userProfile?.prop_challenge_total || 0}</p>
                    <div className="mt-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span className="text-[10px] text-cyan-400 uppercase font-mono">Target: 70% Win Rate</span>
                    </div>
                  </div>

                  {/* Elo Rating */}
                  <div className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0c]">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Elo Rating</span>
                    <div className="text-3xl font-black mt-2 text-white">
                      {userProfile?.elo_rating || 1000}
                    </div>
                    <p className="text-xs text-white/40 mt-1">Based on Gauntlet pass rate</p>
                    <div className="mt-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                      <span className="text-[10px] text-violet-400 uppercase font-mono">Top 1% Threshold: 1200 ELO</span>
                    </div>
                  </div>

                  {/* Community Pool */}
                  <div className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0c]">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Platform Community Pool</span>
                    <div className="text-3xl font-black mt-2 text-emerald-400">
                      ${communityPool.toFixed(2)}
                    </div>
                    <p className="text-xs text-white/40 mt-1">Forfeits distributed to top operators</p>
                    <div className="mt-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-[10px] text-emerald-400 uppercase font-mono">Status: Accumulating</span>
                    </div>
                  </div>
                </div>

                {/* Inner Circle Webhook / Telegram Banner */}
                {userProfile && userProfile.elo_rating >= 1200 && (
                  <div className="p-6 rounded-2xl border border-violet-500/30 bg-violet-950/15 relative overflow-hidden group shadow-[0_0_20px_rgba(138,43,226,0.15)] animate-fade-up">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-violet-500 text-white uppercase tracking-widest">Authorized Access</span>
                        <h4 className="text-lg font-black text-white mt-1">You unlocked the Algeris Inner Circle</h4>
                        <p className="text-xs text-white/60 mt-1">Welcome to the top 1%. Join the secure channel to receive agency work overflows.</p>
                      </div>
                      <a
                        href="https://t.me/joinchat/placeholder-algeris-inner-circle"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(138,43,226,0.4)]"
                      >
                        Enter Telegram Channel
                      </a>
                    </div>
                  </div>
                )}

                {/* Leaderboard Grid */}
                <div>
                  <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-4 px-2">Global Leaderboard</h3>
                  <div className="rounded-xl border border-white/5 overflow-hidden bg-[#050505]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 font-medium">Rank</th>
                          <th className="px-4 py-3 font-medium">Operative</th>
                          <th className="px-4 py-3 font-medium">Elo</th>
                          <th className="px-4 py-3 font-medium">Streak Count</th>
                          <th className="px-4 py-3 font-medium">Capital Unlocked</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        {/* Current User in Table */}
                        {userProfile && (
                          <tr className="bg-cyan-500/5 border-l-2 border-cyan-400">
                            <td className="px-4 py-3 font-mono text-cyan-400">YOURS</td>
                            <td className="px-4 py-3 font-bold text-cyan-300">{userProfile.username}</td>
                            <td className="px-4 py-3 font-mono text-white/60">{userProfile.elo_rating}</td>
                            <td className="px-4 py-3 font-mono text-emerald-400">{userProfile.streak_count} Days</td>
                            <td className="px-4 py-3">
                              {userProfile.capital_unlocked ? (
                                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded text-xs font-bold">
                                  {userProfile.capital_unlocked}
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-white/5 text-white/40 border border-white/5 rounded text-xs">
                                  In Review
                                </span>
                              )}
                            </td>
                          </tr>
                        )}

                        {/* Top Users */}
                        {leaderboardUsers.length > 0 ? (
                          leaderboardUsers.map((user, index) => (
                            <tr key={user.id} className={user.id === userProfile?.id ? "bg-cyan-500/5" : ""}>
                              <td className={`px-4 py-3 font-mono ${index === 0 ? "text-amber-400 font-bold" : "text-white/40"}`}>
                                {(index + 1).toString().padStart(2, '0')}
                              </td>
                              <td className={`px-4 py-3 ${index === 0 ? "font-bold text-amber-300" : ""}`}>{user.username || "Anonymous Operative"}</td>
                              <td className="px-4 py-3 font-mono text-white/40">{user.elo_rating || 1000}</td>
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
                            <tr>
                              <td className="px-4 py-3 font-mono text-amber-400">01</td>
                              <td className="px-4 py-3 font-bold">User_0x94</td>
                              <td className="px-4 py-3 font-mono">1250</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">35 Days</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded text-xs font-bold">
                                  $1,000 Prop Firm
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-white/40">02</td>
                              <td className="px-4 py-3">Student_442</td>
                              <td className="px-4 py-3 font-mono">1180</td>
                              <td className="px-4 py-3 font-mono text-emerald-400">22 Days</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-white/5 text-white/40 border border-white/5 rounded text-xs">
                                  In Review
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

      {/* Paystack Staking Modal */}
      <PaystackModal
        isOpen={isPaystackOpen}
        onClose={() => setIsPaystackOpen(false)}
        onSuccess={handlePaystackSuccess}
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
