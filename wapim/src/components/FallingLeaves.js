'use client';

import { useEffect, useState } from 'react';

const Snowflake = ({ style }) => (
  <div
    className="absolute w-8 h-8"
    style={{
      ...style,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffffff\'%3E%3Cpath d=\'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z\'/%3E%3Cpath d=\'M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z\' transform=\'rotate(60 12 12)\'/%3E%3Cpath d=\'M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z\' transform=\'rotate(120 12 12)\'/%3E%3Cpath d=\'M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z\' transform=\'rotate(180 12 12)\'/%3E%3Cpath d=\'M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z\' transform=\'rotate(240 12 12)\'/%3E%3Cpath d=\'M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26L12 2Z\' transform=\'rotate(300 12 12)\'/%3E%3C/svg%3E")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
    }}
  />
);

export default function FallingLeaves() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => {
      const startX = Math.random() * window.innerWidth;
      const startY = -20;
      const duration = 8000 + Math.random() * 4000;
      const delay = Math.random() * 5000;
      const sway = 100 + Math.random() * 150;
      const rotation = Math.random() * 720;
      const scale = 0.6 + Math.random() * 0.4;

      return {
        id: Math.random(),
        style: {
          left: `${startX}px`,
          top: `${startY}px`,
          animation: `fall ${duration}ms linear ${delay}ms infinite`,
          '--sway-distance': `${sway}px`,
          '--rotation': `${rotation}deg`,
          '--scale': scale,
          '--perspective': `${800 + Math.random() * 400}px`,
        },
      };
    };

    const initialSnowflakes = Array.from({ length: 20 }, createSnowflake);
    setSnowflakes(initialSnowflakes);

    const interval = setInterval(() => {
      setSnowflakes(prev => [...prev.slice(-19), createSnowflake()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: perspective(var(--perspective)) translateY(0) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(var(--scale));
            opacity: 1;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(1.2);
          }
          25% {
            transform: perspective(var(--perspective)) translateY(25vh) translateX(calc(var(--sway-distance) * 0.5)) rotateX(90deg) rotateY(calc(var(--rotation) * 0.25)) rotateZ(calc(var(--rotation) * 0.25)) scale(var(--scale));
            opacity: 0.9;
            filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4)) brightness(1.3);
          }
          50% {
            transform: perspective(var(--perspective)) translateY(50vh) translateX(var(--sway-distance)) rotateX(180deg) rotateY(calc(var(--rotation) * 0.5)) rotateZ(calc(var(--rotation) * 0.5)) scale(var(--scale));
            opacity: 0.8;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)) brightness(1.4);
          }
          75% {
            transform: perspective(var(--perspective)) translateY(75vh) translateX(calc(var(--sway-distance) * 1.5)) rotateX(270deg) rotateY(calc(var(--rotation) * 0.75)) rotateZ(calc(var(--rotation) * 0.75)) scale(var(--scale));
            opacity: 0.7;
            filter: drop-shadow(0 5px 10px rgba(0,0,0,0.6)) brightness(1.5);
          }
          100% {
            transform: perspective(var(--perspective)) translateY(100vh) translateX(calc(var(--sway-distance) * 2)) rotateX(360deg) rotateY(var(--rotation)) rotateZ(var(--rotation)) scale(var(--scale));
            opacity: 0.6;
            filter: drop-shadow(0 6px 12px rgba(0,0,0,0.7)) brightness(1.6);
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map(snowflake => (
          <Snowflake key={snowflake.id} style={snowflake.style} />
        ))}
      </div>
    </>
  );
} 