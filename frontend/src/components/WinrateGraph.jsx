// ----------------- Imports -----------------
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// ----------------- WinrateGraph Component -----------------
export default function WinrateGraph({ matches }) {
  if (!matches || matches.length === 0) return null;

  const validMatches = matches.filter(
    (match) => match.info && match.info.participants
  );

  const totalGames = validMatches.length;
  const userPuuid = matches[0]?.userPuuid;
  if (!userPuuid || totalGames === 0) return null;

  const userGames = validMatches
    .map((match) => match.info.participants.find((p) => p.puuid === userPuuid))
    .filter(Boolean);

  if (userGames.length === 0) return null;

  const wins = userGames.filter((p) => p.win).length;
  const losses = totalGames - wins;
  const winrate = Math.round((wins / totalGames) * 100);

  const sum = (fn) =>
    userGames.reduce((acc, player) => acc + (fn(player) || 0), 0);

  const avg = (total) => Math.round(total / totalGames);

  const avgKills = avg(sum((p) => p.kills));
  const avgDeaths = avg(sum((p) => p.deaths));
  const avgAssists = avg(sum((p) => p.assists));
  const avgCS = avg(sum((p) => p.totalMinionsKilled));
  const avgDmg = avg(sum((p) => p.totalDamageDealtToChampions));

  const totalKP = sum((p) => p.kills + p.assists);
  const totalTeamKills = sum((p) => p.teamKills || 0);
  const avgKP =
    totalTeamKills > 0 ? Math.round((totalKP / totalTeamKills) * 100) : 0;

  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: ['#4ade80', '#f87171'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-white text-xl font-bold mb-4">📊 Match Summary</h2>

      <div className="w-56 mb-4">
        <Pie data={data} aria-label="Win/Loss Pie Chart" />
      </div>

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
