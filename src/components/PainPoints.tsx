import React from 'react';

const PainPoints: React.FC = () => {
    return (
        <section id="problems" className="section problems">
            <div className="container">
                <h2 className="section__title text-center">Важко сказати, чи це просто стрес,<br />чи вже потрібна допомога?</h2>
                <p className="section__subtitle text-center">Ви не самі. Ми допомагаємо зрозуміти, що саме відбувається та що з цим робити.</p>
                <div className="grid grid--3">
                    <div className="card card--problem">
                        <p><strong>Тривожність</strong><br />Постійне внутрішнє напруження, навіть коли зовні все наче нормально.</p>
                    </div>
                    <div className="card card--problem">
                        <p><strong>Вигорання</strong><br />Виснаження, втрата ресурсу і відчуття, що відпочинок більше не відновлює.</p>
                    </div>
                    <div className="card card--problem">
                        <p><strong>Напруження в тілі та сні</strong><br />Складно заснути, важко розслабитися, нервова система постійно "на сторожі".</p>
                    </div>
                    <div className="card card--problem">
                        <p><strong>ПТСР після травматичних подій</strong><br />Флешбеки, різкі реакції на тригери, відчуття небезпеки навіть у безпечних умовах.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
