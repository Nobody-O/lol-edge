// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// MatchCard.jsx
// Renders an individual match summary card with core stats and modal trigger.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import { useState } from 'react';
import {
  FALLBACK_ICON,
  getChampionIcon,
  getItemIcon,
  getSummonerSpellIcon,
} from '../data/getChampionImageURL';
import itemIdToName from '../data/itemIdToName';
import spellIdToName from '../data/spellIdToName';
import MatchModal from './MatchModal';

const getSpellImageName = (spellName) => {
  const overrideMap = {
    Ignite: 'Dot',
    Ghost: 'Haste',
    Cleanse: 'Boost',
    Flee: 'CherryHold',
  };
  return overrideMap[spellName] || spellName;
};

const getChampionCDNName = (champName) => {
  const overrides = {
    Fiddlesticks: 'FiddleSticks',
    Wukong: 'MonkeyKing',
    'Renata Glasc': 'Renata',
    "Bel'Veth": 'Belveth',
    "K'Sante": 'KSante',
    "Cho'Gath": 'Chogath',
    'Nunu & Willump': 'Nunu',
    'Jarvan IV': 'JarvanIV',
    'Dr. Mundo': 'DrMundo',
    LeBlanc: 'Leblanc',
  };
  return overrides[champName] || champName;
};

// ----------------- Component -----------------
export default function MatchCard({ match, puuid }) {
  if (!match?.info?.participants) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-300">
        Invalid Match Data
      </div>
    );
  }

  // Find current user's match info by PUUID
  const user = match.info.participants.find(
    (p) => p.puuid === (puuid || match.userPuuid)
  );
  if (!user) return null;

  // Destructure important fields from the user
  const {
    championName,
    kills,
    deaths,
    assists,
    win,
    totalMinionsKilled,
    summoner1Id,
    summoner2Id,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
  } = user;

  // ----------------- Mappings -----------------
  const queueMap = {
    420: 'Ranked Solo',
    440: 'Ranked Flex',
    450: 'ARAM',
  };

  const queueId = match.info.queueId;
  const queueName =
    queueMap[queueId] ||
    (match.info.gameMode === 'CLASSIC'
      ? 'Summoner’s Rift'
      : match.info.gameMode || 'Unknown');

  const duration = `${Math.floor(match.info.gameDuration / 60)}m ${
    match.info.gameDuration % 60
  }s`;
  const gameDate = new Date(match.info.gameStartTimestamp).toLocaleDateString();
  const fixedChamp = getChampionCDNName(championName);
  const [modalOpen, setModalOpen] = useState(false);

  // ----------------- Render -----------------
  return (
    <>
      <div
        className={`rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 ${
          win ? 'bg-green-900/30' : 'bg-red-900/30'
        } hover:scale-105 transition cursor-pointer`}
        onClick={() => setModalOpen(true)}
      >
        {/* Left Section: Champion Info */}
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <img
            src={getChampionIcon(fixedChamp)}
            alt={championName}
            className="w-16 h-16 rounded-full border-2 border-gray-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                championName.toLowerCase() === 'fiddlesticks'
                  ? '/fallbacks/champion_Fiddlesticks.png'
                  : FALLBACK_ICON;
            }}
          />
          <div>
            <div className="text-white font-bold text-lg">{championName}</div>
            <div className="text-gray-400 text-sm">{queueName}</div>
            <div className="text-gray-500 text-xs">{gameDate}</div>
          </div>
        </div>

        {/* Center Section: Stats & Spells */}
        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <div className="text-white font-semibold text-xl">
            {kills}/{deaths}/{assists}
          </div>
          <div className="text-sm text-gray-400">
            {totalMinionsKilled} CS • {duration}
          </div>

          {/* Spells */}
          <div className="flex gap-1">
            {[summoner1Id, summoner2Id].map((id, i) => {
              const spell = spellIdToName[id] || `Spell ID: ${id}`;
              const iconKey = getSpellImageName(spell);
              return (
                <img
                  key={i}
                  src={getSummonerSpellIcon(iconKey)}
                  alt={spell}
                  title={spell}
                  className="w-5 h-5"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_ICON;
                  }}
                />
              );
            })}
          </div>

          {/* Items */}
          <div className="flex gap-1 flex-wrap justify-center">
            {[item0, item1, item2, item3, item4, item5, item6].map(
              (item, i) => (
                <img
                  key={i}
                  src={getItemIcon(item)}
                  alt={`Item ${item}`}
                  title={itemIdToName[item] || `Item ID: ${item}`}
                  className="w-5 h-5"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_ICON;
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Right Section: Result */}
        <div className="text-right md:w-1/3">
          <div
            className={`font-bold text-lg ${
              win ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {win ? 'Victory' : 'Defeat'}
          </div>
          <div className="text-gray-400 text-sm">{queueName}</div>
        </div>
      </div>

      {/* Match Detail Modal */}
      {modalOpen && (
        <MatchModal match={match} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
