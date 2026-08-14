/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {keyframes: {
    expand: {
      "0%": { maxHeight: "0", opacity: "0" },
      "100%": { maxHeight: "500px", opacity: "1" },
    },
    collapse: {
      "0%": { maxHeight: "500px", opacity: "1" },
      "100%": { maxHeight: "0", opacity: "0" },
    },
  },
  animation: {
    expand: "expand 0.3s ease-out forwards",
    collapse: "collapse 0.3s ease-in forwards",
        },
    },
    plugins: [],
}
}
