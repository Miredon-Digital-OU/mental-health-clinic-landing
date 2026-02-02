import React from 'react';
import { ArrowRight } from 'lucide-react';

const BottomCTA: React.FC = () => {
  return (
    <section className="bottom-cta">
      <div className="container bottom-cta__inner">
        <div>
          <h2>Готові зробити перший крок?</h2>
          <p className="text-muted">Конфіденційно. Спокійно. З повагою до вашого темпу.</p>
        </div>
        <a href="#contact" className="btn btn--primary">
          Записатися на консультацію <ArrowRight size={18} style={{ marginLeft: 8 }} />
        </a>
      </div>
    </section>
  );
};

export default BottomCTA;
