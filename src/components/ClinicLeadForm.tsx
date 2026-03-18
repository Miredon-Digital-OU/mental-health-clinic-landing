import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { submitLead } from '../utils/leadApi';
import { trackEvent, EVENTS } from '../utils/analytics';
import { captureAttribution } from '../utils/attribution';

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  goal: string;
  age: string;
  familyHistory: string;
};

const ClinicLeadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    interest: 'psychology',
    goal: '',
    age: '',
    familyHistory: 'no',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent(EVENTS.FORM_STARTED, {
        form_name: 'clinic_intake',
      });
    }

    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isStepValid = () => {
    if (step === 0) {
      return formData.interest.trim().length > 0;
    }
    if (step === 1) {
      return formData.name.trim().length > 1 && formData.email.trim().length > 3;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const attribution = captureAttribution();

    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      await submitLead({
        formType: 'clinic-intake',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest: formData.interest,
        goal: formData.goal.trim(),
        age: formData.age.trim(),
        familyHistory: formData.familyHistory,
        consent: {
          accepted: true,
          policyVersion: '2026-02',
        },
        metadata: {
          source: 'clinic-page',
          submittedAtClient: new Date().toISOString(),
          funnelStage: 'clinic_intake',
          campaignId: attribution?.utmCampaign,
          attribution: attribution ?? undefined,
        },
      });

      trackEvent(EVENTS.LEAD_SUBMITTED, {
        form_name: 'clinic_intake',
      });
      setStatus('success');
    } catch (submitError) {
      console.error('Clinic lead submit failed:', submitError);
      setStatus('idle');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Не вдалося відправити форму. Спробуйте ще раз.'
      );

      trackEvent(EVENTS.LEAD_SUBMISSION_FAILED, {
        form_name: 'clinic_intake',
      });
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="section cta">
        <div className="container cta__container">
          <motion.div
            className="cta__success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={64} className="text-white mb-3" aria-hidden="true" />
            <h2>Дякуємо!</h2>
            <p>Ми зв'яжемося з вами найближчим часом для уточнення деталей.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section cta">
      <div className="container cta__container">
        <div className="cta__text">
          <h2 className="section__title text-white">Зробіть перший крок</h2>
          <p>Запишіться на пілотну програму та отримайте персоналізований план підтримки.</p>
          <p className="cta__subtext">
            Ми не надаємо екстрену допомогу. Якщо ви у кризі — зверніться до служб невідкладної допомоги.
          </p>
        </div>

        <motion.form
          className="form"
          id="clinicLeadForm"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="form__stepper">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`form__step ${step >= index ? 'form__step--active' : ''}`}
              />
            ))}
          </div>

          {step === 0 && (
            <>
              <div className="form__group">
                <label htmlFor="clinic-interest">Напрямок</label>
                <select
                  id="clinic-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="psychology">Психологія</option>
                  <option value="psychiatry">Психіатрія</option>
                  <option value="neurofeedback">Нейрофідбек</option>
                  <option value="vr">VR-терапія</option>
                  <option value="genetics">Генетичне тестування</option>
                  <option value="complex">Комплексний пакет</option>
                  <option value="other">Не впевнений(а)</option>
                </select>
              </div>
              <div className="form__group">
                <label htmlFor="clinic-goal">Коротко про ваш запит</label>
                <textarea
                  id="clinic-goal"
                  name="goal"
                  placeholder="Наприклад: тривожність, вигорання, проблеми зі сном"
                  value={formData.goal}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="form__group">
                <label htmlFor="clinic-name">Ім'я</label>
                <input
                  type="text"
                  id="clinic-name"
                  name="name"
                  required
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="clinic-email">Email</label>
                <input
                  type="email"
                  id="clinic-email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="clinic-phone">Телефон (необов'язково)</label>
                <input
                  type="tel"
                  id="clinic-phone"
                  name="phone"
                  placeholder="+380..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form__group">
                <label htmlFor="clinic-age">Вік</label>
                <input
                  type="number"
                  id="clinic-age"
                  name="age"
                  placeholder="Наприклад: 34"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="clinic-familyHistory">Сімейна історія психічних розладів</label>
                <select
                  id="clinic-familyHistory"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                >
                  <option value="no">Ні</option>
                  <option value="yes">Так</option>
                  <option value="unknown">Не впевнений(а)</option>
                </select>
              </div>
            </>
          )}

          <div className="form__footer">
            {step > 0 && (
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => setStep(step - 1)}
              >
                Назад
              </button>
            )}
            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={status === 'submitting' || !isStepValid()}
            >
{step < 2
                ? 'Далі'
                : status === 'submitting'
                ? 'Відправка…'
                : (
                  <span className="flex-center gap-2">
                    Записатися на пілотну програму / отримати знижку <Send size={16} />
                  </span>
                )}
            </button>
          </div>
          {error && <span className="form__error" role="alert" aria-live="polite">{error}</span>}
          <p className="form__agree">
            Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default ClinicLeadForm;
