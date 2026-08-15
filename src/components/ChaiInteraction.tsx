import React, { useState } from 'react';
import { CupSoda } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';

type Phase = 'idle' | 'pouring' | 'sipping';

export const ChaiInteraction: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [glowIntense, setGlowIntense] = useState(false);

  const handleChaiClick = () => {
    if (phase !== 'idle') return;

    ambientSynth.playChaiSound();
    setPhase('pouring');
    setGlowIntense(true);

    setTimeout(() => {
      setPhase('sipping');
    }, 3200);

    setTimeout(() => {
      setPhase('idle');
      setGlowIntense(false);
    }, 6500);
  };

  const message =
    phase === 'pouring'
      ? 'Ek chai ho jaaye? ☕'
      : phase === 'sipping'
      ? 'सफ़र लंबा है... 🌙'
      : null;

  const steamCount = glowIntense ? 6 : 3;
  const steamClasses = ['animate-steam-1','animate-steam-2','animate-steam-3','animate-steam-4','animate-steam-5','animate-steam-6'];

  return (
    <div className="relative inline-block select-none group">
      {/* Tooltip on idle hover */}
      {phase === 'idle' && (
        <div className="absolute bottom-full left-0 mb-2 px-2.5 py-1 rounded bg-black/90 text-amber-300 text-[11px] font-mono tracking-widest uppercase border border-amber-800/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-xl">
          CHAI BREAK
        </div>
      )}

      {/* Two-phase floating speech bubble message (Anchored to left-0 to prevent screen clipping) */}
      {message && (
        <div className="absolute bottom-full left-0 mb-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 font-devanagari text-sm font-semibold border border-amber-500/40 shadow-2xl whitespace-nowrap z-30 animate-title-in">
          {message}
          <div className="absolute top-full left-5 border-4 border-transparent border-t-amber-900" />
        </div>
      )}

      {/* Chai Cup Button */}
      <button
        onClick={handleChaiClick}
        className={`relative flex items-center justify-center p-3 rounded-full border shadow-xl transition-all transform cursor-pointer backdrop-blur-sm ${
          glowIntense
            ? 'bg-amber-900/60 border-amber-400/70 scale-110'
            : 'bg-black/40 hover:bg-amber-950/50 border-amber-600/30 hover:border-amber-500/60 hover:scale-110 active:scale-95'
        }`}
        aria-label="Ek chai ho jaaye?"
        title="Ek chai ho jaaye?"
        disabled={phase !== 'idle'}
      >
        {/* Steam particles — more when active */}
        <div className="absolute -top-5 inset-x-0 flex justify-center gap-1 pointer-events-none">
          {Array.from({ length: steamCount }).map((_, i) => (
            <span
              key={i}
              className={`rounded-full blur-[1.5px] ${steamClasses[i]}`}
              style={{
                width: i % 2 === 0 ? '5px' : '6px',
                height: i % 2 === 0 ? '16px' : '20px',
                background: glowIntense
                  ? 'rgba(253,186,116,0.70)'
                  : 'rgba(253,186,116,0.45)',
              }}
            />
          ))}
        </div>

        {/* Warm glow aura */}
        <span
          className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
            glowIntense ? 'bg-amber-400/35' : 'bg-amber-500/10 group-hover:bg-amber-400/20'
          }`}
        />

        {/* Cup icon */}
        <CupSoda
          className={`relative z-10 w-6 h-6 transition-colors ${
            glowIntense ? 'text-amber-200' : 'text-amber-400 group-hover:text-amber-200'
          }`}
        />
      </button>
    </div>
  );
};
