/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"], // Mandatory comma here
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "card-border": "var(--card-border)",
      },
      backgroundImage: {
        "card-gradient": "var(--card-bg)",
      },
      boxShadow: {
        "bg-glow": "var(--card-hover-shadow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config