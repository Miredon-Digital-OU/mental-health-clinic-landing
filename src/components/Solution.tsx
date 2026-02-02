import React from 'react';

const Solution: React.FC = () => {
    return (
        <section id="concept" className="section concept">
            <div className="container">
                <h2 className="section__title text-center">Клініка психічного здоров'я нового покоління</h2>
                <p className="section__subtitle text-center">Ми об'єднали науку, технології та емпатію в одному місці</p>
                
                <div className="features-grid">
                    <div className="feature">
                        <h3>01. Класична психологія</h3>
                        <p>Індивідуальна, парна та сімейна терапія з досвідченими фахівцями.</p>
                    </div>
                    <div className="feature">
                        <h3>02. Психіатрія</h3>
                        <p>Професійна діагностика та медикаментозний супровід за потреби.</p>
                    </div>
                    <div className="feature">
                        <h3>03. Нейрофідбек</h3>
                        <p>Тренування мозку для зниження тривоги та покращення концентрації без ліків.</p>
                    </div>
                    <div className="feature">
                        <h3>04. VR-терапія</h3>
                        <p>Експозиційна терапія для ефективної роботи з фобіями, ПТСР та тривожними розладами.</p>
                    </div>
                    <div className="feature">
                        <h3>05. Генетика</h3>
                        <p>Тестування на схильність до психічних захворювань для точної профілактики.</p>
                    </div>
                    <div className="feature">
                        <h3>06. Humanist продукти</h3>
                        <p>Додаткові інструменти підтримки та self-care для щоденної стабільності.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
