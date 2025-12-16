"use client";

import { useEffect, useState } from "react";

export function AmbientBackground({ paused = false }: { paused?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <>
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${paused ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Floating bubbles - pure CSS */}
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="bubble bubble-4" />
        <div className="bubble bubble-5" />
        <div className="bubble bubble-6" />
        <div className="bubble bubble-7" />
        <div className="bubble bubble-8" />
        <div className="bubble bubble-9" />
        <div className="bubble bubble-10" />

        {/* Falling leaves - pure CSS */}
        <div className="leaf leaf-1">🍃</div>
        <div className="leaf leaf-2">🍂</div>
        <div className="leaf leaf-3">🍃</div>
        <div className="leaf leaf-4">🍂</div>
        <div className="leaf leaf-5">🍃</div>
      </div>

      <style jsx>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.08));
          animation: float-up linear infinite;
          opacity: 0.6;
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .bubble-1 { left: 10%; width: 30px; height: 30px; animation-duration: 20s; animation-delay: 0s; }
        .bubble-2 { left: 25%; width: 20px; height: 20px; animation-duration: 25s; animation-delay: 2s; }
        .bubble-3 { left: 40%; width: 35px; height: 35px; animation-duration: 22s; animation-delay: 4s; }
        .bubble-4 { left: 55%; width: 25px; height: 25px; animation-duration: 24s; animation-delay: 1s; }
        .bubble-5 { left: 70%; width: 28px; height: 28px; animation-duration: 23s; animation-delay: 3s; }
        .bubble-6 { left: 85%; width: 22px; height: 22px; animation-duration: 26s; animation-delay: 5s; }
        .bubble-7 { left: 15%; width: 32px; height: 32px; animation-duration: 21s; animation-delay: 6s; }
        .bubble-8 { left: 60%; width: 24px; height: 24px; animation-duration: 27s; animation-delay: 7s; }
        .bubble-9 { left: 45%; width: 26px; height: 26px; animation-duration: 28s; animation-delay: 2.5s; }
        .bubble-10 { left: 80%; width: 29px; height: 29px; animation-duration: 24s; animation-delay: 4.5s; }

        .leaf {
          position: absolute;
          font-size: 24px;
          opacity: 0;
          animation: fall-down linear infinite;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        @keyframes fall-down {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(720deg);
            opacity: 0;
          }
        }

        .leaf-1 { left: 15%; animation-duration: 18s; animation-delay: 0s; }
        .leaf-2 { left: 35%; animation-duration: 15s; animation-delay: 3s; }
        .leaf-3 { left: 55%; animation-duration: 20s; animation-delay: 6s; }
        .leaf-4 { left: 75%; animation-duration: 17s; animation-delay: 2s; }
        .leaf-5 { left: 90%; animation-duration: 19s; animation-delay: 5s; }
      `}</style>
    </>
  );
}
