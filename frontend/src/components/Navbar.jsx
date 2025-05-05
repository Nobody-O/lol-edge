// ----------------- Imports -----------------
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ----------------- Navbar Component -----------------
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-400 font-semibold' : 'text-white';

  // 🔁 Scroll to match history
  const handleMatchHistoryClick = () => {
    if (location.pathname === '/search') {
      const matchSection = document.getElementById('match-history');
      if (matchSection) {
        matchSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/search');
      setTimeout(() => {
        const matchSection = document.getElementById('match-history');
        if (matchSection) {
          matchSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 md:p-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔷 Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-blue-400 hover:text-blue-500 transition"
        >
          LoL Edge
        </Link>

        {/* 🔗 Links */}
        <div className="flex gap-6 md:gap-10 text-sm md:text-base">
          <Link
            to="/"
            className={`${isActive('/')} hover:text-blue-400 transition`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`${isActive('/search')} hover:text-blue-400 transition`}
          >
            Search
          </Link>

          {/* 🔒 Re-enable if needed */}
          {/* 
          <button
            onClick={handleMatchHistoryClick}
            className="text-white hover:text-blue-400 transition"
          >
            Match History
          </button>
          */}
        </div>
      </div>
    </nav>
  );
}
