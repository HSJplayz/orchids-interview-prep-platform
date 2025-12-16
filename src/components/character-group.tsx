"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharacterGroupProps {
  showPassword: boolean;
  state: "idle" | "typing" | "success" | "error";
}

interface Character {
  id: number;
  x: number;
  emoji: string;
  hideEmoji: string;
  color: string;
  action: string;
}

export function CharacterGroup({ showPassword, state }: CharacterGroupProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const characters: Character[] = [
    {
      id: 1,
      x: 0,
      emoji: "😊",
      hideEmoji: "🙈",
      color: "#4F46E5",
      action: "waving",
    },
    {
      id: 2,
      x: 80,
      emoji: "😄",
      hideEmoji: "😌",
      color: "#10B981",
      action: "smiling",
    },
    {
      id: 3,
      x: 160,
      emoji: "🤔",
      hideEmoji: "🫣",
      color: "#F59E0B",
      action: "curious",
    },
    {
      id: 4,
      x: 240,
      emoji: "😎",
      hideEmoji: "😶",
      color: "#8B5CF6",
      action: "cool",
    },
  ];

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-md"
      >
        {characters.map((char, index) => (
          <motion.g
            key={char.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: showPassword ? 180 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: index * 0.1 },
              y: { duration: 0.4, delay: index * 0.1 },
              rotateY: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {/* Body */}
            <motion.g
              animate={{
                y:
                  state === "idle"
                    ? [0, -3, 0]
                    : state === "typing"
                    ? [0, -2, 0]
                    : 0,
              }}
              transition={{
                duration: 2 + index * 0.3,
                repeat: state === "idle" || state === "typing" ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {/* Shadow */}
              <ellipse
                cx={char.x + 30}
                cy="175"
                rx="25"
                ry="5"
                fill={char.color}
                opacity="0.15"
              />

              {/* Body Circle */}
              <circle
                cx={char.x + 30}
                cy="120"
                r="35"
                fill={char.color}
                opacity="0.1"
              />
              <circle
                cx={char.x + 30}
                cy="115"
                r="30"
                fill="white"
                stroke={char.color}
                strokeWidth="3"
              />

              {/* Face - Eyes */}
              <AnimatePresence mode="wait">
                {!showPassword ? (
                  <motion.g
                    key="eyes-open"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Eyes */}
                    <motion.circle
                      cx={char.x + 22}
                      cy="108"
                      r="3.5"
                      fill="#0F172A"
                      animate={{
                        scaleY: state === "error" ? [1, 0.1, 1] : 1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                      }}
                    />
                    <motion.circle
                      cx={char.x + 38}
                      cy="108"
                      r="3.5"
                      fill="#0F172A"
                      animate={{
                        scaleY: state === "error" ? [1, 0.1, 1] : 1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                      }}
                    />
                    {/* Eye shine */}
                    <circle cx={char.x + 20} cy="106" r="1.2" fill="white" />
                    <circle cx={char.x + 36} cy="106" r="1.2" fill="white" />
                  </motion.g>
                ) : (
                  <motion.g
                    key="eyes-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Closed eyes - looking away */}
                    <path
                      d={`M ${char.x + 18} 108 Q ${char.x + 22} 106 ${
                        char.x + 26
                      } 108`}
                      stroke="#0F172A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={`M ${char.x + 34} 108 Q ${char.x + 38} 106 ${
                        char.x + 42
                      } 108`}
                      stroke="#0F172A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Hands covering eyes */}
                    {index % 2 === 0 && (
                      <motion.g
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ellipse
                          cx={char.x + 22}
                          cy="108"
                          rx="8"
                          ry="10"
                          fill="#FCD6A0"
                          opacity="0.9"
                        />
                        <ellipse
                          cx={char.x + 38}
                          cy="108"
                          rx="8"
                          ry="10"
                          fill="#FCD6A0"
                          opacity="0.9"
                        />
                      </motion.g>
                    )}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Mouth */}
              <motion.path
                d={
                  state === "error"
                    ? `M ${char.x + 22} 125 Q ${char.x + 30} 120 ${
                        char.x + 38
                      } 125`
                    : state === "success"
                    ? `M ${char.x + 22} 122 Q ${char.x + 30} 132 ${
                        char.x + 38
                      } 122`
                    : showPassword
                    ? `M ${char.x + 24} 124 Q ${char.x + 30} 126 ${
                        char.x + 36
                      } 124`
                    : `M ${char.x + 22} 124 Q ${char.x + 30} 127 ${
                        char.x + 38
                      } 124`
                }
                stroke="#0F172A"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                animate={
                  state === "typing"
                    ? {
                        d: [
                          `M ${char.x + 22} 124 Q ${char.x + 30} 127 ${
                            char.x + 38
                          } 124`,
                          `M ${char.x + 22} 124 Q ${char.x + 30} 129 ${
                            char.x + 38
                          } 124`,
                          `M ${char.x + 22} 124 Q ${char.x + 30} 127 ${
                            char.x + 38
                          } 124`,
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: state === "typing" ? Infinity : 0,
                }}
              />

              {/* Blush */}
              {showPassword && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                >
                  <circle
                    cx={char.x + 16}
                    cy="118"
                    r="4"
                    fill="#FF6B9D"
                    opacity="0.4"
                  />
                  <circle
                    cx={char.x + 44}
                    cy="118"
                    r="4"
                    fill="#FF6B9D"
                    opacity="0.4"
                  />
                </motion.g>
              )}

              {/* Action indicators */}
              {!showPassword && char.action === "waving" && (
                <motion.g
                  animate={{
                    rotate: [0, 15, -15, 15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ originX: char.x + 55, originY: 95 }}
                >
                  <path
                    d={`M ${char.x + 55} 95 Q ${char.x + 60} 90 ${char.x + 65} 85`}
                    stroke={char.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx={char.x + 67} cy="83" r="5" fill="#FCD6A0" />
                </motion.g>
              )}

              {/* Success animation */}
              {state === "success" && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <circle
                    cx={char.x + 50}
                    cy="95"
                    r="8"
                    fill="#10B981"
                    opacity="0.2"
                  />
                  <path
                    d={`M ${char.x + 47} 95 L ${char.x + 49} 97 L ${char.x + 53} 93`}
                    stroke="#10B981"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>
              )}

              {/* Error animation */}
              {state === "error" && (
                <motion.g
                  animate={{
                    x: [-2, 2, -2, 2, 0],
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <path
                    d={`M ${char.x + 48} 95 Q ${char.x + 53} 90 ${char.x + 58} 95`}
                    stroke="#EF4444"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx={char.x + 56} cy="98" r="1.5" fill="#EF4444" />
                </motion.g>
              )}
            </motion.g>
          </motion.g>
        ))}
      </svg>

      {/* Privacy message when password shown */}
      <AnimatePresence>
        {showPassword && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-sm font-medium text-muted-foreground">
              We respect your privacy 🤫
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
