/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c8d89',
        'primary-dark': '#4a7571',
        border: '#d4cdb7',
        text: {
          DEFAULT: '#2d4544',
          light: '#5c8d89'
        }
      },
    },
  },
  plugins: [],
}