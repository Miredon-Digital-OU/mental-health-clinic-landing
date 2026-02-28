import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';
import { getVariant } from '../utils/abTesting';

type HeroProps = {
  onStartQuiz: () => void;
};

const heroStripImages = [
  { 
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    case: 'Тривожність',
    description: 'Постійне напруження та занепокоєння'
  },
  { 
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    case: 'Депресія',
    description: 'Апатія, втома, втрата інтересу'
  },
  { 
    image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=700&q=80',
    case: 'Вигорання',
    description: 'Емоційне та фізичне виснаження'
  },
  { 
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=700&q=80',
    case: 'ПТСР',
    description: 'Наслідки травматичних подій'
  },
  { 
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80',
    case: 'Стосунки',
    description: 'Труднощі в комунікації'
  },
];

const showcaseCards = [
  {
    title: 'Тривожність та перевантаження',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
    services: ['Психологія', 'Нейрофідбек'],
  },
  {
    title: 'Емоційне відновлення',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    services: ['Психотерапія', 'Психіатрія'],
  },
  {
    title: 'Повернення до ресурсу',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80',
    services: ['VR-терапія', 'Генетика'],
  },
];

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const [variant] = useState<'A' | 'B'>(() => getVariant('hero_title'));

  return (
    <section className="hero hero--centered">
      <div className="container">
        <motion.div
          className="hero-shell"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="hero__kicker">
            Комплексна турбота про ментальне здоров&apos;я
          </motion.p>

          <motion.h1 variants={fadeInUp} className="hero__title">
            {variant === 'A'
              ? 'Разом перетворюємо складний шлях до відновлення у зрозумілий план'
              : 'Підібраний формат підтримки для вашого стану без здогадок та хаосу'}
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero__subtitle">
            Пройдіть короткий тест і отримайте рекомендацію: психолог, психіатр або комплексний підхід
            з додатковими методиками.
          </motion.p>

          <motion.div variants={fadeInUp} className="hero__actions hero__actions--centered">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={onStartQuiz}
            >
              Пройти тест за 60 секунд <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </motion.div>

          <motion.p variants={fadeInUp} className="hero__note">
            Персональна рекомендація, яку можна обговорити з нашою командою одразу після тесту.
          </motion.p>

<motion.div variants={fadeInUp} className="hero__gallery-strip">
            {heroStripImages.map((item, index) => (
              <motion.div
                key={item.case}
                className="hero-gallery-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <img
                  src={item.image}
                  alt={item.case}
                  width={200}
                  height={150}
                  loading="lazy"
                />
                <div className="hero-gallery-item__overlay">
                  <span className="hero-gallery-item__case">{item.case}</span>
                  <span className="hero-gallery-item__desc">{item.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-showcase"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-showcase__copy">
            <p className="hero-showcase__eyebrow">Для різних ситуацій</p>
            <h2>Терапія, підтримка та відновлення у зручному для вас темпі</h2>
            <p>
              Поєднуємо перевірені протоколи, комфортний ритм роботи та сучасні інструменти,
              щоб ви бачили прогрес не тільки в кабінеті, а й у повсякденному житті.
            </p>
            <button type="button" className="btn btn--primary btn--sm" onClick={onStartQuiz}>
              Підібрати програму
            </button>
          </div>

<div className="hero-showcase__visual">
            <span className="hero-showcase__badge">Онлайн та офлайн</span>
            <div className="hero-showcase__cards">
              {showcaseCards.map((card) => (
                <motion.article
                  key={card.title}
                  className="hero-showcase__card"
                  whileHover={{ y: -8 }}
                >
                  <img src={card.image} alt={card.title} width={280} height={200} loading="lazy" />
                  <p>{card.title}</p>
                  <div className="hero-showcase__card-services">
                    {card.services.map((service) => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
