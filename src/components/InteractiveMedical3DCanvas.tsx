import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Activity, Stethoscope, Heart, ShieldCheck, Droplet, Sparkles } from 'lucide-react';

export const InteractiveMedical3DCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, screenX: 0, screenY: 0 });
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll progress tracking
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  // Transform scroll progress to interactive dynamic rotation & translation values
  const ecgWaveShift = useTransform(smoothProgress, [0, 1], [0, -320]);
  const floatRotate = useTransform(smoothProgress, [0, 1], [0, 180]);
  const depthZ = useTransform(smoothProgress, [0, 0.5, 1], [0, -40, 0]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize between -1 and +1 for 3D tilt calculation
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({
        x: nx,
        y: ny,
        screenX: e.clientX,
        screenY: e.clientY,
      });
      setIsPointerActive(true);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;
      setScrollSpeed(Math.min(delta / 4, 30));

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    const handlePointerLeave = () => {
      setIsPointerActive(false);
      setMousePos((prev) => ({ ...prev, x: 0, y: 0 }));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Calculate gentle 3D tilt angles based on mouse position
  const tiltX = -mousePos.y * 12; // tilt degrees up/down
  const tiltY = mousePos.x * 14;  // tilt degrees left/right

  return (
    <>
      {/* 1. ULTRA-SMOOTH MEDICAL 3D PROGRESS BAR (TOP OF SCREEN) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-amber-400 to-[#087f8c] shadow-[0_0_12px_rgba(8,127,140,0.8)]"
          style={{
            scaleX: smoothProgress,
            transformOrigin: '0%',
          }}
        />
      </div>

      {/* 2. REFINED MEDICAL CURSOR AURA (INTERACTIVE MOUSE MOVEMENT) */}
      {isPointerActive && (
        <div
          className="fixed pointer-events-none z-[9998] transition-opacity duration-300 hidden md:block"
          style={{
            left: `${mousePos.screenX}px`,
            top: `${mousePos.screenY}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Subtle Outer Medical Soft Ambient Glow */}
          <div
            className="w-32 h-32 rounded-full blur-xl pointer-events-none transition-transform duration-100 ease-out"
            style={{
              background: 'radial-gradient(circle, rgba(8,127,140,0.18) 0%, rgba(215,181,109,0.08) 50%, transparent 75%)',
              transform: `scale(${1 + scrollSpeed * 0.04})`,
            }}
          />

          {/* Micro Medical Cross Reticle & Pulse Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500/80 shadow-[0_0_8px_rgba(8,127,140,0.9)] animate-ping" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
          </div>
        </div>
      )}

      {/* 3. FLOATING 3D SPATIAL PARTICLES & MEDICAL ORBS (INTERACTIVE DEPTH IN BACKGROUND) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        style={{ perspective: '1200px' }}
      >
        {/* Floating Orb 1: Upper-Right Teal Vitality Sphere */}
        <motion.div
          className="absolute -top-12 -right-12 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(8,127,140,0.45) 0%, rgba(5,33,41,0) 70%)',
            x: mousePos.x * 35,
            y: mousePos.y * 35,
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />

        {/* Floating Orb 2: Lower-Left Warm Gold Zakat Sphere */}
        <motion.div
          className="absolute top-1/2 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(215,181,109,0.4) 0%, rgba(9,47,58,0) 70%)',
            x: -mousePos.x * 40,
            y: -mousePos.y * 30,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />

        {/* Floating Orb 3: Middle Emergency Rose Compassion Accent */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(244,63,94,0.3) 0%, rgba(0,0,0,0) 70%)',
            x: mousePos.x * 25,
            y: mousePos.y * 25,
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />
      </div>

      {/* 4. CLINICAL FLOATING 3D INTERACTIVE CORNER TELEMETRY (SUBTLE & REFINED) */}
      <div 
        className="fixed bottom-6 left-6 z-40 hidden lg:block pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(800px) rotateX(${tiltX * 0.4}deg) rotateY(${tiltY * 0.4}deg) translateZ(10px)`,
        }}
      >
        <div className="relative group p-2.5 px-3.5 rounded-2xl bg-white/75 dark:bg-[#092f3a]/80 backdrop-blur-md border border-teal-500/25 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.4)] flex items-center gap-3">
          {/* Animated Heartbeat Monitor Pulse */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-600 dark:text-teal-300">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-black tracking-wider text-teal-700 dark:text-teal-300">
              <span>Live Telemetry</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-slate-500 font-normal">24/7 ICU & Dialysis</span>
            </div>
            
            {/* Real-time Simulated ECG Micro-Graphic */}
            <div className="flex items-center gap-1 h-2.5 overflow-hidden w-28 mt-0.5">
              <motion.div
                className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 font-bold"
                style={{ x: ecgWaveShift }}
              >
                <span>——/\_/\——/\_/\——/\_/\——/\_/\——/\_/\——/\_/\——</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
