import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../styles/animations';

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="section steps">
            <div className="container">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center mb-5"
                >
                    <motion.h2 variants={fadeInUp} className="section__title">Як це працює?</motion.h2>
                    <motion.p variants={fadeInUp} className="section__subtitle mb-4">
                        Короткий маршрут у 3 кроки: оцінка, план, супровід
                    </motion.p>
                </motion.div>

                <div className="steps__timeline">
                    <div className="steps__line"></div>
                    
                    {[
                        { num: '01', title: 'Швидкий скринінг', text: 'Визначаємо ваш стан та головний запит.' },
                        { num: '02', title: 'Персональний план', text: 'Пояснюємо, який формат допомоги підійде саме вам.', highlight: true },
                        { num: '03', title: 'Супровід і корекція', text: 'Відстежуємо прогрес і коригуємо маршрут за потреби.' }
                    ].map((step, index) => (
                        <motion.div 
                            key={index}
                            className={`step-card ${step.highlight ? 'step-card--highlight' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="step-card__number">{step.num}</div>
                            <h3 className="step-card__title">{step.title}</h3>
                            <p className="step-card__text">{step.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
