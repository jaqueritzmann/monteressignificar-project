/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'offwhite': '#FFEFD4',
        'yellow': '#F8B82D',
        'gold': '#CE8A39',
        'terracotta': '#A44819',
        'green-light': '#A3CFCE',
        'green-dark': '#7D7932',
        'green-olive': '#3F4021',
        // Mantendo compatibilidade com nomes antigos
        'bg-main': '#FFEFD4',
        'accent-primary': '#A44819',
        'accent-secondary': '#F8B82D',
      },
      maxWidth: {
        'container': '1440px',
      },
      fontFamily: {
        'title': ['Bree Serif', 'serif'],
        'body': ['DM Sans', 'sans-serif'],
        'highlight': ['Caveat', 'cursive'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '32px',
      },
      spacing: {
        'section': '64px',
        'section-lg': '96px',
      },
    },
  },
  plugins: [],
}

