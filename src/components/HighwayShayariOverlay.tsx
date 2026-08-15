import React, { useState, useEffect, useRef } from 'react';
import { HIGHWAY_SHAYARI_LIST } from '../data/highwayShayari';
import type { ShayariItem } from '../data/highwayShayari';

interface HighwayShayariOverlayProps {
  enabled: boolean;
  reducedMotion: boolean;
}

// Positions designed to strictly clear the top title logo ("DHABA ON HIGHWAY") and bottom player bar on mobile & desktop
const CLEAR_POSITIONS = [
  'bottom-[24%] left-[3%] sm:top-[16%] sm:left-[8%]',
  'bottom-[24%] right-[3%] sm:top-[16%] sm:right-[8%]',
  'bottom-[36%] left-[3%] sm:bottom-[32%] sm:left-[8%]',
  'bottom-[36%] right-[3%] sm:bottom-[32%] sm:right-[8%]',
];


export const HighwayShayariOverlay: React.FC<HighwayShayariOverlayProps> = ({
  enabled,
  reducedMotion: _reducedMotion,
}) => {
  const [activeItem, setActiveItem] = useState<ShayariItem | null>(null);
  const [positionClass, setPositionClass] = useState<string>(CLEAR_POSITIONS[0]);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [rotationDeg, setRotationDeg] = useState<number>(0);

  const poolRef = useRef<ShayariItem[]>([]);
  const lastIndexRef = useRef<number>(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shuffle helper
  const shufflePool = () => {
    const arr = [...HIGHWAY_SHAYARI_LIST];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    poolRef.current = arr;
  };

  const getNextQuote = (): ShayariItem => {
    if (poolRef.current.length === 0) {
      shufflePool();
    }
    return poolRef.current.pop() || HIGHWAY_SHAYARI_LIST[0];
  };

  useEffect(() => {
    if (!enabled) {
      setActiveItem(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    shufflePool();

    const triggerQuote = () => {
      const nextQuote = getNextQuote();

      // Pick random clear position
      let posIdx = Math.floor(Math.random() * CLEAR_POSITIONS.length);
      if (posIdx === lastIndexRef.current) {
        posIdx = (posIdx + 1) % CLEAR_POSITIONS.length;
      }
      lastIndexRef.current = posIdx;

      setPositionClass(CLEAR_POSITIONS[posIdx]);
      setRotationDeg(nextQuote.isTruckStyle ? Math.random() * 2 - 1 : 0);
      setActiveItem(nextQuote);
      setIsEntering(true);

      // Visible duration (6.5 seconds)
      setTimeout(() => {
        setIsEntering(false);
        // Fade out transition (1 second)
        setTimeout(() => {
          setActiveItem(null);

          // Trigger next quote in 2.5s -> Total cycle = ~10s!
          timerRef.current = setTimeout(triggerQuote, 2500);
        }, 1000);
      }, 6500);
    };

    // First quote triggers in 3 seconds
    const initialTimer = setTimeout(triggerQuote, 3000);
    timerRef.current = initialTimer;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled]);

  if (!enabled || !activeItem) return null;

  return (
    <div
      className={`fixed z-30 max-w-[170px] sm:max-w-sm select-none transition-all duration-1000 group cursor-default ${positionClass} ${
        isEntering
          ? 'opacity-95 translate-y-0 filter-none'
          : 'opacity-0 translate-y-3 blur-sm pointer-events-none'
      }`}
      style={{
        transform: rotationDeg !== 0 ? `rotate(${rotationDeg}deg)` : undefined,
      }}
    >
      {/* Hand-painted text directly on atmospheric background with strong drop shadow */}
      <div className="flex flex-col gap-0.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
        {/* Optional Truck Badge Header */}
        {activeItem.specialBadge && (
          <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-mono text-amber-400 font-bold tracking-widest uppercase opacity-90">
            <span>🚛</span>
            <span className="truncate">{activeItem.specialBadge}</span>
          </div>
        )}

        {/* Hand-painted Shayari Text (Compact text-xs/text-sm on mobile) */}
        <p className="font-devanagari text-xs sm:text-2xl font-bold text-amber-100/95 leading-snug sm:leading-relaxed tracking-wide drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
          &ldquo;{activeItem.text}&rdquo;
        </p>

        {/* Hover Stamp */}
        <div className="text-[9px] sm:text-[10px] font-mono text-amber-400/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          — HIGHWAY THOUGHT
        </div>
      </div>
    </div>
  );
};
