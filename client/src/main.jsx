import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Prerendered pages embed the content they were built with, so the first
// render matches the HTML already on screen.
const initialData = window.__PRERENDER_DATA__ || {};

// createRoot (not hydrateRoot) replaces the prerendered markup, which avoids
// hydration mismatches from per-visitor state such as the saved theme.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initialData={initialData} />
  </React.StrictMode>,
);
