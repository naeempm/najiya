import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Prerendered pages embed the content they were built with, so the first
// render matches the HTML already on screen.
const initialData = window.__PRERENDER_DATA__ || {};

const app = (
  <React.StrictMode>
    <App initialData={initialData} />
  </React.StrictMode>
);

// Prerendered pages are hydrated, so the HTML already on screen is reused
// rather than redrawn (much faster first paint). app-shell.html, used for
// pages that weren't prerendered, has an empty root and renders normally.
const root = document.getElementById('root');
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
