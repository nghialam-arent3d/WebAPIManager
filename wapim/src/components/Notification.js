'use client';

import { useEffect } from 'react';

export default function Notification({ message, type = 'success', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600'
  }[type];

  return (
    <>
      <style jsx global>{`
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-out {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
        }
        
        .notification-enter {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        .notification-exit {
          animation: slide-out 0.3s ease-in forwards;
        }
      `}</style>

      <div 
        className={`
          fixed top-4 right-4 
          flex items-center gap-2 
          ${bgColor} text-white 
          px-4 py-2 rounded-lg 
          shadow-lg z-50 
          notification-enter
        `}
      >
        <span className="text-white">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </>
  );
} 