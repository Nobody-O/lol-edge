// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// Toast.jsx
// Brief pop-up message component with auto-dismiss behavior.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React, { useEffect } from 'react';

// ----------------- Toast Component -----------------
export default function Toast({ message, onClose }) {
  // Auto-dismiss the toast after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [onClose]);

  // ----------------- Render -----------------
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg border border-blue-500 animate-slide-up"
        title="Toast Notification"
      >
        {message}
      </div>
    </div>
  );
}
