// ----------------- Imports -----------------
import React, { useState } from 'react';
import {
  FALLBACK_ICON,
  getChampionIcon,
  getItemIcon,
  getSummonerSpellIcon,
} from '../data/getChampionImageURL';
import MatchModal from './MatchModal';

// ----------------- MatchCard Component -----------------
export default function MatchCard({ match, puuid }) {
  if (!match?.info?.participants) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-300">
        Invalid Match Data
      </div>
    );
  }

  const user = match.info.participants.find(
    (p) => p.puuid === (puuid || match.userPuuid)
  );
  if (!user) return null;

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

  const spellMap = {
    1: 'Boost', // boost
    3: 'Exhaust',
    4: 'Flash',
    6: 'Haste', //haste
    7: 'Heal',
    11: 'Smite',
    12: 'Teleport',
    13: 'Clarity',
    14: 'Dot',
    21: 'Barrier',
    32: 'Mark',
  };

  const getSpellName = (id) => spellMap[id] || 'Dot';

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className={`rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 ${
          win ? 'bg-green-900/30' : 'bg-red-900/30'
        } hover:scale-105 transition cursor-pointer`}
        onClick={() => setModalOpen(true)}
      >
        {/* Left: Champ Info */}
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <img
            src={getChampionIcon(championName)}
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

        {/* Center: Stats */}
        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <div className="text-white font-semibold text-xl">
            {kills}/{deaths}/{assists}
          </div>
          <div className="text-sm text-gray-400">
            {totalMinionsKilled} CS • {duration}
          </div>

          <div className="flex gap-1">
            {[summoner1Id, summoner2Id].map((id, i) => {
              const spell = getSpellName(id);
              const fallback =
                spell === 'Ignite'
                  ? '/fallbacks/spell_Ignite.png'
                  : spell === 'Cleanse'
                  ? '/fallbacks/spell_Cleanse.png'
                  : spell === 'Ghost'
                  ? '/fallbacks/spell_Ghost.png'
                  : FALLBACK_ICON;
              return (
                <img
                  key={i}
                  src={getSummonerSpellIcon(spell)}
                  alt={spell}
                  title={spell}
                  className="w-5 h-5"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallback;
                  }}
                />
              );
            })}
          </div>

          <div className="flex gap-1 flex-wrap justify-center">
            {[item0, item1, item2, item3, item4, item5, item6].map(
              (item, i) => (
                <img
                  key={i}
                  src={getItemIcon(item)}
                  alt={`Item ${item}`}
                  title={`Item ID: ${item}`}
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

        {/* Right: Result */}
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
