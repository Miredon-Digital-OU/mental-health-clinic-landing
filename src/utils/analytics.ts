type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

const isEnabled = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === '1' || value.toLowerCase() === 'true';
};

const ANALYTICS_CONFIG = {
  ga4: isEnabled(import.meta.env.VITE_ANALYTICS_GA4_ENABLED, true),
  metaPixel: isEnabled(import.meta.env.VITE_ANALYTICS_META_ENABLED, true),
  hotjar: isEnabled(import.meta.env.VITE_ANALYTICS_HOTJAR_ENABLED, false),
  debug: isEnabled(import.meta.env.VITE_ANALYTICS_DEBUG, false),
};

let scriptsLoaded = false;

/**
 * Load analytics scripts (GA4, Meta Pixel, Hotjar) only after user consent.
 * Call this when user accepts cookies.
 */
export const loadAnalyticsScripts = (): void => {
  if (typeof window === 'undefined' || scriptsLoaded) return;
  scriptsLoaded = true;

  const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
  const hotjarId = import.meta.env.VITE_HOTJAR_ID as string | undefined;

  if (ANALYTICS_CONFIG.ga4 && ga4Id && ga4Id.startsWith('G-')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag = function gtag(...args: unknown[]) {
      ((window as unknown as { dataLayer: unknown[] }).dataLayer).push(args);
    };
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('js', new Date());
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', ga4Id, {
      send_page_view: true,
      anonymize_ip: true,
    });
  }

  if (ANALYTICS_CONFIG.metaPixel && metaPixelId) {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${metaPixelId}');
      fbq('track','PageView');
    `;
    document.head.appendChild(script);
  }

  if (ANALYTICS_CONFIG.hotjar && hotjarId) {
    (window as unknown as { hj: { q: unknown[] } }).hj = (window as unknown as { hj?: { q: unknown[] } }).hj || { q: [] };
    (window as unknown as { hj: { q: unknown[] } }).hj.q.push(['init', hotjarId]);
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=`;
    document.head.appendChild(s);
  }
};

export const trackEvent = (eventName: string, params?: AnalyticsParams) => {
  if (ANALYTICS_CONFIG.debug) {
    console.log(`[Analytics] ${eventName}`, params ?? {});
  }

  if (typeof window === 'undefined') {
    return;
  }

  if (ANALYTICS_CONFIG.ga4 && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }

  if (ANALYTICS_CONFIG.metaPixel && 'fbq' in window) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', eventName, params);
  }

  if (ANALYTICS_CONFIG.hotjar && 'hj' in window) {
    (window as unknown as { hj: (...args: unknown[]) => void }).hj('event', eventName);
  }
};

export const EVENTS = {
  PAGE_LOADED: 'landing_page_visit',
  APP_STAGE_VIEWED: 'app_stage_viewed',
  CTA_CLICKED: 'cta_click',
  FLOATING_CTA_SHOWN: 'floating_cta_shown',
  FLOATING_CTA_CLICKED: 'floating_cta_click',
  TEST_STARTED: 'test_started',
  TEST_BACK_CLICKED: 'test_back_clicked',
  TEST_RESTARTED: 'test_restarted',
  TEST_DROPOFF: 'test_dropoff',
  TEST_COMPLETED: 'test_completed',
  QUESTION_ANSWERED: 'question_answered',
  QUESTION_1_ANSWERED: 'question_1_answered',
  QUESTION_2_ANSWERED: 'question_2_answered',
  QUESTION_3_ANSWERED: 'question_3_answered',
  QUESTION_4_ANSWERED: 'question_4_answered',
  QUESTION_5_ANSWERED: 'question_5_answered',
  RESULT_SHOWN: 'result_shown',
  RESULT_CONTINUE_CLICKED: 'result_continue_clicked',
  FORM_STARTED: 'form_started',
  LEAD_SUBMITTED: 'lead_submitted',
  LEAD_SUBMISSION_FAILED: 'lead_submission_failed',
  TEMPERATURE_SELECTED: 'temperature_selected',
} as const;

export const getQuestionEvent = (index: number): string => {
  const map: Record<number, string> = {
    0: EVENTS.QUESTION_1_ANSWERED,
    1: EVENTS.QUESTION_2_ANSWERED,
    2: EVENTS.QUESTION_3_ANSWERED,
    3: EVENTS.QUESTION_4_ANSWERED,
    4: EVENTS.QUESTION_5_ANSWERED,
  };

  return map[index] ?? `question_${index + 1}_answered`;
};
