import React from 'react';
import { createPortal } from 'react-dom';
import {
  FALLBACK_ICON,
  getChampionIcon,
  getItemIcon,
  getRuneIcon,
  getSummonerSpellIcon,
} from '../data/getChampionImageURL';

export default function MatchModal({ match, onClose }) {
  if (!match || !match.info) return null;

  const { info } = match;
  const participants = info.participants || [];

  const blueTeam = participants.filter((p) => p.teamId === 100);
  const redTeam = participants.filter((p) => p.teamId === 200);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const spellMap = {
    1: 'Boost',
    3: 'Exhaust',
    4: 'Flash',
    6: 'Haste',
    7: 'Heal',
    11: 'Smite',
    12: 'Teleport',
    13: 'Clarity',
    14: 'Dot',
    21: 'Barrier',
    32: 'Mark',
  };

  const getSpellName = (id) => spellMap[id] || 'Dot';

  const renderPlayer = (player) => (
    <div
      key={player.puuid}
      className="flex items-center justify-between bg-gray-800 rounded-lg p-3 mb-1 hover:bg-gray-700 transition text-sm"
    >
      {/* Champion */}
      <div className="flex items-center gap-2 w-1/4">
        <img
          src={getChampionIcon(player.championName)}
          alt={player.championName}
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_ICON;
          }}
        />
        <div>
          <p className="text-white font-bold">{player.summonerName}</p>
          <p className="text-gray-400 text-xs">{player.championName}</p>
        </div>
      </div>

      {/* KDA + CS */}
      <div className="text-center w-1/6">
        <p className="text-white font-medium">
          {player.kills}/{player.deaths}/{player.assists}
        </p>
        <p className="text-gray-400 text-xs">{player.totalMinionsKilled} CS</p>
      </div>

      {/* Gold + Damage */}
      <div className="text-center w-1/6">
        <p className="text-yellow-400 text-sm">
          {player.goldEarned.toLocaleString()}g
        </p>
        <p className="text-red-400 text-xs">
          {player.totalDamageDealtToChampions.toLocaleString()} dmg
        </p>
      </div>

      {/* Spells */}
      <div className="flex gap-1 w-1/6">
        {[player.summoner1Id, player.summoner2Id].map((id, i) => {
          const spell = getSpellName(id);
          return (
            <img
              key={i}
              src={getSummonerSpellIcon(spell)}
              alt={spell}
              title={spell}
              className="w-5 h-5 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_ICON;
              }}
            />
          );
        })}
      </div>

      {/* Runes */}
      <div className="flex gap-1 w-1/6">
        {player.perks?.styles?.slice(0, 2).map((style, i) => {
          let iconUrl;

          if (i === 0) {
            const perkId = style?.selections?.[0]?.perk;
            if (!perkId) return null;
            iconUrl = getRuneIcon(perkId); // Primary: use selected perk icon
          } else {
            const styleId = style?.style;
            let styleName = 'Unknown';

            switch (styleId) {
              case 8100:
                styleName = 'Domination';
                break;
              case 8200:
                styleName = 'Sorcery';
                break;
              case 8300:
                styleName = 'Inspiration';
                break;
              case 8400:
                styleName = 'Resolve';
                break;
              case 8000:
                styleName = 'Precision';
                break;
            }

            iconUrl = `/fallbacks/styles/${styleName}.png`;
          }

          return (
            <img
              key={i}
              src={iconUrl}
              alt={`Rune ${i}`}
              title={`Rune ${i}`}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_ICON;
              }}
            />
          );
        })}
      </div>

      {/* Items */}
      <div className="flex gap-1 flex-wrap justify-end w-1/4">
        {[...Array(7).keys()].map((i) => {
          const id = player[`item${i}`];
          const src = getItemIcon(id);
          return (
            <img
              key={i}
              src={src}
              alt={id ? `Item ${id}` : 'Empty'}
              title={id ? `Item ID: ${id}` : 'Empty Slot'}
              className="w-6 h-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_ICON;
              }}
            />
          );
        })}
      </div>
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">
            {info.gameMode} • {formatDuration(info.gameDuration)}
          </h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-blue-400 font-bold text-sm mb-2">Blue Side</h3>
            {blueTeam.map(renderPlayer)}
          </div>
          <div>
            <h3 className="text-red-400 font-bold text-sm mb-2">Red Side</h3>
            {redTeam.map(renderPlayer)}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
