/** @type {import('tailwindcss').Config} */
import preset from "../../packages/config/tailwind.preset.js";

module.exports = {
  presets: [preset],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
};
