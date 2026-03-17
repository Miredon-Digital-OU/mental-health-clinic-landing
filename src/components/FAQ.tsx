import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'Чи можу я спочатку відвідати лише психолога, а потім вирішити, чи потрібен мені психіатр?',
            answer: 'Так, звичайно. Ми рекомендуємо починати саме з консультації психолога. Він оцінить ваш стан і разом ви вирішите, чи є потреба у залученні психіатра.'
        },
        {
            question: 'Чи можу я робити лише нейрофідбек/VR без психіатра?',
            answer: 'Так, це можливо. Ці методи можуть використовуватися як самостійні інструменти для тренування саморегуляції мозку або роботи з фобіями, якщо у вас немає медичних протипоказань.'
        },
        {
            question: 'Скільки триває курс нейрофідбеку/VR?',
            answer: 'Зазвичай курс складається з 10-20 сеансів для досягнення стійкого результату. Точну кількість визначає фахівець після перших пробних занять.'
        },
        {
            question: 'Чи можу я отримати генетичне тестування без консультації?',
            answer: 'Генетичне тестування проводиться у межах нашого профілактичного пакету. Консультація після отримання результатів є обов’язковою, щоб правильно інтерпретувати дані та скласти план дій.'
        },
        {
            question: 'Який процес переходу від психолога до психіатра, і від психіатра до психолога?',
            answer: 'Наші фахівці працюють як єдина команда. Якщо психолог бачить потребу в медикаментозній підтримці, він створює направлення до психіатра. Психіатр, у свою чергу, супроводжує ваше лікування паралельно з терапевтичним процесом.'
        }
    ];

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section faq">
            <div className="container">
                <h2 className="section__title text-center">Часті питання</h2>
                
                <div className="accordion">
                    {faqs.map((item, index) => (
                        <div key={index} className="accordion__item">
                            <button 
                                className="accordion__trigger"
                                onClick={() => toggle(index)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    toggle(index);
                                  }
                                }}
                                aria-expanded={openIndex === index}
                              >
                                {item.question}
                                {openIndex === index ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div 
                                        className="accordion__content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="pb-4 pt-2">{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
