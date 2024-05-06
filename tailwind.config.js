const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    container: {
      center: true,
      screens: {
        ...defaultTheme.screens,
        '2xl': '1440px',
        'fhd': '1920px',
        'tv': '2560px',
      },
    },
    fontFamily: {
      sans: ['circe', 'sans-serif'],
    },
    extends: {
      screens: {
        '2xl': '1440px',
        'fhd': '1920px',
        'tv': '2560px',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
