import { Message, Module } from "./mockData";

export interface Skill {
  id: string;
  name: string;
  category: "Development" | "Business" | "Automation" | "Marketing" | "Writing";
  emoji: string;
  shortDescription: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  salaryPotential: string;
  curriculum: Module[];
  initialMessages: Message[];
  replies: string[];
}

export const SKILLS_DATA: Skill[] = [
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
    curriculum: [
      {
        id: "web-design-mod-1",
        title: "Module 1: Web Design Foundations",
        isOpen: true,
        lessons: [
          { id: "wd-1-1", title: "How the Web Actually Works", status: "completed" },
          { id: "wd-1-2", title: "HTML: The Skeleton", status: "completed" },
          { id: "wd-1-3", title: "CSS Grid & Flexbox", status: "active" },
          { id: "wd-1-4", title: "Responsive Design Principles", status: "locked" },
        ],
      },
      {
        id: "web-design-mod-2",
        title: "Module 2: Visual Design & UI",
        isOpen: false,
        lessons: [
          { id: "wd-2-1", title: "Color Theory for the Web", status: "locked" },
          { id: "wd-2-2", title: "Typography That Converts", status: "locked" },
          { id: "wd-2-3", title: "Building with Components", status: "locked" },
        ],
      },
      {
        id: "web-design-mod-3",
        title: "Module 3: Client Work & Getting Paid",
        isOpen: false,
        lessons: [
          { id: "wd-3-1", title: "Finding Your First Client", status: "locked" },
          { id: "wd-3-2", title: "Pricing Your Services", status: "locked" },
          { id: "wd-3-3", title: "Delivering & Retaining Clients", status: "locked" },
        ],
      },
    ],
    initialMessages: [
      {
        id: "wd-msg-1",
        role: "ai",
        content: "Yo! Ready to crush some web design today? 🎯 We're looking at **CSS Grid**. Think of it like a spreadsheet for your website. Ever used Excel?",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: "wd-msg-2",
        role: "user",
        content: "Yeah, a bit. But how does that apply to a website?",
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
      },
      {
        id: "wd-msg-3",
        role: "ai",
        content: "Perfect. So just like Excel has rows and columns, CSS Grid lets you map out your entire webpage into a grid. You define how many columns you want, how wide they are, and then you *place* your content anywhere inside that grid. No more fighting with floats or hacks.",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "wd-msg-4",
        role: "user",
        content: "Oh that actually makes sense. So I can put a header at the top and sidebar on the left?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: "wd-msg-5",
        role: "ai",
        content: "Exactly! 💡 You're already thinking like a developer. Here's a simple example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr;\n}\n```\n\nThat gives you a 2-column layout — a `250px` sidebar on the left and the rest of the space (`1fr`) for your main content. The header spans the full top row. Pretty clean, right?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
    replies: [
      "Good question! Let's break that down further. Think of `grid-template-areas` as labeling zones on your grid — like naming rooms in a house. 🏠",
      "You're getting it fast! Now try this: what would happen if we changed `1fr` to `2fr` in a 3-column grid? Take a guess — no wrong answers.",
      "That's the right instinct. In CSS Grid, `gap` controls the spacing between your cells — like the gutters between columns in a magazine layout.",
      "Solid understanding. You're basically doing what senior devs do — thinking in layout boxes before writing a single line of code. That's the mindset shift.",
      "Let me test you real quick: if `grid-column: 1 / 3` means 'span from column line 1 to line 3', how many columns does that element take up?",
      "Nice! You're picking this up really quickly. Ready to move on to responsive grids with `auto-fill` and `minmax()`? That's where it gets powerful.",
    ],
  },
  {
    id: "dropshipping",
    name: "Dropshipping Blueprint",
    category: "Business",
    emoji: "📦",
    shortDescription: "Build a high-margin e-commerce brand without stocking inventory or dealing with shipping.",
    description: "Master product validation, viral video creatives, high-converting TikTok/Meta Ads, and sourcing through direct suppliers. Perfect for launch-and-scale operations.",
    duration: "4 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$4,000 - $20,000 / mo",
    curriculum: [
      {
        id: "ds-mod-1",
        title: "Module 1: Product Selection & Sourcing",
        isOpen: true,
        lessons: [
          { id: "ds-1-1", title: "Identifying Viral Potential", status: "completed" },
          { id: "ds-1-2", title: "Finding Winning Suppliers", status: "active" },
          { id: "ds-1-3", title: "Calculating Margins & Costs", status: "locked" },
        ],
      },
      {
        id: "ds-mod-2",
        title: "Module 2: High-Converting Stores",
        isOpen: false,
        lessons: [
          { id: "ds-2-1", title: "Shopify Quick-Start Setup", status: "locked" },
          { id: "ds-2-2", title: "Landing Page Architecture", status: "locked" },
          { id: "ds-2-3", title: "App integrations for UX", status: "locked" },
        ],
      },
      {
        id: "ds-mod-3",
        title: "Module 3: Viral TikTok Marketing",
        isOpen: false,
        lessons: [
          { id: "ds-3-1", title: "Scripting Hooks that Hold", status: "locked" },
          { id: "ds-3-2", title: "Setting up Spark Ads", status: "locked" },
          { id: "ds-3-3", title: "Scaling from $1k to $10k/day", status: "locked" },
        ],
      },
    ],
    initialMessages: [
      {
        id: "ds-msg-1",
        role: "ai",
        content: "Yo! Ready to build your dropshipping empire? 📦 Today we're looking at **product research**. Do you know what makes a product 'viral'?",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "ds-msg-2",
        role: "user",
        content: "Not really. Just stuff that people buy online?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: "ds-msg-3",
        role: "ai",
        content: "Exactly! But more specifically, viral products have a **wow factor**, a clear **problem-solving utility**, and allow for at least **3x profit margins**. Think about it: when was the last time you bought something off a random TikTok video?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
    replies: [
      "Spot on. TikTok ads thrive on impulse buys! We need to find products that make someone stop scrolling within 2 seconds. 🎬",
      "Let's look at pricing. If a product costs $5 to source from a supplier, what would you retail it for on your Shopify store?",
      "Good guess. Retail pricing it at $24.99 is the sweet spot. That leaves you with a $20 gross profit to cover ads and shipping.",
      "Now, let's talk about shipping agents. Relying on basic AliExpress shipping is a recipe for 3-week delivery delays. We want direct private agents.",
      "To test your skills: what is a 'hook' in a TikTok ad, and why does the first 3 seconds decide if you make money or lose money?",
      "Boom! You nailed it. If they scroll past, they never see your offer. Let's move on to setting up your first TikTok testing campaign.",
    ],
  },
  {
    id: "ai-integration",
    name: "AI Automation & Integration",
    category: "Automation",
    emoji: "🤖",
    shortDescription: "Build AI-powered workflows and software systems for local and online businesses.",
    description: "Learn to design custom GPTs, connect OpenAI APIs using Make.com and Zapier, and sell workflow automation audits for $2k+ each.",
    duration: "5 Weeks",
    difficulty: "Intermediate",
    salaryPotential: "$8,000 - $25,000 / mo",
    curriculum: [
      {
        id: "ai-mod-1",
        title: "Module 1: API & Automation Foundations",
        isOpen: true,
        lessons: [
          { id: "ai-1-1", title: "API Authentication & Payloads", status: "completed" },
          { id: "ai-1-2", title: "Building Workflows on Make.com", status: "active" },
          { id: "ai-1-3", title: "Webhooks & Error Handling", status: "locked" },
        ],
      },
      {
        id: "ai-mod-2",
        title: "Module 2: Custom AI Systems",
        isOpen: false,
        lessons: [
          { id: "ai-2-1", title: "Prompt Engineering & Variables", status: "locked" },
          { id: "ai-2-2", title: "Structured JSON Output", status: "locked" },
          { id: "ai-2-3", title: "Vector DBs & RAG Integrations", status: "locked" },
        ],
      },
      {
        id: "ai-mod-3",
        title: "Module 3: Selling Automation to Businesses",
        isOpen: false,
        lessons: [
          { id: "ai-3-1", title: "Finding Automation Bottlenecks", status: "locked" },
          { id: "ai-3-2", title: "Designing the Client Proposal", status: "locked" },
          { id: "ai-3-3", title: "Delivering the SLA Agreement", status: "locked" },
        ],
      },
    ],
    initialMessages: [
      {
        id: "ai-msg-1",
        role: "ai",
        content: "Hey there! Ready to automate some businesses and make them print cash? 🤖 Today we're connecting OpenAI to Make.com. Have you used APIs before?",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "ai-msg-2",
        role: "user",
        content: "I've heard of them, but never connected them. What do they actually do?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: "ai-msg-3",
        role: "ai",
        content: "No sweat! An API is just a bridge. Like ordering food from a menu — you tell the waiter (API) what you want, they get it from the kitchen (Server), and bring it back. We are going to use API keys to let Make.com talk to ChatGPT. Ready?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
    replies: [
      "Perfect. First step: create your API key in the OpenAI developer platform dashboard. 🔑",
      "Keep this key extremely safe! If you commit it to GitHub or share it, bots will drain your wallet in minutes.",
      "Now, in Make.com, we create a new Scenario, add the OpenAI module, and choose 'Create a Completion'.",
      "Awesome! Let's pass a structured prompt. We want the AI to output clean JSON instead of markdown. Why is JSON better for automation?",
      "Precisely! JSON lets other software easily parse the data without text headers getting in the way.",
      "Boom, scenario tested! You just built an automated lead responder. Next up: hooking it up to a live Gmail webhook.",
    ],
  },
  {
    id: "copywriting",
    name: "High-Conversion Copywriting",
    category: "Writing",
    emoji: "✍️",
    shortDescription: "Write sales pages, emails, and landing page copies that drive revenue and action.",
    description: "Learn psychological triggers, hook frameworks, A/B landing page testing, and the exact outreach scripts to land monthly agency retainers.",
    duration: "3 Weeks",
    difficulty: "Beginner",
    salaryPotential: "$4,000 - $10,000 / mo",
    curriculum: [
      {
        id: "cp-mod-1",
        title: "Module 1: Psychological Copy Triggers",
        isOpen: true,
        lessons: [
          { id: "cp-1-1", title: "Pain Points vs Pleasures", status: "completed" },
          { id: "cp-1-2", title: "The AIDA Copywriting Framework", status: "active" },
          { id: "cp-1-3", title: "Writing Compelling Headlines", status: "locked" },
        ],
      },
      {
        id: "cp-mod-2",
        title: "Module 2: High-Value Copy Mediums",
        isOpen: false,
        lessons: [
          { id: "cp-2-1", title: "SaaS Landing Page Copy", status: "locked" },
          { id: "cp-2-2", title: "E-Commerce Email Flows", status: "locked" },
          { id: "cp-2-3", title: "Ad Copy for Social Ads", status: "locked" },
        ],
      },
    ],
    initialMessages: [
      {
        id: "cp-msg-1",
        role: "ai",
        content: "Hey, writer! ✍️ Ready to learn how to make words print money? Today we're looking at **AIDA**. Ever heard of this copywriting formula?",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "cp-msg-2",
        role: "user",
        content: "No, never heard of it. What does it stand for?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: "cp-msg-3",
        role: "ai",
        content: "AIDA stands for **Attention, Interest, Desire, Action**. It's the blueprint for almost every high-converting ad, email, and landing page on earth. First, you grab their attention. Then, build interest. Then, create intense desire. Finally, tell them to act. Let's practice attention: how would you grab the attention of a busy CEO in a cold email?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
    replies: [
      "That's a start, but CEOs get 100 emails a day. A headline like 'Quick Question' is ignored. We need immediate personalization. 🎯",
      "Try this instead: reference a specific problem they have. E.g., '1 flaw in your homepage mobile checkout' — that gets attention.",
      "Excellent. Once you have attention, you build interest. You do this by revealing a data-backed fact, not generic claims.",
      "Now, for desire. Show them what life looks like after solving the problem (e.g., 'adding $40k/mo in sales'). Show, don't tell.",
      "Finally, action (CTA). Don't ask for a 30-min meeting. Ask for a low-friction reply, like 'Mind if I send over a 2-min loom breakdown?'",
      "Brilliant! You just wrote a high-response outreach email. Let's move on to writing SaaS headlines that convert.",
    ],
  },
  {
    id: "marketing",
    name: "Growth Marketing & Ads",
    category: "Marketing",
    emoji: "📣",
    shortDescription: "Launch and scale profit-making Meta, Google, and TikTok ad campaigns for businesses.",
    description: "Learn standard media buying, budget optimization, custom retargeting setups, and how to analyze key ad KPIs to maintain high ROAS.",
    duration: "4 Weeks",
    difficulty: "Intermediate",
    salaryPotential: "$5,000 - $15,000 / mo",
    curriculum: [
      {
        id: "gm-mod-1",
        title: "Module 1: Media Buying Basics",
        isOpen: true,
        lessons: [
          { id: "gm-1-1", title: "Setting up Pixel & CAPI", status: "completed" },
          { id: "gm-1-2", title: "Campaign Structure (CBO vs ABO)", status: "active" },
          { id: "gm-1-3", title: "Audience Testing & Scoping", status: "locked" },
        ],
      },
      {
        id: "gm-mod-2",
        title: "Module 2: Creative Strategy",
        isOpen: false,
        lessons: [
          { id: "gm-2-1", title: "Ad Angles & Hook Testing", status: "locked" },
          { id: "gm-2-2", title: "High ROAS UGC Formats", status: "locked" },
        ],
      },
    ],
    initialMessages: [
      {
        id: "gm-msg-1",
        role: "ai",
        content: "Let's make some noise! 📣 Today we're looking at Meta Ads structure: **CBO (Campaign Budget Optimization) vs ABO (Ad Set Budget Optimization)**. Ever run a paid ad before?",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: "gm-msg-2",
        role: "user",
        content: "No, never. What's the difference between campaign and ad set budgets?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: "gm-msg-3",
        role: "ai",
        content: "Super simple: In ABO, you decide exactly how much budget each target audience gets (e.g. $20/day on 'gym-goers', $20/day on 'golfers'). In CBO, you feed Meta a lump sum (e.g. $40/day total), and Meta's AI dynamically distributes it to whichever audience is performing better in real-time. Which one sounds better for testing new ideas?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
    replies: [
      "Actually, ABO is usually better for testing! It forces Meta to spend equal amounts on each audience so you get clean data. 📊",
      "But once you know which audience works, you move them into a CBO campaign and let Meta scale it up.",
      "Let's check KPIs. If you spend $100 on ads, get 5 sales at $50 revenue each. What is your ROAS (Return on Ad Spend)?",
      "Spot on! 2.5x ROAS ($250 revenue / $100 ad spend). That means for every $1 in, you get $2.50 out.",
      "Now, let's talk about frequency. If your ad frequency hits 4.0 in a week, what does that mean, and what should you do?",
      "Nailed it. It means people have seen your ad 4 times on average, leading to ad fatigue. Time to load fresh creatives!",
    ],
  },
];
