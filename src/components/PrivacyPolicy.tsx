import React, { useEffect } from 'react';

type PrivacyPolicyProps = {
  onBack?: () => void;
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="privacy-policy section">
      <div className="container">
        <div className="privacy-policy__content">
          {onBack && (
            <button
              type="button"
              className="privacy-policy__back"
              onClick={onBack}
            >
              ← Назад
            </button>
          )}
          <h1>Політика конфіденційності</h1>
          <p className="privacy-policy__updated">
            Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}
          </p>

          <section>
            <h2>1. Які дані ми збираємо</h2>
            <p>
              При заповненні форм на сайті ми збираємо: ім&apos;я, контактні дані (телефон або email),
              інформацію про ваш запит (напрямок, короткий опис), вік та сімейну історію (за потреби).
              Також зберігаємо технічні дані: джерело переходу, UTM-мітки, час відправки.
            </p>
          </section>

          <section>
            <h2>2. Мета обробки</h2>
            <p>
              Дані використовуються для формування персонального плану підтримки, зв&apos;язку з вами
              та покращення роботи сайту. Аналітичні cookies (Google Analytics, Meta Pixel) допомагають
              зрозуміти, як ви користуєтесь сайтом, лише за вашою згодою.
            </p>
          </section>

          <section>
            <h2>3. Зберігання даних</h2>
            <p>
              Заявки зберігаються в безпечному сховищі Netlify Blobs. Ми не передаємо персональні
              дані третім особам, крім випадків, передбачених законодавством.
            </p>
          </section>

          <section>
            <h2>4. Термін зберігання</h2>
            <p>
              Заявки зберігаються протягом часу, необхідного для надання послуг та виконання
              договірних зобов&apos;язань. Ви можете звернутися з проханням про видалення даних.
            </p>
          </section>

          <section>
            <h2>5. Ваші права</h2>
            <p>
              Ви маєте право на доступ до своїх даних, їх виправлення та видалення. Для цього
              напишіть нам на контактну пошту, вказану на сайті.
            </p>
          </section>

          <section>
            <h2>6. Контакт</h2>
            <p>
              З питань обробки персональних даних звертайтесь за контактними даними, вказаними
              на сайті OPORA.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
};

export default PrivacyPolicy;
