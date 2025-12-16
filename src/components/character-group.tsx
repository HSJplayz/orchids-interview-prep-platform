"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharacterGroupProps {
  showPassword: boolean;
  state: "idle" | "typing" | "success" | "error";
}

interface Character {
  id: number;
  x: number;
  color: string;
  skinTone: string;
  hairColor: string;
  action: "waving" | "smiling" | "curious" | "cool" | "thinking";
  blinking: boolean;
}

export function CharacterGroup({ showPassword, state }: CharacterGroupProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const blinkTimers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    setIsMounted(true);

    // Initialize characters after mount to avoid hydration mismatch
    const initialCharacters: Character[] = [
      { id: 1, x: 0, color: "#4F46E5", skinTone: "#FFD4A3", hairColor: "#2D1B00", action: "waving", blinking: false },
      { id: 2, x: 80, color: "#10B981", skinTone: "#FFE0BD", hairColor: "#6D4C41", action: "smiling", blinking: false },
      { id: 3, x: 160, color: "#F59E0B", skinTone: "#F5CBA7", hairColor: "#1A1A1A", action: "curious", blinking: false },
      { id: 4, x: 240, color: "#8B5CF6", skinTone: "#FDDAB7", hairColor: "#4A2C2A", action: "thinking", blinking: false },
      { id: 5, x: 320, color: "#EC4899", skinTone: "#FADBD8", hairColor: "#8E44AD", action: "cool", blinking: false },
    ];
    setCharacters(initialCharacters);

    // Set up random blinking for each character
    initialCharacters.forEach((char, index) => {
      const startBlink = () => {
        const timer = setTimeout(() => {
          setCharacters((prev) =>
            prev.map((c) => (c.id === char.id ? { ...c, blinking: true } : c))
          );
          setTimeout(() => {
            setCharacters((prev) =>
              prev.map((c) => (c.id === char.id ? { ...c, blinking: false } : c))
            );
          }, 150);
          startBlink();
        }, 2000 + Math.random() * 3000);
        blinkTimers.current[index] = timer;
      };
      startBlink();
    });

    return () => {
      blinkTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  if (!isMounted) {
    return <div className="relative w-full h-64" />;
  }

  return (
    <div className="relative w-full h-64 flex items-center justify-center px-4">
      <svg viewBox="0 0 400 200" className="w-full h-full max-w-2xl">
        {characters.map((char, index) => {
          const eyeRotation = showPassword ? 30 : 0;
          const bodyRotation = showPassword ? -15 : 0;
          
          return (
            <motion.g
              key={char.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Character body/head */}
              <motion.circle
                cx={char.x + 30}
                cy="120"
                r="28"
                fill={char.skinTone}
                stroke={char.color}
                strokeWidth="3"
                animate={{
                  rotate: bodyRotation,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ originX: char.x + 30, originY: 120 }}
              />
              
              {/* Hair */}
              <motion.path
                d={`M ${char.x + 10} 100 Q ${char.x + 30} 85 ${char.x + 50} 100`}
                fill={char.hairColor}
                animate={{ rotate: bodyRotation }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ originX: char.x + 30, originY: 120 }}
              />
              
              {/* Eyes */}
              {!showPassword ? (
                <motion.g>
                  {/* Left eye */}
                  <motion.ellipse
                    cx={char.x + 20}
                    cy="115"
                    rx="3"
                    ry={char.blinking ? "0.5" : "3"}
                    fill="#2D2D2D"
                    transition={{ duration: 0.1 }}
                  />
                  <circle cx={char.x + 20} cy="114" r="1" fill="#FFF" opacity="0.8" />
                  
                  {/* Right eye */}
                  <motion.ellipse
                    cx={char.x + 40}
                    cy="115"
                    rx="3"
                    ry={char.blinking ? "0.5" : "3"}
                    fill="#2D2D2D"
                    transition={{ duration: 0.1 }}
                  />
                  <circle cx={char.x + 40} cy="114" r="1" fill="#FFF" opacity="0.8" />
                </motion.g>
              ) : (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Closed eyes (looking away) */}
                  <motion.path
                    d={`M${char.x + 16} 115 Q${char.x + 20} 113 ${char.x + 24} 115`}
                    stroke="#2D2D2D"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ rotate: eyeRotation }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: char.x + 20, originY: 115 }}
                  />
                  <motion.path
                    d={`M${char.x + 36} 115 Q${char.x + 40} 113 ${char.x + 44} 115`}
                    stroke="#2D2D2D"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ rotate: eyeRotation }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: char.x + 40, originY: 115 }}
                  />
                </motion.g>
              )}
              
              {/* Nose */}
              <circle cx={char.x + 30} cy="122" r="1.5" fill="#FF9999" opacity="0.6" />
              
              {/* Mouth - different expressions */}
              {state === "idle" && !showPassword && (
                <motion.path
                  d={`M${char.x + 24} 128 Q${char.x + 30} ${char.action === "smiling" ? 132 : 130} ${char.x + 36} 128`}
                  stroke="#D97706"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      `M${char.x + 24} 128 Q${char.x + 30} 130 ${char.x + 36} 128`,
                      `M${char.x + 24} 128 Q${char.x + 30} 132 ${char.x + 36} 128`,
                      `M${char.x + 24} 128 Q${char.x + 30} 130 ${char.x + 36} 128`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
              {state === "typing" && !showPassword && (
                <circle cx={char.x + 30} cy="128" r="2" fill="#D97706" />
              )}
              
              {state === "success" && !showPassword && (
                <motion.path
                  d={`M${char.x + 24} 126 Q${char.x + 30} 134 ${char.x + 36} 126`}
                  stroke="#10B981"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
              
              {state === "error" && !showPassword && (
                <motion.path
                  d={`M${char.x + 24} 132 Q${char.x + 30} 128 ${char.x + 36} 132`}
                  stroke="#EF4444"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 0.3, repeat: 3 }}
                />
              )}
              
              {/* Waving hand for first character */}
              {char.action === "waving" && !showPassword && (
                <motion.g
                  animate={{
                    rotate: [0, -20, 20, -20, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: char.x + 55, originY: 110 }}
                >
                  <circle cx={char.x + 55} cy="110" r="6" fill={char.skinTone} stroke={char.color} strokeWidth="2" />
                  <path d={`M${char.x + 55} 105 L${char.x + 53} 100`} stroke={char.skinTone} strokeWidth="2" strokeLinecap="round" />
                  <path d={`M${char.x + 55} 105 L${char.x + 57} 100`} stroke={char.skinTone} strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              )}
              
              {/* Thinking gesture for thinking character */}
              {char.action === "thinking" && !showPassword && (
                <motion.circle
                  cx={char.x + 10}
                  cy="130"
                  r="5"
                  fill={char.skinTone}
                  stroke={char.color}
                  strokeWidth="2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
      
      {/* Privacy message when password is shown */}
      <AnimatePresence>
        {showPassword && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-0 text-sm text-muted-foreground font-medium bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            We respect your privacy 🤫
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
