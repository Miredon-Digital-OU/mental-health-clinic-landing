
export const getVariant = (testId: string): 'A' | 'B' => {
  const STORAGE_KEY = `ab_test_${testId}`;
  if (typeof window === 'undefined') return 'A'; // SSR safety
  
  let variant = localStorage.getItem(STORAGE_KEY) as 'A' | 'B';
  if (!variant) {
    variant = Math.random() > 0.5 ? 'B' : 'A';
    localStorage.setItem(STORAGE_KEY, variant);
  }
  return variant;
};
