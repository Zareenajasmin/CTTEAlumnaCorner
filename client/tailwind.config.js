const flowbite = require("flowbite-react/tailwind");
const lineClamp = require('@tailwindcss/line-clamp');
const scrollbar = require("tailwind-scrollbar") // Add this line


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(),lineClamp,scrollbar,
  ],
}