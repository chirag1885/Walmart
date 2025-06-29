import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Notification = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <div className={`fixed top-20 right-4 z-[9999] transform transition-all duration-500 ease-out ${
      isVisible 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-1 rounded-full">
            <CheckCircle className="h-5 w-5" />
          </div>
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;