import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Zap, BarChart3 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';

const Solution: React.FC = () => {
    const treatments = [
        {
            icon: <Brain size={24} />,
            title: "Класична психологія",
            text: "Індивідуальна, парна та сімейна терапія для стабілізації стану та опрацювання внутрішніх запитів."
        },
        {
            icon: <Activity size={24} />,
            title: "Психіатрія",
            text: "Консультації та медикаментозне лікування за доказовими протоколами, коли це справді необхідно."
        },
        {
            icon: <Zap size={24} />,
            title: "Інноваційні методи",
            text: "Нейрофідбек для тренування мозку та VR-терапія для безпечного опрацювання фобій та ПТСР."
        },
        {
            icon: <BarChart3 size={24} />,
            title: "Генетичне тестування",
            text: "Оцінка схильності до психічних захворювань для побудови максимально точного плану профілактики."
        }
    ];

    return (
        <section id="concept" className="section concept">
            <div className="container">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center mb-5"
                >
                    <motion.h2 variants={fadeInUp} className="section__title">Рішення: Клініка ментального здоров'я</motion.h2>
                    <motion.p variants={fadeInUp} className="section__subtitle max-w-2xl mx-auto">
                        Замість розрізнених кабінетів — єдиний простір, де психолог оцінює стан, психіатр вирішує доцільність лікування, 
                        а технологічні методи прискорюють результат.
                    </motion.p>
                </motion.div>
                
                <div className="grid grid--2 gap-4">
                    {treatments.map((item, index) => (
                        <motion.div 
                            key={index}
                            className="card feature-card"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="feature-card__icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solution;
