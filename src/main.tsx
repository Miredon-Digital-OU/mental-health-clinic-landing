import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CookieConsent from './components/CookieConsent'
import { getConsentStatus } from './utils/consent'
import ErrorBoundary from './components/ErrorBoundary'
import PrivacyPolicy from './components/PrivacyPolicy'
import AdminLeads from './components/AdminLeads'
import { loadAnalyticsScripts } from './utils/analytics'
import './styles/main.scss'

export function Root() {
  const [currentHash, setCurrentHash] = useState(
    () => typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    if (getConsentStatus() === 'accepted') {
      loadAnalyticsScripts();
    }
  }, []);

  useEffect(() => {
    const handler = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (currentHash === '#privacy') {
    return (
      <>
        <div className="app">
          <PrivacyPolicy onBack={() => { window.location.hash = ''; }} />
        </div>
        <CookieConsent
          onConsentChange={(status) => {
            if (status === 'accepted') loadAnalyticsScripts();
          }}
        />
      </>
    );
  }

  if (currentHash === '#admin') {
    return (
      <div className="app">
        <AdminLeads onBack={() => { window.location.hash = ''; }} />
      </div>
    );
  }

  return (
    <>
      <App />
      <CookieConsent
        onConsentChange={(status) => {
          if (status === 'accepted') loadAnalyticsScripts();
        }}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </React.StrictMode>,
)
