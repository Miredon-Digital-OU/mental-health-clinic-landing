import React, { useState } from 'react';
import { getConsentStatus, setConsentStatus } from '../utils/consent';

type CookieConsentProps = {
  onConsentChange?: (status: 'accepted' | 'declined') => void;
};

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(() => getConsentStatus() === null);

  const handleAccept = () => {
    setConsentStatus('accepted');
    setIsVisible(false);
    onConsentChange?.('accepted');
  };

  const handleDecline = () => {
    setConsentStatus('declined');
    setIsVisible(false);
    onConsentChange?.('declined');
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent__inner">
        <p id="cookie-consent-title" className="cookie-consent__title">
          Використання cookies
        </p>
        <p id="cookie-consent-desc" className="cookie-consent__text">
          Ми використовуємо аналітичні cookies для покращення роботи сайту та розуміння того, як ви ним користуєтесь.
          Ви можете прийняти або відхилити їх.
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleAccept}
          >
            Прийняти
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={handleDecline}
          >
            Відхилити
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
