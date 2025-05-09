// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// WinrateGraph.jsx
// Displays a pie chart and match summary: winrate, KDA, CS, Damage, KP.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// ----------------- WinrateGraph Component -----------------
export default function WinrateGraph({ matches }) {
  // Skip if no match data available
  if (!matches || matches.length === 0) return null;

  const validMatches = matches.filter(
    (match) => match.info && match.info.participants
  );
  const totalGames = validMatches.length;

  const userPuuid = matches[0]?.userPuuid;
  if (!userPuuid || totalGames === 0) return null;

  // Get participant data for the user
  const userGames = validMatches
    .map((match) => match.info.participants.find((p) => p.puuid === userPuuid))
    .filter(Boolean);

  if (userGames.length === 0) return null;

  // Win/Loss calculation
  const wins = userGames.filter((p) => p.win).length;
  const losses = totalGames - wins;
  const winrate = Math.round((wins / totalGames) * 100);

  // Aggregation helpers
  const sum = (fn) =>
    userGames.reduce((acc, player) => acc + (fn(player) || 0), 0);
  const avg = (total) => Math.round(total / totalGames);

  // Calculate averages
  const avgKills = avg(sum((p) => p.kills));
  const avgDeaths = avg(sum((p) => p.deaths));
  const avgAssists = avg(sum((p) => p.assists));
  const avgCS = avg(sum((p) => p.totalMinionsKilled));
  const avgDmg = avg(sum((p) => p.totalDamageDealtToChampions));

  // Kill Participation (backend provided)
  const totalKP = matches.reduce(
    (acc, m) => acc + (m.killParticipation || 0),
    0
  );
  const avgKP = Math.round(totalKP / matches.length);

  // Chart.js data structure
  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: ['#4ade80', '#f87171'], // green/red
        borderWidth: 0,
      },
    ],
  };

  // ----------------- Render -----------------
  return (
    <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-white text-xl font-bold mb-4">📊 Match Summary</h2>

      {/* Pie Chart */}
      <div className="w-56 mb-4">
        <Pie data={data} aria-label="Win/Loss Pie Chart" />
      </div>

      {/* Summary Text Stats */}
      <p className="text-gray-300 text-sm mb-1">
        Total Games: {totalGames} • Winrate: {winrate}%
      </p>
      <p className="text-gray-400 text-sm mb-1">
        Average KDA: {avgKills} / {avgDeaths} / {avgAssists}
      </p>
      <p className="text-gray-400 text-sm mb-1">Average CS: {avgCS}</p>
      <p className="text-gray-400 text-sm mb-1">Avg Damage: {avgDmg}</p>
      <p className="text-gray-400 text-sm">Kill Participation: {avgKP}%</p>
    </div>
  );
}
