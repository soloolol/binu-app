/** @type {import('tailwindcss').Config} */
const preset = require('../../packages/config/tailwind.preset');

module.exports = {
  presets: [preset, require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        source: ['SourceSerif4-Regular'],
        'source-light': ['SourceSerif4-Light'],
        'source-semi-bold': ['SourceSerif4-SemiBold'],
        'source-bold': ['SourceSerif4-Bold'],
        'source-extra-bold': ['SourceSerif4-ExtraBold'],
      },
      colors: {
        primary: '#a1f4de',
        dark: '#1b2824',
      },
    },
    keyframes: {
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-18%)',
          'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'translateY(0) scaleX(1.1) scaleY(0.9)',
          'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    animation: {
      bounce: 'bounce 2s infinite',
    },
  },
};
