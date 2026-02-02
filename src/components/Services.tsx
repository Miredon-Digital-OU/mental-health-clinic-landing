import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Brain, Activity, Dna, Glasses } from 'lucide-react';

const Services: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'psychologist' | 'psychiatrist'>('psychologist');
    const [selectedService, setSelectedService] = useState('psychology');

    const packages = [
        {
            title: 'Старт',
            price: '₴ • Діапазон',
            features: ['Первинна консультація', 'Тестування на тривожність', 'Рекомендації'],
            primary: false
        },
        {
            title: 'Базовий',
            price: '₴₴ • Діапазон',
            features: ['4 сесії на місяць', 'Чат підтримки 24/7', 'Щоденник емоцій'],
            primary: false
        },
        {
            title: 'Комплексний',
            price: '₴₴₴ • Діапазон',
            features: ['Психотерапія + Психіатр', 'Нейрофідбек (2 сеанси)', 'Генетичний чек-ап'],
            primary: true,
            badge: 'Найпопулярніший'
        },
        {
            title: 'Преміум',
            price: '₴₴₴₴ • Діапазон',
            features: ['Повний супровід 24/7', 'Всі види терапії (VR, Bio)', 'Сімейні сесії'],
            primary: false
        }
    ];

    const services = [
        { id: 'psychology', label: 'Психологія', icon: <Brain size={16} /> },
        { id: 'psychiatry', label: 'Психіатрія', icon: <Activity size={16} /> },
        { id: 'neuro', label: 'Нейрофідбек', icon: <Glasses size={16} /> },
        { id: 'genetics', label: 'Генетика', icon: <Dna size={16} /> },
    ];

    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section__title">Оберіть свій шлях</h2>
                    <p className="section__subtitle mb-4">Гнучкі пакети для будь-яких потреб</p>
                    
                    {/* Toggle */}
                    <div className="toggle-switch">
                        <button 
                            className={`toggle-option ${activeTab === 'psychologist' ? 'active' : ''}`}
                            onClick={() => setActiveTab('psychologist')}
                        >
                            З Психологом
                        </button>
                        <button 
                            className={`toggle-option ${activeTab === 'psychiatrist' ? 'active' : ''}`}
                            onClick={() => setActiveTab('psychiatrist')}
                        >
                            З Психіатром
                        </button>
                    </div>
                </div>

                <div className="services__intro text-center">
                    <p className="text-muted">
                        Оберіть напрямок, щоб ми краще зрозуміли ваш запит.
                        {activeTab === 'psychiatrist' && ' Перший крок все одно — клінічна оцінка.'}
                    </p>
                </div>

                <div className="service-selector">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            className={`service-chip ${selectedService === service.id ? 'active' : ''}`}
                            onClick={() => setSelectedService(service.id)}
                            type="button"
                        >
                            {service.icon} {service.label}
                        </button>
                    ))}
                </div>
                <p className="text-center text-muted mb-4">
                    Обраний напрямок: {services.find((service) => service.id === selectedService)?.label}
                </p>

                <div className="grid grid--4-col">
                    <AnimatePresence mode='wait'>
                        {packages.map((pkg, index) => (
                            <motion.div 
                                key={pkg.title}
                                className={`card card--price ${pkg.primary ? 'card--featured' : ''}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                {pkg.badge && <div className="badge-corner">{pkg.badge}</div>}
                                <h3 className="card__title">{pkg.title}</h3>
                                <div className="card__price">{pkg.price}</div>
                                
                                <ul className="card__list">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i}><Check size={16} className="text-primary"/> {feature}</li>
                                    ))}
                                </ul>
                                
                                <a href="#contact" className={`btn btn--sm ${pkg.primary ? 'btn--primary' : 'btn--outline'}`}>
                                    Отримати пропозицію
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Services;
