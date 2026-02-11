import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const questions = [
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
    title: 'Ви вже звертались до психолога?',
    options: [
      'Так, проходжу терапію',
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
    options: [
      '50\u201370\u20AC / сесія (тільки психолог)',
      '120\u2013180\u20AC / місяць (психолог + психіатр)',
      '250\u2013400\u20AC / місяць (комплекс)',
      'Хочу дізнатись деталі',
    ],
  },
];

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

  const totalSteps = questions.length;
  const question = questions[currentStep];

  const handleSelect = (option: string) => {
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
          <p className="quiz__counter">{currentStep + 1} / {totalSteps}</p>

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
