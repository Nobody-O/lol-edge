// ------------------------------------------------------------
// File: eslint.config.js
// Purpose: ESLint rules for LoL Edge frontend development
// © 2025 LoL Edge — All rights reserved
// ------------------------------------------------------------

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // Ignore compiled/dist output
  { ignores: ['dist'] },

  {
    // Target all JavaScript/JSX files in project
    files: ['**/*.{js,jsx}'],

    // ----------------- Language Settings -----------------
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Enable browser environment
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: 'module', // Enable import/export
      },
    },

    // ----------------- Plugins -----------------
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // ----------------- Rules -----------------
    rules: {
      // Base JS rules (includes recommended ESLint rules)
      ...js.configs.recommended.rules,

      // Enforce React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Allow unused variables starting with uppercase or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Warn if React component is not exported as default (for HMR)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
