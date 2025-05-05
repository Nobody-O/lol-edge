// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// TeamSelector.jsx
// Component to manually select allied and enemy champions for matchup analysis.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React from 'react';

// ----------------- TeamSelector Component -----------------
export default function TeamSelector({
  champions, // Array of champion names
  selectedAllies, // Array of currently selected allies
  selectedEnemies, // Array of currently selected enemies
  setSelectedAllies, // Function to update allies
  setSelectedEnemies, // Function to update enemies
}) {
  // Add champion to selected allies (avoid duplicates)
  const handleAllyClick = (champion) => {
    if (!selectedAllies.includes(champion)) {
      setSelectedAllies([...selectedAllies, champion]);
    }
  };

  // Add champion to selected enemies (avoid duplicates)
  const handleEnemyClick = (champion) => {
    if (!selectedEnemies.includes(champion)) {
      setSelectedEnemies([...selectedEnemies, champion]);
    }
  };

  // ----------------- Render -----------------
  return (
    <div className="flex flex-col gap-6">
      {/* Ally Team Selection */}
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

      {/* Enemy Team Selection */}
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
