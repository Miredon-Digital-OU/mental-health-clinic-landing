import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  goal: string;
  age: string;
  familyHistory: string;
};

const LeadForm: React.FC = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
    }, 1500);
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
            <CheckCircle size={64} className="text-white mb-3" />
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
          id="leadForm"
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
                <label htmlFor="interest">Напрямок</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="psychology">Психолог</option>
                  <option value="psychiatry">Психіатр</option>
                  <option value="neurofeedback">Нейрофідбек / VR</option>
                  <option value="genetics">Генетика</option>
                  <option value="other">Не впевнений(а)</option>
                </select>
              </div>
              <div className="form__group">
                <label htmlFor="goal">Коротко про ваш запит</label>
                <textarea
                  id="goal"
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
                <label htmlFor="name">Ім'я</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="phone">Телефон (необов'язково)</label>
                <input
                  type="tel"
                  id="phone"
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
                <label htmlFor="age">Вік</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Наприклад: 34"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="familyHistory">Сімейна історія психічних розладів</label>
                <select
                  id="familyHistory"
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
                ? 'Відправка...'
                : (
                  <span className="flex-center gap-2">
                    Записатися <Send size={16} />
                  </span>
                )}
            </button>
          </div>
          <p className="form__agree">
            Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default LeadForm;
