"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function ProfileContent() {
  const [userData, setUserData] = useState({
    username: "User_0x94",
    email: "operative@algeris.com",
    streak: 12,
    capitalUnlocked: "$1,000 Prop Firm",
    gauntletWinRate: "82.4%",
    isRuthlessProtocolActive: true,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from Supabase
    async function fetchUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("username, streak_count, capital_unlocked, email")
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setUserData((prev) => ({
            ...prev,
            username: data.username || prev.username,
            email: data.email || user.email || prev.email,
            streak: data.streak_count || prev.streak,
            capitalUnlocked: data.capital_unlocked || "In Review",
          }));
        }
      } catch (error) {
        console.warn("Using mock profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* ── Top Bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 h-16 border-b border-white/5 bg-[#0a0a0c] z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/skills" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center transition-all duration-200 group-hover:border-cyan-500/50">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-xs">AU</span>
            </div>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <h1 className="text-sm font-bold uppercase tracking-widest text-white/80 hidden sm:block">Operative Dossier</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/classroom" className="px-4 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-200">
            Return to Arena
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-12">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0a0a0c] to-black border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <span className="text-2xl font-black text-white/80">{userData.username.charAt(0).toUpperCase()}</span>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Active Operative</p>
              <h2 className="text-3xl font-black tracking-tight">{userData.username}</h2>
              <p className="text-sm text-white/40 mt-1">Recruited: Just now</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 text-sm font-bold">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Manage Subscription (Paystack)
          </button>
        </section>

        {/* Metrics Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak Stake */}
          <div className="p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-amber-400 font-bold uppercase tracking-widest text-[10px] mb-2 relative z-10">Streak Stake</h3>
            <div className="flex items-end justify-between relative z-10">
              <div className="text-4xl font-black text-white">{userData.streak} <span className="text-lg text-white/30 font-medium">Days</span></div>
              <div className="text-right">
                <div className="text-lg font-bold text-amber-400">$29.00</div>
                <div className="text-[10px] text-amber-400/50 uppercase tracking-widest">Locked Capital</div>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 mt-6 overflow-hidden relative z-10">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                style={{ width: `${Math.min((userData.streak / 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Capital Unlocked */}
          <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-2 relative z-10">Black Market Access</h3>
            <div className="text-2xl md:text-3xl font-black text-white mt-4 relative z-10">{userData.capitalUnlocked}</div>
            <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest relative z-10">Highest Funding Tier</p>
          </div>

          {/* Gauntlet Win Rate */}
          <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-red-400 font-bold uppercase tracking-widest text-[10px] mb-2 relative z-10">Gauntlet Win-Rate</h3>
            <div className="text-4xl font-black text-white mt-2 relative z-10">{userData.gauntletWinRate}</div>
            <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest relative z-10">Overall Performance</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Certifications Grid */}
          <section className="lg:col-span-2">
            <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-4 px-2">Certifications & Clearances</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "AI OFM Identity Generation", status: "Certified", color: "emerald" },
                { name: "SaaS Web Design Sandbox", status: "In Progress", color: "amber" },
                { name: "Axis Trading Algorithms", status: "Locked", color: "white" },
                { name: "High-Ticket Client Acquisition", status: "Locked", color: "white" },
              ].map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      cert.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                      cert.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                      'bg-white/5 border-white/10 text-white/30'
                    }`}>
                      {cert.color === 'emerald' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                      {cert.color === 'amber' && (
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                      )}
                      {cert.color === 'white' && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-medium ${cert.color === 'white' ? 'text-white/40' : 'text-white/90'}`}>{cert.name}</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    cert.color === 'emerald' ? 'text-emerald-400' :
                    cert.color === 'amber' ? 'text-amber-400' :
                    'text-white/20'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Settings / Protocols */}
          <section className="lg:col-span-1">
            <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-4 px-2">Account Protocols</h3>
            
            <div className="flex flex-col gap-4">
              {/* Ruthless Accountability Toggle */}
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-red-400 font-bold text-sm">Ruthless Accountability</h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-relaxed">Opt-in to aggressive SMS/Email roasts when you skip a day. Money is on the line.</p>
                  </div>
                  <button 
                    onClick={() => setUserData(prev => ({ ...prev, isRuthlessProtocolActive: !prev.isRuthlessProtocolActive }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${userData.isRuthlessProtocolActive ? 'bg-red-500' : 'bg-white/10'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${userData.isRuthlessProtocolActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                {userData.isRuthlessProtocolActive && (
                  <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-xs text-red-400/80 font-mono">STATUS: ACTIVE. DO NOT GHOST US.</p>
                  </div>
                )}
              </div>

              {/* Basic Settings */}
              <div className="p-5 rounded-xl bg-[#0a0a0c] border border-white/5 flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-sm text-white/80">{userData.email}</span>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">Edit</button>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5"></div>
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Password</label>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-sm text-white/40">••••••••••••</span>
                    <button 
                      onClick={async () => {
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        window.location.href = '/auth';
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-bold tracking-widest uppercase"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-lg">AU</span>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Loading Dossier...</span>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
