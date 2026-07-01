import { Message, Module } from "./mockData";

// ─── Master Persona Block ─────────────────────────────────────
// Prepended to every skill-specific system prompt.
// Ensures the AI always operates as the "artificial university" mentor.
const MASTER_PERSONA = `You are the core teaching engine for "artificial university," a disruptive educational product under the parent company "Algeris". You are an elite, self-made digital entrepreneur and expert mentor.

COMMUNICATION STYLE & TONE:
- The "Bro" Persona: Speak conversationally, directly, and naturally, like a highly successful older brother mentoring a peer. Use casual language (e.g., "yo", "listen", "here's the play").
- Zero Fluff: Cut the academic jargon. Focus exclusively on actionable steps, money-making mechanics, and real-world execution.
- Pacing: Do NOT overwhelm the user with a massive wall of text. Teach one core concept at a time, verify they understand, and then smoothly introduce the next step.
- Keep replies concise, punchy, and split into small paragraphs.
- Use markdown formatting (bold, italic) and write clean code blocks when relevant.
- Emojis: Use emojis naturally but sparingly.

EXECUTION PROTOCOL (follow this strictly every session):
1. Assess: When the user selects a skill, ask them about their current experience level first.
2. Architect: Build a mental roadmap based on the curriculum below. Do NOT show the whole map; just tell them the first step.
3. Converse: Teach the first concept in a casual, engaging way.
4. Verify: Ask them to explain it back or answer a scenario-based question.
5. Progress: Only move to the next concept when they demonstrate understanding.
6. Certify: Once the user grasps the complete framework and passes your conversational assessments, issue them a virtual certification message.

STRICT RULE: Stay 100% within the curriculum and methodologies defined below. Do not deviate into generic advice.`;

export interface Skill {
  id: string;
  name: string;
  category: "Development" | "Business" | "Automation" | "Marketing" | "Writing" | "Finance" | "Creator";
  emoji: string;
  shortDescription: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  salaryPotential: string;
  curriculum: Module[];
  initialMessages: Message[];
  replies: string[];
  systemPrompt?: string; // Skill-specific curriculum injected as the AI's system message
  sandboxSpec?: string;
  gauntletSpec?: string;
  capitalSpec?: string;
}

// ─────────────────────────────────────────────────────────────
// SKILL-SPECIFIC SYSTEM PROMPTS
// ─────────────────────────────────────────────────────────────

const FOREX_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: Forex Trading — The KTL Axis Model

Your ENTIRE teaching is built around one proprietary framework: KTL (Key Levels · Time · Liquidity). Never teach any other method.

MODULE 1 — KEY LEVELS (K):
Teach the user to find major price zones where institutional money leaves footprints. Cover setups in order:
- Candlestick Close Mapping: Support (V-Shape) & Resistance (A-Shape) logic without wicks. Always focus on closes.

MODULE 2 — TIME & KILLZONES (T):
- Intraday Session Trap: Mining Asian session liquidity ranges and midlines. Define Asia range overnight, hunt London manipulation sweeps, execute NY distribution.

MODULE 3 — LIQUIDITY HUNTING (L):
- Daily Cycle Invariance: Executing the Judah Swing (AMD Cycle) and Break & Retest. Define IRL vs ERL.

MODULE 4 — THE AXIS:
- Multi-Timeframe Alignment: Pairing HTF rejections with LTF breakouts for directional storyline tracking. Align K + T + L for entry.`;

const OFM_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: AI OFM (OnlyFans Management) — Faceless AI Influencer Business

MODULE 1 — PERSONA MATRIX DESIGN:
- Prompting Claude to extract emotional drivers, market niches, and buyer intent frameworks.

MODULE 2 — IDENTITY GENERATION & SYNTHESIS:
- Consistent image modeling using Higgsfield and Wan tools.

MODULE 3 — AUTOMATED MOTION CONTROL:
- Rendering dynamic short-form video reels with Kling and custom faceswapping.

MODULE 4 — FUNNEL ARBITRAGE:
- Aggressive automated traffic distribution setups utilizing Reddit subreddits, Snapchat Spotlight, and private Telegram funnel loops.`;

const YOUTUBE_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: YouTube Automation (Faceless Content)

MODULE 1 — COMPETITIVE DATA MINING:
- Viewstats analytics and top-voted Reddit boards to source high-retention concepts.

