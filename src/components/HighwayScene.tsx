import React, { useEffect, useRef, useState } from 'react';
import { CinematicOverlay } from './CinematicOverlay';

interface HighwaySceneProps {
  children?: React.ReactNode;
  weatherMode: 'rain' | 'clear' | 'fog' | 'midnight';
  timeOfDay: 'golden-hour' | 'evening' | 'deep-night' | 'cold-night' | 'dawn';
}

const RAIN_COUNT_MAP: Record<string, number> = {
  rain: 48,
  fog: 18,
  clear: 8,
  midnight: 28,
};

export const HighwayScene: React.FC<HighwaySceneProps> = ({
  children,
  weatherMode,
  timeOfDay,
}) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch & Drag 3D Pan states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0); // Current pan offset in pixels
  const targetX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [aspectRatioOffset, setAspectRatioOffset] = useState<number>(0);

  // Measure full overflow width of landscape image when scaled to 100vh height
  useEffect(() => {
    const img = new Image();
    img.src = '/images/dhaba-artwork.jpg';
    img.onload = () => {
      const imgAspect = img.width / img.height;
      const screenAspect = window.innerWidth / window.innerHeight;
      if (imgAspect > screenAspect) {
        // Calculate max scrollable pixel distance to show 100% of image
        const renderedWidth = window.innerHeight * imgAspect;
        const maxOffset = renderedWidth - window.innerWidth;
        setAspectRatioOffset(maxOffset);
        // Initial center pan
        currentX.current = -maxOffset / 2;
        targetX.current = -maxOffset / 2;
      }
    };
  }, []);

  // Smooth render loop for fluid 60fps 3D pan & tilt
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;

      // Smooth lerp towards target pan X position
      currentX.current += (targetX.current - currentX.current) * 0.12;

      if (bgRef.current && aspectRatioOffset > 0) {
        // Calculate normalized pan ratio (-1 to +1)
        const centerPan = currentX.current + aspectRatioOffset / 2;
        const panRatio = centerPan / (aspectRatioOffset / 2 || 1);

        // 3D Perspective Rotation & Translation
        const rotateY = panRatio * -4.5; // Subtle 3D tilt angle
        const translateX = currentX.current;

        bgRef.current.style.transform = `translate3d(${translateX}px, 0px, 0px) rotateY(${rotateY}deg) scale(1.04)`;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      active = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [aspectRatioOffset]);

  // Touch Handlers for Mobile Finger Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX - targetX.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || aspectRatioOffset <= 0) return;
    const x = e.touches[0].clientX;
    let newX = x - startX.current;

    // Clamp pan bounds so user can see 100% of the image from left edge (0) to right edge (-maxOffset)
    newX = Math.max(-aspectRatioOffset, Math.min(0, newX));
    targetX.current = newX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Mouse Drag Handlers for Desktop fallback
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX - targetX.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || aspectRatioOffset <= 0) return;
    const x = e.clientX;
    let newX = x - startX.current;
    newX = Math.max(-aspectRatioOffset, Math.min(0, newX));
    targetX.current = newX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Mobile Gyroscope tilt support
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (isDragging.current || !e.gamma || aspectRatioOffset <= 0) return;
      // Gamma is left/right tilt (-90 to +90)
      const gamma = Math.max(-30, Math.min(30, e.gamma));
      const normalizedTilt = (gamma + 30) / 60; // 0 (left) to 1 (right)
      targetX.current = -normalizedTilt * aspectRatioOffset;
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [aspectRatioOffset]);

  const rainCount = RAIN_COUNT_MAP[weatherMode] ?? 28;

  // ── Time-of-day grade colours ─────────────────────────────────────
  const gradeColours: Record<string, string> = {
    'golden-hour': 'rgba(180,90,10,0.18)',
    'evening':     'rgba(10,10,20,0.30)',
    'deep-night':  'rgba(5,5,15,0.44)',
    'cold-night':  'rgba(5,8,22,0.52)',
    'dawn':        'rgba(40,20,5,0.20)',
  };
  const gradeColour = gradeColours[timeOfDay] ?? gradeColours['deep-night'];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-screen h-[100svh] overflow-hidden bg-[#050505] select-none touch-pan-x tod-${timeOfDay} weather-${weatherMode}`}
      style={{ perspective: '1200px' }}
    >
      {/* ── Layer 1: 3D Touch Pan Background (Shows 100% full artwork from left to right) ── */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 h-full max-w-none transition-transform duration-75 ease-out"
        style={{
          width: aspectRatioOffset > 0 ? `calc(100vw + ${aspectRatioOffset}px)` : '100vw',
          backgroundImage: `url('/images/dhaba-artwork.jpg')`,
          backgroundSize: aspectRatioOffset > 0 ? 'auto 100%' : 'cover',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Time-based cinematic colour grade ──────────────── */}
      <div
        className="grade-layer absolute inset-0 pointer-events-none transition-all duration-[3000ms]"
        style={{ background: gradeColour }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Fog drift ─────────────────────────────────────── */}
      <div
        className={`fog-layer absolute inset-x-0 bottom-0 h-2/5 pointer-events-none animate-fog transition-opacity duration-[3000ms] ${
          weatherMode === 'fog' ? 'opacity-80' : 'opacity-30'
        }`}
        style={{
          background:
            'linear-gradient(to top, rgba(5,4,3,0.75) 0%, rgba(15,10,5,0.35) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Rain particles ────────────────────────────────── */}
      <div
        className={`rain-layer absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-[2000ms] ${
          weatherMode === 'clear' ? 'opacity-5' : weatherMode === 'rain' ? 'opacity-60' : 'opacity-30'
        }`}
        aria-hidden="true"
      >
        {Array.from({ length: rainCount }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 97 + 13) % 100}%`,
              top: `-${(i * 47) % 25}%`,
              width: i % 6 === 0 ? '1.5px' : '1px',
              height: i % 6 === 0 ? '22px' : '14px',
              background:
                'linear-gradient(to bottom, transparent, rgba(200,210,230,0.55), transparent)',
              animationName: 'rain-fall',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDuration: `${0.75 + (i % 7) * 0.18}s`,
              animationDelay: `${(i * 0.09) % 1.8}s`,
            }}
          />
        ))}
      </div>

      {/* ── Layer 5 & 6: Film grain, vignette, dust (CinematicOverlay) */}
      <CinematicOverlay weatherMode={weatherMode} />

      {/* ── Layer 7: Dhaba light flicker overlay ──────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[11] animate-flicker"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 68% 32%, rgba(251,146,60,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Truck headlight sweep (occasional) ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[11] overflow-hidden animate-truck-pass">
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '-5%',
            width: '420px',
            height: '260px',
            background:
              'radial-gradient(ellipse at center left, rgba(255,255,220,0.12) 0%, rgba(180,130,50,0.06) 50%, transparent 80%)',
            filter: 'blur(20px)',
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '8%',
            width: '200px',
            height: '120px',
            background:
              'radial-gradient(ellipse at center, rgba(220,60,30,0.14) 0%, transparent 75%)',
            filter: 'blur(14px)',
          }}
        />
      </div>

      {/* ── Parallax foreground layer (subtle) ─────────────────────── */}
      <div
        ref={fgRef}
        className="absolute inset-0 pointer-events-none z-[10] transition-transform duration-75 ease-out"
        aria-hidden="true"
      />

      {/* ── Page content ──────────────────────────────────────────── */}
      <div className="relative z-20 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
