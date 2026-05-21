import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#f7f9fc",
        graphite: "#ffffff",
        steel: "#5f6b7a",
        mist: "#111827",
        ink: "#14171f",
        chingBlue: "#4f8fd8",
        chingViolet: "#4b48a5",
        mitutoyo: "#f36b21",
        siemens: "#008f7e",
        coolant: "#2d7fd1"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        "cold-glow": "0 0 42px rgba(116, 215, 255, 0.18)",
        "orange-glow": "0 0 38px rgba(243, 107, 33, 0.24)",
        "green-glow": "0 0 40px rgba(0, 193, 178, 0.22)"
      },
      backgroundImage: {
        "precision-grid":
          "linear-gradient(rgba(233,238,242,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(233,238,242,0.045) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
