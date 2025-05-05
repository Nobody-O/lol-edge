// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// MatchCardSkeleton.jsx
// Displays a placeholder skeleton for match history while loading.
// Styled to match the real MatchCard component layout for a smooth UX.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React from 'react';

// ----------------- Component -----------------
export default function MatchCardSkeleton() {
  return (
    <div className="rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-800 animate-pulse">
      {/* Left Section: Champion Icon + Basic Info */}
      <div className="flex items-center gap-3 w-full md:w-1/3">
        {/* Circle representing champion icon */}
        <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600" />
        {/* Simulated text lines for champ name, queue, and date */}
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-700 rounded" />
          <div className="w-20 h-3 bg-gray-700 rounded" />
          <div className="w-16 h-2 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Center Section: KDA, CS, Spells, Items */}
      <div className="flex flex-col items-center gap-2 md:w-1/3">
        <div className="w-24 h-5 bg-gray-700 rounded" /> {/* KDA */}
        <div className="w-32 h-3 bg-gray-700 rounded" /> {/* CS + duration */}
        {/* Spell icons (2 placeholder boxes) */}
        <div className="flex gap-1">
          <div className="w-5 h-5 bg-gray-700 rounded" />
          <div className="w-5 h-5 bg-gray-700 rounded" />
        </div>
        {/* Item icons (7 placeholder boxes) */}
        <div className="flex gap-1 flex-wrap justify-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-700 rounded" />
          ))}
        </div>
      </div>

      {/* Right Section: Result & Queue */}
      <div className="flex flex-col items-end md:w-1/3 gap-2">
        <div className="w-20 h-4 bg-gray-700 rounded" /> {/* Victory/Defeat */}
        <div className="w-24 h-3 bg-gray-700 rounded" /> {/* Queue name */}
      </div>
    </div>
  );
}
