/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'serviceArt1': "url('/src/assets/images/service-art1.svg')",
        'serviceArt2': "url('/src/assets/images/service-art2.svg')",
        'dashBoardGraphic': "url('/src/assets/images/dashboard-graphic.svg')",
        'arrowDown': "url('/src/assets/icons/arrow-down.svg')",
      },
    },
    fontFamily: {
      Karla: ['Karla', 'sans-serif'],
      Inter: ['Inter', 'sans-serif']
    },
    screens: {
      'xs': '320px',
      // => @media (min-width: 475px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    colors: { 
      transparent: 'transparent',
      'black': '#000000',
      'default-bg': '#F9FAFC',
      'slate-grey': '#EFF2F7',
      'white': '#ffffff',
      'light-bg2':'#556EE61A',
      'dark': '#0D0F46', 
      'dark2': '#495057',
      'blueDark': '#48588C',
      'light-bg': '#F4F4F8',
      'light-dark': '#535768',
      'light-gray': '#94A3B8', 
      'primary': '#0089FF',
      'light-green': '#37C292',
      'danger': '#F46A6A',
      'module-border': '#E8E6EE',
      'input-border': '#A0A9AE',
      'input-border2': '#CED4DA',
      'text-dark': '#24374E',
      'light-grey': '#687992',
      'light-border': '#E7EBEE',
      'light-border2': '#C9D1D6',
      'error': '#ff0000',
      'active': '#30E0A1'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}