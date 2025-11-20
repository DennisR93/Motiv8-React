import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './router';
import './i18n';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/Motiv8-React">
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
