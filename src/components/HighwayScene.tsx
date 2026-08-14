import React, { useCallback, useEffect, useRef } from 'react';
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
  const fgRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ── Parallax on mouse move (desktop only) ─────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy;

      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.05) translate(${dx * -1.5}px, ${dy * -1.5}px)`;
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translate(${dx * 3.5}px, ${dy * 2.5}px)`;
      }
    },
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

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
      className={`relative w-screen h-[100svh] overflow-hidden bg-[#050505] select-none tod-${timeOfDay} weather-${weatherMode}`}
    >
      {/* ── Layer 1: Artwork ───────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out scale-105"
        style={{ backgroundImage: `url('/images/dhaba-artwork.jpg')` }}
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
