"use client";

import { motion } from "framer-motion";

interface LoginCharacterProps {
  state: "idle" | "typing" | "hiding" | "torch" | "success" | "error";
}

export function LoginCharacter({ state }: LoginCharacterProps) {
  return (
    <div className="relative w-48 h-48">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.g
          animate={{
            y: state === "idle" ? [0, -4, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="100" cy="90" r="45" fill="#4F46E5" opacity="0.1" />
          <circle cx="100" cy="85" r="40" fill="#F8FAFC" stroke="#4F46E5" strokeWidth="3" />
          
          <motion.g
            animate={{
              scaleY: state === "hiding" ? 0.1 : 1,
              y: state === "hiding" ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="88" cy="78" r="4" fill="#0F172A" />
            <circle cx="112" cy="78" r="4" fill="#0F172A" />
            
            <motion.circle
              cx="85"
              cy="76"
              r="1.5"
              fill="#FFFFFF"
              animate={{
                opacity: [1, 1, 0, 1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.48, 0.5, 0.52, 1],
              }}
            />
            <motion.circle
              cx="109"
              cy="76"
              r="1.5"
              fill="#FFFFFF"
              animate={{
                opacity: [1, 1, 0, 1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.48, 0.5, 0.52, 1],
              }}
            />
          </motion.g>
          
          <motion.path
            d={
              state === "error"
                ? "M 88 95 Q 100 90 112 95"
                : state === "success"
                ? "M 88 92 Q 100 102 112 92"
                : "M 88 95 Q 100 98 112 95"
            }
            stroke="#0F172A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d:
                state === "typing"
                  ? [
                      "M 88 95 Q 100 98 112 95",
                      "M 88 95 Q 100 100 112 95",
                      "M 88 95 Q 100 98 112 95",
                    ]
                  : undefined,
            }}
            transition={{
              duration: 0.4,
              repeat: state === "typing" ? Infinity : 0,
            }}
          />
          
          {state === "success" && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <circle cx="130" cy="70" r="8" fill="#10B981" opacity="0.2" />
              <path
                d="M 127 70 L 129 72 L 133 68"
                stroke="#10B981"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          )}
          
          {state === "error" && (
            <motion.g
              animate={{
                x: [-2, 2, -2, 2, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: 2,
              }}
            >
              <path
                d="M 120 65 Q 125 60 130 65"
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="128" cy="68" r="1" fill="#EF4444" />
            </motion.g>
          )}
        </motion.g>
        
        {state === "hiding" && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              d="M 60 80 Q 65 75 70 80 L 75 85 Q 70 90 65 85 Z"
              fill="#F8FAFC"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <circle cx="67" cy="82" r="1" fill="#0F172A" />
          </motion.g>
        )}
        
        {state === "torch" && (
          <motion.g
            initial={{ opacity: 0, rotate: -20, x: 20 }}
            animate={{ opacity: 1, rotate: 0, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <rect
              x="125"
              y="95"
              width="8"
              height="25"
              rx="2"
              fill="#8B4513"
              stroke="#6B3410"
              strokeWidth="1"
            />
            
            <motion.g
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle cx="129" cy="92" r="8" fill="#FFA500" opacity="0.6" />
              <circle cx="129" cy="92" r="6" fill="#FF6B00" opacity="0.8" />
              <path
                d="M 129 84 L 127 90 L 129 88 L 131 90 Z"
                fill="#FFD700"
              />
            </motion.g>
            
            <motion.path
              d="M 133 92 Q 145 90 155 85"
              stroke="#FFA500"
              strokeWidth="20"
              fill="none"
              opacity="0.2"
              strokeLinecap="round"
              animate={{
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
