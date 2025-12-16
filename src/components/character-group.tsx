"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharacterGroupProps {
  showPassword: boolean;
  state: "idle" | "typing" | "success" | "error";
}

export function CharacterGroup({ showPassword, state }: CharacterGroupProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="relative w-full h-64" />;
  }

  const characters = [
    { id: 1, x: 20, color: "#4F46E5", skin: "#FFD4A3", hair: "#2D1B00", delay: 0 },
    { id: 2, x: 100, color: "#10B981", skin: "#FFE0BD", hair: "#6D4C41", delay: 0.1 },
    { id: 3, x: 180, color: "#F59E0B", skin: "#F5CBA7", hair: "#1A1A1A", delay: 0.2 },
    { id: 4, x: 260, color: "#8B5CF6", skin: "#FDDAB7", hair: "#4A2C2A", delay: 0.3 },
  ];

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 340 200" className="w-full h-full max-w-lg">
        {characters.map((char) => (
          <motion.g
            key={char.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: char.delay }}
          >
            {/* Head */}
            <motion.circle
              cx={char.x}
              cy="100"
              r="30"
              fill={char.skin}
              stroke={char.color}
              strokeWidth="3"
              animate={showPassword ? { rotate: -20 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ originX: char.x, originY: 100 }}
            />

            {/* Hair */}
            <motion.ellipse
              cx={char.x}
              cy="78"
              rx="32"
              ry="22"
              fill={char.hair}
              animate={showPassword ? { rotate: -20 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ originX: char.x, originY: 100 }}
            />

            {/* Eyes - open when password hidden */}
            {!showPassword && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Left eye */}
                <ellipse
                  cx={char.x - 10}
                  cy="95"
                  rx="4"
                  ry="5"
                  fill="#2D2D2D"
                  className="animate-blink"
                />
                <circle cx={char.x - 10} cy="93" r="1.5" fill="#FFF" opacity="0.9" />
                
                {/* Right eye */}
                <ellipse
                  cx={char.x + 10}
                  cy="95"
                  rx="4"
                  ry="5"
                  fill="#2D2D2D"
                  className="animate-blink"
                />
                <circle cx={char.x + 10} cy="93" r="1.5" fill="#FFF" opacity="0.9" />
              </motion.g>
            )}

            {/* Eyes - closed/looking away when password shown */}
            {showPassword && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d={`M${char.x - 14} 95 Q${char.x - 10} 93 ${char.x - 6} 95`}
                  stroke="#2D2D2D"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M${char.x + 6} 95 Q${char.x + 10} 93 ${char.x + 14} 95`}
                  stroke="#2D2D2D"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.g>
            )}

            {/* Nose */}
            <circle cx={char.x} cy="103" r="2" fill="#FF9999" opacity="0.7" />

            {/* Mouth expressions */}
            {state === "idle" && !showPassword && (
              <motion.path
                d={`M${char.x - 8} 110 Q${char.x} 115 ${char.x + 8} 110`}
                stroke="#D97706"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                animate={{ d: [
                  `M${char.x - 8} 110 Q${char.x} 115 ${char.x + 8} 110`,
                  `M${char.x - 8} 110 Q${char.x} 113 ${char.x + 8} 110`,
                  `M${char.x - 8} 110 Q${char.x} 115 ${char.x + 8} 110`,
                ]}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {state === "success" && (
              <motion.path
                d={`M${char.x - 10} 108 Q${char.x} 118 ${char.x + 10} 108`}
                stroke="#10B981"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {state === "error" && (
              <motion.path
                d={`M${char.x - 8} 115 Q${char.x} 110 ${char.x + 8} 115`}
                stroke="#EF4444"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* Waving hand - first character only */}
            {char.id === 1 && !showPassword && (
              <motion.g
                animate={{ rotate: [0, -15, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                style={{ originX: char.x + 35, originY: 95 }}
              >
                <circle cx={char.x + 35} cy="95" r="7" fill={char.skin} stroke={char.color} strokeWidth="2" />
                <line x1={char.x + 33} y1="90" x2={char.x + 33} y2="85" stroke={char.skin} strokeWidth="2" strokeLinecap="round" />
                <line x1={char.x + 37} y1="90" x2={char.x + 37} y2="85" stroke={char.skin} strokeWidth="2" strokeLinecap="round" />
              </motion.g>
            )}
          </motion.g>
        ))}
      </svg>

      {/* Privacy message */}
      <AnimatePresence>
        {showPassword && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-4 text-sm text-muted-foreground font-medium bg-background/80 px-4 py-2 rounded-full backdrop-blur-sm border"
          >
            We respect your privacy 🤫
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blink {
          0%, 96%, 100% {
            transform: scaleY(1);
          }
          98% {
            transform: scaleY(0.1);
          }
        }
        .animate-blink {
          animation: blink 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
