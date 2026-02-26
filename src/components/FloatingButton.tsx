import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { trackEvent, EVENTS } from '../utils/analytics';

type FloatingButtonProps = {
  onClick: () => void;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
      trackEvent(EVENTS.FLOATING_BUTTON_SHOWN);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    trackEvent(EVENTS.FLOATING_BUTTON_CLICKED);
    onClick();
  };

  useEffect(() => {
    if (showTooltip) {
      // Hide tooltip after 5 seconds
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  if (!isVisible) return null;

  return (
    <div className="floating-button-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="floating-button-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <div className="tooltip-content">
              Пройдіть тест за 60 секунд
              <br />
              та дізнайтеся, що вам підходить 👉
            </div>
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="floating-button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        aria-label="Пройти тест"
      >
        <MessageCircle size={32} color="white" />
      </motion.button>
    </div>
  );
};

export default FloatingButton;
