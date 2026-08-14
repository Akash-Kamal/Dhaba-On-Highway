import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react';

interface LiveHighwayHUDProps {
  onOpenMenu: () => void;
  onToggleAmbience: () => void;
  isAmbienceMuted: boolean;
}

/** Returns a slow-drifting "travellers on the highway" count */
const useHighwayCounter = () => {
  const [count, setCount] = useState<number>(427);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 8000);
    return () => clearInterval(id);
  }, []);
  return Math.max(380, count);
};

const useLocalTime = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const LiveHighwayHUD: React.FC<LiveHighwayHUDProps> = ({ onOpenMenu }) => {
  const count = useHighwayCounter();
  const time = useLocalTime();

  return (
    <header className="ghost-hud absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 pointer-events-none">
      {/* Left — Live time */}
      <div className="pointer-events-auto">
        <span className="text-xs font-mono text-amber-300/90 tracking-widest">
          {time} <span className="text-amber-600/60">AM</span>
        </span>
      </div>

      {/* Center — Live travellers counter */}
      <div className="flex items-center gap-1.5 pointer-events-none">
        <span
          className="w-1.5 h-1.5 rounded-full bg-amber-500"
          style={{ animation: 'pulse 2.5s ease-in-out infinite' }}
        />
        <span className="text-[11px] font-mono text-amber-300/80 tracking-widest">
          {count} ON THE HIGHWAY
        </span>
      </div>

      {/* Right — Menu */}
      <button
        onClick={onOpenMenu}
        className="pointer-events-auto p-2 text-amber-300/70 hover:text-amber-100 transition-colors cursor-pointer"
        aria-label="Open menu"
        title="Menu"
      >
        <MenuIcon className="w-5 h-5" />
      </button>
    </header>
  );
};
