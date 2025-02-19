import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGreen: "#96F19A",
        darkGreen: "#00604D",
        customGreen: "rgba(0, 35, 38, 0.5)",
        customOrange: "rgba(211, 138, 11, 1)",
        customRed: "rgba(204, 68, 37, 1)",
        customBlack: "rgba(0, 35, 38, 1)",
        customWhite: "#F6F6F6",
      },
      fontFamily: {
        henriette: ["Henriette", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
