import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PainPoints: React.FC = () => {
    const sectionRef = useScrollReveal();
    const points = [
        "«Важко сказати, чи це просто стрес, чи вже хвороба».",
        "«Я відвідую психолога, але чи потрібен мені психіатр, поки що не зрозуміло».",
        "«Я шукаю щось більше, ніж просто розмови: не можу не перевірити свій мозок, генетику, реакцію на стрес»."
    ];

    return (
        <section id="problems" className="section problems" ref={sectionRef as React.RefObject<HTMLElement>}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section__title" data-reveal>Проблеми та болі</h2>
                    <p className="section__subtitle" data-reveal data-reveal-delay="80">
                        Ми розуміємо, через що ви проходите. Наші пацієнти часто діляться цими думками:
                    </p>
                </div>

                <div className="grid grid--3">
                    {points.map((text, index) => (
                        <div
                            key={index}
                            className="card card--problem"
                            data-reveal="card"
                            data-reveal-delay={String(index * 100)}
                        >
                            <p className="pain-quote">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
