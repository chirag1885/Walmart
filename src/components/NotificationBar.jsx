import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const notifVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function NotificationBar({ notifications, onClose }) {
  if (!notifications.length) return null;

  return (
    <div className="notifications fixed top-14 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map(({ id, message }) => (
          <motion.div
            key={id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={notifVariants}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto max-w-xl bg-indigo-600 bg-opacity-90 text-white rounded-lg shadow-lg px-5 py-3 m-2 flex items-center justify-between gap-4"
          >
            <p className="text-sm md:text-base">{message}</p>
            <button
              onClick={() => onClose(id)}
              aria-label="Close notification"
              className="text-lg font-bold hover:text-indigo-300 transition"
            >
              &times;
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

NotificationBar.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, message: PropTypes.string.isRequired })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationBar;