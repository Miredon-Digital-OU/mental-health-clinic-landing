import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import LeadForm from './components/LeadForm';
import ReadinessFilter from './components/ReadinessFilter';
import Footer from './components/Footer';
import ClinicPage from './components/ClinicPage';
import FloatingButton from './components/FloatingButton';
import type { QuizAnswers } from './components/Quiz';
import { trackEvent, EVENTS } from './utils/analytics';
import { captureAttribution } from './utils/attribution';

type AppStage = 'hero' | 'quiz' | 'result' | 'lead' | 'readiness' | 'clinic';
type CtaPlacement = 'hero' | 'mid' | 'lower' | 'floating';

function App() {
  const [stage, setStage] = useState<AppStage>('hero');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [quizStartedAt, setQuizStartedAt] = useState<string | null>(null);
  const [entryPlacement, setEntryPlacement] = useState<CtaPlacement>('hero');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const attribution = captureAttribution();
    trackEvent(EVENTS.PAGE_LOADED, {
      page: 'landing',
      utm_source: attribution?.utmSource,
      utm_medium: attribution?.utmMedium,
      utm_campaign: attribution?.utmCampaign,
    });
  }, []);

  useEffect(() => {
    trackEvent(EVENTS.APP_STAGE_VIEWED, {
      stage,
    });
  }, [stage]);

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

  const handleStartQuiz = (placement: CtaPlacement) => {
    const attribution = captureAttribution();
    setEntryPlacement(placement);
    setQuizStartedAt(new Date().toISOString());
    trackEvent(EVENTS.CTA_CLICKED, {
      placement,
      cta_text: 'take_test_in_60_seconds',
      utm_campaign: attribution?.utmCampaign,
    });
    trackEvent(EVENTS.TEST_STARTED, {
      placement,
      utm_campaign: attribution?.utmCampaign,
    });
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

  const handleBackToStart = () => {
    setStage('hero');
    setQuizAnswers(null);
    setQuizStartedAt(null);
    scrollToTop();
  };

  if (stage === 'clinic') {
    return <ClinicPage onBackToStart={handleBackToStart} />;
  }

  const showHeaderLinks = false;

  return (
    <div className="app">
      <Header showLinks={showHeaderLinks} />
      <main>
        {stage === 'hero' && <Hero onStartQuiz={handleStartQuiz} />}

        <div ref={mainRef}>
          {stage === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
          {stage === 'result' && quizAnswers && (
            <QuizResult answers={quizAnswers} onContinue={handleResultContinue} />
          )}
          {stage === 'lead' && (
            <LeadForm
              onSubmitted={handleLeadSubmitted}
              answers={quizAnswers}
              entryPlacement={entryPlacement}
              quizStartedAt={quizStartedAt}
            />
          )}
          {stage === 'readiness' && <ReadinessFilter onComplete={handleReadinessComplete} />}
        </div>
      </main>
      <Footer />
      {stage === 'hero' && <FloatingButton onClick={() => handleStartQuiz('floating')} />}
    </div>
  );
}

export default App;
