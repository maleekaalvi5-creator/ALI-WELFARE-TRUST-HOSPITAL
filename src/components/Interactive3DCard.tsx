import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltMax?: number;
  scaleHover?: number;
  onClick?: () => void;
  id?: string;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(8, 127, 140, 0.25)',
  tiltMax = 12,
  scaleHover = 1.025,
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics spring for fluid response
  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

  // 3D angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltMax, -tiltMax]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltMax, tiltMax]);
  
  // Specular sheen light gradient coordinates
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Condition check: only enable 3D tilt on devices with a fine pointer (mouse/trackpad)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      id={id}
      style={{ perspective: 1200 }}
      className={`relative ${className}`}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleHover }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-full relative rounded-2xl sm:rounded-3xl transition-shadow duration-300"
      >
        {/* Ambient 3D Dynamic Glow - Crisp, no text blur */}
        <motion.div
          className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: isHovered ? `0 8px 24px -4px ${glowColor}` : 'none',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Specular Glint Sheen Line across surface */}
        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 transition-opacity duration-200 z-30"
          style={{
            background: `radial-gradient(circle 180px at ${sheenX} ${sheenY}, rgba(255,255,255,0.2), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Card Content with 3D Z-translation and enforced font rendering clarity */}
        <div 
          className="relative z-10 w-full h-full text-sharp"
          style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
