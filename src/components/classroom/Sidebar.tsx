"use client";

// ============================================================
// Sidebar.tsx — Curriculum progress sidebar
// ============================================================

import { useState } from "react";
import { CURRICULUM, getOverallProgress, Module, Lesson } from "@/lib/mockData";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function LessonItem({ lesson }: { lesson: Lesson }) {
  const statusConfig = {
    completed: { icon: "✓", textColor: "text-white/50", iconColor: "text-neon", lineThrough: "line-through" },
    active: { icon: "●", textColor: "text-white", iconColor: "text-neon animate-pulse", lineThrough: "" },
    locked: { icon: "○", textColor: "text-white/25", iconColor: "text-white/15", lineThrough: "" },
  };

  const config = statusConfig[lesson.status];

  return (
    <li
      className={`flex items-center gap-2.5 py-1.5 px-3 rounded-md text-sm ${config.textColor} ${
        lesson.status === "active" ? "bg-neon/5 border border-neon/10" : ""
      }`}
    >
      <span className={`text-xs font-bold w-3 flex-shrink-0 ${config.iconColor}`}>{config.icon}</span>
      <span className={config.lineThrough}>{lesson.title}</span>
      {lesson.status === "active" && (
        <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-neon/20 text-neon border border-neon/20">
          Active
        </span>
      )}
    </li>
  );
}

function ModuleAccordion({ module }: { module: Module }) {
  const [isOpen, setIsOpen] = useState(module.isOpen);
  const completedCount = module.lessons.filter((l) => l.status === "completed").length;
  const hasActive = module.lessons.some((l) => l.status === "active");
  const allLocked = module.lessons.every((l) => l.status === "locked");

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        hasActive
          ? "border-neon/20 bg-neon/[0.03] shadow-[0_0_15px_rgba(57,255,20,0.05)]"
          : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
          allLocked ? "opacity-40 cursor-not-allowed" : "hover:bg-white/5"
        } rounded-xl`}
        disabled={allLocked}
      >
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span
            className={`text-xs font-semibold truncate ${hasActive ? "text-white" : "text-white/50"}`}
          >
            {module.title}
          </span>
          <span className="text-[10px] text-white/25">
            {completedCount}/{module.lessons.length} complete
          </span>
        </div>
        <svg
          className={`w-3.5 h-3.5 flex-shrink-0 ml-2 text-white/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !allLocked && (
        <ul className="px-3 pb-3 flex flex-col gap-0.5">
          {module.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const progress = getOverallProgress(CURRICULUM);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-40 md:z-auto
          w-72 flex flex-col gap-4 p-4
          bg-[#0d0d0d]/90 backdrop-blur-xl border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-2 pb-1">
          <div>
            <h2 className="text-sm font-bold text-white">Your Curriculum</h2>
            <p className="text-[11px] text-white/30 mt-0.5">Web Design Mastery</p>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40 font-medium">Overall Progress</span>
            <span className="text-neon font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-neon shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-white/20">
            {CURRICULUM.flatMap((m) => m.lessons).filter((l) => l.status === "completed").length} of{" "}
            {CURRICULUM.flatMap((m) => m.lessons).length} lessons complete
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Module list */}
        <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-0.5 scrollbar-thin">
          {CURRICULUM.map((module) => (
            <ModuleAccordion key={module.id} module={module} />
          ))}
        </div>

        {/* Certificate progress teaser */}
        <div className="rounded-xl bg-neon/5 border border-neon/15 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-neon text-base">🏆</span>
            <span className="text-xs font-bold text-white">Certificate in progress</span>
          </div>
          <p className="text-[10px] text-white/30 leading-relaxed">
            Complete all modules to earn your verifiable Web Design certificate.
          </p>
          <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-neon/40" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </aside>
    </>
  );
}
