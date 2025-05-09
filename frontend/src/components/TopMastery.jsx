/**
 * © 2025 LoL Edge – All rights reserved.
 * TopMastery.jsx
 * Displays a user's top 3 champions by mastery points.
 * Part of the ProfileCard component group.
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import React from 'react';
import championIdToName from '../data/championIdToName';
import {
  FALLBACK_ICON,
  getChampionIcon,
  getChampionCDNName,
} from '../data/getChampionImageURL';

// ----------------------------------------
// Helper: Capitalize Champion Name
// ----------------------------------------
const capitalize = (str) =>
  typeof str === 'string'
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : 'Unknown';

// ----------------------------------------
// Component: TopMastery
// Props: masteryData (array of champion mastery objects)
// ----------------------------------------

const TopMastery = ({ masteryData }) => {
  if (!masteryData || masteryData.length === 0) return null;

  const topThree = masteryData.slice(0, 3); // Only show top 3 champions

  return (
    <div className="mt-6 bg-gray-800 rounded-xl shadow-md p-4">
      <h2 className="text-lg text-white font-semibold mb-4">
        🏆 Top Mastery Champions
      </h2>

      <div className="flex gap-5 justify-center">
        {topThree.map((champ) => {
          const champId = Number(champ.championId);
          const champName = championIdToName[champId] || 'Unknown';
          const fixedName = getChampionCDNName(champName);
          const imageUrl = getChampionIcon(fixedName);

          return (
            <div
              key={champId}
              className="flex flex-col items-center bg-gray-700 rounded-lg p-3 w-24 hover:scale-105 transition"
            >
              {/* Champion Icon */}
              <img
                src={imageUrl}
                alt={champName}
                className="w-14 h-14 rounded-full border border-gray-500 mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    champName?.toLowerCase() === 'fiddlesticks'
                      ? '/fallbacks/champion_Fiddlesticks.png'
                      : FALLBACK_ICON;
                }}
              />

              {/* Champion Name */}
              <p className="text-sm text-white font-medium">
                {capitalize(champName)}
              </p>

              {/* Level & Points */}
              <p className="text-xs text-gray-300">
                Level {champ.championLevel}
              </p>
              <p className="text-xs text-yellow-400">
                {champ.championPoints.toLocaleString()} pts
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopMastery;
