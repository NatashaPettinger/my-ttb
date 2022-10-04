/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.jsx",
    ".src/pages/**/*.jsx",  
    ".src/components/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'darkblue-100': 'rgba(35, 54, 61, 0.1)',
        'darkblue-200': 'rgba(35, 54, 61, 0.2)',
        'darkblue-500': 'rgba(35, 54, 61, 0.7)',
        'darkblue-600': 'rgba(35, 54, 61, .9)',
        'darkblue-700': 'rgba(35, 54, 61, 1)',
        'white': '#f7f5f2',
      },
    },
  },
  plugins: [/* require('@tailwindcss/forms'), */ require("@tailwindcss/typography"), require("daisyui")],
}