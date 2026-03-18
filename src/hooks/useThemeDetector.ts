import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Observes all [data-theme] elements in the document.
 * Returns 'dark' when any dark-themed element is ≥15% visible
 * in the viewport, otherwise 'light'.
 *
 * Mark sections: <section data-theme="dark"> or <section data-theme="light">.
 * Defaults to 'light' when no dark section is visible.
 */
export function useThemeDetector(): Theme {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const visibleDark = new Set<Element>();

    const update = () => {
      setTheme(visibleDark.size > 0 ? 'dark' : 'light');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (el.dataset.theme === 'dark') {
            if (entry.isIntersecting) {
              visibleDark.add(el);
            } else {
              visibleDark.delete(el);
            }
          }
        });
        update();
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll('[data-theme]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return theme;
}
