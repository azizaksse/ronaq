import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        "green-1": "var(--green-1)",
        "green-2": "var(--green-2)",
        mint: "var(--mint)",
        glass: "var(--glass-white)",
        charcoal: "var(--charcoal)",
      },
      fontFamily: {
        sans: ["var(--font-kufi)", ...fontFamily.sans],
      },
      boxShadow: {
        glass: "0 25px 80px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "liquid-glass":
          "radial-gradient(circle at 20% 20%, rgba(185,246,202,0.2), transparent 55%), radial-gradient(circle at 80% 0%, rgba(46,125,50,0.5), transparent 50%), linear-gradient(135deg, #0e1a14 0%, #1b5e20 50%, #2e7d32 100%)",
      },
      animation: {
        float: "float-slow 12s ease-in-out infinite",
        pulseGlow: "pulse-glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
