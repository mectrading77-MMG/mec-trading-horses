import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#17140F",
          soft: "#221E17",
          line: "rgba(23,20,15,0.12)"
        },
        ivory: {
          DEFAULT: "#F7F2E7",
          dim: "#EFE8D8"
        },
        sand: {
          DEFAULT: "#CBB68C",
          light: "#E4D7BE"
        },
        gold: {
          DEFAULT: "#B08D57",
          bright: "#C7A468"
        },
        hunter: {
          DEFAULT: "#1F3327",
          soft: "#2A4433"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      letterSpacing: {
        eyebrow: "0.22em"
      },
      maxWidth: {
        editorial: "1440px"
      },
      transitionDuration: {
        400: "400ms"
      }
    }
  },
  plugins: []
};

export default config;
