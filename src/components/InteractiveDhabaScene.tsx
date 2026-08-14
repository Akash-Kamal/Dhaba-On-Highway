import React, { useState, useRef } from 'react';
import { ambientSynth } from '../utils/audioSynth';
import { DhabaMenuModal } from './DhabaMenuModal';
import { BhaiyaDialogModal } from './BhaiyaDialogModal';
import { Truck, Utensils, Lightbulb, Armchair, Sparkles } from 'lucide-react';

interface InteractiveDhabaSceneProps {
  children: React.ReactNode;
  onToggleLight: () => void;
  isLightOn: boolean;
  onToggleCharpaiMode: () => void;
  isCharpaiMode: boolean;
}

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
      {/* Dynamic Interaction Floating Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 font-devanagari text-sm font-bold border border-amber-400/50 shadow-2xl animate-title-in backdrop-blur-md flex items-center gap-2 select-none">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Scene Content */}
      {children}

      {/* Interactive Environment Hotspots Floating Dock — Positioned in Top-Right quadrant under HUD to NEVER overlay player */}
      <div className="fixed top-24 sm:top-28 right-3 sm:right-6 z-30 flex flex-col items-end gap-1.5 sm:gap-2 select-none scale-90 sm:scale-100 origin-top-right">
        {/* Truck Horn Hotspot */}
        <button
          onClick={handleTruckClick}
          className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/75 hover:bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase transition-all shadow-xl hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Click to Honk Truck Horn"
          aria-label="Honk Truck Horn"
        >
          <Truck className="w-4 h-4 text-amber-400 group-hover:animate-bounce" />
          <span className="hidden sm:inline">TRUCK HORN</span>
        </button>

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