MODULE 2 — THE 4-PART SCRIPT FORMULA:
- Pacing control split across Hook (0-3s), Setup (3-10s), Build (10-45s), and Closer (last 5s).

MODULE 3 — GENERATIVE VIDEO STACKS:
- Rendering background animations via Kling AI and voiceovers via ElevenLabs.

MODULE 4 — ALGORITHMIC DISTRIBUTION HOOKS:
- High-contrast Canva covers and posting consistency with Pallyy scheduling.`;

const WEB_DESIGN_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: Web Design Mastery

MODULE 1 — UI/UX STRUCTURAL ENGINEERING:
- Wireframing, typography scales, layouts using Next.js structures.

MODULE 2 — ADVANCED TAILWIND IMPLEMENTATION:
- Fluid layouts, custom animations, Tailwind configuration.

MODULE 3 — CONVERSATIONAL INTERFACE INTEGRATION:
- Connecting Hugging Face API pipelines to web frontends.

MODULE 4 — FREELANCE CLIENT PIPELINES:
- Closing contracts, high-leverage portfolios, and agency workflows.`;

const DROPSHIPPING_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: Dropshipping Blueprint

MODULE 1 — PRODUCT SOURCING ARBITRAGE:
- Product sourcing, mapping supply chains, calculating margins.

MODULE 2 — CONVERSION-OPTIMIZED ARCHITECTURE:
- High-ticket landers, Shopify quick-start, app integrations.

MODULE 3 — VIRALITY FUNNEL MECHANICS:
- Sourcing organic creators, video script hooks, TikTok Spark ads.

MODULE 4 — LOGISTICS AUTOMATION:
- Fulfillment scripting, borderless payment integrations.`;

const AI_INTEGRATION_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: AI Automation & Integration

MODULE 1 — SYSTEM ARCHITECTURE LOGIC:
- Workflows on Make.com, Supabase database links.

MODULE 2 — DATABASE VECTOR TOOLING:
- Pinecone, pgvector RAG context preservation.

MODULE 3 — SECURE ENDPOINT CONSTRUCTION:
- Webhooks, signature tokens, error handling.

MODULE 4 — B2B ENTERPRISE INTEGRATION:
- Enterprise agents, B2B sales retainers.`;

const COPYWRITING_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: High-Conversion Copywriting

MODULE 1 — COGNITIVE PERSUASION DYNAMICS:
- Pain points, desire hooks, AIDA copywriting blueprint.

MODULE 2 — HIGH-TICKET LANDING PAGES:
- Writing long-form sales pages that systematically dismantle objections.

MODULE 3 — EMAIL FUNNEL SEQUENCING:
- High-open sequences, behavioral triggers, conversion loops.

MODULE 4 — VSL SYSTEM SCRIPTING:
- Video Sales Letters built on psychological pacing.`;

const MARKETING_SYSTEM_PROMPT = `${MASTER_PERSONA}

---
SKILL PATH: Growth Marketing & Ads

MODULE 1 — MULTI-PLATFORM ARCHITECTURE:
- Meta, Google, TikTok ad account scaling strategies.

MODULE 2 — DATA ANALYTICS TRACKING:
- Pixel configurations, CAPI, attribution rules.

MODULE 3 — CREATIVE ENGINE TESTING:
- Testing hooks, angles, thumbnails.

