/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'vietnam-red': '#DA251D',
        'vietnam-yellow': '#FFCD00',
        'vietnam-gold': '#ffd700',
        'vietnam-brown': '#A0522D',
        'vietnam-green': '#006233',
        'slate-100': '#f1f5f9'
      },
      fontFamily: {
        'sans': ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Times New Roman', 'serif'],

        // Hoặc 
        // 'sans': ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        // 'serif': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],

        // Hoặc
        // 'sans': ['"Noto Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        // 'serif': ['"EB Garamond"', 'Georgia', 'Times New Roman', 'serif'],

      },
      backgroundImage: {
        'hero': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

