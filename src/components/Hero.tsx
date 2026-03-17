import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';
import { getVariant } from '../utils/abTesting';

import anxietyImg from '../assets/1_2026-03-17_15-28-27.png';
import depressionImg from '../assets/2_2026-03-17_15-28-13.png';
import burnoutImg from '../assets/3_2026-03-17_15-28-01.png';
import ptsdImg from '../assets/5_1_2026-03-17_15-34-27.png';
import relationshipsImg from '../assets/5_2026-03-17_15-27-36.png';

type HeroProps = {
  onStartQuiz: (placement: 'hero' | 'mid' | 'lower') => void;
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
    image: anxietyImg,
    case: 'Тривожність',
    description: 'Постійне напруження, тривожні думки, страх без причини. Ми допоможемо повернути відчуття безпеки і спокою.',
    showcase: {
      eyebrow: 'Персональний маршрут при тривожності',
      title: 'Від напруження до стабільності: чіткий план у 3 етапи',
      description:
        'Спочатку знижуємо рівень тривоги, далі працюємо з тригерами, а потім закріплюємо навички саморегуляції для стабільного результату.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика та стабілізація',
          image: 'https://images.unsplash.com/photo-1758273240631-59d44c8f5b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психологія', 'Нейрофідбек'],
        },
        {
          title: 'Фокусна терапія тривоги',
          image: 'https://images.unsplash.com/photo-1714976694810-85add1a29c96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психотерапія', 'VR-терапія'],
        },
        {
          title: 'Підтримка результату',
          image: 'https://images.unsplash.com/photo-1758273241078-8eec353836be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Супровід', 'Профілактика'],
        },
      ],
    },
  },
  depression: {
    image: depressionImg,
    case: 'Депресія',
    description: 'Спустошеність, втрата радості, важкість у кожному дні. Разом знайдемо вихід і повернемо сенс.',
    showcase: {
      eyebrow: 'Персональний маршрут при депресії',
      title: 'Повертаємо енергію та інтерес до життя поетапно',
      description:
        'Формуємо маршрут від клінічної оцінки до активного відновлення: з регулярним супроводом та корекцією плану під ваш стан.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика та маршрут',
          image: 'https://images.unsplash.com/photo-1597414169056-78e613b17549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психіатрія', 'Оцінка стану'],
        },
        {
          title: 'Фокусна терапія депресії',
          image: 'https://images.unsplash.com/photo-1758273240403-052b3c99f636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психотерапія', 'Нейрофідбек'],
        },
        {
          title: 'Закріплення та профілактика',
          image: 'https://images.unsplash.com/photo-1683210394660-ab1b47c791ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Профілактика рецидивів', 'Супровід'],
        },
      ],
    },
  },
  burnout: {
    image: burnoutImg,
    case: 'Вигорання',
    description: 'Коли більше нема сил — ні на роботу, ні на себе. Відновимо ресурс і допоможемо знайти баланс.',
    showcase: {
      eyebrow: 'Персональний маршрут при вигоранні',
      title: 'Повертаємо ресурс і працездатність без перевантаження',
      description:
        'Допомагаємо перезібрати ритм життя: стабілізуємо сон і нервову систему, зменшуємо перенапругу та формуємо здоровий темп роботи.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Оцінка перевантаження',
          image: 'https://images.unsplash.com/photo-1698047681465-a75bcf38379e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психологія', 'Нейрофідбек'],
        },
        {
          title: 'Фокус на відновлення ресурсу',
          image: 'https://images.unsplash.com/photo-1696453424699-f6ebbe24c28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психотерапія', 'Поведінкові практики'],
        },
        {
          title: 'Новий робочий баланс',
          image: 'https://images.unsplash.com/photo-1696453423785-727e165462c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Супровід', 'Профілактика'],
        },
      ],
    },
  },
  ptsd: {
    image: ptsdImg,
    case: 'ПТСР',
    description: 'Травматичний досвід, що не відпускає. Безпечна робота з пам\'яттю та нервовою системою.',
    showcase: {
      eyebrow: 'Персональний маршрут при ПТСР',
      title: 'Відновлюємо відчуття безпеки і контроль над реакціями',
      description:
        'Працюємо в травма-фокусованому форматі: спочатку стабілізація, потім опрацювання травматичного досвіду і м\'яка інтеграція змін у щоденне життя.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Стабілізація та безпека',
          image: 'https://images.unsplash.com/photo-1608483501815-bb9932a754db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психотерапія', 'Навички саморегуляції'],
        },
        {
          title: 'Фокусна робота з травмою',
          image: 'https://images.unsplash.com/photo-1714976694867-bc0e012fab70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Експозиційна терапія', 'EMDR'],
        },
        {
          title: 'Підтримка та інтеграція',
          image: 'https://images.unsplash.com/photo-1770935472590-53151cd5ed26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Групова підтримка', 'Супровід'],
        },
      ],
    },
  },
  relationships: {
    image: relationshipsImg,
    case: 'Стосунки',
    description: 'Конфлікти, відстань, нерозуміння. Допомагаємо парам і людям відновити зв\'язок із близькими.',
    showcase: {
      eyebrow: 'Персональний маршрут для стосунків',
      title: 'Налагоджуємо діалог, межі та взаємну підтримку',
      description:
        'Будуємо зрозумілий маршрут для пари або індивідуально: діагностика конфліктів, нові правила комунікації та закріплення змін у побуті.',
      badge: 'Маршрут: 3 етапи',
      cards: [
        {
          title: 'Діагностика динаміки стосунків',
          image: 'https://images.unsplash.com/photo-1604881991405-b273c7a4386a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Сімейна терапія', 'Оцінка конфліктів'],
        },
        {
          title: 'Комунікація без ескалації',
          image: 'https://images.unsplash.com/photo-1758524944783-0ec215baf777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          services: ['Психотерапія', 'Навички діалогу'],
        },
        {
          title: 'Закріплення нових сценаріїв',
          image: 'https://images.unsplash.com/photo-1604785800517-e972a4c16f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
              onClick={() => onStartQuiz('hero')}
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
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => onStartQuiz('mid')}
            >
              Пройти тест за 60 секунд
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

        <motion.section
          className="hero-lower-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Готові отримати персональну рекомендацію?</h2>
          <p>Тест займає близько хвилини. Після нього ви побачите наступний крок саме для вашого стану.</p>
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={() => onStartQuiz('lower')}
          >
            Пройти тест за 60 секунд <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </motion.section>
      </div>
    </section>
  );
};

export default Hero;
