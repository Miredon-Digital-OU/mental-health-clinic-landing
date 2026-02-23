import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';
import { getVariant } from '../utils/abTesting';

type HeroProps = {
  onStartQuiz: () => void;
};

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const [variant] = useState<'A' | 'B'>(() => getVariant('hero_title'));

  return (
    <section className="hero hero--centered">
      <div className="hero__bg-ambient" />

      <div className="container">
        <motion.div
          className="hero__content hero__content--centered"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="hero__features" style={{ marginBottom: '2rem', textAlign: 'left', display: 'inline-block', background: 'rgba(255,255,255,0.7)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600, color: '#2C3E50' }}>Ми поєднали досвід і сучасні технології</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: '#27AE60' }}>✔</span> Краща команда лікарів і психотерапевтів</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: '#27AE60' }}>✔</span> Світові стандарти ментальної допомоги</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: '#27AE60' }}>✔</span> Передові методи діагностики</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: '#27AE60' }}>✔</span> Новітні підходи підтримки для м’якої регуляції роботи нервової системи</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: '#27AE60' }}>✔</span> Оцінка індивідуальних особливостей, включно з генетичним тестуванням</li>
            </ul>
          </motion.div>

          {variant === 'A' ? (
            <>
              <motion.h1 variants={fadeInUp} className="hero__title">
                Вам точно достатньо{' '}
                <span className="text-highlight">лише психолога?</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="hero__subtitle">
                Пройдіть короткий тест та дізнайтеся, який формат допомоги вам підходить
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1 variants={fadeInUp} className="hero__title">
                Дізнайтесь, який формат допомоги вам підходить{' '}
                <span className="text-highlight">за 60 секунд</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="hero__subtitle">
                Персональна рекомендація на основі вашої ситуації
              </motion.p>
            </>
          )}

          <motion.div variants={fadeInUp} className="hero__actions hero__actions--centered">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={onStartQuiz}
            >
              🔘 Пройти тест (60 секунд) <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
