// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// Navbar.jsx
// Responsive top navigation bar for the LoL Edge app.
// Uses React Router for client-side navigation and scrolls smoothly to match history.
// -----------------------------------------------------------------------------

// ----------------- Imports -----------------
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ----------------- Navbar Component -----------------
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Highlight the active page
  const isActive = (path) =>
    location.pathname === path ? 'text-blue-400 font-semibold' : 'text-white';

  // Handles click to scroll to #match-history if already on /search
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

  // ----------------- Render -----------------
  return (
    <nav className="bg-gray-900 p-4 md:p-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔷 Logo Link */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-blue-400 hover:text-blue-500 transition"
        >
          LoL Edge
        </Link>

        {/* 🔗 Navigation Links */}
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

          {/*  Add this back if you implement match section anchor scroll */}
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
