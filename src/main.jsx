/**
 * main.jsx
 * Application entry point.
 * Imports global styles before rendering the React tree.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';  // ← imports variables.css + resets
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
