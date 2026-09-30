import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import ui from './data/ui.json';
import './styles/global.css';

document.title = ui.app.name;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
