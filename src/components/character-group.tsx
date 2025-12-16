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

  const characters = [
    { id: 1, x: 0, color: "#4F46E5", action: "waving" },
    { id: 2, x: 80, color: "#10B981", action: "smiling" },
    { id: 3, x: 160, color: "#F59E0B", action: "curious" },
    { id: 4, x: 240, color: "#8B5CF6", action: "cool" },
  ];

  if (!isMounted) {
    return <div className="relative w-full h-64" />;
  }

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 320 200" className="w-full h-full max-w-md">
        {characters.map((char, index) => (
          <motion.g
            key={char.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, rotateY: showPassword ? 180 : 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <circle cx={char.x + 30} cy="120" r="30" fill="white" stroke={char.color} strokeWidth="3" />
            {!showPassword && (
              <g>
                <circle cx={char.x + 22} cy="108" r="3" fill="#000" />
                <circle cx={char.x + 38} cy="108" r="3" fill="#000" />
              </g>
            )}
            {showPassword && (
              <g>
                <path d={`M${char.x+18} 108 Q${char.x+22} 106 ${char.x+26} 108`} stroke="#000" strokeWidth="2" fill="none" />
                <path d={`M${char.x+34} 108 Q${char.x+38} 106 ${char.x+42} 108`} stroke="#000" strokeWidth="2" fill="none" />
              </g>
            )}
          </motion.g>
        ))}
      </svg>
      {showPassword && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-0 text-sm text-muted-foreground">
          We respect your privacy 🤫
        </motion.p>
      )}
    </div>
  );
}
