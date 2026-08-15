import React, { useState, useEffect } from 'react';
import { Volume2, Music, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const [step, setStep] = useState<number>(0);
  const [fadingOut, setFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Reveal line 1 after 300ms
    const timer1 = setTimeout(() => setStep(1), 300);
    // Reveal line 2 after 1400ms
    const timer2 = setTimeout(() => setStep(2), 1400);
    // Reveal button after 2300ms
    const timer3 = setTimeout(() => setStep(3), 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    setFadingOut(true);
    setTimeout(() => {
      onStart();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-700 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Cinematic Intro"
    >
      {/* Dark Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-lg px-6 text-center space-y-6 flex flex-col items-center justify-center">
        {/* Subtle Dhaba Stamp */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/30 text-amber-400/80 text-xs tracking-widest font-mono uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
          <span>LATE NIGHT HIGHWAY RADIO</span>
        </div>

        {/* Tight Headings Alignment (Balanced spacing) */}
        <div className="space-y-2 flex flex-col justify-center items-center">
          <h1
            className={`font-display text-3xl sm:text-5xl text-amber-100 tracking-wider leading-tight transition-all duration-700 transform ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            THE ROAD IS LONG.
          </h1>

          <p
            className={`font-devanagari text-xl sm:text-2xl text-amber-400/90 font-medium tracking-wide transition-all duration-700 delay-100 transform ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            TAKE A CHAI BREAK.
          </p>
        </div>

        {/* Action Button & Subtext */}
        <div
          className={`space-y-3 flex flex-col items-center transition-all duration-700 transform ${
            step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <button
            id="start-journey-btn"
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-amber-950 font-bold tracking-widest text-xs sm:text-sm uppercase shadow-2xl hover:brightness-115 transition-all transform hover:scale-105 active:scale-95 border border-amber-400/40 cursor-pointer"
            aria-label="Start the journey"
          >
            <span className="absolute -inset-1 rounded-full bg-amber-500/20 blur-md group-hover:bg-amber-400/40 transition-all" />
            <Music className="relative z-10 w-4 h-4 text-amber-950" />
            <span className="relative z-10">START THE JOURNEY</span>
            <Volume2 className="relative z-10 w-4 h-4 text-amber-950 opacity-80" />
          </button>
          
          <p className="text-[11px] sm:text-xs text-amber-300/60 font-mono tracking-wider">
            ● 1:30 AM • Highway Atmosphere & Radio Soundscape
          </p>
        </div>

        {/* Created & Coded by Akash Kamal */}
        <div className="pt-4 text-xs font-mono tracking-widest text-amber-300/70 select-none">
          Created & Coded by <span className="text-amber-200 font-semibold">Akash Kamal</span> ❤️
        </div>
      </div>
    </div>
  );
};
