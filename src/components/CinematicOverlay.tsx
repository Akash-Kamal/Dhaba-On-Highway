import React from 'react';

interface CinematicOverlayProps {
  weatherMode: 'rain' | 'clear' | 'fog' | 'midnight';
}

/**
 * CinematicOverlay renders all atmospheric depth layers that sit ABOVE the
 * artwork but below interactive UI. All effects are CSS-only and pointer-events-none.
 *
 * Layers (top → bottom rendered order, visually lowest → highest):
 *  1. Vignette — dark corner gradient
 *  2. Dhaba amber light bloom — warm glow in upper-right quadrant
 *  3. Wet road reflection shimmer — animated gradient at bottom
 *  4. Film grain — SVG turbulence filter tile, animated position shift
 *  5. Floating dust / moisture particles
 */
export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({ weatherMode }) => {
  return (
    <>
      {/* ── Vignette: darker corners, center open ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[12]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Dhaba Amber Light Bloom ───────────────────────────────────── */}
      {/* Positioned upper-right to approximate where dhaba signage lives  */}
      <div
        className="absolute pointer-events-none z-[13] animate-dhaba-bloom"
        style={{
          top: '10%',
          right: '10%',
          width: '320px',
          height: '200px',
          background:
            'radial-gradient(ellipse at center, rgba(251,146,60,0.22) 0%, rgba(180,83,9,0.10) 50%, transparent 80%)',
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Second smaller lamp bloom */}
      <div
        className="absolute pointer-events-none z-[13] animate-flicker"
        style={{
          top: '18%',
          right: '22%',
          width: '120px',
          height: '80px',
          background:
            'radial-gradient(ellipse at center, rgba(253,186,116,0.30) 0%, transparent 80%)',
          filter: 'blur(12px)',
        }}
        aria-hidden="true"
      />

      {/* ── Wet Road Reflection ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[14] animate-road-shimmer"
        style={{
          height: '30%',
          background:
            'linear-gradient(to top, rgba(180,83,9,0.10) 0%, rgba(239,68,68,0.05) 25%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Occasional truck tail-light road streak */}
      <div
        className="absolute pointer-events-none z-[14]"
        style={{
          bottom: '12%',
          left: '35%',
          width: '25%',
          height: '3px',
          background:
            'linear-gradient(to right, transparent, rgba(239,68,68,0.25), transparent)',
          filter: 'blur(4px)',
          opacity: weatherMode === 'rain' ? 0.9 : 0.5,
        }}
        aria-hidden="true"
      />

      {/* ── Film Grain (SVG-based tile + animated shift) ─────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[15] animate-grain"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* ── Floating Dust / Moisture Particles ───────────────────────── */}
      {/* Only shown in rain/fog weather */}
      {(weatherMode === 'rain' || weatherMode === 'fog') && (
        <div className="absolute inset-0 pointer-events-none z-[16]" aria-hidden="true">
          {[
            { top: '55%', left: '22%', cls: 'animate-dust-1', size: 1.5, op: 0.35 },
            { top: '60%', left: '45%', cls: 'animate-dust-2', size: 1,   op: 0.25 },
            { top: '50%', left: '65%', cls: 'animate-dust-3', size: 2,   op: 0.30 },
            { top: '70%', left: '30%', cls: 'animate-dust-1', size: 1,   op: 0.20 },
            { top: '65%', left: '78%', cls: 'animate-dust-2', size: 1.5, op: 0.28 },
            { top: '75%', left: '55%', cls: 'animate-dust-3', size: 1,   op: 0.22 },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-amber-100 ${p.cls}`}
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.op,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};
