"use client";

// ============================================================
// Navbar.tsx — Landing page glassmorphism navigation bar
// ============================================================

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 glass-panel border-x-0 border-t-0">
      {/* Logo + Wordmark */}
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/30 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="text-gradient font-black text-sm tracking-tighter">AU</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-tight group-hover:text-white/80 transition-colors">artificial university</span>
          <span className="text-white/30 text-[10px] tracking-widest uppercase">by Algeris</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
        <Link href="/#how-it-works" className="hover:text-white transition-colors duration-200">
          How It Works
        </Link>
        <Link href="/skills" className="hover:text-white transition-colors duration-200">
          Skills
        </Link>
        <Link href="/pricing" className="hover:text-white transition-colors duration-200">
          Pricing
        </Link>
      </div>

      {/* CTA */}
      <Link
        href="/skills"
        className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-cyan-md"
      >
        <span className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">Enter Classroom</span>
        <svg
          className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-all duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </nav>
  );
}
