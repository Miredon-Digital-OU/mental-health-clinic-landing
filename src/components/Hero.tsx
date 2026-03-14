import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';
import { getVariant } from '../utils/abTesting';

type HeroProps = {
  onStartQuiz: () => void;
};

type TopicKey = 'anxiety' | 'depression' | 'burnout' | 'ptsd' | 'relationships';

type ShowcaseCard = {
  title: string;
  image: string;
  services: string[];
};

type TopicData = {
  image: string;
  case: string;
  description: string;
  showcase: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    cards: ShowcaseCard[];
  };
};

const heroTopicOrder: TopicKey[] = ['anxiety', 'depression', 'burnout', 'ptsd', 'relationships'];

const heroTopics: Record<TopicKey, TopicData> = {
  anxiety: {
    image: 'https://images.unsplash.com/photo-1542820893-f3d652b53f50?auto=format&fit=crop&w=700&q=80',
    case: 'Тривожність',
    description: 'Постійне напруження та занепокоєння',
    showcase: {
      eyebrow: 'Персональний маршрут при тривожності',
      title: 'Від напруження до стабільності: чіткий план у 3 етапи',
      description:
        'Спочатку знижуємо рівень тривоги, далі працюємо з тригерами, а потім закріплюємо навички саморегуляції для стабільного результату.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика та стабілізація',
          image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=700&q=80',
          services: ['Психологія', 'Нейрофідбек'],
        },
        {
          title: 'Фокусна терапія тривоги',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80',
          services: ['Психотерапія', 'VR-терапія'],
        },
        {
          title: 'Підтримка результату',
          image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80',
          services: ['Супровід', 'Профілактика'],
        },
      ],
    },
  },
  depression: {
    image: 'https://images.unsplash.com/photo-1580141958900-f704c410ba0e?auto=format&fit=crop&w=700&q=80',
    case: 'Депресія',
    description: 'Апатія, втома, втрата інтересу',
    showcase: {
      eyebrow: 'Персональний маршрут при депресії',
      title: 'Повертаємо енергію та інтерес до життя поетапно',
      description:
        'Формуємо маршрут від клінічної оцінки до активного відновлення: з регулярним супроводом та корекцією плану під ваш стан.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика та маршрут',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
          services: ['Психіатрія', 'Оцінка стану'],
        },
        {
          title: 'Фокусна терапія депресії',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80',
          services: ['Психотерапія', 'Нейрофідбек'],
        },
        {
          title: 'Закріплення та профілактика',
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
          services: ['Профілактика рецидивів', 'Супровід'],
        },
      ],
    },
  },
  burnout: {
    image: 'https://images.unsplash.com/photo-1713946598253-59d6418cb85b?auto=format&fit=crop&w=700&q=80',
    case: 'Вигорання',
    description: 'Емоційне та фізичне виснаження',
    showcase: {
      eyebrow: 'Персональний маршрут при вигоранні',
      title: 'Повертаємо ресурс і працездатність без перевантаження',
      description:
        'Допомагаємо перезібрати ритм життя: стабілізуємо сон і нервову систему, зменшуємо перенапругу та формуємо здоровий темп роботи.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Оцінка перевантаження',
          image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
          services: ['Психологія', 'Нейрофідбек'],
        },
        {
          title: 'Фокус на відновлення ресурсу',
          image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=700&q=80',
          services: ['Психотерапія', 'Поведінкові практики'],
        },
        {
          title: 'Новий робочий баланс',
          image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80',
          services: ['Супровід', 'Профілактика'],
        },
      ],
    },
  },
  ptsd: {
    image: 'https://images.unsplash.com/photo-1656014570709-7437353f5907?auto=format&fit=crop&w=700&q=80',
    case: 'ПТСР',
    description: 'Наслідки травматичних подій',
    showcase: {
      eyebrow: 'Персональний маршрут при ПТСР',
      title: 'Відновлюємо відчуття безпеки і контроль над реакціями',
      description:
        'Працюємо в травма-фокусованому форматі: спочатку стабілізація, потім опрацювання травматичного досвіду і м\'яка інтеграція змін у щоденне життя.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Стабілізація та безпека',
          image: 'https://images.unsplash.com/photo-1524088484081-4ca7e08e3e19?auto=format&fit=crop&w=700&q=80',
          services: ['Психотерапія', 'Навички саморегуляції'],
        },
        {
          title: 'Фокусна робота з травмою',
          image: 'https://images.unsplash.com/photo-1620077399971-431e7ea0cf0c?auto=format&fit=crop&w=700&q=80',
          services: ['Експозиційна терапія', 'EMDR'],
        },
        {
          title: 'Підтримка та інтеграція',
          image: 'https://images.unsplash.com/photo-1664137168109-ef2655d148a7?auto=format&fit=crop&w=700&q=80',
          services: ['Групова підтримка', 'Супровід'],
        },
      ],
    },
  },
  relationships: {
    image: 'https://images.unsplash.com/photo-1603503554019-dbf74fe7ab5a?auto=format&fit=crop&w=700&q=80',
    case: 'Стосунки',
    description: 'Труднощі в комунікації',
    showcase: {
      eyebrow: 'Персональний маршрут для стосунків',
      title: 'Налагоджуємо діалог, межі та взаємну підтримку',
      description:
        'Будуємо зрозумілий маршрут для пари або індивідуально: діагностика конфліктів, нові правила комунікації та закріплення змін у побуті.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика динаміки стосунків',
          image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=700&q=80',
          services: ['Сімейна терапія', 'Оцінка конфліктів'],
        },
        {
          title: 'Комунікація без ескалації',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
          services: ['Психотерапія', 'Навички діалогу'],
        },
        {
          title: 'Закріплення нових сценаріїв',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
          services: ['Супровід', 'Домашні практики'],
        },
      ],
    },
  },
};

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const [variant] = useState<'A' | 'B'>(() => getVariant('hero_title'));
  const [selectedTopicId, setSelectedTopicId] = useState<TopicKey>('anxiety');
  const showcaseRef = useRef<HTMLDivElement>(null);

  const selectedTopic = heroTopics[selectedTopicId];

  const handleSelectTopic = (topicId: TopicKey) => {
    setSelectedTopicId(topicId);

    if (window.matchMedia('(max-width: 768px)').matches) {
      setTimeout(() => {
        showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  };

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
              : 'Зрозуміти свій стан і отримати правильну допомогу. Знайдіть свою точку опори з нами'}
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
            {heroTopicOrder.map((topicId, index) => {
              const item = heroTopics[topicId];
              const isActive = selectedTopicId === topicId;

              return (
                <motion.button
                  key={item.case}
                  type="button"
                  className={`hero-gallery-item${isActive ? ' hero-gallery-item--active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectTopic(topicId)}
                  aria-pressed={isActive}
                  aria-label={`Показати програму для стану: ${item.case}`}
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
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          ref={showcaseRef}
          className="hero-showcase"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-showcase__copy">
            <p className="hero-showcase__eyebrow">{selectedTopic.showcase.eyebrow}</p>
            <h2>{selectedTopic.showcase.title}</h2>
            <p>{selectedTopic.showcase.description}</p>
            <button type="button" className="btn btn--primary btn--sm" onClick={onStartQuiz}>
              Підібрати програму
            </button>
          </div>

          <div className="hero-showcase__visual">
            <span className="hero-showcase__badge">{selectedTopic.showcase.badge}</span>
            <div className="hero-showcase__cards">
              {selectedTopic.showcase.cards.map((card) => (
                <motion.article key={card.title} className="hero-showcase__card">
                  <img src={card.image} alt={card.title} width={280} height={200} loading="lazy" />
                  <p>{card.title}</p>
                  <div className="hero-showcase__card-services">
                    {card.services.map((service) => (
                      <span key={service} className="service-tag">
                        {service}
                      </span>
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
