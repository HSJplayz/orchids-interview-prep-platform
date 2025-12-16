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
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${paused ? 'opacity-20' : 'opacity-100'}`}>
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
        <div className="floating-orb orb-4" />
        <div className="floating-orb orb-5" />
      </div>

      <style jsx>{`
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.04));
          animation: float-gentle ease-in-out infinite;
          filter: blur(40px);
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        .orb-1 { 
          left: 10%; 
          top: 20%; 
          width: 200px; 
          height: 200px; 
          animation-duration: 8s; 
        }
        .orb-2 { 
          right: 15%; 
          top: 40%; 
          width: 180px; 
          height: 180px; 
          animation-duration: 10s; 
          animation-delay: 1s; 
        }
        .orb-3 { 
          left: 30%; 
          bottom: 30%; 
          width: 160px; 
          height: 160px; 
          animation-duration: 12s; 
          animation-delay: 2s; 
        }
        .orb-4 { 
          right: 25%; 
          bottom: 20%; 
          width: 190px; 
          height: 190px; 
          animation-duration: 9s; 
          animation-delay: 3s; 
        }
        .orb-5 { 
          left: 50%; 
          top: 10%; 
          width: 170px; 
          height: 170px; 
          animation-duration: 11s; 
          animation-delay: 1.5s; 
        }
      `}</style>
    </>
  );
}
