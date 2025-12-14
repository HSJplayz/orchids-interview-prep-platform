"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorPet() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const pauseTimer = useRef<NodeJS.Timeout>();

  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth - 100 : 0);
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight - 100 : 0);

  const springConfig = { damping: 20, stiffness: 120, mass: 0.8 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const debugSetting = localStorage.getItem("cursor-pet-debug");
    if (debugSetting === "true") {
      setDebugMode(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      lastMoveTime.current = Date.now();
      setIsPaused(false);
      
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
      
      pauseTimer.current = setTimeout(() => {
        setIsPaused(true);
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
    };
  }, [cursorX, cursorY]);

  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* Debug Toggle Button - Fixed bottom-right */}
      <button
        onClick={() => {
          const newDebugMode = !debugMode;
          setDebugMode(newDebugMode);
          localStorage.setItem("cursor-pet-debug", newDebugMode.toString());
        }}
        className="fixed bottom-4 right-4 z-[10000] px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium shadow-lg hover:scale-105 transition-transform"
        style={{ pointerEvents: 'auto' }}
      >
        {debugMode ? "🐾 Debug ON" : "🐾 Debug OFF"}
      </button>

      {/* Cursor Pet */}
      <motion.div
        className="fixed z-[9999]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: 'none',
          display: 'block',
          opacity: debugMode ? 1 : 0.7,
          visibility: 'visible',
        }}
      >
        <div
          className={`relative ${debugMode ? 'outline outline-4 outline-pink-500' : ''}`}
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
          }}
        >
          {/* Debug Label */}
          {debugMode && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-500 text-white px-2 py-1 rounded text-xs font-bold">
              🐾 Cursor Pet Active
            </div>
          )}

          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.g
              animate={{
                rotate: isPaused ? 0 : [0, -8, 8, -8, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {/* Cat body - larger and more visible */}
              <circle cx="24" cy="24" r="14" fill="#FFA500" opacity="1" />
              
              {/* Inner face */}
              <circle cx="24" cy="24" r="11" fill="#FFB52E" />
              
              {/* Ears */}
              <path
                d="M 14 14 L 10 8 L 18 12 Z"
                fill="#FFA500"
              />
              <path
                d="M 34 14 L 38 8 L 30 12 Z"
                fill="#FFA500"
              />
              
              {/* Eyes */}
              <circle cx="19" cy="21" r="2.5" fill="#2D2D2D">
                <animate
                  attributeName="r"
                  values={isBlinking ? "2.5;0.3;2.5" : "2.5"}
                  dur="0.15s"
                  repeatCount={isBlinking ? 1 : 0}
                />
              </circle>
              <circle cx="29" cy="21" r="2.5" fill="#2D2D2D">
                <animate
                  attributeName="r"
                  values={isBlinking ? "2.5;0.3;2.5" : "2.5"}
                  dur="0.15s"
                  repeatCount={isBlinking ? 1 : 0}
                />
              </circle>
              
              {/* Nose */}
              <circle cx="24" cy="26" r="1.5" fill="#FF6B6B" />
              
              {/* Mouth */}
              <path
                d="M 20 28 Q 24 30 28 28"
                stroke="#2D2D2D"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Whiskers - left */}
              <path
                d="M 12 22 L 6 20 M 12 24 L 5 24 M 12 26 L 6 28"
                stroke="#2D2D2D"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Whiskers - right */}
              <path
                d="M 36 22 L 42 20 M 36 24 L 43 24 M 36 26 L 42 28"
                stroke="#2D2D2D"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              
              {/* Eye highlights */}
              <circle cx="17" cy="20" r="1" fill="#FFF" opacity="0.7" />
              <circle cx="27" cy="20" r="1" fill="#FFF" opacity="0.7" />
              
              {/* Sleeping indicator */}
              {isPaused && (
                <motion.text
                  x="24"
                  y="44"
                  textAnchor="middle"
                  fontSize="12"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  💤
                </motion.text>
              )}
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </>
  );
}