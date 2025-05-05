import React from 'react';

export default function TeamSelector({
  champions,
  selectedAllies,
  selectedEnemies,
  setSelectedAllies,
  setSelectedEnemies,
}) {
  const handleAllyClick = (champion) => {
    if (!selectedAllies.includes(champion)) {
      setSelectedAllies([...selectedAllies, champion]);
    }
  };

  const handleEnemyClick = (champion) => {
    if (!selectedEnemies.includes(champion)) {
      setSelectedEnemies([...selectedEnemies, champion]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Your Team</h2>
        <div className="flex flex-wrap gap-2">
          {champions.map((champ) => (
            <button
              key={champ}
              onClick={() => handleAllyClick(champ)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              {champ}
            </button>
          ))}
        </div>
        <p className="text-gray-400 mt-2">
          Selected Allies: {selectedAllies.join(', ')}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Enemy Team</h2>
        <div className="flex flex-wrap gap-2">
          {champions.map((champ) => (
            <button
              key={champ}
              onClick={() => handleEnemyClick(champ)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              {champ}
            </button>
          ))}
        </div>
        <p className="text-gray-400 mt-2">
          Selected Enemies: {selectedEnemies.join(', ')}
        </p>
      </div>
    </div>
  );
}
