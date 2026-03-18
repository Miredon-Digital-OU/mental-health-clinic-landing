import React, { useEffect, useState } from 'react';
import { useThemeDetector } from '../hooks/useThemeDetector';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const theme = useThemeDetector();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top${visible ? ' scroll-to-top--visible' : ''}${isDark ? ' scroll-to-top--light' : ''}`}
      onClick={handleClick}
      aria-label="Прокрутити вгору"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 14V4M9 4L4 9M9 4L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
