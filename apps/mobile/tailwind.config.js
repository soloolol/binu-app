/** @type {import('tailwindcss').Config} */
const preset = require('../../packages/config/tailwind.preset');
import {platformSelect} from 'nativewind/theme';

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
  },
};
