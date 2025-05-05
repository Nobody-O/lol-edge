// ----------------- Imports -----------------
import React from 'react';
import championIdToName from '../data/championIdToName';
import { FALLBACK_ICON, getChampionIcon } from '../data/getChampionImageURL';

// ----------------- TopChampions Component -----------------
export default function TopChampions({ champions }) {
  if (!champions || champions.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">
        Top Champions
      </h3>

      <div className="flex flex-wrap gap-6">
        {champions.map((champ, index) => {
          const champId = Number(champ.championId);
          const championName = championIdToName[champId] || 'Unknown';
          const iconUrl = getChampionIcon(championName);

          return (
            <div
              key={champId}
              className="flex flex-col items-center text-center w-24"
            >
              <img
                src={iconUrl}
                alt={championName}
                className="w-16 h-16 rounded-full border-2 border-gray-400 mb-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    championName?.toLowerCase() === 'fiddlesticks'
                      ? '/fallbacks/champion_Fiddlesticks.png'
                      : FALLBACK_ICON;
                }}
              />
              <p className="text-white text-xs truncate">{championName}</p>
              <p className="text-yellow-400 text-xs">
                {champ.championPoints.toLocaleString()} pts
              </p>
              <p className="text-gray-400 text-xs">
                Level {champ.championLevel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
