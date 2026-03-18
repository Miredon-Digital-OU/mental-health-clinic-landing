import React from 'react';
import { ArrowRight } from 'lucide-react';

const BottomCTA: React.FC = () => {
  return (
    <section className="bottom-cta" data-theme="dark">
      <div className="container bottom-cta__inner">
        <div>
          <h2>Залишилися питання?</h2>
          <p className="text-muted">Запишіться на пілотну програму та отримайте персоналізований план лікування психічного здоров'я в нашій клініці.</p>
        </div>
        <a href="#contact" className="btn btn--primary">
          Записатися на програму <ArrowRight size={18} style={{ marginLeft: 8 }} />
        </a>
      </div>
    </section>
  );
};

export default BottomCTA;
