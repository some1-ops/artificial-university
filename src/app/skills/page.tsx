"use client";

// ============================================================
// Skills Page — /skills
// ============================================================

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FluidGridBackground from "@/components/landing/FluidGridBackground";
import TiltSkillCard from "@/components/landing/TiltSkillCard";
import { SKILLS_DATA, Skill } from "@/lib/skillsData";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalSkill, setActiveModalSkill] = useState<Skill | null>(null);

  const categories = ["All", "Finance", "Creator", "Development", "Business", "Automation", "Marketing", "Writing"];

  // Filter skills based on category and search query
  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] text-white relative overflow-hidden">
      {/* 3D WebGL Fluid Wave Canvas */}
      <FluidGridBackground />

      <Navbar />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00FF66]/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/20 animate-fade-up">
            SYSTEM CATALOG: ONLINE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white animate-fade-up [animation-delay:0.1s]">
            Pick Your System. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00E5FF] animate-gradient-x bg-[length:200%_auto]">Deploy Your Staging Sandbox.</span>
          </h1>
          <p className="text-white/40 max-w-xl text-xs md:text-sm leading-relaxed animate-fade-up [animation-delay:0.2s]">
            Traditional course models are obsolete. Choose a high-income pathway to compile active development environments, interact with sandbox rigs, and clear simulated gauntlet stress tests.
          </p>
        </div>
      </section>

      {/* Catalog controls & grid */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-6 pb-24 relative z-10">
        
        {/* Controls: Search + Categories */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-[#0d0d0f]/50 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-100 ${
                  selectedCategory === category
                    ? "bg-[#00FF66] text-black font-black shadow-[0_0_20px_rgba(0,255,102,0.3)]"
                    : "bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search active pathways..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00FF66]/50 focus:shadow-[0_0_15px_rgba(0,255,102,0.15)] transition-all duration-300"
            />
            <svg
              className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-4 text-lg font-bold text-white">No skills found</h3>
            <p className="mt-2 text-white/40 text-sm max-w-xs mx-auto">
              We couldn&apos;t find any skills matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 px-4 py-2 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 text-[#00FF66] text-xs font-bold hover:bg-[#00FF66]/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredSkills.map((skill, index) => (
            <TiltSkillCard
              key={skill.id}
              skill={skill}
              index={index}
              onViewSyllabus={setActiveModalSkill}
            />
          ))}
        </div>
      </section>

      {/* Syllabus Modal */}
      {activeModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveModalSkill(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-[#050505]/95 border border-[#00FF66]/20 rounded-2xl overflow-hidden shadow-[0_12px_50px_rgba(0,0,0,0.9)] flex flex-col max-h-[85vh] animate-fade-up">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-start justify-between bg-[#0d0d0f]/50">
              <div className="flex gap-4 items-center">
                <span className="text-4xl">{activeModalSkill.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{activeModalSkill.name}</h3>
                  <p className="text-[9px] text-[#00FF66] font-bold tracking-widest uppercase mt-0.5">{activeModalSkill.category} PATHWAY</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalSkill(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 scrollbar-thin">
              <div>
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Pathway Overview</h4>
                <p className="text-white/60 text-sm leading-relaxed">{activeModalSkill.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Est. Earnings</span>
                  <span className="text-[#00FF66] text-sm font-black mt-1 block">{activeModalSkill.salaryPotential}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Duration</span>
                  <span className="text-white text-sm font-bold mt-1 block">{activeModalSkill.duration}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Difficulty</span>
                  <span className="text-[#00E5FF] text-sm font-bold mt-1 block">{activeModalSkill.difficulty}</span>
                </div>
              </div>

              {/* Unlocked Infrastructure Spec */}
              <div className="flex flex-col gap-3.5 p-5 rounded-xl bg-[#00FF66]/5 border border-[#00FF66]/20 font-mono text-[11px] leading-relaxed text-white/80">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
                  <span className="text-[#00FF66] font-black uppercase tracking-wider">UNLOCKED INFRASTRUCTURE CAPABILITIES</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                </div>
                {activeModalSkill.sandboxSpec && (
                  <div>
                    <span className="text-[#00E5FF] font-bold uppercase block tracking-widest text-[9px] mb-0.5">THE SANDBOX CONFIG</span>
                    <span>{activeModalSkill.sandboxSpec}</span>
                  </div>
                )}
                {activeModalSkill.gauntletSpec && (
                  <div className="mt-2">
                    <span className="text-[#00FF66] font-bold uppercase block tracking-widest text-[9px] mb-0.5">THE GAUNTLET STRESS-TEST</span>
                    <span>{activeModalSkill.gauntletSpec}</span>
                  </div>
                )}
                {activeModalSkill.capitalSpec && (
                  <div className="mt-2">
                    <span className="text-amber-400 font-bold uppercase block tracking-widest text-[9px] mb-0.5">ALGERIS CAPITAL POOL SCALE</span>
                    <span>{activeModalSkill.capitalSpec}</span>
                  </div>
                )}
              </div>

              {/* Modules List */}
              <div>
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Curriculum Syllabus</h4>
                <div className="flex flex-col gap-4">
                  {activeModalSkill.curriculum.map((mod) => (
                    <div key={mod.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <span className="text-sm font-bold text-white">{mod.title}</span>
                        <span className="text-[9px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-2 py-0.5 rounded uppercase">{mod.lessons.length} Nodes</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {mod.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center gap-2.5 text-xs text-white/50">
                            <span className="w-1 h-1.5 bg-[#00FF66] shrink-0" />
                            <span>{lesson.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-black/40 flex items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-[#00FF66]/80">STATUS: INTERACTIVE RIG READY</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModalSkill(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <Link
                  href={`/classroom?skill=${activeModalSkill.id}`}
                  className="px-6 py-2.5 rounded-xl bg-[#00FF66] text-black font-black text-xs hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:scale-105 transition-all duration-300"
                >
                  Grind System
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
