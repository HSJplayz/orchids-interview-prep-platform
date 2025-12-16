"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Leaf {
  id: number;
  x: number;
  duration: number;
  delay: number;
  xOffset: number;
}

export function AmbientBackground({ paused = false }: { paused?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    const newLeaves: Leaf[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 10,
      xOffset: Math.random() * 100 - 50,
    }));
    setLeaves(newLeaves);
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            paused
              ? {}
              : {
                  y: [0, -30, 0],
                  x: [0, (particle.x % 20) - 10, 0],
                  opacity: [0.1, 0.3, 0.1],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: -20,
          }}
          animate={
            paused
              ? {}
              : {
                  y: ["0vh", "110vh"],
                  x: [0, leaf.xOffset],
                  rotate: [0, 360],
                  opacity: [0, 0.15, 0.15, 0],
                }
          }
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-accent"
          >
            <path
              d="M10 2C10 2 15 7 15 12C15 15.866 12.866 18 10 18C7.134 18 5 15.866 5 12C5 7 10 2 10 2Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
