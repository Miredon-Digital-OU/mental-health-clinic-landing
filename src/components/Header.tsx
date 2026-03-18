import React, { useState } from 'react';
import { motion } from 'framer-motion';

type HeaderProps = {
  showLinks?: boolean;
};

const Header: React.FC<HeaderProps> = ({ showLinks = true }) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <header className="header">
      <a href="#main-content" className="skip-link">
        Перейти до основного контенту
      </a>
      <div className="container">
        <div className="header__shell">
          <div className={showLinks ? 'header__container header__container--spread' : 'header__container'}>
            <motion.a 
              href="#" 
              className="logo"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <motion.span
                animate={{ 
                  scale: isLogoHovered ? [1, 1.2, 1] : 1,
                  rotate: isLogoHovered ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                style={{ display: 'inline-block' }}
              >
                ◉
              </motion.span>
              OPORA
            </motion.a>

            {showLinks && (
              <nav className="nav nav--desktop" aria-label="Головна навігація">
                <ul className="nav__list">
                  <li><a href="#" className="nav__link">Головна</a></li>
                  <li><a href="#quiz" className="nav__link">Тест</a></li>
                  <li><a href="#contact" className="nav__link">Контакти</a></li>
                </ul>
              </nav>
            )}

            {showLinks && (
              <div className="header__controls">
                <a href="#quiz" className="header__action">Почати</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
