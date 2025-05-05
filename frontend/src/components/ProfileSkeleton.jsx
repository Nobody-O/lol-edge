// ----------------- Imports -----------------
import React from 'react';

// ----------------- ProfileSkeleton Component -----------------

export default function ProfileSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 animate-pulse flex flex-col md:flex-row items-center gap-6">
      {/* Circle Loading */}
      <div className="w-24 h-24 rounded-full bg-gray-600" />

      {/* Text Loading */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        <div className="h-6 w-40 bg-gray-600 rounded" />
        <div className="h-4 w-24 bg-gray-600 rounded" />
        <div className="h-4 w-32 bg-gray-600 rounded mt-2" />
      </div>
    </div>
  );
}
