/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.hbs',
    './src/**/*.{ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#3d9e8e',
          dark: '#2c7a6c',
          light: '#b2ddd7',
          pale: '#e8f5f3',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
