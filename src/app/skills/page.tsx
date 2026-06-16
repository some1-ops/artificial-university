"use client";

// ============================================================
// Skills Page — /skills
// ============================================================

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
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
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neon bg-neon/10 border border-neon/20 animate-fade-up">
            High-Income Skill Sets
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white animate-fade-up [animation-delay:0.1s]">
            Skip the Lectures. <br />
            <span className="text-neon [text-shadow:0_0_20px_rgba(57,255,20,0.4)]">Pick Your System.</span>
          </h1>
          <p className="text-white/40 max-w-xl text-sm md:text-base leading-relaxed animate-fade-up [animation-delay:0.2s]">
            These are not academic courses. They are practical, step-by-step systems designed to get you from $0 to $10k/month. Select a skill to configure your AI mentor.
          </p>
        </div>
      </section>

      {/* Catalog controls & grid */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-6 pb-24 relative z-10">
        
        {/* Controls: Search + Categories */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-100 ${
                  selectedCategory === category
                    ? "bg-neon text-black font-black shadow-[0_0_20px_rgba(57,255,20,0.3)]"
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
              placeholder="Search high-income skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300"
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
              className="mt-6 px-4 py-2 rounded-lg bg-neon/10 border border-neon/20 text-neon text-xs font-bold hover:bg-neon/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-neon/30 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(57,255,20,0.05)]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Top Section */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-2xl text-neon transition-all duration-300 group-hover:bg-neon/20">
                    {skill.emoji}
                  </div>
                  {/* Category Tag */}
                  <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-white/5 text-white/40 border border-white/5">
                    {skill.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-neon transition-colors duration-300">
                  {skill.name}
                </h2>
                
                <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-3">
                  {skill.shortDescription}
                </p>

                {/* Micro metrics */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6 text-xs">
                  <div>
                    <span className="block text-white/20 text-[10px] uppercase font-bold tracking-wider">Salary Potential</span>
                    <span className="text-neon font-bold mt-0.5 block">{skill.salaryPotential}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[10px] uppercase font-bold tracking-wider">Duration</span>
                    <span className="text-white/80 font-semibold mt-0.5 block">{skill.duration} · {skill.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                <button
                  onClick={() => setActiveModalSkill(skill)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 cursor-pointer"
                >
                  View Syllabus Outline
                </button>
                <Link
                  href={`/classroom?skill=${skill.id}`}
                  className="w-full py-3 rounded-xl bg-neon/10 group-hover:bg-neon text-neon group-hover:text-black font-black text-xs text-center border border-neon/30 group-hover:border-neon transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] active:scale-[0.98]"
                >
                  Configure AI Mentor
                </Link>
              </div>
            </div>
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
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_12px_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] animate-fade-up">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-start justify-between">
              <div className="flex gap-4 items-center">
                <span className="text-4xl">{activeModalSkill.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{activeModalSkill.name}</h3>
                  <p className="text-[10px] text-neon font-bold tracking-widest uppercase mt-0.5">{activeModalSkill.category} PATHWAY</p>
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
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Pathway Overview</h4>
                <p className="text-white/60 text-sm leading-relaxed">{activeModalSkill.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Est. Earnings</span>
                  <span className="text-neon text-sm font-black mt-1 block">{activeModalSkill.salaryPotential}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Duration</span>
                  <span className="text-white text-sm font-bold mt-1 block">{activeModalSkill.duration}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/30 uppercase font-bold tracking-widest">Difficulty</span>
                  <span className="text-white text-sm font-bold mt-1 block">{activeModalSkill.difficulty}</span>
                </div>
              </div>

              {/* Modules List */}
              <div>
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Curriculum Modules</h4>
                <div className="flex flex-col gap-4">
                  {activeModalSkill.curriculum.map((mod, i) => (
                    <div key={mod.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white">{mod.title}</span>
                        <span className="text-[10px] text-white/35">{mod.lessons.length} lessons</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {mod.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center gap-2.5 text-xs text-white/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/10 shrink-0" />
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
            <div className="p-6 border-t border-white/5 bg-black/30 flex items-center justify-between gap-4">
              <span className="text-xs text-white/30">Fully auto-graded & certified.</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModalSkill(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <Link
                  href={`/classroom?skill=${activeModalSkill.id}`}
                  className="px-6 py-2.5 rounded-xl bg-neon text-black font-black text-xs hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300"
                >
                  Launch Classroom
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
