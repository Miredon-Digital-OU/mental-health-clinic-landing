import React from 'react';

const Solution: React.FC = () => {
    return (
        <section id="concept" className="section concept">
            <div className="container">
                <h2 className="section__title text-center">Сучасний підхід до ментального здоров'я</h2>
                <p className="section__subtitle text-center">Просто пояснюємо шлях: що відбувається зараз і який крок наступний</p>
                
                <div className="features-grid">
                    <div className="feature">
                        <h3>01. Психологічна оцінка</h3>
                        <p>Починаємо з вашого запиту і симптомів, без складної термінології.</p>
                    </div>
                    <div className="feature">
                        <h3>02. Медичний супровід за потреби</h3>
                        <p>Психіатр долучається тоді, коли це справді необхідно.</p>
                    </div>
                    <div className="feature">
                        <h3>03. Додаткові методи</h3>
                        <p>Нейрофідбек, VR або генетичні тести — лише якщо вони додають користь.</p>
                    </div>
                    <div className="feature">
                        <h3>04. Регулярна перевірка прогресу</h3>
                        <p>Ми коригуємо план, щоб ви бачили реальний поступ, а не хаотичні спроби.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
