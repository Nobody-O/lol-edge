// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// LoadingSpinner.jsx
// Simple spinning loader component used while data is being fetched.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React from 'react';

// ----------------- LoadingSpinner Component -----------------
export default function LoadingSpinner() {
  // ----------------- Render -----------------
  return (
    <div className="flex justify-center items-center mt-10">
      {/* Animated Loader Circle */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
