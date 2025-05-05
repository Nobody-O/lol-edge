// ----------------- Imports -----------------
import React from 'react';

// ----------------- ErrorCard Component -----------------

export default function ErrorCard({ message }) {
  return (
    <div
      className="bg-red-600 text-white p-4 rounded-lg shadow-md text-center max-w-xl mx-auto mt-6"
      role="alert"
      aria-live="assertive"
    >
      {/* Error Message Display */}
      <p className="font-semibold">{message}</p>
    </div>
  );
}