MODULE 4 — MASSIVE SCALE MECHANICS:
- Budget scaling, ROAS protection, horizontal structures.`;

// ─────────────────────────────────────────────────────────────
// SKILLS DATA
// ─────────────────────────────────────────────────────────────

export const SKILLS_DATA: Skill[] = [
  {
    id: "forex-trading",
    name: "Forex Trading (KTL Axis)",
    category: "Finance",
    emoji: "📈",
    shortDescription: "Trade forex like institutions using the proprietary KTL Axis model — Key Levels, Time, and Liquidity for sniper entries.",
    description: "Master the KTL (Key Levels, Time, Liquidity) Axis framework used by professional traders. You'll learn to read institutional footprints, trade killzones only, hunt liquidity before it's swept, and execute sniper entries at the exact Axis intersection.",
    duration: "6 Weeks",
    difficulty: "Intermediate",
    salaryPotential: "$5,000 - $50,000 / mo",
    systemPrompt: FOREX_SYSTEM_PROMPT,
    sandboxSpec: "In-app simulated TradingView canvas utilizing live market feed playbacks.",
    gauntletSpec: "\"The Flash Crash Event.\" The user is subjected to a live-simulated volatile FOMC news release and must correctly place structural axis lines under a 60-second countdown timer.",
    capitalSpec: "Passing the execution stress test opens a pathway to verified $10k+ micro-prop firm allocations funded by Algeris capital reserves.",
    curriculum: [
      {
        id: "fx-mod-1",
        title: "Module 1: Candlestick Close Mapping",
        isOpen: true,
        lessons: [
          { id: "fx-1-1", title: "Support (V-Shape) & Resistance (A-Shape) logic without wicks", status: "active" },
          { id: "fx-1-2", title: "Why Institutions Focus Exclusively on Closes", status: "locked" }
        ],
      },
      {
        id: "fx-mod-2",
        title: "Module 2: Intraday Session Trap",
        isOpen: false,
        lessons: [
          { id: "fx-2-1", title: "Mining Asian Session Ranges & Midlines", status: "locked" },
          { id: "fx-2-2", title: "London Manipulation Sweeps", status: "locked" }
        ],
      },
      {
        id: "fx-mod-3",
        title: "Module 3: Daily Cycle Invariance",
        isOpen: false,
        lessons: [
          { id: "fx-3-1", title: "Executing the Judah Swing (AMD Cycle)", status: "locked" },
          { id: "fx-3-2", title: "Internal vs External Range Liquidity", status: "locked" }
        ],
      },
      {
        id: "fx-mod-4",
        title: "Module 4: Multi-Timeframe Alignment",
        isOpen: false,
        lessons: [
          { id: "fx-4-1", title: "HTF Rejections + LTF Breakout Execution", status: "locked" },
          { id: "fx-4-2", title: "Directional Storyline Tracking", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "fx-msg-1",
        role: "ai",
        content: "Yo, welcome to the KTL Axis framework 📈 This is the only trading system you'll ever need. Before we get into charts, what is your experience level?\n\nA) Complete beginner\nB) Tried trading, lost money\nC) Know the basics, looking to level up",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Perfect. First concept: price zones where institutions transact leave clean signatures. Let's focus on line chart closes. Do you see why candle closes are cleaner than wicks?",
      "Exactly. Wicks represent intra-period volatility, while closes represent where orders actually finalized. Let's map support next."
    ]
  },
  {
    id: "ai-ofm",
    name: "AI OFM (Faceless Creator)",
    category: "Creator",
    emoji: "🤳",
    shortDescription: "Build a completely faceless AI influencer business and monetize through OnlyFans — no camera, no face, fully automated.",
    description: "Learn to create hyper-realistic AI personas using Claude, Higgsfield, and Kling AI, then funnel traffic from Reddit and Snapchat into a monetized OnlyFans page.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$3,000 - $30,000 / mo",
    systemPrompt: OFM_SYSTEM_PROMPT,
    sandboxSpec: "Integrated vision automation API that automatically strips image EXIF metadata and generates structural JSON prompts from a single source file.",
    gauntletSpec: "\"The Chatbot Closing Sprint.\" The user faces an AI customer sim built on high-intent buyer logic. If they fail to identify purchasing intent and secure the deal, they fail.",
    capitalSpec: "Unlocks high-tier marketing quotas & proxy sandbox hosting.",
    curriculum: [
      {
        id: "ofm-mod-1",
        title: "Module 1: Persona Matrix Design",
        isOpen: true,
        lessons: [
          { id: "ofm-1-1", title: "Prompting Claude for niche & buyer intent", status: "active" },
          { id: "ofm-1-2", title: "Extracting emotional spending drivers", status: "locked" }
        ],
      },
      {
        id: "ofm-mod-2",
        title: "Module 2: Identity Generation",
        isOpen: false,
        lessons: [
          { id: "ofm-2-1", title: "Consistent modeling with Higgsfield & Wan", status: "locked" },
          { id: "ofm-2-2", title: "Maintaining facial structure seeds", status: "locked" }
        ],
      },
      {
        id: "ofm-mod-3",
        title: "Module 3: Automated Motion Control",
        isOpen: false,
        lessons: [
          { id: "ofm-3-1", title: "Kling AI 5-second video synthesis", status: "locked" },
          { id: "ofm-3-2", title: "Seamless faceswapping techniques", status: "locked" }
        ],
      },
      {
        id: "ofm-mod-4",
        title: "Module 4: Funnel Arbitrage",
        isOpen: false,
        lessons: [
          { id: "ofm-4-1", title: "Reddit organic distribution setups", status: "locked" },
          { id: "ofm-4-2", title: "Snapchat Spotlight & Telegram broadcast loops", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "ofm-msg-1",
        role: "ai",
        content: "Yo 🤳 Let's build a faceless AI creation pipeline. What's your starting point?\n\nA) Complete beginner\nB) Have assets, need better conversion\nC) Sourcing traffic is my bottleneck",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Understood. Let's design the persona matrix in Claude. We want a highly relatable profile that extracts emotional drivers. What converts better: luxury or girl-next-door?",
      "Spot on. Relatability drives community support and higher DM response rates. Let's build the prompt template."
    ]
  },
  {
    id: "youtube-automation",
    name: "YouTube Shorts (Faceless)",
    category: "Creator",
    emoji: "🎬",
    shortDescription: "Build a faceless YouTube Shorts channel that prints passive income using AI tools — no face, no camera, full pipeline in 3 weeks.",
    description: "The complete system for faceless YouTube Shorts: viral ideation, production with Kling + ElevenLabs, and horizontal scaling metrics.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$2,000 - $15,000 / mo",
    systemPrompt: YOUTUBE_SYSTEM_PROMPT,
    sandboxSpec: "Automated rendering dashboard. The user enters their raw script text and receives mixed FFMPEG voiceover and visual asset compositions within the active workspace.",
    gauntletSpec: "\"The Analytics Audit.\" The user is given data patterns from a failing channel. They have to correctly restructure the metadata, rewrite the script hook, and redesign the hook thumbnail within a strict deadline.",
    capitalSpec: "Grants access to high-tier ElevenLabs custom voice allocations.",
    curriculum: [
      {
        id: "yt-mod-1",
        title: "Module 1: Competitive Data Mining",
        isOpen: true,
        lessons: [
          { id: "yt-1-1", title: "Spying with Viewstats analytics", status: "active" },
          { id: "yt-1-2", title: "Reddit viral concept mining", status: "locked" }
        ],
      },
      {
        id: "yt-mod-2",
        title: "Module 2: 4-Part Script Formula",
        isOpen: false,
        lessons: [
          { id: "yt-2-1", title: "Hook, Setup, Build, Closer split", status: "locked" },
          { id: "yt-2-2", title: "Retention-optimized sentence pacing", status: "locked" }
        ],
      },
      {
        id: "yt-mod-3",
        title: "Module 3: Generative Video Stacks",
        isOpen: false,
        lessons: [
          { id: "yt-3-1", title: "Kling AI loops & ElevenLabs narration", status: "locked" },
          { id: "yt-3-2", title: "Stitching audio & video layers", status: "locked" }
        ],
      },
      {
        id: "yt-mod-4",
        title: "Module 4: Algorithmic Distribution Hooks",
        isOpen: false,
        lessons: [
          { id: "yt-4-1", title: "High-contrast Canva layouts", status: "locked" },
          { id: "yt-4-2", title: "Pallyy automated batch scheduler", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "yt-msg-1",
        role: "ai",
        content: "Yo! Ready to spin up the YouTube channel machine? 🎬 What's your goal?\n\nA) Build channel from scratch\nB) Learn to make video assets quickly\nC) Optimize analytics hooks",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Let's start. Go to Viewstats and filter top Shorts. Copy what has proven viral. Now let's structure the script hook.",
      "The hook must execute a pattern interrupt within 3 seconds. E.g., 'This mistake cost me $1,000'. Ready to draft yours?"
    ]
  },
  {
    id: "web-design",
    name: "Web Design Mastery",
    category: "Development",
    emoji: "🎨",
    shortDescription: "Learn to design and build stunning, conversion-focused websites that clients gladly pay $5k+ for.",
    description: "Go from styling basics to layout mastery. You'll cover responsive design, design systems, and client delivery, graduating with a high-ticket design portfolio.",
    duration: "6 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$5,000 - $12,000 / mo",
    systemPrompt: WEB_DESIGN_SYSTEM_PROMPT,
    sandboxSpec: "A live browser layout workspace code terminal that outputs instantly to a persistent hosting URL (*.algeris-sandbox.com).",
    gauntletSpec: "\"The Nightmarish Scope-Creep Simulation.\" The AI switches to a highly demanding, chaotic client trying to slash budgets while asking for endless additions. The user must hold their boundaries and secure the contract.",
    capitalSpec: "Unlocks free staging hosting subdomains for client pitches.",
    curriculum: [
      {
        id: "web-design-mod-1",
        title: "Module 1: UI/UX Structural Engineering",
        isOpen: true,
        lessons: [
          { id: "wd-1-1", title: "Deep wireframing layouts in Next.js", status: "active" },
          { id: "wd-1-2", title: "High-contrast typography rules", status: "locked" }
        ],
      },
      {
        id: "web-design-mod-2",
        title: "Module 2: Advanced Tailwind CSS",
        isOpen: false,
        lessons: [
          { id: "wd-2-1", title: "Fluid flex/grid layouts", status: "locked" },
          { id: "wd-2-2", title: "Tailwind custom animations", status: "locked" }
        ],
      },
      {
        id: "web-design-mod-3",
        title: "Module 3: Conversational Integrations",
        isOpen: false,
        lessons: [
          { id: "wd-3-1", title: "Hugging Face endpoints connection", status: "locked" },
          { id: "wd-3-2", title: "Securing frontend api keys", status: "locked" }
        ],
      },
      {
        id: "web-design-mod-4",
        title: "Module 4: Client Acquisition Pipelines",
        isOpen: false,
        lessons: [
          { id: "wd-4-1", title: "Contract negotiation & pricing rules", status: "locked" },
          { id: "wd-4-2", title: "Portfolio delivery structures", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "wd-msg-1",
        role: "ai",
        content: "Let's build layout matrices. 🎨 What is your Next.js experience level?\n\nA) No coding experience\nB) Know html/css basics\nC) Front-end developer looking to freelance",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Nice. Let's talk about layouts. Flexbox is for one-dimensional layouts, and Grid is for two-dimensional grids. Ready to see the syntax?",
      "Perfect. Let's write grid properties in Tailwind CSS: `grid grid-cols-12 gap-4`. This configures a standard 12-column layout."
    ]
  },
  {
    id: "dropshipping",
    name: "Dropshipping Blueprint",
    category: "Business",
    emoji: "📦",
    shortDescription: "Build a high-margin e-commerce brand without stocking inventory or dealing with shipping.",
    description: "Master product validation, viral video creatives, high-converting TikTok/Meta Ads, and sourcing through direct suppliers.",
    duration: "4 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$4,000 - $20,000 / mo",
    systemPrompt: DROPSHIPPING_SYSTEM_PROMPT,
    sandboxSpec: "One-click store builder that clones a high-converting landing page framework to a temporary staging server instantly.",
    gauntletSpec: "\"The Ad-Account Ban Meltdown.\" The simulation locks up virtual payment accounts midway through a high-traffic wave. The user has to quickly redirect logistics and solve the bottleneck.",
    capitalSpec: "Unlocks custom $500 ad credit lines backed by Algeris.",
    curriculum: [
      {
        id: "ds-mod-1",
        title: "Module 1: Product Sourcing Arbitrage",
        isOpen: true,
        lessons: [
          { id: "ds-1-1", title: "Mapping product supply chains", status: "active" },
          { id: "ds-1-2", title: "Private shipping agents selection", status: "locked" }
        ],
      },
      {
        id: "ds-mod-2",
        title: "Module 2: Conversion-Optimized Architecture",
        isOpen: false,
        lessons: [
          { id: "ds-2-1", title: "High-ticket Shopify landing pages", status: "locked" },
          { id: "ds-2-2", title: "Checkout optimization scripts", status: "locked" }
        ],
      },
      {
        id: "ds-mod-3",
        title: "Module 3: Virality Funnel Mechanics",
        isOpen: false,
        lessons: [
          { id: "ds-3-1", title: "Sourcing organic creators", status: "locked" },
          { id: "ds-3-2", title: "High-click TikTok Spark ads scripting", status: "locked" }
        ],
      },
      {
        id: "ds-mod-4",
        title: "Module 4: Logistics Automation",
        isOpen: false,
        lessons: [
          { id: "ds-4-1", title: "Hands-off fulfillment configs", status: "locked" },
          { id: "ds-4-2", title: "Cross-border payout routing", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "ds-msg-1",
        role: "ai",
        content: "Let's build e-commerce loops. 📦 Have you run a retail store before?\n\nA) No retail experience\nB) Sold items locally\nC) Run e-commerce, failed with ad budget",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Let's focus on sourcing. AliExpress is too slow. We must leverage private agents with 5-7 day lines. Ready to calculate margins?",
      "Good. Ensure your retail price is at least 3x the unit cost to offset ad spend. Retailing a $5 item for $24.99 works."
    ]
  },
  {
    id: "ai-integration",
    name: "AI Automation & Integration",
    category: "Automation",
    emoji: "🤖",
    shortDescription: "Build AI-powered workflows and software systems for local and online businesses.",
    description: "Learn to design custom GPTs, connect OpenAI APIs using Make.com and Zapier, and sell workflow automation audits.",
    duration: "5 Weeks",
    difficulty: "Intermediate",
    salaryPotential: "$8,000 - $25,000 / mo",
    systemPrompt: AI_INTEGRATION_SYSTEM_PROMPT,
    sandboxSpec: "A node-based visualization workflow engine to test custom automation pathways live.",
    gauntletSpec: "\"The API Crash.\" A critical third-party database breaks down. The user must trace error logs, fix webhooks, and restore connection under time pressure.",
    capitalSpec: "Unlocks Make.com and OpenAI sandbox API keys for testing.",
    curriculum: [
      {
        id: "ai-mod-1",
        title: "Module 1: System Architecture Logic",
        isOpen: true,
        lessons: [
          { id: "ai-1-1", title: "API connections on Make.com", status: "active" },
          { id: "ai-1-2", title: "Supabase database integration", status: "locked" }
        ],
      },
      {
        id: "ai-mod-2",
        title: "Module 2: Database Vector Tooling",
        isOpen: false,
        lessons: [
          { id: "ai-2-1", title: "Pinecone vector DB setup", status: "locked" },
          { id: "ai-2-2", title: "Preserving context using pgvector", status: "locked" }
        ],
      },
      {
        id: "ai-mod-3",
        title: "Module 3: Secure Endpoint Construction",
        isOpen: false,
        lessons: [
          { id: "ai-3-1", title: "Custom webhook signature headers", status: "locked" },
          { id: "ai-3-2", title: "API key rota and secret rotation", status: "locked" }
        ],
      },
      {
        id: "ai-mod-4",
        title: "Module 4: B2B Enterprise Integration",
        isOpen: false,
        lessons: [
          { id: "ai-4-1", title: "Corporate audit framework proposal", status: "locked" },
          { id: "ai-4-2", title: "B2B retainers & SLA delivery", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "ai-msg-1",
        role: "ai",
        content: "Let's connect engines. 🤖 What is your backend/API logic comfort level?\n\nA) Beginner, never used an API key\nB) Understand JSON payloads\nC) Know Node.js, built integrations",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Let's trace API endpoints. An API accepts parameters, processes inputs, and outputs formatted JSON responses. Ready to check Make.com integrations?",
      "Awesome. Let's construct a scenario on Make.com that triggers when a webhook receives a message payload."
    ]
  },
  {
    id: "copywriting",
    name: "High-Conversion Copywriting",
    category: "Writing",
    emoji: "✍️",
    shortDescription: "Write sales pages, emails, and landing page copies that drive revenue and action.",
    description: "Learn psychological triggers, hook frameworks, A/B landing page testing, and the exact outreach scripts.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$4,000 - $10,000 / mo",
    systemPrompt: COPYWRITING_SYSTEM_PROMPT,
    sandboxSpec: "Live heatmap simulation tool showing exactly where readers are likely to lose interest based on the structural flow of the copy.",
    gauntletSpec: "\"The Cold-Outreach Sprint.\" The user has 15 minutes to write a personalized cold message pitch. The system scores their angle, open rate potential, and hook clarity.",
    capitalSpec: "Unlocks premium email deliverability suites for cold outreach testing.",
    curriculum: [
      {
        id: "cp-mod-1",
        title: "Module 1: Cognitive Persuasion Dynamics",
        isOpen: true,
        lessons: [
          { id: "cp-1-1", title: "Desire maps and customer paint points", status: "active" },
          { id: "cp-1-2", title: "The AIDA copywriting framework", status: "locked" }
        ],
      },
      {
        id: "cp-mod-2",
        title: "Module 2: High-Ticket Landing Pages",
        isOpen: false,
        lessons: [
          { id: "cp-2-1", title: "Long-form copy logic dismantling objections", status: "locked" },
          { id: "cp-2-2", title: "SaaS landing page copy frameworks", status: "locked" }
        ],
      },
      {
        id: "cp-mod-3",
        title: "Module 3: Email Funnel Sequencing",
        isOpen: false,
        lessons: [
          { id: "cp-3-1", title: "Welcome sequences & cart abandonment", status: "locked" },
          { id: "cp-3-2", title: "Conversion loops & click trigger copy", status: "locked" }
        ],
      },
      {
        id: "cp-mod-4",
        title: "Module 4: VSL System Scripting",
        isOpen: false,
        lessons: [
          { id: "cp-4-1", title: "Video Sales Letter pacing templates", status: "locked" },
          { id: "cp-4-2", title: "Psychological loop openings", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "cp-msg-1",
        role: "ai",
        content: "Let's weaponize words. ✍️ What's your experience writing copy?\n\nA) No copy experience\nB) Written blog posts or content\nC) Freelance copywriter, need better conversion frameworks",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Let's trace desire. High-converting copy focuses on customer pain points. AIDA (Attention, Interest, Desire, Action) is your map. Ready to design an hook?",
      "Good. Focus on a headline that addresses a specific checkout leakage, e.g. 'How your mobile checkout leaks 15% sales'."
    ]
  },
  {
    id: "marketing",
    name: "Growth Marketing & Ads",
    category: "Marketing",
    emoji: "📣",
    shortDescription: "Launch and scale profit-making Meta, Google, and TikTok ad campaigns for businesses.",
    description: "Learn standard media buying, budget optimization, custom retargeting setups, and how to analyze key ad KPIs.",
    duration: "4 Weeks",
    difficulty: "Intermediate",
    salaryPotential: "$5,000 - $15,000 / mo",
    systemPrompt: MARKETING_SYSTEM_PROMPT,
    sandboxSpec: "Live dashboard simulating an active Meta Ads Manager account with fluctuating CPA metrics and budget tools.",
    gauntletSpec: "\"The Burning Ad Spend Challenge.\" The user is handed a simulated campaign that is quickly losing money. They must run split-tests and optimize creative variables before budget runs dry.",
    capitalSpec: "Unlocks Algeris-backed ad accounts for client sandbox trials.",
    curriculum: [
      {
        id: "gm-mod-1",
        title: "Module 1: Multi-Platform Architecture",
        isOpen: true,
        lessons: [
          { id: "gm-1-1", title: "Meta, Google, & TikTok campaign setup", status: "active" },
          { id: "gm-1-2", title: "CBO vs ABO budget configuration", status: "locked" }
        ],
      },
      {
        id: "gm-mod-2",
        title: "Module 2: Data Analytics Tracking",
        isOpen: false,
        lessons: [
          { id: "gm-2-1", title: "Pixel tracking & Conversions API keys", status: "locked" },
          { id: "gm-2-2", title: "ROAS & attribution model calculation", status: "locked" }
        ],
      },
      {
        id: "gm-mod-3",
        title: "Module 3: Creative Engine Testing",
        isOpen: false,
        lessons: [
          { id: "gm-3-1", title: "Creative matrices & hook variations", status: "locked" },
          { id: "gm-3-2", title: "High-retention UGC scripts", status: "locked" }
        ],
      },
      {
        id: "gm-mod-4",
        title: "Module 4: Massive Scale Mechanics",
        isOpen: false,
        lessons: [
          { id: "gm-4-1", title: "Horizontal scale configurations", status: "locked" },
          { id: "gm-4-2", title: "Protecting ROAS under high budgets", status: "locked" }
        ],
      }
    ],
    initialMessages: [
      {
        id: "gm-msg-1",
        role: "ai",
        content: "Let's acquire users. 📣 What's your comfort level with ad budgets?\n\nA) Complete beginner\nB) Understand CPC and CTR metrics\nC) Spent budget, failed to hit ROAS target",
        timestamp: new Date(),
      }
    ],
    replies: [
      "Let's trace CPC/CTR parameters. High click-through rate means creative holds attention. Let's compare ABO and CBO setups.",
      "CBO lets the ad algorithm allocate budget dynamically, while ABO sets static spend constraints. Let's run a test setup."
    ]
  }
];
