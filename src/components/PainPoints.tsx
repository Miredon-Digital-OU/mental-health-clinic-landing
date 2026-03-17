import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../styles/animations';

const PainPoints: React.FC = () => {
    const points = [
        "«Важко сказати, чи це просто стрес, чи вже хвороба».",
        "«Я відвідую психолога, але чи потрібен мені психіатр, поки що не зрозуміло».",
        "«Я шукаю щось більше, ніж просто розмови: не можу не перевірити свій мозок, генетику, реакцію на стрес»."
    ];

    return (
        <section id="problems" className="section problems">
            <div className="container">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center mb-5"
                >
                    <motion.h2 variants={fadeInUp} className="section__title">Проблеми та болі</motion.h2>
                    <motion.p variants={fadeInUp} className="section__subtitle">
                        Ми розуміємо, через що ви проходите. Наші пацієнти часто діляться цими думками:
                    </motion.p>
                </motion.div>

                <div className="grid grid--3">
                    {points.map((text, index) => (
                        <motion.div 
                            key={index}
                            className="card card--problem"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <p className="pain-quote">{text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
