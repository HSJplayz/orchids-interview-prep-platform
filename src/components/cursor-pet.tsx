"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorPet() {
  const [isVisible, setIsVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const pauseTimer = useRef<NodeJS.Timeout>();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    const settings = localStorage.getItem("cursor-pet-enabled");
    if (settings === "false") {
      setIsVisible(false);
      return;
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

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-multiply dark:mix-blend-screen"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60 drop-shadow-lg"
      >
        <motion.g
          animate={{
            rotate: isPaused ? 0 : [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <circle cx="16" cy="16" r="10" fill="#FFA500" opacity="0.9" />
          
          <circle cx="16" cy="16" r="8" fill="#FFB52E" />
          
          <circle cx="13" cy="14" r="1.5" fill="#2D2D2D">
            <animate
              attributeName="r"
              values={isBlinking ? "1.5;0.2;1.5" : "1.5"}
              dur="0.15s"
              repeatCount={isBlinking ? 1 : 0}
            />
          </circle>
          <circle cx="19" cy="14" r="1.5" fill="#2D2D2D">
            <animate
              attributeName="r"
              values={isBlinking ? "1.5;0.2;1.5" : "1.5"}
              dur="0.15s"
              repeatCount={isBlinking ? 1 : 0}
            />
          </circle>
          
          <path
            d="M 14 18 Q 16 19.5 18 18"
            stroke="#2D2D2D"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          
          <circle cx="11" cy="15" r="0.8" fill="#FFF" opacity="0.6" />
          <circle cx="17" cy="15" r="0.8" fill="#FFF" opacity="0.6" />
          
          <path
            d="M 8 10 L 5 8 M 8 12 L 4 12 M 8 14 L 5 16"
            stroke="#FFA500"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 24 10 L 27 8 M 24 12 L 28 12 M 24 14 L 27 16"
            stroke="#FFA500"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {isPaused && (
            <motion.text
              x="16"
              y="28"
              textAnchor="middle"
              fontSize="10"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              💤
            </motion.text>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
