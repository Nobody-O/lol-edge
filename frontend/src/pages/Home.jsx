// ----------------- File: Home.jsx -----------------
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('euw1');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const [name, tag] = riotId.trim().split('#');
    if (!name || !tag) {
      alert('Please enter Riot ID in the format: Name#Tag');
      return;
    }
    navigate(`/search?name=${name}&tag=${tag}&region=${region}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Welcome to LoL Edge
      </h1>
      <p className="text-gray-400 text-lg mb-8">
        Search for Summoners, Analyze Match History, and Get Smart
        Recommendations!
      </p>
      <form
        onSubmit={handleSearch}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 hover:shadow-blue-400/50 transition-all w-full max-w-xl"
      >
        <input
          type="text"
          placeholder="Enter Riot ID (e.g., Kanenas#愛kat)"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full md:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
}
