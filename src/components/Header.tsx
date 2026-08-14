import React from 'react';
import { Menu as MenuIcon, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LiveTime } from './LiveTime';
import { LiveCounter } from './LiveCounter';

interface HeaderProps {
  onToggleMenu: () => void;
  onToggleAmbience: () => void;
  isAmbienceMuted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMenu,
  onToggleAmbience,
  isAmbienceMuted,
}) => {
  return (
    <header className="w-full px-4 sm:px-8 py-3 flex items-center justify-between bg-gradient-to-b from-[#050505]/90 via-[#0b0907]/60 to-transparent backdrop-blur-sm border-b border-amber-950/20 z-30 select-none">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-800 to-amber-950 flex items-center justify-center border border-amber-600/40 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div className="leading-none">
          <div className="font-display text-xl sm:text-2xl text-amber-100 tracking-widest uppercase">
            DHABA
          </div>
          <div className="font-sans text-[10px] sm:text-xs text-amber-500/90 tracking-wider uppercase font-semibold">
            ON HIGHWAY
          </div>
        </div>
      </div>

      {/* CENTER: Live Highway Counter (Hidden on mobile) */}
      <div className="hidden md:block">
        <LiveCounter />
      </div>

      {/* RIGHT: Time + Ambience Toggle + Hamburger Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Clock */}
        <LiveTime />

        {/* Ambience Mute Quick Toggle */}
        <button
          onClick={onToggleAmbience}
          className="p-2 rounded-lg bg-black/40 hover:bg-amber-950/50 border border-amber-900/30 text-amber-300 transition-colors cursor-pointer"
          title={isAmbienceMuted ? 'Unmute Dhaba Ambience' : 'Mute Dhaba Ambience'}
          aria-label={isAmbienceMuted ? 'Unmute Dhaba Ambience' : 'Mute Dhaba Ambience'}
        >
          {isAmbienceMuted ? (
            <VolumeX className="w-4 h-4 text-amber-500/60" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          )}
        </button>

        {/* Menu Button */}
        <button
          onClick={onToggleMenu}
          className="p-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/40 text-amber-200 transition-all cursor-pointer active:scale-95"
          aria-label="Open menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
