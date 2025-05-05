// ----------------- File: App.jsx -----------------
// © 2025 LoL Edge — All rights reserved.
//
// This file defines the root of the React application.
// It sets up global routes using React Router and wraps all content in the layout shell.
// -------------------------------------------------

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// ----------------- Components & Pages -----------------
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchSummoner from './pages/SearchSummoner';

// ----------------- App Root Component -----------------
function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* Global Navigation */}
        <Navbar />

        {/* Client-Side Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchSummoner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
