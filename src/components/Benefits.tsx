import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

const Benefits: React.FC = () => {
  const items = [
    {
      title: 'Одна команда — одна траєкторія',
      text: 'Психолог оцінює, чи потрібна участь психіатра, і тримає план цілісним.',
      icon: <ShieldCheck size={20} />,
    },
    {
      title: 'Доказовий підхід + інновації',
      text: 'Класична терапія доповнюється VR та нейрофідбеком, коли це доречно.',
      icon: <Sparkles size={20} />,
    },
    {
      title: 'Повага до темпу клієнта',
      text: 'Без тиску, з прозорою комунікацією та обережністю до складних тем.',
      icon: <HeartPulse size={20} />,
    },
  ];

  return (
    <section className="section benefits">
      <div className="container">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section__title">
            Чому це працює
          </motion.h2>
          <motion.p variants={fadeInUp} className="section__subtitle">
            Преміальний досвід, що поєднує турботу, технології та клінічні стандарти.
          </motion.p>
        </motion.div>

        <div className="grid grid--3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="card benefit-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="tag">{item.icon} {item.title}</div>
              <p className="text-muted" style={{ marginTop: '0.75rem' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
