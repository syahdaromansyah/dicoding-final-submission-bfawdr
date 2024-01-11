import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContextProvider from './app-context-provider.jsx';
import AppPrimeReactProvider from './app-primereact-provider.jsx';
import AppRouter from './app-router.jsx';
import './index.css';

async function enableMSW() {
  if (import.meta.env.MODE !== 'development:msw') return;

  const { worker } = await import('./msw/browser.js');

  return worker.start();
}

async function startApp() {
  await enableMSW();

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AppContextProvider>
        <AppPrimeReactProvider>
          <AppRouter />
        </AppPrimeReactProvider>
      </AppContextProvider>
    </React.StrictMode>,
  );
}

void startApp();
