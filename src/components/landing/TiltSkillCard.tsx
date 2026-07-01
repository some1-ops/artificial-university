"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Skill } from "@/lib/skillsData";

interface TiltSkillCardProps {
  skill: Skill;
  index: number;
  onViewSyllabus: (skill: Skill) => void;
}

export default function TiltSkillCard({ skill, index, onViewSyllabus }: TiltSkillCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  // Sample console logs matching technical specs
  const terminalLogs: Record<string, string[]> = {
    "forex-trading": [
      "SYSTEM: Connecting to TradingView raw feed...",
      "API: Fetching live ticks EURUSD (0.4ms latency)",
      "GRID: Rendering low-poly wicks mapping array",
      "KTL: Listening to Asian session midline [1.0950]",
      "INFRA: Staging subdomain auth key verified",
      "SECURE: Prop challenge scaling pool: ACTIVE ($10k)",
      "STATUS: Ready for FOMC news flash event"
    ],
    "ai-ofm": [
      "INIT: Vision automation container initialized",
      "CLEAN: Stripping EXIF metadata headers (device/GPS)",
      "SPOOF: SHA-256 binary spoof completed",
      "INFERENCE: Hugging Face vision API pipeline running",
      "JSON: Generating persona identity parameters...",
      "SANDBOX: Mapping wildcard subdomain project files",
      "STATUS: Staging sandbox listening on *.algeris-sandbox.com"
    ],
    "youtube-automation": [
      "SYSTEM: ElevenLabs API voice queue active",
      "KLING: Compiling 5-second cinematic loops",
      "FFMPEG: Stitching narration wave with Kling loops",
      "DATA: Querying Viewstats trend scoring vector",
      "MONETIZE: ShortsRev music tracking connected",
      "RENDER: Codec H.264 (AAC 192kbps) encoder ready",
      "STATUS: Sandbox rig compiled output: youtube_short.mp4"
    ],
    "web-design": [
      "INFRA: Supabase Edge Functions initialized",
      "COMPILER: Bundling Tailwind CSS modules",
      "STAGING: Initializing wildcard web deployment",
      "ROUTING: Mapping user-project.algeris-sandbox.com",
      "PIPELINE: Hugging Face frontend API listening",
      "SANDBOX: Hot-reloading live iframe DOM...",
      "STATUS: Staging server synced and listening"
    ],
    "dropshipping": [
      "SYSTEM: SUPPLY CHAIN mapping initialized",
      "API: AliExpress supplier API fetch verified",
      "STORE: Compiling high-ticket conversion lander template",
      "SANDBOX: Cloning store build to staging server",
      "LOGISTICS: Direct private shipping agent lines active",
      "SECURE: Escrow payout routing configured",
      "STATUS: One-click builder ready for deployment"
    ],
    "ai-integration": [
      "SYSTEM: Make.com workflow webhook listening",
      "DB: Pinecone vector index active (1536-dim)",
      "CONTEXT: pgvector RAG connection established",
      "WEBHOOK: Securing endpoint tokens signature checks",
      "TEST: Simulating workflow B2B trigger payload",
      "SECURE: Endpoints fully wrapped under Supabase auth",
      "STATUS: API node-based visual engine online"
    ],
    "copywriting": [
      "SYSTEM: Heatmap analyzer engine initiated",
      "COGNITIVE: Indexing AIDA behavioral trigger maps",
      "ANALYSIS: Calculating interest retention curve",
      "PITCH: Cold outreach VSL framework active",
      "VSL: Objections check sequence fully compiled",
      "SANDBOX: Objections score calculator online",
      "STATUS: OBJECTIONS HEATMAP READY"
    ],
    "marketing": [
      "SYSTEM: Meta Ads Manager simulation online",
      "CAPI: Checking Pixel tracking attribution schemas",
      "CPA: Simulating dynamic cost per acquisition parameters",
      "TEST: Slicing UGC hook variants split-tests",
      "ROAS: Scale vertical horizontal matrix calculated",
      "SANDBOX: Burning ad spend stress test initialized",
      "STATUS: Meta ads manager environment live"
    ]
  };

  const logs = terminalLogs[skill.id] || [
    "SYSTEM: Launching container...",
    "INFRA: Config loaded.",
    "STATUS: Staging sandbox listening"
  ];

  // Animate log lines on hover
  useEffect(() => {
    if (!isHovered) {
      setVisibleLogs([]);
      return;
    }

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setVisibleLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isHovered, logs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = -(y - yc) / 12; 
    const angleY = (x - xc) / 12;  
    setRotation({ x: angleX, y: angleY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out, border-color 0.3s, box-shadow 0.3s",
      }}
      className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#0d0d0f]/60 border border-white/5 backdrop-blur-2xl overflow-hidden cursor-pointer shadow-lg group hover:border-[#00FF66]/30 hover:shadow-[0_0_30px_rgba(0,255,102,0.1)]`}
    >
      {/* Plane Face (Default card state) */}
      <div className={`transition-opacity duration-300 ${isHovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="flex justify-between items-start mb-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl text-cyan-400">
            {skill.emoji}
          </div>
          {/* Category Tag */}
          <span className="px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-white/5 text-white/40 border border-white/5">
            {skill.category}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#00FF66] transition-colors duration-300">
          {skill.name}
        </h2>
        
        <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-3">
          {skill.shortDescription}
        </p>

        {/* Dynamic Sandbox, Gauntlet, Capital Badges */}
        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider truncate">Sandbox: {skill.sandboxSpec?.substring(0, 30)}...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
            <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider truncate">Gauntlet: {skill.gauntletSpec?.substring(0, 30)}...</span>
          </div>
        </div>

        {/* Micro metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-xs">
          <div>
            <span className="block text-white/25 text-[9px] uppercase font-bold tracking-widest">Salary Potential</span>
            <span className="text-[#00FF66] font-black mt-0.5 block">{skill.salaryPotential}</span>
          </div>
          <div>
            <span className="block text-white/25 text-[9px] uppercase font-bold tracking-widest">Duration</span>
            <span className="text-[#00E5FF] font-bold mt-0.5 block">{skill.duration} · {skill.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Terminal View (Hover state, revealed underneath) */}
      <div 
        className={`absolute inset-0 p-5 bg-[#050505] font-mono text-[10px] flex flex-col justify-between transition-opacity duration-300 border border-[#00FF66]/20 rounded-2xl ${
          isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto scrollbar-none">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-[#00FF66] font-black tracking-widest uppercase text-[8px]">ALGERIS INFRASTRUCTURE LOGS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
          </div>
          {visibleLogs.map((log, i) => (
            <div key={i} className="flex gap-1.5 text-white/80 leading-normal animate-fade-up">
              <span className="text-white/30">{`>`}</span>
              <span className={log.includes("SECURE") || log.includes("KTL") ? "text-[#00FF66]" : log.includes("API") || log.includes("SANDBOX") ? "text-[#00E5FF]" : ""}>
                {log}
              </span>
            </div>
          ))}
          {visibleLogs.length < logs.length && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-3 bg-[#00FF66] animate-pulse"></span>
            </div>
          )}
        </div>

        {/* Selection buttons */}
        <div className="flex gap-2.5 mt-3 pt-3 border-t border-white/5 relative z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewSyllabus(skill);
            }}
            className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 font-bold transition-all text-[9px] uppercase tracking-wider cursor-pointer"
          >
            Syllabus
          </button>
          <Link
            href={`/classroom?skill=${skill.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 rounded-lg bg-[#00FF66]/10 hover:bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/30 font-black transition-all text-[9px] uppercase tracking-wider text-center cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.1)]"
          >
            Grind System
          </Link>
        </div>
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00FF66]/0 to-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
