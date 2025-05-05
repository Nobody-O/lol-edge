// ---------------------------------------------------
// MatchCardSkeleton.jsx
// Placeholder while match data is loading
// Styled to match the MatchCard layout exactly
// ---------------------------------------------------

import React from 'react';

export default function MatchCardSkeleton() {
  return (
    <div className="rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-800 animate-pulse">
      {/* Left: Champion Icon + Basic Info */}
      <div className="flex items-center gap-3 w-full md:w-1/3">
        <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-700 rounded" />
          <div className="w-20 h-3 bg-gray-700 rounded" />
          <div className="w-16 h-2 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Center: KDA, CS, Spells, Items */}
      <div className="flex flex-col items-center gap-2 md:w-1/3">
        <div className="w-24 h-5 bg-gray-700 rounded" />
        <div className="w-32 h-3 bg-gray-700 rounded" />
        <div className="flex gap-1">
          <div className="w-5 h-5 bg-gray-700 rounded" />
          <div className="w-5 h-5 bg-gray-700 rounded" />
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-700 rounded" />
          ))}
        </div>
      </div>

      {/* Right: Result */}
      <div className="flex flex-col items-end md:w-1/3 gap-2">
        <div className="w-20 h-4 bg-gray-700 rounded" />
        <div className="w-24 h-3 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
