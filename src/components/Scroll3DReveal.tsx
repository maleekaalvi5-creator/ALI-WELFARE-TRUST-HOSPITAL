import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Scroll3DRevealProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: 'gentle' | 'medium' | 'deep';
  id?: string;
}

export const Scroll3DReveal: React.FC<Scroll3DRevealProps> = ({
  children,
  className = '',
  depth = 20,
  direction = 'up',
  intensity = 'medium',
  id
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth out scroll progression
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Compute 3D translations based on scroll progress
  const initialY = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
  const initialX = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;

  const y = useTransform(smoothY, [0, 0.25, 0.75, 1], [initialY, 0, 0, -initialY * 0.4]);
  const x = useTransform(smoothY, [0, 0.25, 0.75, 1], [initialX, 0, 0, -initialX * 0.4]);
  const opacity = useTransform(smoothY, [0, 0.2, 0.85, 1], [0.1, 1, 1, 0.2]);
  const scale = useTransform(smoothY, [0, 0.25, 0.8, 1], [0.96, 1, 1, 0.98]);
  const rotateX = useTransform(smoothY, [0, 0.25, 0.75, 1], [direction === 'up' ? 6 : -6, 0, 0, -3]);

  // Handle subtle cursor 3D tilt on card hover (desktop fine pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      x: -yPos * (intensity === 'deep' ? 8 : 4),
      y: xPos * (intensity === 'deep' ? 8 : 4),
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <motion.div
        style={{
          y,
          x,
          opacity,
          scale,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: mouseTilt.y,
          rotateX: mouseTilt.x,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
