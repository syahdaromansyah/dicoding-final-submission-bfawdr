import twDefaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...twDefaultTheme.fontFamily.sans],
        'space-grotesk': ["'Space Grotesk'", ...twDefaultTheme.fontFamily.sans],
        'jetbrains-mono': [
          "'Jetbrains Mono'",
          ...twDefaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  plugins: [],
};
