// ----------------- Imports -----------------
import React, { useState } from 'react';
import {
  FALLBACK_ICON,
  getProfileIcon,
  getRankBadge,
} from '../data/getChampionImageURL';
import TopMastery from './TopMastery';

// ----------------- ProfileCard Component -----------------
export default function ProfileCard({ profile }) {
  if (!profile) return null;

  const {
    summonerName,
    summonerLevel,
    profileIconId,
    topChampions,
    rankedSolo,
    rankedFlex,
    riotId,
    tagLine,
  } = profile;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullId =
      riotId || (tagLine ? `${summonerName}#${tagLine}` : summonerName);
    navigator.clipboard.writeText(fullId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const renderRankCard = (data, queueType) => {
    const isUnranked = !data || !data.tier;
    const { tier, rank, leaguePoints, wins, losses } = data || {};
    const winrate =
      wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
    const badgeUrl = getRankBadge(tier || '');

    return (
      <div className="bg-gray-800 p-4 rounded-xl shadow-md w-full">
        <div className="flex items-center gap-4">
          <img
            src={badgeUrl}
            alt={`${tier || 'Unranked'} badge`}
            className="w-16 h-16"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallbacks/unranked.png';
            }}
          />
          <div>
            <p className="text-white font-semibold text-lg">
              {isUnranked ? 'Unranked' : `${tier} ${rank}`}
            </p>
            {!isUnranked && (
              <>
                <p className="text-gray-400 text-sm">{leaguePoints} LP</p>
                <p className="text-gray-400 text-sm">
                  {wins}W {losses}L • Win rate {winrate}%
                </p>
              </>
            )}
          </div>
          {!isUnranked &&
            ['DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(
              tier.toUpperCase()
            ) && (
              <span className="ml-auto bg-purple-500 text-white px-2 py-1 text-xs rounded-full">
                Top Tier
              </span>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={getProfileIcon(profileIconId)}
          alt="Profile Icon"
          className="w-24 h-24 rounded-full border-4 border-gray-600"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_ICON;
          }}
        />
        <div>
          <h2 className="text-3xl font-bold text-white">{summonerName}</h2>
          <p className="text-gray-400 text-lg">Level {summonerLevel}</p>
          <button
            onClick={handleCopy}
            className="mt-2 text-blue-400 hover:text-blue-500 text-sm underline transition"
          >
            {copied ? '✅ Riot ID Copied!' : 'Copy Riot ID'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {renderRankCard(rankedSolo, 'Ranked Solo')}
        {renderRankCard(rankedFlex, 'Ranked Flex')}
      </div>

      {topChampions && topChampions.length > 0 && (
        <TopMastery masteryData={topChampions} />
      )}
    </div>
  );
}
