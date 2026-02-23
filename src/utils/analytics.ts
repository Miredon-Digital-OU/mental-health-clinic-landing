
/** GA4 / Facebook Pixel / Hotjar event tracking
 *  All event names match the spec in landing_mental_health_tz.pdf
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  // Log for debugging
  console.log(`[Analytics] ${eventName}`, params);

  // GA4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && 'fbq' in window) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', eventName, params);
  }
};

// All required analytics events per spec
export const EVENTS = {
  PAGE_LOADED: 'page_loaded',
  FLOATING_BUTTON_SHOWN: 'floating_button_shown',
  FLOATING_BUTTON_CLICKED: 'floating_button_clicked',
  TEST_STARTED: 'test_started',
  // Individual question events as required by spec
  QUESTION_1_ANSWERED: 'question_1_answered',
  QUESTION_2_ANSWERED: 'question_2_answered',
  QUESTION_3_ANSWERED: 'question_3_answered',
  QUESTION_4_ANSWERED: 'question_4_answered',
  QUESTION_5_ANSWERED: 'question_5_answered',
  RESULT_SHOWN: 'result_shown',
  FORM_STARTED: 'form_started',
  LEAD_SUBMITTED: 'lead_submitted',
  TEMPERATURE_SELECTED: 'temperature_selected',
} as const;

// Convenience helper: map question index (0-based) to event name
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
