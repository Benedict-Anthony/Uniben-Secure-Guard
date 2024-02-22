import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: "1440px",
      lg: "1230px",
      md: "760px",
      sm: "480px",
    },
    extend: {
      colors: {
        darkRed: "#992202",
        light: "#fff",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
