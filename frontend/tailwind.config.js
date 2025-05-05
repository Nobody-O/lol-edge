/** @type {import('tailwindcss').Config} */
export default {
  // Files Tailwind should scan for class names
  content: [
    './index.html', // Main HTML entry
    './src/**/*.{js,ts,jsx,tsx}', // All frontend files (JavaScript + TypeScript)
  ],

  // Theme customization (extend as needed)
  theme: {
    extend: {
      // You can extend fonts, colors, spacing, etc. here if needed
    },
  },

  // Add plugins here if using Tailwind plugins like typography/forms/aspect-ratio
  plugins: [],
};
