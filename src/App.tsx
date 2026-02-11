import { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import LeadForm from './components/LeadForm';
import ReadinessFilter from './components/ReadinessFilter';
import Footer from './components/Footer';
import ClinicPage from './components/ClinicPage';
import type { QuizAnswers } from './components/Quiz';

type AppStage = 'hero' | 'quiz' | 'result' | 'lead' | 'readiness' | 'clinic';

function App() {
  const [stage, setStage] = useState<AppStage>('hero');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const scrollToMain = () => {
    setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStartQuiz = () => {
    setStage('quiz');
    scrollToMain();
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setStage('result');
    scrollToMain();
  };

  const handleResultContinue = () => {
    setStage('lead');
    scrollToMain();
  };

  const handleLeadSubmitted = () => {
    setStage('readiness');
    scrollToMain();
  };

  const handleReadinessComplete = () => {
    setStage('clinic');
    scrollToTop();
  };

  // Clinic page is a full standalone view
  if (stage === 'clinic') {
    return <ClinicPage />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        {stage === 'hero' && <Hero onStartQuiz={handleStartQuiz} />}

        <div ref={mainRef}>
          {stage === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
          {stage === 'result' && quizAnswers && (
            <QuizResult answers={quizAnswers} onContinue={handleResultContinue} />
          )}
          {stage === 'lead' && <LeadForm onSubmitted={handleLeadSubmitted} />}
          {stage === 'readiness' && <ReadinessFilter onComplete={handleReadinessComplete} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
