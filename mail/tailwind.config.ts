import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("tailwindcss-preset-email")],
  content: [
    "./components/**/*.html",
    "./emails/**/*.html",
    "./layouts/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
      },
    },
  },
};

export default config;
