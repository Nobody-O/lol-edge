// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// LiveBanner.jsx
// Displays a banner notification when the summoner is currently in a live game.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React from 'react';

// ----------------- LiveBanner Component -----------------
export default function LiveBanner({ game }) {
  // Safety check — return nothing if game data is not available
  if (!game) return null;

  // ----------------- Game Info Parsing -----------------
  const duration = Number(game.gameLength || 0);
  const durationMin = Math.floor(duration / 60);
  const durationSec = duration % 60;
  const formattedTime = `${durationMin}m ${durationSec}s`;

  const gameMode = game.gameMode || 'Unknown Mode';
  const queueType = game.queueType || 'Unknown Queue';

  // ----------------- Placeholder Handler -----------------
  const handleViewLiveGame = () => {
    alert('🔴 Live game viewer not yet implemented.');
  };

  // ----------------- Render Banner -----------------
  return (
    <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg mb-6 border border-red-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 animate-pulse">
        <div className="font-bold text-center md:text-left">
          🎮 LIVE NOW — {gameMode} • {formattedTime} • {queueType}
        </div>
        <button
          onClick={handleViewLiveGame}
          className="bg-white text-red-600 font-bold px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
        >
          View Live Game
        </button>
      </div>
    </div>
  );
}
