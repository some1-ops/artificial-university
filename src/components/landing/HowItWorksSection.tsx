// ============================================================
// HowItWorksSection.tsx — 3-step grid section
// ============================================================

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Tell Us What You Want",
    description:
      "Pick a high-income skill — web design, dropshipping, AI, marketing. Our AI Curriculum Architect instantly builds a personalised roadmap tailored to your exact goals and current level.",
    badge: "Instant Setup",
  },
  {
    number: "02",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Chat with Bro",
    description:
      "Learn naturally through casual, back-and-forth messaging — like texting a friend who happens to be an expert. No slides, no videos, no BS. Just real conversations that actually stick.",
    badge: "No Lectures",
  },
  {
    number: "03",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Get Certified",
    description:
      "The AI continuously grades your understanding during the chat — no written exams. Once you nail the concepts, it auto-generates a verifiable, downloadable certificate. Proof you can deliver.",
    badge: "Auto-Graded",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 px-6">
      {/* Section label */}
      <div className="flex justify-center mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
          How It Works
        </span>
      </div>

      {/* Section heading */}
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
        Three Steps to a{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 animate-gradient-x bg-[length:200%_auto]">High-Income Skill</span>
      </h2>
      <p className="text-center text-white/40 max-w-xl mx-auto mb-16 text-base leading-relaxed">
        We stripped away everything traditional education gets wrong and kept only what actually gets you earning.
      </p>

      {/* 3-column grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="group relative flex flex-col gap-5 p-7 rounded-2xl glass-panel hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-md"
          >
            {/* Step number background */}
            <div className="absolute top-5 right-5 text-[60px] font-black text-white/[0.04] leading-none select-none">
              {step.number}
            </div>

            {/* Icon */}
            <div className="relative w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              {step.icon}
            </div>

            {/* Badge */}
            <span className="inline-block w-fit px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {step.badge}
            </span>

            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-tight">{step.title}</h3>

            {/* Description */}
            <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>

            {/* Connector arrow (between cards on desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-cyan-400/30 text-xl">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
