import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

const packages = [
  {
    name: 'Старт',
    price: 'Ціна пізніше',
    features: [
      'Психологічна консультація',
      'Оцінка потреби у психіатрі',
      'Персональний скринінг',
    ],
    highlight: false,
  },
  {
    name: 'Базовий',
    price: 'Ціна пізніше',
    features: [
      'Психолог',
      'Психіатр',
      'План лікування',
      'Координація фахівців',
    ],
    highlight: true,
  },
  {
    name: 'Комплексний',
    price: 'Ціна пізніше',
    features: [
      'Психолог',
      'Психіатр',
      'Нейрофідбек або VR-терапія',
      'Моніторинг прогресу',
    ],
    highlight: false,
  },
  {
    name: 'Преміум',
    price: 'Ціна пізніше',
    features: [
      'Психолог',
      'Психіатр',
      'Нейрофідбек + VR-терапія',
      'Генетичне тестування',
      'Пріоритетний супровід',
    ],
    highlight: false,
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section__title">Пакети та ціни</motion.h2>
          <motion.p variants={fadeInUp} className="section__subtitle max-w-2xl mx-auto">
            Оберіть формат підтримки, який найкраще відповідає вашому запиту. 
            Кожен пакет включає комплексний супровід нашої команди.
          </motion.p>
        </motion.div>

        <div className="pricing-grid">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className={`pricing-card ${pkg.highlight ? 'pricing-card--highlight' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {pkg.highlight && <div className="pricing-card__badge"><Zap size={14} /> Популярний</div>}
              <h3 className="pricing-card__name">{pkg.name}</h3>
              <div className="pricing-card__price">{pkg.price}</div>
              <ul className="pricing-card__features">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${pkg.highlight ? 'btn--primary' : 'btn--outline'} btn--block mt-4`}>
                Обрати {pkg.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
