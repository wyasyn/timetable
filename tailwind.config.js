/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        secondary: "#141414",
        foreground: "#f0f0f0",
        muted: "#7f7f7f",
        card: "#292929",
        primary: "#0b63e5",
        "muted-foreground": "#9d9d9d",
      },
    },
  },
  plugins: [],
};
