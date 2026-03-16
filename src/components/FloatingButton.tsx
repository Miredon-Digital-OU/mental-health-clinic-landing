import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from 'lucide-react';
import { trackEvent, EVENTS } from '../utils/analytics';

type FloatingButtonProps = {
  onClick: () => void;
};

const STORAGE_KEY = 'floating_cta_seen';

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasSeen = typeof window !== 'undefined' && window.sessionStorage.getItem(STORAGE_KEY) === '1';

    const timer = setTimeout(
      () => {
        setIsVisible(true);
        setShowTooltip(!hasSeen);
        trackEvent(EVENTS.FLOATING_CTA_SHOWN, {
          placement: 'floating',
        });
      },
      hasSeen ? 0 : 6000,
    );

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    }

    trackEvent(EVENTS.FLOATING_CTA_CLICKED, {
      placement: 'floating',
      cta_text: 'take_test_in_60_seconds',
    });
    onClick();
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  if (!isVisible) return null;

  return (
    <div className="floating-button-container" role="complementary" aria-label="Floating test action">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="floating-button-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <div className="tooltip-content">
              Тест за 60 секунд.
              <br />
              Отримайте персональну рекомендацію.
            </div>
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="floating-button floating-button--cta"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        aria-label="Пройти тест за 60 секунд"
      >
        <Timer size={18} color="white" />
        <span>Тест 60с</span>
      </motion.button>
    </div>
  );
};

export default FloatingButton;
