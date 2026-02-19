



export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  // In a real app, this would send data to GA4, Facebook Pixel, etc.
  console.log(`[Analytics] ${eventName}`, params);
  
  if (typeof window !== 'undefined' && 'gtag' in window) {
     // Example GA4 call
     // (window as unknown as { gtag: Function }).gtag('event', eventName, params);
  }
};

export const EVENTS = {
  PAGE_LOADED: 'page_loaded',
  FLOATING_BUTTON_SHOWN: 'floating_button_shown',
  FLOATING_BUTTON_CLICKED: 'floating_button_clicked',
  TEST_STARTED: 'test_started',
  QUESTION_ANSWERED: 'question_answered',
  RESULT_SHOWN: 'result_shown',
  FORM_STARTED: 'form_started', // Not easily tracked unless focus on input
  LEAD_SUBMITTED: 'lead_submitted',
  TEMPERATURE_SELECTED: 'temperature_selected',
};
