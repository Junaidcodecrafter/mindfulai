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
        background: "#0f172a", // Slate 900
        surface: "#1e293b", // Slate 800
        primary: "#10b981", // Emerald 500 (Calming Green)
        secondary: "#3b82f6", // Blue 500
        accent: "#0ea5e9", // Sky 500
      },
    },
  },
  plugins: [],
};
export default config;
