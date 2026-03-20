import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { QuizAnswers } from './Quiz';
import { trackEvent, EVENTS } from '../utils/analytics';

type ResultProfile = {
  title: string;
  points: string[];
  description: string;
};

function getResult(answers: QuizAnswers): ResultProfile {
  const pain = answers.pain;
  const psychiatrist = answers.psychiatrist;
  const methods = answers.methods;

  const isReadyForPsychiatrist = psychiatrist === 'Готовий, якщо потрібно';
  const isTalkOnly = methods === 'Хочу тільки розмовну терапію';
  
  // Logic 4: PTSD + Ready + VR
  if (pain === 'Наслідки війни / ПТСР' && isReadyForPsychiatrist && methods === 'Цікава VR-терапія') {
    return {
      title: 'Інтенсивна програма з VR-терапією',
      points: [
        'Робота з травмою (VR-експозиція)',
        'Психіатр + кризовий психолог',
      ],
      description: 'Сучасний метод VR-терапії дозволяє безпечно та контрольовано опрацювати травматичний досвід.',
    };
  }

  // Logic 3: Burnout + Brain interest
  if (pain === 'Вигорання' && (methods === 'Цікавий нейрофідбек' || methods === 'Хочу комплексний підхід')) {
    return {
      title: 'Програма відновлення ресурсу',
      points: [
        'Психотерапія + нейрофідбек',
        'Відновлення сну та регуляція стресу',
      ],
      description: 'Поєднання терапії та технологій допомагає швидше відновити енергію та когнітивну ефективність.',
    };
  }

  // Logic 2: Talk only + Not ready
  if (isTalkOnly && !isReadyForPsychiatrist) {
    return {
      title: 'Психологічний старт',
      points: [
        'Індивідуальна терапія з психологом',
        'Без медикаментів (на цьому етапі)',
      ],
      description: 'Почніть з розмовної терапії у безпечному просторі, щоб краще зрозуміти себе та свої потреби.',
    };
  }

  // Logic 1: Anxiety + Ready + Interest (also serves as a strong default/fallback for complex needs)
  // Or explicitly checking:
  if (pain === 'Тривога / постійне напруження' && isReadyForPsychiatrist && !isTalkOnly) {
     // falls through to default commonly, but we can return here
      return {
      title: 'Комплексна програма',
      points: [
        'Психолог + оцінка психіатра',
        'Додаткові методи для пришвидшення результату',
      ],
      description: 'Комплексний підхід дозволяє зменшити симптоми на 40% швидше та працювати системно з причинами, а не лише симптомами.',
    };
  }

  // Default Fallback
  return {
    title: 'Комплексна програма',
    points: [
      'Психолог + оцінка психіатра',
      'Додаткові методи для пришвидшення результату',
    ],
    description: 'Комплексний підхід дозволяє зменшити симптоми на 40% швидше та працювати системно з причинами, а не лише симптомами.',
  };
}

const methodBlocks = [
  {
    key: 'vr',
    match: (answers: QuizAnswers) => Object.values(answers).some((a) => a.includes('VR')),
    title: 'VR-терапія',
    text: 'Занурення у спеціально створене віртуальне середовище під наглядом спеціаліста. Безпечно опрацьовуємо страхи, тривожність та складні стани — без необхідності відтворювати їх у реальному житті.',
  },
  {
    key: 'neurofeedback',
    match: (answers: QuizAnswers) =>
      Object.values(answers).some((a) => a.toLowerCase().includes('нейрофідбек')),
    title: 'Нейрофідбек',
    text: 'Тренування мозку через зворотний зв\'язок у реальному часі. Метод допомагає нормалізувати роботу нервової системи, підвищити стресостійкість і відновити емоційний баланс без медикаментів.',
  },
  {
    key: 'genetics',
    match: (answers: QuizAnswers) =>
      Object.values(answers).some((a) => a.toLowerCase().includes('генетичний')),
    title: 'Генетичний профіль психічного здоров\'я',
    text: 'Аналіз ДНК дозволяє оцінити індивідуальні схильності та підібрати найефективнішу стратегію лікування саме для вас — без зайвих спроб і помилок.',
  },
];

type QuizResultProps = {
  answers: QuizAnswers;
  onContinue: () => void;
};

const QuizResult: React.FC<QuizResultProps> = ({ answers, onContinue }) => {
  const result = useMemo(() => getResult(answers), [answers]);
  const activeMethodBlocks = useMemo(
    () => methodBlocks.filter((b) => b.match(answers)),
    [answers],
  );

  React.useEffect(() => {
    trackEvent(EVENTS.RESULT_SHOWN, { result: result.title });
  }, [result.title]);

  const handleContinue = () => {
    trackEvent(EVENTS.RESULT_CONTINUE_CLICKED, {
      result: result.title,
    });
    onContinue();
  };

  return (
    <section className="section quiz-result">
      <div className="container">
        <motion.div
          className="quiz-result__card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="quiz-result__label">
            На основі ваших відповідей вам підійде:
          </p>
          <h2 className="quiz-result__title">{result.title}</h2>
          <ul className="quiz-result__points">
            {result.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="quiz-result__description">{result.description}</p>
          {activeMethodBlocks.length > 0 && (
            <div className="quiz-result__methods">
              {activeMethodBlocks.map((block) => (
                <div key={block.key} className="quiz-result__method-block">
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn btn--primary quiz-result__cta"
            onClick={handleContinue}
          >
            Отримати персональний план
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizResult;
