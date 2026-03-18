import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <p>&copy; {new Date().getFullYear()} OPORA. Всі права захищено.</p>
        <p className="text-muted">Київ • Конфіденційно • Лише доказові методи</p>
        <nav className="footer__links" aria-label="Юридичні посилання">
          <a href="#privacy">Політика конфіденційності</a>
          <a href="#contact">Контакти</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
