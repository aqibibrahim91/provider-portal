/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-bg-body": "#f6f6f6",
        "custom-bg-green": "#5b8579",
        "custom-bg-approved": "#e1f9f0",
        "custom-bg-rejected": "#ffe2e0",
        "custom-bg-under-review": "#ffece7",
      },
      colors: {
        green: "#18a16f",
        orange: "#ff7e5b",
        red: "#c7003c",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        arabic: ["var(--font-arabic)"],
      },
    },
  },
  plugins: [],
};
