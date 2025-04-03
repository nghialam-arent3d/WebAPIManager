'use client';

import { useEffect } from 'react';

export default function Notification({ message, type = 'success', show, onHide }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>

      <div className={`fixed top-4 right-4 flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in`}>
        <span className="text-white">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <span>{message}</span>
        <button 
          onClick={onHide}
          className="ml-2 text-white hover:text-white/80"
        >
          ×
        </button>
      </div>
    </>
  );
} 