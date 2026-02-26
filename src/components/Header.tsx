import React from 'react';

type HeaderProps = {
  showLinks?: boolean;
};

const Header: React.FC<HeaderProps> = ({ showLinks = true }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__shell">
          <div className={showLinks ? 'header__container header__container--spread' : 'header__container'}>
            <a href="#" className="logo">OPORA</a>

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
