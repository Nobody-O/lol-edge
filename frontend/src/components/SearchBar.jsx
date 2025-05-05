import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('euw1');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = riotId.trim();
    if (!cleanInput.includes('#')) {
      alert('Please use format SummonerName#Tag');
      return;
    }
    const [name, tag] = cleanInput.split('#');
    if (name && tag && region) {
      onSearch(name, tag, region);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 hover:shadow-blue-400/50 transition-all"
    >
      <input
        type="text"
        placeholder="Summoner#Tagline"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
        className="w-full md:w-96 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="euw1">EUW</option>
        <option value="eun1">EUNE</option>
        <option value="na1">NA</option>
        <option value="kr">KR</option>
        <option value="br1">BR</option>
        <option value="jp1">JP</option>
        <option value="tr1">TR</option>
        <option value="ru">RU</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Search
      </button>
    </form>
  );
}
