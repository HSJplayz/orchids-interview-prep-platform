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
    return <div className="relative w-full h-48" />;
  }

  const characters = [
    { id: 1, x: 40, color: "#4F46E5" },
    { id: 2, x: 120, color: "#10B981" },
    { id: 3, x: 200, color: "#8B5CF6" },
  ];

  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="0 0 280 140" className="w-full h-full max-w-md">
        {characters.map((char, index) => (
          <motion.g
            key={char.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <circle
              cx={char.x}
              cy="70"
              r="24"
              fill="#FFF"
              stroke={char.color}
              strokeWidth="2.5"
              className="character-circle"
            />

            {!showPassword && (
              <g className="eyes-open">
                <circle cx={char.x - 8} cy="68" r="2.5" fill="#2D2D2D" />
                <circle cx={char.x + 8} cy="68" r="2.5" fill="#2D2D2D" />
                <circle cx={char.x - 7} cy="67" r="1" fill="#FFF" opacity="0.9" />
                <circle cx={char.x + 9} cy="67" r="1" fill="#FFF" opacity="0.9" />
              </g>
            )}

            {showPassword && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="eyes-closed"
              >
                <path
                  d={`M${char.x - 11} 68 Q${char.x - 8} 66 ${char.x - 5} 68`}
                  stroke="#2D2D2D"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M${char.x + 5} 68 Q${char.x + 8} 66 ${char.x + 11} 68`}
                  stroke="#2D2D2D"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.g>
            )}

            <path
              d={`M${char.x - 6} 77 Q${char.x} 80 ${char.x + 6} 77`}
              stroke={char.color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </motion.g>
        ))}
      </svg>

      <style jsx>{`
        .character-circle {
          transition: all 0.3s ease;
        }
        .character-circle:hover {
          filter: drop-shadow(0 4px 8px rgba(99, 102, 241, 0.2));
        }
      `}</style>
    </div>
  );
}
