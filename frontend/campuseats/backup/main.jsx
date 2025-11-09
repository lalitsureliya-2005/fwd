import React from 'react';import React from 'react';

import ReactDOM from 'react-dom/client';import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';import App from './App.jsx';

import { Toaster } from 'react-hot-toast';import { Toaster } from 'react-hot-toast';

import './index.css';import './index.css';



ReactDOM.createRoot(document.getElementById('root')).render(const root = document.getElementById('root');

  <React.StrictMode>

    <BrowserRouter>// Error handling for root element

      <Toaster position="top-center" reverseOrder={false} />if (!root) {

      <App />  console.error('Root element not found');

    </BrowserRouter>  document.body.innerHTML = `

  </React.StrictMode>,    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: sans-serif;">

);      <h1 style="color: #EF4444;">Application Error</h1>
      <p>Failed to initialize application. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #22C55E; color: white; border: none; border-radius: 8px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#22C55E',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />
    </React.StrictMode>
  );
}