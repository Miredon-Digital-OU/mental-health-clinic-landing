import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Brain, ChevronDown, Dna, Glasses } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type ServiceCard = {
  id: 'neurofeedback' | 'vr' | 'genotyping' | 'mental-care';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details: string[];
};

const cards: ServiceCard[] = [
  {
    id: 'neurofeedback',
    title: 'Нейрофідбек',
    subtitle: 'Тренування саморегуляції мозку без медикаментів.',
    icon: <Activity size={18} aria-hidden="true" />,
    details: [
      'Підходить при тривожності, виснаженні та складнощах із концентрацією.',
      'Ми відстежуємо реакції мозку в реальному часі та поступово формуємо стабільні патерни саморегуляції.',
      'Сесії добре поєднуються з психотерапією як частина комплексного плану.',
    ],
  },
  {
    id: 'vr',
    title: 'VR-терапія',
    subtitle: 'Контрольоване опрацювання тригерів у безпечному форматі.',
    icon: <Glasses size={18} aria-hidden="true" />,
    details: [
      'Застосовується для роботи з травматичним досвідом, фобіями та сильними реакціями на стрес.',
      'Сценарій підбирається індивідуально: від мʼякої адаптації до цільової експозиції.',
      'Кожен етап проходить під супроводом фахівця, з чіткими критеріями безпеки.',
    ],
  },
  {
    id: 'genotyping',
    title: 'Генотипування',
    subtitle: 'Додатковий рівень персоналізації плану лікування.',
    icon: <Dna size={18} aria-hidden="true" />,
    details: [
      'Дослідження генетичних маркерів допомагає точніше оцінити ризики і чутливість до окремих підходів.',
      'Використовується як допоміжний інструмент, а не як самостійний діагноз.',
      'Результати пояснюємо простою мовою і вбудовуємо в загальний терапевтичний план.',
    ],
  },
  {
    id: 'mental-care',
    title: 'Психологія та психіатрія',
    subtitle: 'Єдина команда, що працює в узгодженому маршруті.',
    icon: <Brain size={18} aria-hidden="true" />,
    details: [
      'Психолог допомагає стабілізувати стан і розібратися з причинами симптомів.',
      'Психіатр долучається за показами, коли потрібна медична оцінка або медикаментозна підтримка.',
      'Ви отримуєте послідовний супровід замість розрізнених консультацій у різних місцях.',
    ],
  },
];

const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<ServiceCard['id'] | null>(null);
  const sectionRef = useScrollReveal();

  const toggleCard = (cardId: ServiceCard['id']) => {
    setExpandedId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section id="services" className="section services" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section__title" data-reveal>Методи, які підсилюють терапію</h2>
          <p className="section__subtitle mb-4" data-reveal data-reveal-delay="80">
            Розкрийте картку, щоб коротко побачити, кому і коли цей підхід може підійти.
          </p>
        </div>

        <div className="services-cards-grid">
          {cards.map((card, index) => {
            const isExpanded = expandedId === card.id;

            return (
              <article
                key={card.id}
                className={`service-expand-card ${isExpanded ? 'service-expand-card--open' : ''}`}
                data-reveal="card"
                data-reveal-delay={String(index * 100)}
              >
                <button
                  type="button"
                  className="service-expand-card__trigger"
                  onClick={() => toggleCard(card.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-panel-${card.id}`}
                >
                  <span className="service-expand-card__title-wrap">
                    <span className="service-expand-card__icon">{card.icon}</span>
                    <span>
                      <span className="service-expand-card__title">{card.title}</span>
                      <span className="service-expand-card__subtitle">{card.subtitle}</span>
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`service-expand-card__chevron ${isExpanded ? 'service-expand-card__chevron--open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`service-panel-${card.id}`}
                      className="service-expand-card__content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="service-expand-card__content-inner">
                        {card.details.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
