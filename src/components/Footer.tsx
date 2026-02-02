import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <p>&copy; {new Date().getFullYear()} Humanist Clinic. Всі права захищено.</p>
                <p className="text-muted">Київ • Конфіденційно • Лише доказові методи</p>
            </div>
        </footer>
    );
};

export default Footer;
