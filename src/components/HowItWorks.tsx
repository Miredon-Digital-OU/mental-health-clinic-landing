import React from 'react';
import {
  ShieldCheck,
  Activity,
  Users,
  Heart,
  Eye,
  Zap,
  UserCheck
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HowItWorks: React.FC = () => {
    const phases = [
        {
            number: 1,
            title: 'Стабілізація та безпека',
            icon: <ShieldCheck className="text-primary" />,
            items: [
                {
                    label: 'Психотерапія',
                    icon: <Heart size={20} />
                },
                {
                    label: 'Навички саморегуляції',
                    icon: <Zap size={20} />
                }
            ]
        },
        {
            number: 2,
            title: 'Фокусна робота з травмою',
            icon: <Activity className="text-primary" />,
            items: [
                {
                    label: 'Експозиційна терапія',
                    icon: <Activity size={20} />
                },
                {
                    label: 'EMDR',
                    icon: <Eye size={20} />
                }
            ]
        },
        {
            number: 3,
            title: 'Підтримка та інтеграція',
            icon: <UserCheck className="text-primary" />,
            items: [
                {
                    label: 'Групова підтримка',
                    icon: <Users size={20} />
                }
            ]
        }
    ];

    const sectionRef = useScrollReveal();

    return (
        <section className="section bg-light" id="process" ref={sectionRef as React.RefObject<HTMLElement>}>
            <div className="container">
                <div className="section__header text-center mb-5">
                    <h2 className="section__title" data-reveal>Як працює наш метод</h2>
                    <p className="section__subtitle mx-auto" data-reveal data-reveal-delay="80">
                        Трьохрівнева система відновлення ментального здоров&apos;я
                    </p>
                </div>

                <div className="phases-grid mt-5">
                    {phases.map((phase, idx) => (
                        <div
                            key={idx}
                            className="phase-column"
                            data-reveal
                            data-reveal-delay={String(idx * 120)}
                        >
                            <div className="phase-card">
                                <div className="phase-card__header">
                                    <div className="phase-card__number">{phase.number}</div>
                                    <h3 className="phase-card__title">{phase.title}</h3>
                                </div>
                                
                                <div className="phase-card__items">
                                    {phase.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="phase-card__item">
                                            <div className="phase-card__item-icon">{item.icon}</div>
                                            <span className="phase-card__item-label">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
