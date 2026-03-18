import { useEffect, useRef } from 'react';

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * Returns a ref to attach to a container. Children with [data-reveal] will
 * animate in on scroll. Use [data-reveal-delay="n"] for staggered delay (ms).
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('reveal--visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return containerRef;
}
