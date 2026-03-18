const STORAGE_KEY = 'opora_analytics_consent';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export const getConsentStatus = (): ConsentStatus | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'accepted' || stored === 'declined') return stored;
  return null;
};

export const setConsentStatus = (status: 'accepted' | 'declined'): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, status);
};
