import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          950: "#070e0a",
          900: "#0c1510",
          850: "#111d16",
          800: "#16261d",
          750: "#1a2e23",
          700: "#223d2e",
        },
        pista: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        sage: {
          muted: "#9dbba8",
          subtle: "#6d8977",
          border: "#1d3326",
          glass: "rgba(23, 40, 30, 0.65)",
        },
        status: {
          pass: "#4ade80",
          warn: "#fbbf24",
          crit: "#f87171",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "pista-glow": "0 0 40px -10px rgba(134, 239, 172, 0.25)",
        "pista-button": "0 0 25px -4px rgba(134, 239, 172, 0.4)",
        "velvet-depth": "0 30px 60px -15px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "velvet-radial":
          "radial-gradient(ellipse at 50% 0%, rgba(134, 239, 172, 0.08) 0%, transparent 60%)",
        "velvet-sheen":
          "radial-gradient(ellipse at 80% 20%, rgba(187, 247, 208, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(74, 222, 128, 0.04) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
