import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'Чи обов\'язково йти до психіатра?',
            answer: 'Ні. Ми починаємо з діагностики у психолога. Психіатр долучається лише якщо є медичні покази (депресія середнього/тяжкого ступеня, БАР тощо).'
        },
        {
            question: 'Що таке нейрофідбек?',
            answer: 'Це метод тренування мозку за допомогою ЕЕГ у реальному часі. Допомагає знизити тривожність і покращити сон без ліків.'
        },
        {
            question: 'Як відбувається перша зустріч?',
            answer: 'Це 50-хвилинна сесія-знайомство, де ми обговорюємо ваш запит, проводимо скринінг і формуємо план дій.'
        },
        {
            question: 'Чи можу я змінити фахівця?',
            answer: 'Так, абсолютно. Комфорт у терапії — це головне. Ви можете змінити психотерапевта у будь-який момент.'
        },
        {
            question: 'Чи надаєте ви екстрену допомогу?',
            answer: 'Ні. Якщо вам потрібна негайна допомога, зверніться до служби невідкладної допомоги або кризових служб.'
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
