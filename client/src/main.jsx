// Main Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Set CSS variables for toast notifications based on theme
const root = document.documentElement;
const observer = new MutationObserver(() => {
  const isDark = root.classList.contains('dark');
  root.style.setProperty('--toast-bg', isDark ? '#1F2937' : '#FFFFFF');
  root.style.setProperty('--toast-color', isDark ? '#F9FAFB' : '#111827');
  root.style.setProperty('--toast-border', isDark ? '#374151' : '#E5E7EB');
});

observer.observe(root, {
  attributes: true,
  attributeFilter: ['class'],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
