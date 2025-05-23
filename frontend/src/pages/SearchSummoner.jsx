/**
 * © 2025 LoL Edge – All rights reserved.
 * SearchSummoner.jsx – Core component for summoner search and display.
 * Author: Nobody-O
 */

// ----------------- Imports -----------------
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Component imports
import ChampionStats from '../components/ChampionStats';
import ErrorCard from '../components/ErrorCard';
import LiveBanner from '../components/LiveBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchCard from '../components/MatchCard';
import ProfileCard from '../components/ProfileCard';
import ProfileSkeleton from '../components/ProfileSkeleton';
import Toast from '../components/Toast';
import WinrateGraph from '../components/WinrateGraph';

// API base URL (switches between local and production automatically)
import { API_BASE } from '../config/apiBase';

// Number of matches shown initially
const INITIAL_LOAD = 10;

// ----------------- Component -----------------
export default function SearchSummoner() {
  // Handle URL query parameters (e.g., ?name=Kanenas&tag=xxx)
  const [searchParams] = useSearchParams();
  const queryName = searchParams.get('name');
  const queryTag = searchParams.get('tag');
  const queryRegion = searchParams.get('region');

  // Local component state
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState(queryRegion || 'euw1');
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [liveGame, setLiveGame] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [toastMessage, setToastMessage] = useState('');

  // Automatically populate fields and trigger search on page load (if query exists)
  useEffect(() => {
    if (queryName && queryTag) {
      setRiotId(`${queryName}#${queryTag}`);
      setRegion(queryRegion || 'euw1');
      handleSubmit(null, queryName, queryTag, queryRegion || 'euw1');
    }
  }, [queryName, queryTag, queryRegion]);

  // Handles both manual form submission and auto-triggered search
  const handleSubmit = async (
    e,
    overrideName = null,
    overrideTag = null,
    overrideRegion = null
  ) => {
    if (e) e.preventDefault();

    const [name, tag] =
      overrideName && overrideTag
        ? [overrideName, overrideTag]
        : riotId.trim().split('#');

    if (!name || !tag) {
      setError('Please enter Riot ID in format: Name#Tag');
      return;
    }

    const currentRegion = overrideRegion || region;

    setLoading(true);
    setError('');
    setProfile(null);
    setMatches([]);
    setLiveGame(null);
    setVisibleCount(INITIAL_LOAD);
    setToastMessage('');

    try {
      // Fetch summoner profile and matches
      const res = await axios.get(`${API_BASE}/summoner`, {
        params: {
          name: name.trim(),
          tag: tag.trim(),
          region: currentRegion,
        },
      });

      setProfile(res.data.profile);
      setMatches(res.data.matches);

      try {
        // Fetch live game info separately
        const liveRes = await axios.get(`${API_BASE}/livegame`, {
          params: { puuid: res.data.profile.puuid, region: currentRegion },
        });

        if (liveRes.data && liveRes.data.activeGame) {
          setLiveGame(liveRes.data.activeGame);
        } else {
          setToastMessage(
            `${res.data.profile.summonerName} is not in an active game.`
          );
        }
      } catch {
        setToastMessage(
          `${res.data.profile.summonerName} is not in an active game.`
        );
      }
    } catch (err) {
      console.error('[Error]', err);
      setError('Summoner not found or Riot API error.');
    } finally {
      setLoading(false);
    }
  };

  // Filters matches by queue type (SOLO, FLEX, ARAM)
  const filteredMatches = matches.filter((match) => {
    if (filter === 'ALL') return true;
    const queueIds = { SOLO: 420, FLEX: 440, ARAM: 450 };
    return match.info?.queueId === queueIds[filter];
  });

  // Sliced list of matches currently visible
  const visibleMatches = filteredMatches.slice(0, visibleCount);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Search Summoner
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 mb-8"
      >
        <input
          type="text"
          name="riotId"
          id="riotId"
          placeholder="Riot ID (e.g., Kanenas#愛kat)"
          value={riotId}
          autoComplete="username"
          onChange={(e) => setRiotId(e.target.value)}
          className="p-2 rounded-lg w-full md:w-2/3"
          required
        />

        <select
          name="region"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 rounded-lg w-full md:w-1/3"
        >
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          <option value="na1">NA</option>
          <option value="kr">KR</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition w-full md:w-1/4"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {liveGame && <LiveBanner game={liveGame} />}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
      {loading && <LoadingSpinner />}
      {error && <ErrorCard message={error} />}
      {loading && <ProfileSkeleton />}
      {!loading && profile && (
        <ProfileCard profile={profile} matches={matches} />
      )}

      {/* Match History Section */}
      {profile && matches.length > 0 && (
        <div id="match-history" className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Recent Matches
          </h2>

          {/* Queue Type Filter Buttons */}
          <div className="flex justify-center gap-3 mb-4 text-sm">
            {['ALL', 'SOLO', 'FLEX', 'ARAM'].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setFilter(q);
                  setVisibleCount(INITIAL_LOAD);
                }}
                className={`px-3 py-1.5 rounded-full transition font-medium ${
                  filter === q
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Graph and Stats */}
          <WinrateGraph matches={visibleMatches} />
          {/* Champion Stats */}
          <ChampionStats matches={visibleMatches} />

          {/* Match Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleMatches.map((match, i) => (
              <MatchCard key={i} match={match} puuid={profile.puuid} />
            ))}
          </div>
          {/* Debug: Show how many matches are loaded */}
          <p className="text-yellow-300 text-center mt-2">
            Loaded {visibleMatches.length} of {filteredMatches.length}
          </p>

          {/* Load More Button */}
          {visibleCount < filteredMatches.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + INITIAL_LOAD)}
                className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold"
              >
                Load More Matches
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fallback UI for empty queues */}
      {!loading && profile && filteredMatches.length === 0 && (
        <div className="text-center text-gray-400 mt-6">
          No matches found for selected queue.
        </div>
      )}
    </div>
  );
}
