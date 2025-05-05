// --------------------------------------------------------
// File: main.jsx
// Purpose: Entry point for the React application.
// © 2025 LoL Edge — All rights reserved
// --------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Tailwind CSS styles (global utility-first design)
import './index.css';

// Mount the <App /> component inside the root div
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
