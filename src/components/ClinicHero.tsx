import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Brain, Dna, Glasses, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

const ClinicHero: React.FC = () => {
  return (
    <section className="hero clinic-hero">
      <div className="hero__bg-ambient clinic-hero__bg-ambient" />

      <div className="container hero__container clinic-hero__container">
        <motion.div
          className="hero__content clinic-hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="hero__badges">
            <span className="badge badge--soft">Доказова медицина</span>
            <span className="badge badge--soft">Комплексний підхід</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="hero__title clinic-hero__title">
            Клініка психічного здоров&apos;я: від психолога до психіатра та інноваційних методів лікування
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero__subtitle">
            Комплексний підхід: класична психологія, психіатрія, нейрофідбек, VR-терапія та оцінка генетичних ризиків.
          </motion.p>

          <motion.div variants={fadeInUp} className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Записатися на пілотну програму <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </a>
            <a href="#services" className="btn btn--outline">Обрати напрямок</a>
          </motion.div>

          <motion.div variants={fadeInUp} className="hero__chips">
            <div className="tag">
              <ShieldCheck size={14} aria-hidden="true" />
              Конфіденційно • Етичні протоколи
            </div>
            <div className="chips-scroll">
              <span className="chip"><Brain size={14} aria-hidden="true" /> Психологія</span>
              <span className="chip"><Activity size={14} aria-hidden="true" /> Психіатрія</span>
              <span className="chip"><Glasses size={14} aria-hidden="true" /> VR-терапія</span>
              <span className="chip"><Dna size={14} aria-hidden="true" /> Генетика</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
           className="hero__visual"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
         >
           <div className="hero__visual-img-container">
             <img 
               src="/brain/75861c7c-bc7c-4be7-81bb-625833e9cbfd/clinic_hero_visual_1773751109558.png" 
               alt="Сучасна клініка психічного здоров'я" 
               className="hero__visual-img"
             />
             <div className="hero__visual-overlay">
               <div className="glass-effect p-4 text-sm">
                 <p className="font-bold text-primary mb-1">98% точність діагностики</p>
                 <p className="text-xs text-muted">Завдяки поєднанню ЕЕГ та клінічного інтерв’ю</p>
               </div>
             </div>
           </div>
         </motion.div>
      </div>
    </section>
  );
};

export default ClinicHero;
