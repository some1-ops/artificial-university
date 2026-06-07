import type { Config } from "tailwindcss";

// Tailwind v4: theme tokens are defined via @theme in globals.css
// This file only configures content scanning paths
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
