import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface AnatomyObject {
  id: string;
  type: 'heart' | 'eye' | 'ultrasound' | 'brain' | 'skeleton' | 'dialysis' | 'full_anatomy';
  title: string;
  subtext: string;
  badge: string;
  x: number; // 0 to 1 normalized horizontal coordinate
  y: number; // 0 to 1 normalized vertical coordinate
  z: number; // depth scale: 0.5 (background) to 1.15 (foreground)
  driftY: number; // continuous infinite vertical drift speed
  driftX: number; // continuous horizontal drift speed
  rotation: number;
  rotSpeed: number;
  pulsePhase: number;
  scaleBase: number;
}

interface Anatomy3DCanvasProps {
  interactive?: boolean;
  className?: string;
  onHoverOrgan?: (organTitle: string | null) => void;
}

const REAL_IMAGE_SOURCES: Record<string, string> = {
  heart: '/images/real-3d-heart.jpg',
  eye: '/images/real-3d-eye.jpg',
  ultrasound: '/images/real-3d-ultrasound.jpg',
  brain: '/images/real-3d-brain.jpg',
  skeleton: '/images/real-3d-skeleton.jpg',
};

export const Anatomy3DCanvas: React.FC<Anatomy3DCanvasProps> = ({
  interactive = true,
  className = '',
  onHoverOrgan,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number>(0);

  // Preloaded real 3D anatomical images cache
  const loadedImagesRef = useRef<Record<string, HTMLImageElement>>({});
  const [, setImagesLoaded] = useState(false);

  // Mouse / Pointer state with ultra-smooth low-pass damping (prevents any screen shaking)
  const mousePos = useRef<{
    x: number; // smoothed normalized [-1, 1]
    y: number;
    targetX: number; // raw target normalized [-1, 1]
    targetY: number;
    screenX: number;
    screenY: number;
    isHovered: boolean;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    screenX: -1000,
    screenY: -1000,
    isHovered: false,
  });

  // Scroll dynamics tracking with soft inertia decay
  const scrollDynamics = useRef<{
    lastY: number;
    velocity: number;
    smoothVelocity: number;
    offsetY: number;
  }>({
    lastY: 0,
    velocity: 0,
    smoothVelocity: 0,
    offsetY: 0,
  });

  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    subtext: string;
    badge: string;
    x: number;
    y: number;
  } | null>(null);
  const lastHoveredTitle = useRef<string | null>(null);

  // Preload authentic 3D medical anatomy images on mount
  useEffect(() => {
    let loadedCount = 0;
    const entries = Object.entries(REAL_IMAGE_SOURCES);
    const total = entries.length;

    entries.forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedImagesRef.current[key] = img;
        loadedCount++;
        if (loadedCount >= total) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback gracefully if single image takes longer
        loadedCount++;
        if (loadedCount >= total) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Anatomical objects configured for continuous, seamless infinite stream across depth planes
  const objectsRef = useRef<AnatomyObject[]>([
    {
      id: 'heart-fore',
      type: 'heart',
      title: 'Original 3D Human Heart',
      subtext: 'Biventricular Myocardium • Aortic Arch & Coronaries',
      badge: '72 BPM Systole',
      x: 0.18,
      y: 0.22,
      z: 1.15,
      driftY: -0.00028,
      driftX: 0.00004,
      rotation: 0.03,
      rotSpeed: 0.0003,
      pulsePhase: 0,
      scaleBase: 1.55,
    },
    {
      id: 'eye-fore',
      type: 'eye',
      title: 'Real 3D Human Eye & Cornea',
      subtext: 'Crystal Crystalline Lens • Trabecular Iris & Sclera',
      badge: 'Gaze Sensor Active',
      x: 0.82,
      y: 0.28,
      z: 1.12,
      driftY: -0.00024,
      driftX: -0.00003,
      rotation: -0.02,
      rotSpeed: 0.0002,
      pulsePhase: 1.4,
      scaleBase: 1.48,
    },
    {
      id: 'ultrasound-fore',
      type: 'ultrasound',
      title: '3D Real Ultrasound Sonogram',
      subtext: 'Clinical Sonography Probe • Color Doppler Hemodynamics',
      badge: '7.5 MHz Sector',
      x: 0.76,
      y: 0.72,
      z: 1.08,
      driftY: -0.0003,
      driftX: 0.00005,
      rotation: 0.02,
      rotSpeed: -0.0002,
      pulsePhase: 2.7,
      scaleBase: 1.45,
    },
    {
      id: 'brain-fore',
      type: 'brain',
      title: 'Original 3D Human Brain',
      subtext: 'Cerebral Cortex • Cortical Sulci & Neural Convolutions',
      badge: 'Neural Action Matrix',
      x: 0.48,
      y: 0.14,
      z: 1.02,
      driftY: -0.00026,
      driftX: -0.00004,
      rotation: 0.0,
      rotSpeed: 0.0003,
      pulsePhase: 1.9,
      scaleBase: 1.35,
    },
    {
      id: 'skeleton-fore',
      type: 'skeleton',
      title: 'Real 3D Human Thoracic Skeleton',
      subtext: 'Vertebral Alignment • Articulated Ribcage Osteology',
      badge: 'Biomechanical Matrix',
      x: 0.22,
      y: 0.78,
      z: 1.05,
      driftY: -0.00025,
      driftX: 0.00004,
      rotation: -0.02,
      rotSpeed: 0.0002,
      pulsePhase: 3.5,
      scaleBase: 1.4,
    },
    // Midground continuous infinite scroll planes
    {
      id: 'heart-mid',
      type: 'heart',
      title: 'Cardiac Perfusion Axis',
      subtext: 'Coronary Vascular Bed & Endocardial Dynamics',
      badge: 'Cardiac Flow',
      x: 0.88,
      y: 0.52,
      z: 0.82,
      driftY: -0.00022,
      driftX: -0.00002,
      rotation: 0.05,
      rotSpeed: 0.0003,
      pulsePhase: 0.8,
      scaleBase: 1.05,
    },
    {
      id: 'brain-mid',
      type: 'brain',
      title: 'Synaptic Cortex Stream',
      subtext: 'Deep Cerebellar Circuitry & Neuro-Vascular Core',
      badge: 'Axonal Network',
      x: 0.12,
      y: 0.48,
      z: 0.8,
      driftY: -0.00023,
      driftX: 0.00003,
      rotation: -0.04,
      rotSpeed: -0.0002,
      pulsePhase: 2.2,
      scaleBase: 1.0,
    },
    {
      id: 'eye-mid',
      type: 'eye',
      title: 'Optic Nerve & Retina Axis',
      subtext: 'Choroidal Micro-Capillaries & Fundus Scanning',
      badge: 'Retinal Layer',
      x: 0.38,
      y: 0.95,
      z: 0.78,
      driftY: -0.00025,
      driftX: -0.00003,
      rotation: 0.03,
      rotSpeed: 0.0002,
      pulsePhase: 3.8,
      scaleBase: 0.98,
    },
    {
      id: 'ultrasound-mid',
      type: 'ultrasound',
      title: 'Vascular Doppler Echography',
      subtext: 'Continuous Wave Flow & Transducer Acoustic Plane',
      badge: 'Echocardiography',
      x: 0.62,
      y: 0.42,
      z: 0.76,
      driftY: -0.0002,
      driftX: 0.00003,
      rotation: -0.03,
      rotSpeed: 0.0002,
      pulsePhase: 4.4,
      scaleBase: 0.95,
    },
    {
      id: 'skeleton-mid',
      type: 'skeleton',
      title: 'Spinal Vertebrae & Discs',
      subtext: 'Cervical & Lumbar Radiographic Density',
      badge: 'Osteo Axis',
      x: 0.68,
      y: 1.05,
      z: 0.74,
      driftY: -0.00024,
      driftX: -0.00003,
      rotation: 0.02,
      rotSpeed: -0.0002,
      pulsePhase: 5.0,
      scaleBase: 0.92,
    },
    {
      id: 'dialysis-sys',
      type: 'dialysis',
      title: 'Hemodialysis Capillary Membrane',
      subtext: 'Hollow-Fiber Filtration & Purified Blood Return',
      badge: 'Renal Dialysis Bed',
      x: 0.34,
      y: 0.44,
      z: 0.72,
      driftY: -0.00022,
      driftX: 0.00002,
      rotation: 0.08,
      rotSpeed: 0.0003,
      pulsePhase: 1.1,
      scaleBase: 0.9,
    },
    {
      id: 'full_anatomy-sys',
      type: 'full_anatomy',
      title: 'Vitruvian Biometric Hologram',
      subtext: 'Endless Full-Body Matrix • Organ Telemetry Scan',
      badge: 'Full Body Scan',
      x: 0.5,
      y: 0.68,
      z: 0.68,
      driftY: -0.00018,
      driftX: 0.0,
      rotation: 0.0,
      rotSpeed: 0.0001,
      pulsePhase: 0.0,
      scaleBase: 1.15,
    },
  ]);

  // Ambient erythrocytes and floating bio-luminescent cellular nodes
  const particlesRef = useRef<
    Array<{ x: number; y: number; z: number; vx: number; vy: number; radius: number; color: string }>
  >([]);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        z: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.00015,
        vy: -0.0002 - Math.random() * 0.0002, // Gentle continuous upward floating
        radius: 1.2 + Math.random() * 2.8,
        color:
          i % 3 === 0
            ? 'rgba(0, 240, 255, 0.4)' // Cyan medical glow
            : i % 3 === 1
            ? 'rgba(239, 68, 68, 0.35)' // Erythrocyte crimson
            : 'rgba(56, 189, 248, 0.35)', // Hospital sky blue
      });
    }
    particlesRef.current = particles;
  }, []);

  // Smooth scroll tracking with damped low-pass velocity (NO sudden jumps)
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const curY = window.scrollY;
          const delta = curY - lastScroll;
          lastScroll = curY;

          // Clamp delta to prevent sudden jarring motions on trackpad gestures
          const clampedDelta = Math.max(-50, Math.min(50, delta));
          scrollDynamics.current.velocity += clampedDelta * 0.00025;
          scrollDynamics.current.offsetY += clampedDelta * 0.0004;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pointer move handler with gentle boundary normalization
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      // Normalized coordinates: center is (0, 0), range is -1 to +1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      mousePos.current.targetX = nx;
      mousePos.current.targetY = ny;
      mousePos.current.screenX = e.clientX;
      mousePos.current.screenY = e.clientY;
      mousePos.current.isHovered = true;
    };

    const onPointerLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
      mousePos.current.isHovered = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  // =========================================================================
  // REAL 3D ANATOMY RENDERING PIPELINE (ORGAN RENDERING WITH SOFT VIGNETTE)
  // =========================================================================

  /**
   * Helper: Draws a real 3D anatomical image with soft feathered circular blending
   * into the deep dark canvas background, followed by luminous medical HUD telemetry.
   */
  const drawRealAnatomyFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      imgKey: string,
      radius: number,
      alpha: number,
      accentColor: string,
      pulseFactor: number = 1
    ) => {
      const img = loadedImagesRef.current[imgKey];
      const r = radius * pulseFactor;

      ctx.save();

      // 1. Soft Ambient Depth Glow behind the 3D organ
      const glowGrad = ctx.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 1.35);
      glowGrad.addColorStop(0, accentColor.replace(')', `, ${alpha * 0.45})`).replace('rgb', 'rgba'));
      glowGrad.addColorStop(0.7, accentColor.replace(')', `, ${alpha * 0.12})`).replace('rgb', 'rgba'));
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Real 3D Anatomical Image with Soft Feathered Edge
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.clip();

        // High quality smooth image rendering
        ctx.drawImage(img, -r, -r, r * 2, r * 2);
        ctx.restore();

        // Feathered dark radial vignette to blend perimeter into midnight background
        const vignette = ctx.createRadialGradient(0, 0, r * 0.62, 0, 0, r);
        vignette.addColorStop(0, 'rgba(3, 12, 18, 0)');
        vignette.addColorStop(0.85, 'rgba(3, 12, 18, 0.45)');
        vignette.addColorStop(1, 'rgba(3, 12, 18, 0.98)');
        ctx.fillStyle = vignette;
        ctx.beginPath();
        ctx.arc(0, 0, r + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Futuristic Medical Telemetry Reticle Rings
      ctx.save();
      ctx.strokeStyle = accentColor.replace(')', `, ${alpha * 0.6})`).replace('rgb', 'rgba');
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed outer orbital ring
      ctx.strokeStyle = accentColor.replace(')', `, ${alpha * 0.35})`).replace('rgb', 'rgba');
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r + 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    },
    []
  );

  /**
   * REAL 3D HEART
   * Photorealistic cardiac image + physiological systole contraction,
   * live synchronized ECG waveform trace, and pulsing coronary perfusion ring.
   */
  const renderHeart = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      scale: number,
      pulse: number,
      alpha: number,
      gazeX: number,
      gazeY: number
    ) => {
      ctx.save();

      // Physiological systolic squeeze & rebound (72 BPM)
      const systolicSqueeze = Math.pow(Math.sin(pulse * 2.2), 6) * 0.1;
      const diastolicBounce = Math.sin(pulse * 2.2 + 0.3) * 0.04;
      const beat = 1 + systolicSqueeze + diastolicBounce;

      // Draw authentic 3D Heart image with crimson bio-glow
      drawRealAnatomyFrame(ctx, 'heart', scale, alpha, 'rgb(239, 68, 68)', beat);

      // Dynamic 3D Specular Sheen responding smoothly to cursor position
      const sheenX = gazeX * scale * 0.4;
      const sheenY = gazeY * scale * 0.4;
      const sheenGrad = ctx.createRadialGradient(sheenX, sheenY, 0, sheenX, sheenY, scale * 0.85);
      sheenGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.32})`);
      sheenGrad.addColorStop(0.5, `rgba(254, 202, 202, ${alpha * 0.12})`);
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.arc(0, 0, scale * beat, 0, Math.PI * 2);
      ctx.fill();

      // Radiating arterial pulse wavefront ring
      const wavePhase = (pulse * 1.5) % 1;
      const waveRadius = scale * (1.05 + wavePhase * 0.55);
      const waveAlpha = (1 - wavePhase) * alpha * 0.7;
      ctx.strokeStyle = `rgba(248, 113, 113, ${waveAlpha})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Live Synchronized Cardiac Rhythm ECG Wave under the heart
      ctx.save();
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.85})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const ecgW = scale * 1.2;
      const ecgY = scale * 0.75;
      const ecgStep = (pulse * 3) % 1;

      ctx.moveTo(-ecgW * 0.5, ecgY);
      ctx.lineTo(-ecgW * 0.2, ecgY);
      ctx.lineTo(-ecgW * 0.15, ecgY - 6 * (1 + systolicSqueeze * 5)); // P wave
      ctx.lineTo(-ecgW * 0.1, ecgY);
      ctx.lineTo(-ecgW * 0.05, ecgY + 8); // Q wave
      ctx.lineTo(0, ecgY - 26 * (1 + systolicSqueeze * 5)); // High R wave spike!
      ctx.lineTo(ecgW * 0.05, ecgY + 12); // S wave
      ctx.lineTo(ecgW * 0.12, ecgY);
      ctx.lineTo(ecgW * 0.22, ecgY - 10); // T wave
      ctx.lineTo(ecgW * 0.5, ecgY);
      ctx.stroke();

      // ECG scanning lead spark
      const sparkX = -ecgW * 0.5 + ecgStep * ecgW;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(sparkX, ecgY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    },
    [drawRealAnatomyFrame]
  );

  /**
   * REAL 3D HUMAN EYE
   * Authentic ophthalmic image + responsive 3D corneal gaze tracking towards cursor,
   * iris trabecular sheen, pupil micro-dilation, and biometric fundus circular reticle.
   */
  const renderEye = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      scale: number,
      pulse: number,
      alpha: number,
      gazeX: number,
      gazeY: number
    ) => {
      ctx.save();

      // Draw authentic 3D Eye image with sapphire cyan bio-glow
      drawRealAnatomyFrame(ctx, 'eye', scale, alpha, 'rgb(14, 165, 233)', 1);

      // Responsive 3D Corneal Specular Gaze Tracking (subtly tracks user cursor!)
      const gazeShiftX = gazeX * scale * 0.22;
      const gazeShiftY = gazeY * scale * 0.22;

      // Corneal dome crystalline reflection
      const cornealGrad = ctx.createRadialGradient(
        gazeShiftX - scale * 0.08,
        gazeShiftY - scale * 0.08,
        0,
        gazeShiftX,
        gazeShiftY,
        scale * 0.45
      );
      cornealGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.85})`);
      cornealGrad.addColorStop(0.3, `rgba(186, 230, 253, ${alpha * 0.4})`);
      cornealGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = cornealGrad;
      ctx.beginPath();
      ctx.arc(gazeShiftX, gazeShiftY, scale * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Specular light pinpoints (realistic double reflection)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(gazeShiftX - scale * 0.1, gazeShiftY - scale * 0.1, scale * 0.045, 0, Math.PI * 2);
      ctx.arc(gazeShiftX + scale * 0.06, gazeShiftY + scale * 0.06, scale * 0.025, 0, Math.PI * 2);
      ctx.fill();

      // Ophthalmic Precision Calibration Reticle with degree ticks
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.75})`;
      ctx.lineWidth = 1;
      const rOuter = scale * 1.12;

      // 4 Precision crosshair quadrants
      ctx.beginPath();
      ctx.moveTo(-rOuter - 8, 0);
      ctx.lineTo(-rOuter + 4, 0);
      ctx.moveTo(rOuter - 4, 0);
      ctx.lineTo(rOuter + 8, 0);
      ctx.moveTo(0, -rOuter - 8);
      ctx.lineTo(0, -rOuter + 4);
      ctx.moveTo(0, rOuter - 4);
      ctx.lineTo(0, rOuter + 8);
      ctx.stroke();

      // Micro degree markers around iris perimeter
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        const x1 = Math.cos(rad) * (scale + 3);
        const y1 = Math.sin(rad) * (scale + 3);
        const x2 = Math.cos(rad) * (scale + 7);
        const y2 = Math.sin(rad) * (scale + 7);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.restore();
    },
    [drawRealAnatomyFrame]
  );

  /**
   * REAL 3D ULTRASOUND SCAN
   * Authentic sonogram image + sweeping acoustic sector fan beam,
   * live color Doppler hemodynamics, and frequency telemetry display.
   */
  const renderUltrasound = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      scale: number,
      pulse: number,
      alpha: number,
      gazeX: number,
      gazeY: number
    ) => {
      ctx.save();

      // Draw authentic 3D Ultrasound image with clinical teal glow
      drawRealAnatomyFrame(ctx, 'ultrasound', scale, alpha, 'rgb(20, 184, 166)', 1);

      // Sweeping Acoustic Sonar Sector Beam (Continuous 3D soundwave radar sweep)
      const sweepAngle = Math.PI * 0.5 + Math.sin(pulse * 1.8) * 0.45;
      const fanGrad = ctx.createRadialGradient(0, -scale * 0.3, 0, 0, -scale * 0.3, scale * 1.25);
      fanGrad.addColorStop(0, `rgba(45, 212, 191, ${alpha * 0.55})`);
      fanGrad.addColorStop(0.8, `rgba(6, 182, 212, ${alpha * 0.18})`);
      fanGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = fanGrad;
      ctx.beginPath();
      ctx.moveTo(0, -scale * 0.3);
      ctx.arc(0, -scale * 0.3, scale * 1.25, sweepAngle - 0.25, sweepAngle + 0.25);
      ctx.closePath();
      ctx.fill();

      // Acoustic Sector Outline
      ctx.strokeStyle = `rgba(45, 212, 191, ${alpha * 0.65})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, -scale * 0.3, scale * 1.2, Math.PI * 0.25, Math.PI * 0.75);
      ctx.stroke();

      // Doppler color flow vectors (hemodynamic arterial red and venous blue pulses)
      const flowPulse = Math.sin(pulse * 2.5);
      ctx.fillStyle = `rgba(239, 68, 68, ${alpha * (0.6 + flowPulse * 0.3)})`;
      ctx.beginPath();
      ctx.arc(-scale * 0.22, scale * 0.15, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(14, 165, 233, ${alpha * (0.6 - flowPulse * 0.3)})`;
      ctx.beginPath();
      ctx.arc(scale * 0.22, scale * 0.18, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Sonographic depth caliper marks on right edge
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.55})`;
      ctx.lineWidth = 1;
      for (let cm = -scale * 0.6; cm <= scale * 0.6; cm += scale * 0.3) {
        ctx.beginPath();
        ctx.moveTo(scale * 0.88, cm);
        ctx.lineTo(scale * 0.96, cm);
        ctx.stroke();
      }

      ctx.restore();
    },
    [drawRealAnatomyFrame]
  );

  /**
   * REAL 3D HUMAN BRAIN
   * Authentic cerebral cortex render + dynamic synaptic bursts firing across sulci,
   * axonal connection links, and alpha neural rhythm telemetry.
   */
  const renderBrain = useCallback(
    (ctx: CanvasRenderingContext2D, scale: number, pulse: number, alpha: number) => {
      ctx.save();

      // Draw authentic 3D Brain image with electric sky-blue glow
      drawRealAnatomyFrame(ctx, 'brain', scale, alpha, 'rgb(56, 189, 248)', 1);

      // Firing Synapses: Luminous action potential nodes pulsing along gyri convolutions
      const synCount = 6;
      for (let s = 0; s < synCount; s++) {
        const theta = (s / synCount) * Math.PI * 2 + pulse * 0.8;
        const rDist = scale * (0.35 + Math.sin(pulse * 2 + s) * 0.25);
        const sx = Math.cos(theta) * rDist;
        const sy = Math.sin(theta) * rDist * 0.85;

        // Glowing synapse spark
        const synGlow = alpha * (0.4 + Math.sin(pulse * 3.5 + s * 1.5) * 0.45);
        ctx.fillStyle = `rgba(255, 255, 255, ${synGlow})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Axon impulse line connecting back to core
        ctx.strokeStyle = `rgba(0, 240, 255, ${synGlow * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      // Luminous neural telemetry ring with rotating tick
      ctx.save();
      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, scale * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      const leadAngle = pulse * 1.2;
      const lx = Math.cos(leadAngle) * scale * 1.15;
      const ly = Math.sin(leadAngle) * scale * 1.15;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    },
    [drawRealAnatomyFrame]
  );

  /**
   * REAL 3D HUMAN SKELETON
   * Authentic osteology render + vertebral alignment axis, biomechanical ribcage guides,
   * and bone density telemetry calipers.
   */
  const renderSkeleton = useCallback(
    (ctx: CanvasRenderingContext2D, scale: number, pulse: number, alpha: number) => {
      ctx.save();

      // Draw authentic 3D Skeleton image with surgical titanium silver/cyan glow
      drawRealAnatomyFrame(ctx, 'skeleton', scale, alpha, 'rgb(148, 163, 184)', 1);

      // Spinal Biomechanical Alignment Vector Axis (Vertical laser guide)
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.75})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -scale * 1.15);
      ctx.lineTo(0, scale * 1.15);
      ctx.stroke();

      // Vertebrae calibration tick lines
      ctx.strokeStyle = `rgba(226, 232, 240, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      const vertCount = 7;
      for (let v = 0; v < vertCount; v++) {
        const vy = -scale * 0.75 + (v / (vertCount - 1)) * scale * 1.5;
        ctx.beginPath();
        ctx.moveTo(-10, vy);
        ctx.lineTo(10, vy);
        ctx.stroke();
      }

      // Outer Biomechanical Caliper Brackets
      ctx.strokeStyle = `rgba(215, 181, 109, ${alpha * 0.7})`; // Gold trust accent
      ctx.lineWidth = 1.4;
      const bRad = scale * 1.12;

      // Left bracket
      ctx.beginPath();
      ctx.arc(0, 0, bRad, Math.PI * 0.8, Math.PI * 1.2);
      ctx.stroke();

      // Right bracket
      ctx.beginPath();
      ctx.arc(0, 0, bRad, Math.PI * 1.8, Math.PI * 0.2);
      ctx.stroke();

      ctx.restore();
    },
    [drawRealAnatomyFrame]
  );

  /**
   * HEMODIALYSIS CARTRIDGE
   */
  const renderDialysis = useCallback(
    (ctx: CanvasRenderingContext2D, scale: number, pulse: number, alpha: number) => {
      ctx.save();
      const h = scale * 1.5;
      const w = scale * 0.52;

      // 3D Glass Hollow-Fiber Cylinder Body
      const cylGrad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      cylGrad.addColorStop(0, `rgba(15, 23, 42, ${alpha * 0.9})`);
      cylGrad.addColorStop(0.3, `rgba(56, 189, 248, ${alpha * 0.55})`);
      cylGrad.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.75})`);
      cylGrad.addColorStop(1, `rgba(14, 116, 144, ${alpha * 0.9})`);

      ctx.fillStyle = cylGrad;
      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.9})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, [8, 8, 8, 8]);
      ctx.fill();
      ctx.stroke();

      // Capillary membrane porous bundles inside
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      for (let f = -w * 0.35; f <= w * 0.35; f += w * 0.14) {
        ctx.beginPath();
        ctx.moveTo(f, -h * 0.44);
        ctx.lineTo(f, h * 0.44);
        ctx.stroke();
      }

      // Red Arterial Blood Port (Inflow)
      ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.98})`;
      ctx.beginPath();
      ctx.arc(0, -h / 2, w * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Blue Venous Blood Port (Purified Outflow)
      ctx.fillStyle = `rgba(14, 165, 233, ${alpha * 0.98})`;
      ctx.beginPath();
      ctx.arc(0, h / 2, w * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Continuous dialysate purification counterflow vectors
      const dyFlow = ((pulse * 30) % (h * 0.7)) - h * 0.35;
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(w * 0.25, dyFlow, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
    []
  );

  /**
   * VITRUVIAN BIOMETRIC HOLOGRAM
   */
  const renderFullAnatomy = useCallback(
    (ctx: CanvasRenderingContext2D, scale: number, pulse: number, alpha: number) => {
      ctx.save();
      const h = scale * 1.8;

      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.75})`;
      ctx.lineWidth = 1.2;

      // Cranium
      ctx.beginPath();
      ctx.arc(0, -h * 0.4, scale * 0.16, 0, Math.PI * 2);
      ctx.stroke();

      // Neck, Torso & Limbs
      ctx.beginPath();
      ctx.moveTo(-scale * 0.08, -h * 0.28);
      ctx.lineTo(-scale * 0.28, -h * 0.22);
      ctx.lineTo(-scale * 0.32, -h * 0.05);
      ctx.moveTo(-scale * 0.2, -h * 0.2);
      ctx.lineTo(-scale * 0.16, h * 0.05);
      ctx.lineTo(-scale * 0.2, h * 0.45);

      // Symmetrical right side
      ctx.moveTo(scale * 0.08, -h * 0.28);
      ctx.lineTo(scale * 0.28, -h * 0.22);
      ctx.lineTo(scale * 0.32, -h * 0.05);
      ctx.moveTo(scale * 0.2, -h * 0.2);
      ctx.lineTo(scale * 0.16, h * 0.05);
      ctx.lineTo(scale * 0.2, h * 0.45);
      ctx.stroke();

      // Holographic Vitruvian Rings
      ctx.strokeStyle = `rgba(215, 181, 109, ${alpha * 0.55})`;
      ctx.beginPath();
      ctx.arc(0, 0, scale * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      // Continuous laser medical biometric scan line
      const scanY = Math.sin(pulse * 1.6) * (h * 0.45);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-scale * 0.5, scanY);
      ctx.lineTo(scale * 0.5, scanY);
      ctx.stroke();

      ctx.restore();
    },
    []
  );

  // =========================================================================
  // MAIN ANIMATION LOOP (INFINITE SCROLL + ROCK-SOLID SMOOTH MOUSE LERP)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let time = 0;
    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
      lastTimestamp = now;
      time += dt;

      // 1. Ultra-smooth, non-shaky critically-damped mouse lerping (Low-pass filter)
      const mouseEase = 0.038;
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * mouseEase;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * mouseEase;

      // 2. Smooth scroll velocity decay
      scrollDynamics.current.velocity *= 0.92;
      scrollDynamics.current.smoothVelocity +=
        (scrollDynamics.current.velocity - scrollDynamics.current.smoothVelocity) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep, futuristic medical science atmosphere background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#02090e'); // Deep oceanic midnight slate
      bgGrad.addColorStop(0.5, '#041620'); // Rich clinical teal-slate
      bgGrad.addColorStop(1, '#010609'); // Void horizon
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Smooth, continuous 3D perspective background grid (NO snapping or jumping)
      ctx.save();
      ctx.strokeStyle = 'rgba(8, 127, 140, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      // Continuous phase without sudden modulo jumps
      const gridPhaseX = (mousePos.current.x * 15) % gridSize;
      const gridPhaseY = (time * 12 + mousePos.current.y * 15) % gridSize;

      for (let gx = -gridSize + gridPhaseX; gx < width + gridSize; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = -gridSize + gridPhaseY; gy < height + gridSize; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Flowing bio-particles / erythrocytes (Continuous infinite upward flow)
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy - scrollDynamics.current.smoothVelocity * 0.0003;

        // Seamless infinite wrap
        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;

        // Subtle, elegant parallax (rock-solid, not shaky)
        const px = p.x * width + mousePos.current.x * (p.z * 12);
        const py = p.y * height + mousePos.current.y * (p.z * 12);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * p.z, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Sort anatomical objects by depth (z) so distant objects render behind foreground
      const sortedObjects = [...objectsRef.current].sort((a, b) => a.z - b.z);

      let foundHover: {
        title: string;
        subtext: string;
        badge: string;
        x: number;
        y: number;
      } | null = null;

      const mouseCanvasX = (mousePos.current.x + 0.5) * width;
      const mouseCanvasY = (mousePos.current.y + 0.5) * height;

      // 6. Render Anatomical Objects in Continuous Infinite Scroll
      sortedObjects.forEach((obj) => {
        // Continuous, perpetual movement (Infinite scroll stream)
        // Drifts continuously upward + smoothly responds to user page scrolling
        obj.y += obj.driftY - scrollDynamics.current.smoothVelocity * 0.0005 * obj.z;
        obj.x += obj.driftX;
        obj.rotation += obj.rotSpeed;

        // Seamless infinite wrapping with generous margins (NEVER pops or disappears)
        const wrapMarginY = 0.28;
        const wrapMarginX = 0.22;

        if (obj.y < -wrapMarginY) {
          obj.y = 1 + wrapMarginY;
        } else if (obj.y > 1 + wrapMarginY) {
          obj.y = -wrapMarginY;
        }

        if (obj.x < -wrapMarginX) {
          obj.x = 1 + wrapMarginX;
        } else if (obj.x > 1 + wrapMarginX) {
          obj.x = -wrapMarginX;
        }

        // Rock-Solid Parallax Displacement (Constrained & Smooth, Zero Shakiness)
        const parallaxFactor = obj.z * 18;
        const posX = obj.x * width + mousePos.current.x * parallaxFactor;
        const posY = obj.y * height + mousePos.current.y * parallaxFactor;

        // Responsive size scales with viewport dimension and depth plane
        const baseDim = Math.min(width, height);
        const scale = baseDim * 0.12 * obj.scaleBase * obj.z * (width < 640 ? 0.78 : 1);
        const alpha = Math.min(0.98, 0.5 + obj.z * 0.48);

        // Vector towards cursor for interactive corneal gaze and lighting
        const dxToMouse = mouseCanvasX - posX;
        const dyToMouse = mouseCanvasY - posY;
        const distToMouse = Math.hypot(dxToMouse, dyToMouse) || 1;
        const gazeX = Math.max(-1, Math.min(1, dxToMouse / distToMouse));
        const gazeY = Math.max(-1, Math.min(1, dyToMouse / distToMouse));

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(obj.rotation);

        const pulse = time + obj.pulsePhase;

        // Render appropriate authentic 3D anatomical organ
        switch (obj.type) {
          case 'heart':
            renderHeart(ctx, scale, pulse, alpha, gazeX, gazeY);
            break;
          case 'eye':
            renderEye(ctx, scale, pulse, alpha, gazeX, gazeY);
            break;
          case 'ultrasound':
            renderUltrasound(ctx, scale, pulse, alpha, gazeX, gazeY);
            break;
          case 'brain':
            renderBrain(ctx, scale, pulse, alpha);
            break;
          case 'skeleton':
            renderSkeleton(ctx, scale, pulse, alpha);
            break;
          case 'dialysis':
            renderDialysis(ctx, scale, pulse, alpha);
            break;
          case 'full_anatomy':
            renderFullAnatomy(ctx, scale, pulse, alpha);
            break;
          default:
            renderHeart(ctx, scale, pulse, alpha, gazeX, gazeY);
        }

        ctx.restore();

        // Stable cursor proximity check for interactive HUD telemetry (hysteresis prevents flicker)
        if (distToMouse < scale * 1.15) {
          foundHover = {
            title: obj.title,
            subtext: obj.subtext,
            badge: obj.badge,
            x: posX,
            y: posY - scale * 0.9,
          };
        }
      });

      // Update hovered info only when organ title actually changes (prevents 60fps React thrashing)
      const currentTitle = foundHover ? foundHover.title : null;
      if (lastHoveredTitle.current !== currentTitle) {
        lastHoveredTitle.current = currentTitle;
        setHoveredInfo(foundHover);
        if (onHoverOrgan) {
          onHoverOrgan(currentTitle);
        }
      }

      // 7. Subtle, smooth medical crosshair reticle following cursor gently
      if (width > 640 && mousePos.current.isHovered) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.lineWidth = 1;
        const crx = mouseCanvasX;
        const cry = mouseCanvasY;

        ctx.beginPath();
        ctx.arc(crx, cry, 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(crx - 22, cry);
        ctx.lineTo(crx - 10, cry);
        ctx.moveTo(crx + 10, cry);
        ctx.lineTo(crx + 22, cry);
        ctx.moveTo(crx, cry - 22);
        ctx.lineTo(crx, cry - 10);
        ctx.moveTo(crx, cry + 10);
        ctx.lineTo(crx, cry + 22);
        ctx.stroke();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
    };
  }, [
    renderHeart,
    renderEye,
    renderUltrasound,
    renderBrain,
    renderSkeleton,
    renderDialysis,
    renderFullAnatomy,
    onHoverOrgan,
  ]);

  // Mouse & Touch interaction handlers for smooth parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePos.current.targetX = Math.max(-1, Math.min(1, nx));
    mousePos.current.targetY = Math.max(-1, Math.min(1, ny));
    mousePos.current.isHovered = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current || e.touches.length === 0) return;
    const t = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((t.clientY - rect.top) / rect.height) * 2 - 1;
    mousePos.current.targetX = Math.max(-1, Math.min(1, nx * 0.8));
    mousePos.current.targetY = Math.max(-1, Math.min(1, ny * 0.8));
  };

  const handlePointerLeave = () => {
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
    mousePos.current.isHovered = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handlePointerLeave}
      className={`relative w-full h-full overflow-hidden select-none will-change-transform ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive Original 3D Medical Anatomy Experience"
    >
      <canvas
        ref={canvasRef}
        id="founder-hero-3d-canvas"
        className="absolute inset-0 w-full h-full block cursor-crosshair"
      />

      {/* Atmospheric Medical Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,9,14,0.65)_75%,rgba(1,6,9,0.92)_100%)]" />

      {/* Floating Bio-Telemetry HUD overlay on hover */}
      {hoveredInfo && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 ease-out"
          style={{ left: `${hoveredInfo.x}px`, top: `${hoveredInfo.y}px` }}
        >
          <div className="bg-[#041620]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-teal-400/50 shadow-[0_0_25px_rgba(0,240,255,0.35)] text-center text-white min-w-[190px]">
            <div className="flex items-center justify-between gap-2 border-b border-teal-500/20 pb-1 mb-1">
              <span className="text-[11px] font-mono text-teal-300 font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                {hoveredInfo.title}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-200 border border-teal-500/30">
                {hoveredInfo.badge}
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-sans">{hoveredInfo.subtext}</p>
          </div>
        </div>
      )}

      {/* Depth Telemetry Watermark */}
      <div className="absolute bottom-3 left-4 pointer-events-none text-[10px] font-mono text-teal-400/50 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        <span>Continuous Infinite 3D Anatomy • Authentic Medical Scans</span>
      </div>
    </div>
  );
};
