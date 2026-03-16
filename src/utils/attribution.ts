export type AttributionData = {
  landingPath: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  firstSeenAt: string;
};

const STORAGE_KEY = 'landing_attribution_v1';

const cleanParam = (value: string | null, maxLength: number): string => {
  if (!value) {
    return '';
  }

  return value.trim().slice(0, maxLength);
};

const getCurrentAttribution = (): AttributionData => {
  const params = new URLSearchParams(window.location.search);

  return {
    landingPath: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    referrer: cleanParam(document.referrer, 500),
    utmSource: cleanParam(params.get('utm_source'), 120),
    utmMedium: cleanParam(params.get('utm_medium'), 120),
    utmCampaign: cleanParam(params.get('utm_campaign'), 120),
    utmTerm: cleanParam(params.get('utm_term'), 120),
    utmContent: cleanParam(params.get('utm_content'), 120),
    gclid: cleanParam(params.get('gclid'), 120),
    fbclid: cleanParam(params.get('fbclid'), 120),
    msclkid: cleanParam(params.get('msclkid'), 120),
    firstSeenAt: new Date().toISOString(),
  };
};

export const captureAttribution = (): AttributionData | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as AttributionData;
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  const data = getCurrentAttribution();
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};
