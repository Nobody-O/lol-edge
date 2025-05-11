/**
 * © 2025 LoL Edge – All rights reserved.
 * MatchModal.jsx – Displays full match details in a modal view.
 * Author: Nobody-O
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FALLBACK_ICON,
  getChampionIcon,
  getItemIcon,
  getRuneIcon,
  getSummonerSpellIcon,
} from '../data/getChampionImageURL';
import itemIdToName from '../data/itemIdToName';
import perkIdToName from '../data/perkIdToName';
import spellIdToName from '../data/spellIdToName';

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

export default function MatchModal({ match, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  if (!match || !match.info) return null;

  const { info } = match;
  const participants = info.participants || [];

  // Separate teams
  const blueTeam = participants.filter((p) => p.teamId === 100);
  const redTeam = participants.filter((p) => p.teamId === 200);

  // Format duration into MM:SS
  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const renderPlayer = (player) => {
    console.log('Rendering Player:', player);
    const fixedChamp = getChampionCDNName(player.championName);

    return (
      <div
        key={player.puuid}
        className="flex items-center justify-between bg-gray-800 rounded-lg p-3 mb-1 hover:bg-gray-700 transition text-sm"
      >
        <div className="flex items-center gap-2 w-1/4">
          <img
            src={getChampionIcon(fixedChamp)}
            alt={player.championName}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_ICON;
            }}
          />
          <div className="flex flex-col">
            <div className="relative group w-fit max-w-[6.5rem]">
              <span className="text-white font-medium text-sm truncate overflow-hidden whitespace-nowrap inline-block w-full">
                {player.riotIdGameName.length > 9
                  ? `${player.riotIdGameName.slice(0, 9)}...`
                  : player.riotIdGameName}
              </span>
              <div className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none z-50">
                {player.riotIdGameName}#{player.riotIdTagline || ''}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center w-1/6">
          <p className="text-white font-normal">
            {player.kills}/{player.deaths}/{player.assists}
          </p>
          <p className="text-gray-400 text-xs">
            {player.totalMinionsKilled} CS
          </p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-yellow-400 text-sm">
            {player.goldEarned.toLocaleString()}g
          </p>
          <p className="text-red-400 text-xs">
            {player.totalDamageDealtToChampions.toLocaleString()} dmg
          </p>
        </div>

        <div className="flex gap-1 w-1/6">
          {[player.summoner1Id, player.summoner2Id].map((id, i) => {
            const spell = spellIdToName[id] || `Spell ID: ${id}`;
            const iconKey = getSpellImageName(spell);
            return (
              <img
                key={i}
                src={getSummonerSpellIcon(iconKey)}
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

        <div className="flex gap-1 w-1/6">
          {player.perks?.styles?.slice(0, 2).map((style, i) => {
            let iconUrl, titleText;

            if (i === 0) {
              const perkId = style?.selections?.[0]?.perk;
              if (!perkId) return null;
              iconUrl = getRuneIcon(perkId);
              titleText = perkIdToName[perkId] || `Perk ID: ${perkId}`;
            } else {
              const styleId = style?.style;
              let styleName = 'Unknown';
              switch (styleId) {
                case 8000:
                  styleName = 'Precision';
                  break;
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
              }
              iconUrl = `/fallbacks/styles/${styleName}.png`;
              titleText = styleName;
            }

            return (
              <img
                key={i}
                src={iconUrl}
                alt={`Rune ${i}`}
                title={titleText}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_ICON;
                }}
              />
            );
          })}
        </div>

        <div className="flex gap-1 flex-wrap justify-end w-1/4">
          {[...Array(7).keys()].map((i) => {
            const id = player[`item${i}`];
            const src = getItemIcon(id);
            return (
              <img
                key={i}
                src={src}
                alt={id ? `Item ${id}` : 'Empty'}
                title={itemIdToName[id] || `Item ID: ${id}`}
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
  };

  // ----------------------------
  // Portal-rendered modal component (fixed to screen)
  // ----------------------------
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
        {/* Modal header */}
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

        {/* Match body: two team columns */}
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
