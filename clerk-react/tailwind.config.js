/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gunmetal : '#2D3142',
        silver : '#BFC0C0',
        coral : '#EF8354',
        paynegrey : '#4F5D75',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}

