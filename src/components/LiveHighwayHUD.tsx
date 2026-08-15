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

/** Dynamic 12-hour live clock hook with real AM/PM determination */
const useLocalTime = () => {
  const [timeState, setTimeState] = useState<{ timeStr: string; ampm: string }>({
    timeStr: '11:11',
    ampm: 'PM',
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 hour should be 12
      const hoursStr = hours.toString().padStart(2, '0');
      setTimeState({ timeStr: `${hoursStr}:${minutes}`, ampm });
    };
    update();
    const id = setInterval(update, 10000); // real-time update every 10s
    return () => clearInterval(id);
  }, []);

  return timeState;
};

export const LiveHighwayHUD: React.FC<LiveHighwayHUDProps> = ({ onOpenMenu }) => {
  const count = useHighwayCounter();
  const { timeStr, ampm } = useLocalTime();

  return (
    <header className="ghost-hud absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 pointer-events-none select-none">
      {/* Left — Live Real-Time Clock (e.g. 11:11 PM) */}
      <div className="pointer-events-auto">
        <span className="text-xs font-mono text-amber-300/90 tracking-widest">
          {timeStr} <span className="text-amber-500 font-bold">{ampm}</span>
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

      {/* Right — YouTube Playlist Icon & Menu */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* YouTube Playlist Link with Hover Tooltip */}
        <div className="relative group">
          {/* Hover Tooltip Popup */}
          <div className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-lg bg-black/90 text-amber-200 text-[11px] font-mono tracking-wider border border-amber-500/40 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
            <div className="flex items-center gap-1.5">
              <span className="text-red-500 font-bold">▶</span>
              <span>Open Playlist on YouTube</span>
            </div>
            <div className="absolute bottom-full right-3 border-4 border-transparent border-b-black/90" />
          </div>

          <a
            href="https://music.youtube.com/playlist?list=PLeoMxRLGQ84w&si=EJ9xhWIEb9xLJw2T"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-red-500 hover:text-red-400 transition-all transform hover:scale-110 flex items-center justify-center rounded-full hover:bg-black/40 cursor-pointer"
            aria-label="Open YouTube Playlist"
            title="Open Playlist on YouTube"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Menu Button */}
        <button
          onClick={onOpenMenu}
          className="p-2 text-amber-300/70 hover:text-amber-100 transition-colors cursor-pointer"
          aria-label="Open menu"
          title="Menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
