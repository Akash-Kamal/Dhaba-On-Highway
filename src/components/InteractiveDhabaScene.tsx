import React, { useState, useRef } from 'react';
import { ambientSynth } from '../utils/audioSynth';
import { DhabaMenuModal } from './DhabaMenuModal';
import { BhaiyaDialogModal } from './BhaiyaDialogModal';
import { Utensils, Lightbulb, Armchair, Sparkles } from 'lucide-react';

interface InteractiveDhabaSceneProps {
  children: React.ReactNode;
  onToggleLight: () => void;
  isLightOn: boolean;
  onToggleCharpaiMode: () => void;
  isCharpaiMode: boolean;
}

// Retro Vintage Squeeze Bulb Blow Horn SVG Icon matching uploaded image
const RetroBlowHornIcon: React.FC<{ isHonking: boolean }> = ({ isHonking }) => (
  <svg
    viewBox="0 0 210 100"
    className="w-10 h-5 sm:w-13 sm:h-6.5 shrink-0 drop-shadow-md"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Red Rubber Bulb Gradient */}
      <radialGradient id="bulbGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="60%" stopColor="#cc0000" />
        <stop offset="100%" stopColor="#7a0000" />
      </radialGradient>
      {/* Brass Gold Tube Gradient */}
      <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffb703" />
        <stop offset="50%" stopColor="#fff3b0" />
        <stop offset="100%" stopColor="#fb8500" />
      </linearGradient>
      {/* Trumpet Bell Flare Gradient */}
      <linearGradient id="flareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe600" />
        <stop offset="70%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#996515" />
      </linearGradient>
    </defs>

    {/* Red Rubber Squeeze Bulb */}
    <g className={`transition-transform duration-150 origin-[35px_50px] ${isHonking ? 'scale-x-70 scale-y-115' : ''}`}>
      <circle cx="35" cy="50" r="30" fill="url(#bulbGrad)" stroke="#5e0000" strokeWidth="1.5" />
      <ellipse cx="25" cy="38" rx="9" ry="5" fill="#ffa8a8" opacity="0.65" transform="rotate(-20 25 38)" />
    </g>

    {/* Gold Collar Connector */}
    <rect x="62" y="44" width="12" height="12" rx="3" fill="#b37700" stroke="#ffd700" strokeWidth="1" />

    {/* Tapered Brass Tube */}
    <path
      d="M72 45 L150 35 C155 35 162 20 172 12 L172 88 C162 80 155 65 150 65 L72 55 Z"
      fill="url(#brassGrad)"
      stroke="#b37700"
      strokeWidth="1"
    />
    <path d="M75 47 L155 38" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />

    {/* Trumpet Mouth Flare Rim */}
    <ellipse cx="172" cy="50" rx="9" ry="38" fill="url(#flareGrad)" stroke="#fff066" strokeWidth="2" />
    <ellipse cx="172" cy="50" rx="5" ry="28" fill="#3a2000" opacity="0.95" />

    {/* Sound Waves when Honking */}
    {isHonking && (
      <g className="animate-pulse">
        <path d="M186 28 C194 38 194 62 186 72" stroke="#ffea00" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M196 18 C206 35 206 65 196 82" stroke="#ffb703" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

export const InteractiveDhabaScene: React.FC<InteractiveDhabaSceneProps> = ({
  children,
  onToggleLight,
  isLightOn,
  onToggleCharpaiMode,
  isCharpaiMode,
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isBhaiyaOpen, setIsBhaiyaOpen] = useState<boolean>(false);
  const [isHonking, setIsHonking] = useState<boolean>(false);

  const hornClickCount = useRef<number>(0);
  const chaiClickCount = useRef<number>(0);
  const lastHornTime = useRef<number>(0);

  const showToast = (msg: string, duration = 3000) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((current) => (current === msg ? null : current));
    }, duration);
  };

  // 1. Truck Horn Click Handler
  const handleTruckClick = () => {
    const now = Date.now();
    if (now - lastHornTime.current < 1800) return; // 2s cooldown
    lastHornTime.current = now;

    setIsHonking(true);
    setTimeout(() => setIsHonking(false), 900);

    hornClickCount.current += 1;
    ambientSynth.playTruckHorn();

    if (hornClickCount.current >= 5) {
      showToast('“बस साहब, हॉर्न ही बजाओगे क्या?” 🚛', 4000);
      hornClickCount.current = 0;
    } else {
      showToast('HORN OK PLEASE 🚛', 2500);
    }
  };

  // 2. Light Switch Click Handler
  const handleLightClick = () => {
    ambientSynth.playSwitchClick();
    onToggleLight();
    if (isLightOn) {
      showToast('“बिजली का बिल ज़्यादा आ गया साहब।” 💡', 3000);
    } else {
      showToast('“चलिए, रोशनी वापस।” 💡', 3000);
    }
  };

  // 3. Chai Click Handler (with Easter Egg)
  const handleOrderChai = () => {
    chaiClickCount.current += 1;
    if (chaiClickCount.current >= 3) {
      showToast('“तीसरी चाय फ्री नहीं है साहब!” ☕', 4000);
      chaiClickCount.current = 0;
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Dynamic Interaction Floating Toast (Positioned at top-28/top-32 to NEVER overlap Horn or Dock) */}
      {toastMsg && (
        <div className="fixed top-28 sm:top-32 left-1/2 -translate-x-1/2 z-50 max-w-[85vw] sm:max-w-md px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 font-devanagari text-xs sm:text-sm font-bold border border-amber-400/50 shadow-2xl animate-title-in backdrop-blur-md flex items-center justify-center gap-2 select-none pointer-events-none text-center">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      {/* Main Scene Content */}
      {children}

      {/* LEFT SIDE: RETRO VINTAGE SQUEEZE BULB TRUCK HORN BADGE (CLEAN NON-OVERLAPPING POSITIONING) */}
      <div className="fixed top-14 sm:top-16 left-3 sm:left-5 z-30 select-none origin-top-left">
        <button
          onClick={handleTruckClick}
          className={`group relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 border-2 border-yellow-200 text-neutral-950 shadow-[0_4px_22px_rgba(234,179,8,0.6)] hover:shadow-[0_6px_30px_rgba(234,179,8,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isHonking ? 'animate-bounce ring-2 ring-red-500' : ''
          }`}
          title="Click to Squeeze Vintage Blow Horn"
          aria-label="Squeeze Vintage Blow Horn"
        >
          {/* Retro Blow Horn Vector Icon */}
          <RetroBlowHornIcon isHonking={isHonking} />

          {/* Creative Truck Art Typography */}
          <div className="flex flex-col text-left leading-tight font-mono pr-0.5">
            <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-red-950 uppercase">
              HORN OK PLEASE
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold text-amber-950/80 tracking-wider">
              TAP TO SQUEEZE
            </div>
          </div>
        </button>
      </div>

      {/* RIGHT SIDE: Interactive Environment Hotspots Floating Dock */}
      <div className="fixed top-14 sm:top-16 right-3 sm:right-5 z-30 flex flex-col items-end gap-1.5 sm:gap-2 select-none scale-90 sm:scale-100 origin-top-right">

        {/* Bhaiya Waiter Hotspot */}
        <button
          onClick={() => setIsBhaiyaOpen(true)}
          className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/75 hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Call Bhaiya"
          aria-label="Call Bhaiya"
        >
          <span className="text-sm">🧑‍🍳</span>
          <span className="hidden sm:inline">BHAIYA!</span>
        </button>

        {/* Food Menu Hotspot */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/75 hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Open Dhaba Food Menu"
          aria-label="Dhaba Menu"
        >
          <Utensils className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">DHABA MENU</span>
        </button>

        {/* Charpai / Sit Mode Hotspot */}
        <button
          onClick={() => {
            onToggleCharpaiMode();
            if (!isCharpaiMode) {
              showToast('“बस 5 मिनट और...” 🪑', 3500);
            }
          }}
          className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border text-xs font-mono tracking-wider uppercase transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md ${
            isCharpaiMode
              ? 'bg-amber-500 text-black border-amber-300 font-bold'
              : 'bg-black/75 hover:bg-amber-950/80 text-amber-300 border-amber-500/40'
          }`}
          title="Sit on Charpai / Listening Mode"
          aria-label="Sit Mode"
        >
          <Armchair className="w-4 h-4" />
          <span className="hidden sm:inline">{isCharpaiMode ? 'LISTENING MODE' : 'CHARPAI'}</span>
        </button>

        {/* Dhaba Bulb Switch Hotspot */}
        <button
          onClick={handleLightClick}
          className={`p-2 rounded-full border shadow-xl transition-all hover:scale-105 cursor-pointer backdrop-blur-md ${
            isLightOn
              ? 'bg-amber-500/30 text-amber-300 border-amber-400'
              : 'bg-black/80 text-amber-700 border-amber-950'
          }`}
          title="Switch Dhaba Bulb ON/OFF"
          aria-label="Switch Bulb"
        >
          <Lightbulb className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Modals */}
      <DhabaMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <BhaiyaDialogModal
        isOpen={isBhaiyaOpen}
        onClose={() => setIsBhaiyaOpen(false)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOrderChai={handleOrderChai}
      />
    </div>
  );
};
