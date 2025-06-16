module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['**/tailwind.config.js', '**/babel.config.js'],
      parser: 'espree', // 기본 JS 파서로 fallback
      rules: {
        // 필요하면 eslint rules 해제
      },
    },
  ],
  parserOptions: {
    requireConfigFile: false,
  },
};
