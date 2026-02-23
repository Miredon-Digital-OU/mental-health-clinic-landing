import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVariant } from '../utils/abTesting';
import { trackEvent, getQuestionEvent } from '../utils/analytics';

export type QuizAnswers = {
  pain: string;
  experience: string;
  psychiatrist: string;
  methods: string;
  pricing: string;
};

type QuizProps = {
  onComplete: (answers: QuizAnswers) => void;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [direction, setDirection] = useState(1);
  const [pricingVariant] = useState<'A' | 'B'>(() => getVariant('pricing_model'));

  const questions = useMemo(() => [
    {
      id: 'pain' as const,
      title: 'Що вас турбує найбільше зараз?',
      options: [
        'Тривога / постійне напруження',
        'Депресивний стан / апатія',
        'Вигорання',
        'Наслідки війни / ПТСР',
        'Проблеми у стосунках',
        'Хочу краще зрозуміти себе',
      ],
    },
    {
      id: 'experience' as const,
      title: 'Ви вже зверталися до психолога?',
      options: [
        'Так, зараз проходжу терапію',
        'Так, але не допомогло',
        'Ні, тільки планую',
        'Ніколи не звертався',
      ],
    },
    {
      id: 'psychiatrist' as const,
      title: 'Як ви ставитесь до консультації психіатра?',
      options: [
        'Готовий, якщо потрібно',
        'Сумніваюсь / трохи боюсь',
        'Мені це не потрібно',
        'Не знаю різниці між психологом і психіатром',
      ],
    },
    {
      id: 'methods' as const,
      title: 'Чи цікаві вам сучасні методи роботи з мозком?',
      options: [
        'Хочу тільки розмовну терапію',
        'Цікавий нейрофідбек',
        'Цікава VR-терапія',
        'Хотів би знати про генетичні ризики',
        'Хочу комплексний підхід',
      ],
    },
    {
      id: 'pricing' as const,
      title: 'Який формат вам ближчий?',
      options: pricingVariant === 'A' 
        ? [ // Subscription Model
            '1200–1800 грн сесія (тільки психолог)',
            '6000-8000 / місяць (психолог + психіатр)',
            '10000-12000 / місяць (комплекс із додатковими методами)',
            'Хочу дізнатись більше про ціни',
          ]
        : [ // Packages Model
            'Окремі сесії (1200-1800)',
            'Пакет 4 сесії (6000)',
            'Пакет 8 сесій + психіатр (12000)',
            'Комплексний пакет (15000)',
          ],
    },
  ], [pricingVariant]);

  const totalSteps = questions.length;
  const question = questions[currentStep];

  const handleSelect = (option: string) => {
    trackEvent(getQuestionEvent(currentStep), { question: question.id, answer: option });
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers as QuizAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section id="quiz" className="section quiz">
      <div className="container">
        <div className="quiz__wrapper">
          <div className="quiz__progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`quiz__progress-step ${i <= currentStep ? 'quiz__progress-step--active' : ''}`}
              />
            ))}
          </div>
          <p className="quiz__counter">Питання {currentStep + 1} з {totalSteps}</p>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="quiz__screen"
            >
              <h2 className="quiz__question">{question.title}</h2>
              <div className="quiz__options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={`quiz__option ${answers[question.id] === option ? 'quiz__option--selected' : ''}`}
                    onClick={() => handleSelect(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {currentStep > 0 && (
            <button
              type="button"
              className="quiz__back"
              onClick={handleBack}
            >
              Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
