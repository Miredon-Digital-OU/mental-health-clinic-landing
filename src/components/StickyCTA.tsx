import React from 'react';
import { ArrowRight } from 'lucide-react';

const StickyCTA: React.FC = () => {
  return (
    <div className="sticky-cta" role="region" aria-label="Quick action">
      <div className="sticky-cta__text">
         Маєте питання? Ми на зв'язку.
      </div>
      <a href="#contact" className="btn btn--sm btn--ghost">
        Записатися <ArrowRight size={16} style={{ marginLeft: 6 }} />
      </a>
    </div>
  );
};

export default StickyCTA;
