
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
