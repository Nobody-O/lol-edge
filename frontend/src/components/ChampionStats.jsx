/**
 * © 2025 LoL Edge – All rights reserved.
 * ChampionStats.jsx
 * Displays summarized performance stats per champion based on the match history.
 */

// ----------------- Imports -----------------
import React from 'react';
import championIdToName from '../data/championIdToName';
import { FALLBACK_ICON, getChampionIcon } from '../data/getChampionImageURL';

// ----------------- Helper: Calculate Per-Champion Stats -----------------
function calculateStats(matches, puuid) {
  const statsMap = {};

  matches.forEach((match) => {
    const player = match.info?.participants?.find((p) => p.puuid === puuid);
    if (!player) return;

    const champId = player.championId;
    if (!statsMap[champId]) {
      statsMap[champId] = {
        games: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
      };
    }

    const entry = statsMap[champId];
    entry.games += 1;
    entry.wins += player.win ? 1 : 0;
    entry.kills += player.kills;
    entry.deaths += player.deaths;
    entry.assists += player.assists;
    entry.cs += player.totalMinionsKilled + player.neutralMinionsKilled;
  });

  // Transform into array with winrate, KDA, CS
  const stats = Object.entries(statsMap).map(([championId, data]) => {
    const champKey = parseInt(championId);
    const name = championIdToName[champKey] || 'Unknown';
    const kda =
      data.deaths === 0
        ? (data.kills + data.assists).toFixed(2)
        : ((data.kills + data.assists) / data.deaths).toFixed(2);
    const cs = Math.round(data.cs / data.games);
    const winrate = Math.round((data.wins / data.games) * 100);

    return {
      championId: champKey,
      championName: name,
      games: data.games,
      kda,
      cs,
      winrate,
    };
  });

  // Return top 10 by number of games played
  return stats.sort((a, b) => b.games - a.games).slice(0, 10);
}

// ----------------- Component: ChampionStats -----------------
// Props: matches (array of full match JSONs)
function ChampionStats({ matches }) {
  if (!matches || matches.length === 0) return null;

  const puuid = matches[0]?.userPuuid;
  const stats = calculateStats(matches, puuid);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        🏆 Champion Stats
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-white bg-gray-800">
          <thead className="bg-gray-700 text-xs uppercase text-gray-300">
            <tr>
              <th className="px-4 py-2">Champion</th>
              <th className="px-4 py-2">KDA</th>
              <th className="px-4 py-2">CS</th>
              <th className="px-4 py-2">Winrate</th>
              <th className="px-4 py-2">Games</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((champ) => {
              const iconSrc =
                champ.championName !== 'Unknown'
                  ? getChampionIcon(champ.championName)
                  : FALLBACK_ICON;

              return (
                <tr
                  key={champ.championId}
                  className="border-t border-gray-700 hover:bg-gray-700 transition"
                >
                  {/* Champion Icon and Name */}
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={iconSrc}
                      alt={champ.championName}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_ICON;
                      }}
                    />
                    {champ.championName}
                  </td>

                  {/* Stats Columns */}
                  <td className="px-4 py-2">{champ.kda}:1</td>
                  <td className="px-4 py-2">{champ.cs} CS</td>
                  <td className="px-4 py-2">{champ.winrate}%</td>
                  <td className="px-4 py-2">{champ.games}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChampionStats;
