import React from 'react';

const PainPoints: React.FC = () => {
    return (
        <section id="problems" className="section problems">
            <div className="container">
                <h2 className="section__title text-center">Важко сказати, чи це просто стрес,<br />чи вже потрібна допомога?</h2>
                <p className="section__subtitle text-center">Ви не самі. Ми допомагаємо зрозуміти, що саме відбувається та що з цим робити.</p>
                <div className="grid grid--3">
                    <div className="card card--problem">
                        <p>«Я відвідую психолога, але чи потрібен мені психіатр, поки що не зрозуміло»</p>
                    </div>
                    <div className="card card--problem">
                        <p>«Я шукаю щось більше, ніж просто розмови: не можу не перевірити свій мозок, генетику, реакцію на стрес»</p>
                    </div>
                    <div className="card card--problem">
                        <p>«Відчуваю постійну тривогу і втому, які не проходять після відпочинку»</p>
                    </div>
                    <div className="card card--problem">
                        <p>«Після травматичних подій важко повернутися до нормального життя»</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
