import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

type ReadinessFilterProps = {
  onComplete: () => void;
};

const ReadinessFilter: React.FC<ReadinessFilterProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const options = [
    'Протягом 2 тижнів',
    'Протягом місяця',
    'Просто досліджую',
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
    console.log('Readiness:', option);
    setTimeout(() => setDone(true), 400);
  };

  if (done) {
    return (
      <section className="section readiness">
        <div className="container">
          <motion.div
            className="readiness__done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={56} className="readiness__icon" />
            <h2>Дякуємо!</h2>
            <p>
              Ми зв'яжемося з вами найближчим часом та надамо персональний план.
            </p>
            <p className="readiness__redirect-hint">
              Переходимо на сторінку клініки...
            </p>
            <button
              type="button"
              className="btn btn--primary readiness__continue"
              onClick={onComplete}
            >
              Дізнатись більше про клініку
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section readiness">
      <div className="container">
        <motion.div
          className="readiness__card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="readiness__title">
            Коли ви готові почати?
          </h2>
          <div className="readiness__options">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`readiness__option ${selected === option ? 'readiness__option--selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadinessFilter;
