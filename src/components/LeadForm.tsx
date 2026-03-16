import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { trackEvent, EVENTS } from '../utils/analytics';
import { getVariant } from '../utils/abTesting';
import { submitLead } from '../utils/leadApi';
import { captureAttribution } from '../utils/attribution';
import type { QuizAnswers } from './Quiz';

const isValidUAPhone = (value: string): boolean => {
  const cleaned = value.replace(/[\s\-()]/g, '');
  const uaPhoneRegex = /^(\+380|380|0)\d{9}$/;
  return uaPhoneRegex.test(cleaned);
};

const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const isValidContact = (value: string): boolean => {
  const trimmed = value.trim();
  return isValidUAPhone(trimmed) || isValidEmail(trimmed);
};

type LeadFormProps = {
  onSubmitted: () => void;
  answers: QuizAnswers | null;
  entryPlacement: 'hero' | 'mid' | 'lower' | 'floating';
  quizStartedAt: string | null;
};

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitted, answers, entryPlacement, quizStartedAt }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [variant] = useState<'A' | 'B'>(() => getVariant('form_trigger'));
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');

  const isValid = name.trim().length > 1 && isValidContact(contact);

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent(EVENTS.FORM_STARTED, {
        form_name: 'lead_capture',
        entry_placement: entryPlacement,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const attribution = captureAttribution();
    const trimmedContact = contact.trim();
    const contactType = isValidEmail(trimmedContact) ? 'email' : 'phone';
    
    if (!isValidContact(trimmedContact)) {
      setError('Введіть український номер телефону (+380...) або email');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      await submitLead({
        formType: 'lead-capture',
        name: name.trim(),
        contact: trimmedContact,
        consent: {
          accepted: true,
          policyVersion: '2026-02',
        },
        metadata: {
          source: `quiz-flow-${variant}`,
          entryPlacement,
          quizStartedAt: quizStartedAt ?? undefined,
          submittedAtClient: new Date().toISOString(),
          campaignId: attribution?.utmCampaign,
          funnelStage: 'lead_form',
          quizAnswers: answers ?? undefined,
          attribution: attribution ?? undefined,
        },
      });

      trackEvent(EVENTS.LEAD_SUBMITTED, {
        form_name: 'lead_capture',
        contact_type: contactType,
        entry_placement: entryPlacement,
        has_quiz_answers: Boolean(answers),
      });
      onSubmitted();
    } catch (submitError) {
      console.error('Lead submit failed:', submitError);
      setStatus('idle');
      setError('Не вдалося відправити форму. Спробуйте ще раз.');

      trackEvent(EVENTS.LEAD_SUBMISSION_FAILED, {
        form_name: 'lead_capture',
        entry_placement: entryPlacement,
      });
    }
  };

  return (
    <section id="contact" className="section lead-capture">
      <div className="container">
        <motion.div
          className="lead-capture__card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lead-capture__text">
            <h2>Ми відкриваємо пілотну програму</h2>
            <p>
              Залиште контакт та отримайте:
            </p>
            <ul className="lead-capture__benefits">
              <li>Персональний план лікування</li>
              <li>{variant === 'A' ? 'Знижка 20% для перших 50 учасників' : 'Безкоштовна первинна оцінка'}</li>
              <li>Ранній доступ до запису</li>
            </ul>
          </div>

          <form className="lead-capture__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Ім'я (обов'язково)</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                onFocus={handleFocus}
                autoComplete="name"
              />
            </div>
            <div className="form__group">
              <label htmlFor="contact">Телефон або Email (обов'язково)</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                placeholder="+380 50 123 4567"
                value={contact}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setContact(e.target.value);
                  setError('');
                }}
                onFocus={handleFocus}
                autoComplete="tel"
              />
              {error && <span className="form__error" role="alert" aria-live="polite">{error}</span>}
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={status === 'submitting' || !isValid}
            >
{status === 'submitting' ? (
                'Відправка…'
              ) : (
                <span className="flex-center gap-2">
                  Отримати запрошення <Send size={16} />
                </span>
              )}
            </button>
            <p className="form__agree">
              Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
