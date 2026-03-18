import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useThemeDetector } from '../hooks/useThemeDetector';

type StickyCTAProps = {
  onClick?: () => void;
};

const StickyCTA: React.FC<StickyCTAProps> = ({ onClick }) => {
  const theme = useThemeDetector();
  const isDark = theme === 'dark';

  return (
    <div className="sticky-cta" role="complementary" aria-label="Quick quiz action">
      <button
        className={`sticky-cta__btn${isDark ? ' sticky-cta__btn--light' : ''}`}
        onClick={onClick}
        aria-label="Пройти тест"
      >
        Пройти тест <ArrowRight size={16} style={{ marginLeft: 6 }} />
      </button>
    </div>
  );
};

export default StickyCTA;
