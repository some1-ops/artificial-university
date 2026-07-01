"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    }
    checkSession();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 h-16 bg-[#0d0d0f]/80 border-b border-white/5 backdrop-blur-md">
      {/* Logo + Wordmark */}
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-[#00FF66]/10 border border-[#00FF66]/30 transition-all duration-300 group-hover:border-[#00FF66] group-hover:shadow-[0_0_15px_rgba(0,255,102,0.2)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00FF66] to-[#00E5FF] font-black text-sm tracking-tighter">AU</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00FF66] animate-ping-slow shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-tight group-hover:text-white/80 transition-colors">artificial university</span>
          <span className="text-white/30 text-[10px] tracking-widest uppercase">by Algeris</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-widest text-white/50">
        <Link href="/#how-it-works" className="hover:text-white transition-colors duration-200">
          How It Works
        </Link>
        <Link href="/skills" className="hover:text-[#00FF66] text-white transition-colors duration-200">
          Skills Matrix
        </Link>
        <Link href="/classroom" className="hover:text-white transition-colors duration-200">
          The Terminal
        </Link>
        <Link href="/classroom" className="hover:text-white transition-colors duration-200">
          Leaderboards
        </Link>
        <Link href="/profile" className="hover:text-white transition-colors duration-200">
          Operative Dossier
        </Link>
      </div>

      {/* CTA + System status */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FF66]/5 border border-[#00FF66]/20 font-mono text-[9px] tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]"></span>
          <span className="text-[#00FF66] font-bold uppercase">SYSTEM STATUS: ONLINE</span>
          <span className="text-white/20">|</span>
          <span className="text-white/50 uppercase">342 Operatives Sandboxed</span>
        </div>

        {isAuthenticated === false && (
          <Link href="/auth" className="hidden md:block text-xs font-bold text-white/50 hover:text-white tracking-widest uppercase transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
