import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Brain, Dna, Glasses, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

const ClinicHero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__bg-ambient" />

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="hero__badges">
            <span className="badge badge--soft">Доказова медицина</span>
            <span className="badge badge--soft">Комплексний підхід</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="hero__title">
            Доказова допомога{' '}
            <span className="text-highlight">для вашого ментального здоров'я</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero__subtitle">
            Поєднуємо психотерапію, психіатрію та інноваційні методи (VR, нейрофідбек, генетика),
            щоб підібрати індивідуальний, доказовий план підтримки.
          </motion.p>

          <motion.div variants={fadeInUp} className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Записатися на пілотну програму <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </a>
            <a href="#services" className="btn btn--outline">Обрати напрямок</a>
          </motion.div>

          <motion.div variants={fadeInUp} className="hero__chips">
            <div className="tag">
              <ShieldCheck size={14} />
              Конфіденційно • Етичні протоколи
            </div>
            <div className="chips-scroll">
              <span className="chip"><Brain size={14} /> Психологія</span>
              <span className="chip"><Activity size={14} /> Психіатрія</span>
              <span className="chip"><Glasses size={14} /> VR-терапія</span>
              <span className="chip"><Dna size={14} /> Генетика</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="hero__visual-card">
            <div className="abstract-shape"></div>
            <div className="abstract-shape shape--2"></div>
            <div className="hero__visual-grid">
              <div>
                <p className="visual-label">Індивідуальна діагностика</p>
                <p className="text-muted">Скринінг, оцінка стану, план підтримки.</p>
              </div>
              <div>
                <p className="visual-label">Технологічні методи</p>
                <p className="text-muted">VR, нейрофідбек, генетичні тести.</p>
              </div>
              <div>
                <p className="visual-label">Супровід</p>
                <p className="text-muted">Регулярна перевірка прогресу.</p>
              </div>
              <div>
                <p className="visual-label">Команда</p>
                <p className="text-muted">Психологи, психіатри, нейрофахівці.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicHero;
