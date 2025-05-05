// ----------------- File: App.jsx -----------------
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchSummoner from './pages/SearchSummoner';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchSummoner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
