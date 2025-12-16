"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorPet() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pauseTimer = useRef<NodeJS.Timeout>();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
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
    cursorX.set(window.innerWidth - 100);
    cursorY.set(window.innerHeight - 100);

    const savedDebug = localStorage.getItem("cursor-pet-debug");
    if (savedDebug === "true") {
      setDebugMode(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      setIsPaused(false);

      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }

      pauseTimer.current = setTimeout(() => {
        setIsPaused(true);
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
    };
  }, [cursorX, cursorY]);

  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* Debug toggle button */}
      <button
        onClick={() => {
          const newMode = !debugMode;
          setDebugMode(newMode);
          localStorage.setItem("cursor-pet-debug", newMode.toString());
        }}
        className="fixed bottom-4 right-4 z-[10000] px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium shadow-lg hover:scale-105 transition-transform"
        style={{ pointerEvents: "auto" }}
      >
        {debugMode ? "🐾 Debug ON" : "🐾"}
      </button>

      {/* Cursor pet */}
      <motion.div
        className="fixed z-[9999]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
      >
        <div
          className={`relative ${debugMode ? "outline outline-4 outline-pink-500" : ""}`}
          style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))" }}
        >
          {debugMode && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              🐾 Cursor Pet Active
            </div>
          )}

          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <motion.g
              animate={isPaused ? {} : { rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Cat body */}
              <circle cx="28" cy="28" r="16" fill="#FFA500" />
              <circle cx="28" cy="28" r="13" fill="#FFB84D" />

              {/* Ears */}
              <path d="M 16 16 L 10 8 L 20 14 Z" fill="#FFA500" />
              <path d="M 40 16 L 46 8 L 36 14 Z" fill="#FFA500" />
              <path d="M 16 16 L 12 10 L 19 15 Z" fill="#FFD699" />
              <path d="M 40 16 L 44 10 L 37 15 Z" fill="#FFD699" />

              {/* Eyes */}
              <circle cx="22" cy="25" r="3" fill="#2D2D2D" className="cat-eye" />
              <circle cx="34" cy="25" r="3" fill="#2D2D2D" className="cat-eye" />
              <circle cx="23" cy="24" r="1.2" fill="#FFF" opacity="0.9" />
              <circle cx="35" cy="24" r="1.2" fill="#FFF" opacity="0.9" />

              {/* Nose */}
              <circle cx="28" cy="30" r="2" fill="#FF6B6B" />

              {/* Mouth */}
              <path
                d="M 23 33 Q 28 36 33 33"
                stroke="#2D2D2D"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Whiskers */}
              <g opacity="0.8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="26" x2="5" y2="24" />
                <line x1="12" y1="28" x2="4" y2="28" />
                <line x1="12" y1="30" x2="5" y2="32" />
                <line x1="44" y1="26" x2="51" y2="24" />
                <line x1="44" y1="28" x2="52" y2="28" />
                <line x1="44" y1="30" x2="51" y2="32" />
              </g>

              {/* Sleeping Z's */}
              {isPaused && (
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <text x="28" y="52" textAnchor="middle" fontSize="14" fill="#6366F1">
                    💤
                  </text>
                </motion.g>
              )}
            </motion.g>
          </svg>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes cat-blink {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.1);
          }
        }
        .cat-eye {
          animation: cat-blink 5s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
