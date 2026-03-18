import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Benefits: React.FC = () => {
  const sectionRef = useScrollReveal();
  const items = [
    {
      title: 'Одна команда — одна траєкторія',
      text: 'Психолог оцінює, чи потрібна участь психіатра, і тримає план цілісним.',
      icon: <ShieldCheck size={20} aria-hidden="true" />,
    },
    {
      title: 'Доказовий підхід + інновації',
      text: 'Класична терапія доповнюється VR та нейрофідбеком, коли це доречно.',
      icon: <Sparkles size={20} aria-hidden="true" />,
    },
    {
      title: 'Повага до темпу клієнта',
      text: 'Без тиску, з прозорою комунікацією та обережністю до складних тем.',
      icon: <HeartPulse size={20} aria-hidden="true" />,
    },
  ];

  return (
    <section className="section benefits" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="text-center">
          <h2 className="section__title" data-reveal>Чому це працює</h2>
          <p className="section__subtitle" data-reveal data-reveal-delay="80">
            Якісна допомога, що поєднує турботу, технології та клінічні стандарти.
          </p>
        </div>

        <div className="grid grid--3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="card benefit-card"
              data-reveal="card"
              data-reveal-delay={String(index * 100)}
            >
              <div className="tag">{item.icon} {item.title}</div>
              <p className="text-muted" style={{ marginTop: '0.75rem' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
