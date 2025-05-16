/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#06202B",
        secondary: "#077A7D",
        foreground: "#09122C",
        muted: "#574964",
        card: "#7AE2CF",
        primary: "#003092",
        "muted-foreground": "#1D1616",
      },
    },
  },
  plugins: [],
};
