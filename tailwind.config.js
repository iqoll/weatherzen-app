/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: '#B5A1E5', 
        onPrimary: '#100E17', 
        background: '#131214',
        onBackground: '#EAE6F2',
        surface: '#1D1C1F',
        onSurface: '#DDDAE5',
        onSurfaceVariant: '#7B7980', 
        onSurfaceVariant2: '#B9B6BF',
        outline: '#3E3D40',
        bgAqi1: '#89E589',
        onBgAqi1: '#1F331F',
        bgAqi2: '#E5DD89',
        onBgAqi2: '#33311F',
        bgAqi3: '#E5C089',
        onBgAqi3: '#332B1F',
        bgAqi4: '#E58989',
        onBgAqi4: '#331F1F',
        bgAqi5: '#E589B7',
        onBgAqi5: '#331F29',
        white: 'hsl(0, 0%, 100%)',
        whiteAlpha4: 'hsla(0, 0%, 100%, 0.04)',
        whiteAlpha8: 'hsla(0, 0%, 100%, 0.08)',
        blackAlpha10: 'hsla(0, 0%, 0%, 0.1)',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        materialSymbol: ['Material Symbols Outlined', 'sans-serif']
      },
      backgroundImage: {
        gradient1: 'linear-gradient(180deg, hsla(270, 5%, 7%, 0) 0%, hsla(270, 5%, 7%, 0.8) 65%, hsl(270, 5%, 7%) 100%)',
        gradient2: 'linear-gradient(180deg, hsla(260, 5%, 12%, 0) 0%, hsla(260, 5%, 12%, 0.8) 65%, hsl(260, 5%, 12%) 100%)'
      },
      borderRadius: {
        radiusPill: '500px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}