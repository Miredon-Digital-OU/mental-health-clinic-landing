import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

type HeroProps = {
  onStartQuiz: () => void;
};

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
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
          <motion.h1 variants={fadeInUp} className="hero__title">
            Вам точно достатньо{' '}
            <span className="text-highlight">лише психолога?</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero__subtitle">
            Пройдіть короткий тест (60 секунд) та отримайте персональну
            рекомендацію
          </motion.p>

          <motion.div variants={fadeInUp} className="hero__actions hero__actions--centered">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={onStartQuiz}
            >
              Пройти тест <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
