import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CookieConsent from './components/CookieConsent'
import { getConsentStatus } from './utils/consent'
import ErrorBoundary from './components/ErrorBoundary'
import PrivacyPolicy from './components/PrivacyPolicy'
import { loadAnalyticsScripts } from './utils/analytics'
import './styles/main.scss'

export function Root() {
  const [showPrivacy, setShowPrivacy] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#privacy'
  );

  useEffect(() => {
    if (getConsentStatus() === 'accepted') {
      loadAnalyticsScripts();
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowPrivacy(window.location.hash === '#privacy');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (showPrivacy) {
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
