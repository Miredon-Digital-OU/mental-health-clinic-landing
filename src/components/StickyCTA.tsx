import React from 'react';
import { ArrowRight } from 'lucide-react';

type StickyCTAProps = {
  onClick?: () => void;
};

const StickyCTA: React.FC<StickyCTAProps> = ({ onClick }) => {
  return (
    <div className="sticky-cta" role="complementary" aria-label="Quick quiz action">
      <button
        className="sticky-cta__btn"
        onClick={onClick}
        aria-label="Пройти тест"
      >
        Пройти тест <ArrowRight size={16} style={{ marginLeft: 6 }} />
      </button>
    </div>
  );
};

export default StickyCTA;
