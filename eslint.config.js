const babelParser = require('@babel/eslint-parser');
// const reactPlugin = require('eslint-plugin-react');
// const reactHooksPlugin = require('eslint-plugin-react-hooks'); // Import react-hooks plugin

module.exports = {
  languageOptions: {
    parser: babelParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      React: 'readonly',
      self: 'readonly',
    },
  },
  plugins: {
    react: require('eslint-plugin-react'),          // React plugin as an object
    'react-hooks': require('eslint-plugin-react-hooks'), // React hooks plugin as an object
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',  // Use the recommended rules for React
  ],
  rules: {
    'no-restricted-globals': [
      'error',
      {
        name: 'self',
        message: "'self' is a valid global in service workers.",
      },
    ],
    'react/react-in-jsx-scope': 'off', // React 17+ no longer needs React in scope
    'react/jsx-uses-react': 'off',    // Disable JSX-specific rules for React 17+
    'react-hooks/exhaustive-deps': 'warn', // Enable the exhaustive-deps rule
  },
  settings: {
    'babel': {
      requireConfigFile: false, // Disable Babel config file checking
    },
  },
};
