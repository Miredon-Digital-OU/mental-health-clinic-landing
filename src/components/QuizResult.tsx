import React from 'react';
import { motion } from 'framer-motion';
import type { QuizAnswers } from './Quiz';

type ResultProfile = {
  title: string;
  points: string[];
  description: string;
};

function getResult(answers: QuizAnswers): ResultProfile {
  const readyForPsychiatrist =
    answers.psychiatrist === 'Готовий, якщо потрібно';
  const interestedInMethods =
    answers.methods !== 'Хочу тільки розмовну терапію';
  const burnout = answers.pain === 'Вигорання';
  const brainInterest =
    answers.methods === 'Цікавий нейрофідбек' ||
    answers.methods === 'Хочу комплексний підхід';

  // Branch 1: Complex program
  if (readyForPsychiatrist && interestedInMethods) {
    return {
      title: 'Комплексна програма',
      points: [
        'Психолог + оцінка психіатра',
        'Додаткові методи для пришвидшення результату',
      ],
      description:
        'Комплексний підхід дозволяє зменшити симптоми швидше та системніше.',
    };
  }

  // Branch 2: Burnout + brain interest -> Resource recovery
  if (burnout && brainInterest) {
    return {
      title: 'Програма відновлення ресурсу',
      points: [
        'Психотерапія + нейрофідбек',
        'Оцінка стану та моніторинг прогресу',
      ],
      description:
        'Поєднання терапії та технологій допомагає швидше відновити енергію та ефективність.',
    };
  }

  // Branch 3: Only talk therapy, not ready for psychiatrist -> Basic start
  if (!interestedInMethods && !readyForPsychiatrist) {
    return {
      title: 'Психологічний старт',
      points: [
        'Індивідуальна терапія з психологом',
        'Оцінка стану та план підтримки',
      ],
      description:
        'Почніть з розмовної терапії та визначте, що саме вам потрібно.',
    };
  }

  // Default: Comprehensive assessment
  return {
    title: 'Психолог + оцінка психіатра',
    points: [
      'Психолог + оцінка психіатра',
      'Додаткові методи за потреби',
    ],
    description:
      'На основі вашого запиту рекомендуємо почати з оцінки та підібрати оптимальний формат підтримки.',
  };
}

type QuizResultProps = {
  answers: QuizAnswers;
  onContinue: () => void;
};

const QuizResult: React.FC<QuizResultProps> = ({ answers, onContinue }) => {
  const result = getResult(answers);

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
          <button
            type="button"
            className="btn btn--primary quiz-result__cta"
            onClick={onContinue}
          >
            Отримати запрошення
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizResult;
