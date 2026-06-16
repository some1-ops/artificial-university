"use client";

// ============================================================
// HeroSection.tsx — Full-viewport landing hero
// ============================================================

import Link from "next/link";
import { useEffect, useState } from "react";

const ROTATING_SKILLS = ["Forex Trading", "Web Design", "AI OFM", "Dropshipping", "YouTube Automation", "AI Integration", "Copywriting", "Growth Marketing"];

export default function HeroSection() {
  const [skillIndex, setSkillIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSkillIndex((i) => (i + 1) % ROTATING_SKILLS.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16">
      {/* Background: dot grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(57,255,20,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background: glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-neon/5 blur-3xl animate-pulse-slow [animation-delay:1.5s]" />

      {/* Pill badge */}
      <div className="relative z-10 mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold tracking-wide animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping-slow" />
        AI-Powered Skill Acquisition · 2026
      </div>

      {/* Headline */}
      <h1 className="relative z-10 text-center max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white animate-fade-up [animation-delay:0.1s]">
        Traditional School is{" "}
        <span className="text-neon [text-shadow:0_0_30px_rgba(57,255,20,0.5)]">Obsolete.</span>
        <br />
        Learn What Actually Matters.
      </h1>

      {/* Rotating skill line */}
      <div className="relative z-10 mt-6 flex items-center gap-3 animate-fade-up [animation-delay:0.2s]">
        <span className="text-white/40 text-lg md:text-xl font-medium">Currently teaching:</span>
        <span
          className="text-neon text-lg md:text-xl font-bold transition-opacity duration-300"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {ROTATING_SKILLS[skillIndex]}
        </span>
      </div>

      {/* Subheadline */}
      <p className="relative z-10 mt-6 text-center max-w-2xl text-base md:text-lg text-white/50 leading-relaxed animate-fade-up [animation-delay:0.25s]">
        Master high-income skills like web design, dropshipping, and AI integration simply by chatting with your
        personalized AI mentor. No boring lectures. No fluff. Just rapid skill building.
      </p>

      {/* CTA */}
      <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-up [animation-delay:0.35s]">
        <Link
          href="/skills"
          id="hero-cta-primary"
          className="group relative px-8 py-4 rounded-xl bg-neon text-black font-black text-base tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.6),0_0_80px_rgba(57,255,20,0.2)] active:scale-100"
        >
          Start Chatting. Start Earning.
          <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <a
          href="#how-it-works"
          className="text-white/40 text-sm font-medium hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5"
        >
          See how it works
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>

      {/* Social proof strip */}
      <div className="relative z-10 mt-14 flex items-center gap-6 animate-fade-up [animation-delay:0.45s]">
        <div className="flex -space-x-2">
          {["🧑‍💻", "👩‍🎨", "🧑‍💼", "👨‍🚀", "👩‍🔬"].map((emoji, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm"
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-white/40 text-sm">
          <span className="text-white font-semibold">2,847</span> learners already levelling up
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <div className="w-px h-8 bg-gradient-to-b from-neon/50 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-neon/50" />
      </div>
    </section>
  );
}
