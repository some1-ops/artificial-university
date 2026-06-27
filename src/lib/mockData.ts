// ============================================================
// mockData.ts — Static data for Artificial University MVP
// ============================================================
// FUTURE HOOK: Replace INITIAL_MESSAGES with Hugging Face Inference API
//   - Recommended models: Qwen/Qwen2.5-7B-Instruct, Llama-3-8B
//   - Use RAG + Pinecone / Supabase pgvector for persistent chat memory
//
// FUTURE HOOK: Replace CURRICULUM with Agent 1 (Curriculum Architect)
//   - Agent 1 generates a JSON curriculum tree on user sign-up
//   - Agent 2 (Tutor) reads from this tree to guide the conversation

export type MessageRole = "ai" | "user";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  type?: "text" | "video" | "persona" | "logs";
  videoUrl?: string;
  fileName?: string;
  personaData?: any;
  subdomain?: string;
  processingLogs?: { step: string; text: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  status: "locked" | "active" | "completed";
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isOpen: boolean;
}

// ─── Mock Chat History ────────────────────────────────────────
export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    role: "ai",
    content:
      "Yo! Ready to crush some web design today? 🎯 We're looking at **CSS Grid**. Think of it like a spreadsheet for your website. Ever used Excel?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "msg-2",
    role: "user",
    content: "Yeah, a bit. But how does that apply to a website?",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: "msg-3",
    role: "ai",
    content:
      "Perfect. So just like Excel has rows and columns, CSS Grid lets you map out your entire webpage into a grid. You define how many columns you want, how wide they are, and then you *place* your content anywhere inside that grid. No more fighting with floats or hacks.",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: "msg-4",
    role: "user",
    content: "Oh that actually makes sense. So I can put a header at the top and sidebar on the left?",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "msg-5",
    role: "ai",
    content:
      "Exactly! 💡 You're already thinking like a developer. Here's a simple example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr;\n}\n```\n\nThat gives you a 2-column layout — a `250px` sidebar on the left and the rest of the space (`1fr`) for your main content. The header spans the full top row. Pretty clean, right?",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
];

// ─── AI Reply Pool ─────────────────────────────────────────────
// FUTURE HOOK: Replace with Hugging Face API call
//   endpoint: https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct
export const AI_REPLIES: string[] = [
  "Good question! Let's break that down further. Think of `grid-template-areas` as labeling zones on your grid — like naming rooms in a house. 🏠",
  "You're getting it fast! Now try this: what would happen if we changed `1fr` to `2fr` in a 3-column grid? Take a guess — no wrong answers.",
  "That's the right instinct. In CSS Grid, `gap` controls the spacing between your cells — like the gutters between columns in a magazine layout.",
  "Solid understanding. You're basically doing what senior devs do — thinking in layout boxes before writing a single line of code. That's the mindset shift.",
  "Let me test you real quick: if `grid-column: 1 / 3` means 'span from column line 1 to line 3', how many columns does that element take up?",
  "Nice! You're picking this up really quickly. Ready to move on to responsive grids with `auto-fill` and `minmax()`? That's where it gets powerful.",
];

// ─── Curriculum Tree ──────────────────────────────────────────
// FUTURE HOOK: Replace with Agent 1 (Curriculum Architect) output
//   Agent 1 runs on sign-up, receives user goals, returns this JSON tree
export const CURRICULUM: Module[] = [
  {
    id: "mod-1",
    title: "Module 1: Web Design Foundations",
    isOpen: true,
    lessons: [
      { id: "l-1-1", title: "How the Web Actually Works", status: "completed" },
      { id: "l-1-2", title: "HTML: The Skeleton", status: "completed" },
      { id: "l-1-3", title: "CSS Grid & Flexbox", status: "active" },
      { id: "l-1-4", title: "Responsive Design Principles", status: "locked" },
    ],
  },
  {
    id: "mod-2",
    title: "Module 2: Visual Design & UI",
    isOpen: false,
    lessons: [
      { id: "l-2-1", title: "Color Theory for the Web", status: "locked" },
      { id: "l-2-2", title: "Typography That Converts", status: "locked" },
      { id: "l-2-3", title: "Building with Components", status: "locked" },
    ],
  },
  {
    id: "mod-3",
    title: "Module 3: Client Work & Getting Paid",
    isOpen: false,
    lessons: [
      { id: "l-3-1", title: "Finding Your First Client", status: "locked" },
      { id: "l-3-2", title: "Pricing Your Services", status: "locked" },
      { id: "l-3-3", title: "Delivering & Retaining Clients", status: "locked" },
    ],
  },
  {
    id: "mod-4",
    title: "Module 4: Scaling to $10k/Month",
    isOpen: false,
    lessons: [
      { id: "l-4-1", title: "Building a Portfolio that Sells", status: "locked" },
      { id: "l-4-2", title: "Automating Your Business", status: "locked" },
      { id: "l-4-3", title: "Final Project & Certification", status: "locked" },
    ],
  },
];

// ─── Progress Calculation ─────────────────────────────────────
export const getOverallProgress = (modules: Module[]): number => {
  const allLessons = modules.flatMap((m) => m.lessons);
  const completed = allLessons.filter((l) => l.status === "completed").length;
  return Math.round((completed / allLessons.length) * 100);
};
