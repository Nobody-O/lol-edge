/**
 * © 2025 LoL Edge — All rights reserved.
 * ErrorCard.jsx
 * Displays a simple red alert box for errors such as API failures or user input issues.
 */

// ----------------- Imports -----------------
import React from 'react';

// ----------------- ErrorCard Component -----------------
// Props: message (string to be displayed inside the alert)
export default function ErrorCard({ message }) {
  return (
    <div
      className="bg-red-600 text-white p-4 rounded-lg shadow-md text-center max-w-xl mx-auto mt-6"
      role="alert"
      aria-live="assertive"
    >
      {/* Main Error Message */}
      <p className="font-semibold">{message}</p>
    </div>
  );
}
