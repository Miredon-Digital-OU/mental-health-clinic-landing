import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { getVariant } from '../utils/abTesting';
import { trackEvent, getQuestionEvent, EVENTS } from '../utils/analytics';

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
  const isCompletedRef = useRef(false);

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
        'Цікавить генетичний профіль психічного здоров\'я',
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
            'Разова консультація з психологом — 1200 грн',
            'Курс із 4 зустрічей — 6000 грн',
            'Поглиблена робота з психіатром — 12000 грн',
            'Комплексний супровід — 15000 грн',
          ],
    },
  ], [pricingVariant]);

  const totalSteps = questions.length;
  const question = questions[currentStep];
  const completionPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const latestProgressRef = useRef({
    step: 1,
    completionPercent: 0,
    questionId: questions[0].id,
  });

  useEffect(() => {
    latestProgressRef.current = {
      step: currentStep + 1,
      completionPercent,
      questionId: question.id,
    };
  }, [completionPercent, currentStep, question.id]);

  useEffect(() => {
    const trackDropoff = () => {
      if (isCompletedRef.current) {
        return;
      }

      trackEvent(EVENTS.TEST_DROPOFF, {
        step: latestProgressRef.current.step,
        question_id: latestProgressRef.current.questionId,
        completion_percent: latestProgressRef.current.completionPercent,
      });
    };

    window.addEventListener('beforeunload', trackDropoff);

    return () => {
      window.removeEventListener('beforeunload', trackDropoff);
      trackDropoff();
    };
  }, []);

  const handleSelect = (option: string) => {
    trackEvent(getQuestionEvent(currentStep), {
      question_id: question.id,
      question_number: currentStep + 1,
      answer: option,
      completion_percent: completionPercent,
    });

    trackEvent(EVENTS.QUESTION_ANSWERED, {
      question_id: question.id,
      question_number: currentStep + 1,
      answer: option,
      completion_percent: completionPercent,
    });

    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      isCompletedRef.current = true;
      trackEvent(EVENTS.TEST_COMPLETED, {
        total_steps: totalSteps,
      });
      onComplete(newAnswers as QuizAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      trackEvent(EVENTS.TEST_BACK_CLICKED, {
        from_step: currentStep + 1,
        to_step: currentStep,
      });
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    trackEvent(EVENTS.TEST_RESTARTED, {
      from_step: currentStep + 1,
    });
    setAnswers({});
    setDirection(-1);
    setCurrentStep(0);
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex >= currentStep) {
      return;
    }

    trackEvent(EVENTS.TEST_BACK_CLICKED, {
      from_step: currentStep + 1,
      to_step: stepIndex + 1,
      via: 'progress_bar',
    });

    setDirection(-1);
    setCurrentStep(stepIndex);
  };

  return (
    <section id="quiz" className="section quiz">
      <div className="container">
        <div className="quiz__wrapper">
          <div className="quiz__progress">
            {questions.map((item, i) => {
              const isPastStep = i < currentStep;
              const isClickable = i <= currentStep;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`quiz__progress-step ${i <= currentStep ? 'quiz__progress-step--active' : ''} ${isPastStep ? 'quiz__progress-step--clickable' : ''}`}
                  onClick={() => handleStepClick(i)}
                  disabled={!isClickable}
                  aria-label={`Питання ${i + 1}`}
                />
              );
            })}
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

          <div className="quiz__controls">
            {currentStep > 0 && (
              <button
                type="button"
                className="quiz__back"
                onClick={handleBack}
              >
                <ChevronLeft size={16} aria-hidden="true" /> Назад
              </button>
            )}

            {currentStep > 0 && (
              <button
                type="button"
                className="quiz__restart"
                onClick={handleRestart}
              >
                <RotateCcw size={14} aria-hidden="true" /> Почати спочатку
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
