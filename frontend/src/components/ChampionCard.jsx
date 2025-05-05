/**
 * © 2025 LoL Edge – All rights reserved.
 * ChampionCard.jsx
 * Reusable component for displaying a champion's icon, name, and score.
 * Typically used in performance or winrate summaries.
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import React from 'react';
import { getChampionIcon } from '../data/getChampionImageURL';

// ----------------------------------------
// Component: ChampionCard
// Props:
//   - champion: string (name of champion)
//   - score: number (custom metric: winrate, performance, etc.)
// ----------------------------------------

export default function ChampionCard({ champion, score }) {
  const championImgUrl = getChampionIcon(champion);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      {/* Champion Icon */}
      <img
        src={championImgUrl}
        alt={champion}
        className="w-24 h-24 rounded-full border-2 border-blue-400 mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallbacks/champion.png';
        }}
      />

      {/* Champion Name */}
      <h3 className="text-xl font-bold text-white">{champion}</h3>

      {/* Score (Winrate or Custom Stat) */}
      <p className="text-green-400 mt-2">Score: {score}</p>
    </div>
  );
}
