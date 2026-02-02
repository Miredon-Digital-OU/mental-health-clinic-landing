import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../styles/animations';

const Testimonials: React.FC = () => {
  const items = [
    {
      name: 'Олена, 34',
      text: '«Після скринінгу стало зрозуміло, що саме мені потрібно. Команда підтримувала кожен крок.»',
    },
    {
      name: 'Андрій, 41',
      text: '«Я вагався щодо психіатра, але оцінка була дуже делікатною і зрозумілою.»',
    },
    {
      name: 'Марія, 29',
      text: '«Поєднання терапії та нейрофідбеку дало відчутний прогрес у сні та тривожності.»',
    },
  ];

  return (
    <section className="section testimonials">
      <div className="container">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section__title">
            Історії клієнтів (приклади)
          </motion.h2>
          <motion.p variants={fadeInUp} className="section__subtitle">
            Усі історії є композитними прикладами для ілюстрації підходу.
          </motion.p>
        </motion.div>

        <div className="grid grid--3">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p>{item.text}</p>
              <p style={{ marginTop: '1rem', fontWeight: 600 }}>{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
