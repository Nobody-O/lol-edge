import React from 'react';
import { getChampionIcon } from '../data/getChampionImageURL';

export default function ChampionCard({ champion, score }) {
  const championImgUrl = getChampionIcon(champion);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <img
        src={championImgUrl}
        alt={champion}
        className="w-24 h-24 rounded-full border-2 border-blue-400 mb-4"
        onError={(e) => {
          e.target.src = '/fallbacks/champion.png';
        }}
      />
      <h3 className="text-xl font-bold text-white">{champion}</h3>
      <p className="text-green-400 mt-2">Score: {score}</p>
    </div>
  );
}
