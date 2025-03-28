/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-blue":"#0064F1",
        "secondary-gray":"#EFEFEF"
      },
      boxShadow:{
        'custom': '0 0 1px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}