import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

type LeadFormProps = {
  onSubmitted: () => void;
};

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitted }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  const isValid = name.trim().length > 1 && contact.trim().length > 3;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus('submitting');
    console.log('Lead captured:', { name, contact });
    setTimeout(() => {
      onSubmitted();
    }, 800);
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
              <li>персональний план</li>
              <li>знижку на першу консультацію</li>
              <li>ранній доступ</li>
            </ul>
            <p className="lead-capture__urgency">
              Перші 50 учасників отримають безкоштовну первинну оцінку
            </p>
          </div>

          <form className="lead-capture__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Ім'я</label>
              <input
                type="text"
                id="name"
                required
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="contact">Телефон або Email</label>
              <input
                type="text"
                id="contact"
                required
                placeholder="+380... або email@example.com"
                value={contact}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={status === 'submitting' || !isValid}
            >
              {status === 'submitting' ? (
                'Відправка...'
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
