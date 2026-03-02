import React, { useState } from 'react';

type ClinicHeaderProps = {
  onBackToStart?: () => void;
};

const ClinicHeader: React.FC<ClinicHeaderProps> = ({ onBackToStart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__shell">
          <div className="header__container header__container--spread">
            {onBackToStart ? (
              <button onClick={onBackToStart} className="logo logo--link">OPORA</button>
            ) : (
              <a href="#" className="logo">OPORA</a>
            )}

            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              &#9776;
            </button>

            <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
              <ul className="nav__list">
                <li><a href="#problems" className="nav__link" onClick={() => setIsMenuOpen(false)}>Проблеми</a></li>
                <li><a href="#concept" className="nav__link" onClick={() => setIsMenuOpen(false)}>Рішення</a></li>
                <li><a href="#how-it-works" className="nav__link" onClick={() => setIsMenuOpen(false)}>Як це працює</a></li>
                <li><a href="#services" className="nav__link" onClick={() => setIsMenuOpen(false)}>Послуги</a></li>
                <li><a href="#contact" className="nav__link nav__link--cta" onClick={() => setIsMenuOpen(false)}>Записатися</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClinicHeader;
