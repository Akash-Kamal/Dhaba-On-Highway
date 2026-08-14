import React from 'react';
import { CloudRain, Volume2, VolumeX } from 'lucide-react';

import { ambientSynth } from '../utils/audioSynth';

interface AmbientControlsProps {
  volume: number; // 0-100
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AmbientControls: React.FC<AmbientControlsProps> = ({
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onVolumeChange(val);
    ambientSynth.setVolume(val / 100);
  };

  return (
    <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#0b0907]/80 backdrop-blur-md border border-amber-900/30 text-amber-300 select-none shadow-lg">
      <div className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-amber-400/90">
        <CloudRain className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span className="hidden sm:inline">AMBIENCE</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className="text-amber-400 hover:text-amber-200 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute highway rain ambience' : 'Mute highway rain ambience'}
          title={isMuted ? 'Unmute Ambience' : 'Mute Ambience'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-amber-700" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleSliderChange}
          className="w-16 sm:w-24 accent-amber-500 bg-amber-950/60 h-1.5 rounded-lg cursor-pointer"
          aria-label="Dhaba Ambience Volume"
        />

        <span className="text-[10px] font-mono text-amber-500/70 w-6 text-right">
          {isMuted ? '0%' : `${volume}%`}
        </span>
      </div>
    </div>
  );
};
