import { createRoot } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
