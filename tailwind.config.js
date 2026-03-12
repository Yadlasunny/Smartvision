/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: "#2EE6D6", 400: "#2EE6D6", 500: "#1bc9b9" },
        yellow: { DEFAULT: "#F5B400", 400: "#F5B400", 500: "#d9a000" },
        dark: { DEFAULT: "#0B0B0B", 800: "#111111", 700: "#1a1a1a", 600: "#222222" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
