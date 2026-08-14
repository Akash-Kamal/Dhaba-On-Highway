import React, { useState } from 'react';
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Megaphone,
} from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';

interface MusicControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  volume: number;
  onVolumeChange: (newVol: number) => void;
  onTogglePlaylist?: () => void;
  isPlaylistOpen?: boolean;
  onToggleShuffle?: () => void;
}

export const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  volume,
  onVolumeChange,
  onToggleShuffle,
}) => {
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(false);
  const [isHornActive, setIsHornActive] = useState<boolean>(false);

  const isMuted = volume === 0;

  const handleHornClick = () => {
    ambientSynth.playTruckHorn();
    setIsHornActive(true);
    setTimeout(() => setIsHornActive(false), 800);
  };

  const handleShuffleClick = () => {
    setIsShuffleOn((prev) => !prev);
    if (onToggleShuffle) onToggleShuffle();
  };

  return (
    <div className="flex flex-col gap-3.5 w-full select-none pt-1">
      {/* Top Action Row: Horn OK Please & Shuffle */}
      <div className="flex items-center justify-between gap-2 px-1">
        {/* Horn OK Please Button */}
        <button
          onClick={handleHornClick}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer shadow-md active:scale-95 ${
            isHornActive
              ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black border-amber-200 font-bold scale-105 shadow-amber-500/50'
              : 'bg-black/60 hover:bg-amber-950/70 text-amber-300 border-amber-500/30'
          }`}
          title="Sound the Highway Truck Horn"
          aria-label="Sound the highway truck horn"
        >
          <Megaphone className={`w-3.5 h-3.5 ${isHornActive ? 'animate-bounce text-black' : 'text-amber-400'}`} />
          <span className="font-semibold">HORN OK PLEASE</span>
        </button>

        {/* Shuffle Button */}
        <button
          onClick={handleShuffleClick}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer shadow-md active:scale-95 ${
            isShuffleOn
              ? 'bg-amber-600 text-amber-950 border-amber-300 font-bold shadow-amber-600/30'
              : 'bg-black/60 hover:bg-amber-950/70 text-amber-400/80 border-amber-500/30'
          }`}
          title={isShuffleOn ? 'Shuffle On' : 'Shuffle Off'}
          aria-label="Toggle Shuffle"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">{isShuffleOn ? 'SHUFFLE ON' : 'SHUFFLE'}</span>
        </button>
      </div>

      {/* Main Control Row */}
      <div className="flex items-center justify-between gap-3 w-full pt-1">
        {/* Playback Control Group */}
        <div className="flex items-center gap-3">
          {/* Previous */}
          <button
            id="prev-btn"
            onClick={onPrevious}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-amber-950/80 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all cursor-pointer active:scale-95 shadow-md hover:border-amber-400/60"
            aria-label="Previous track"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5 fill-current opacity-90" />
          </button>

          {/* Hero Play / Pause Button with Dual Metallic Golden Ring */}
          <button
            id="play-button"
            onClick={onPlayPause}
            className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 border-2 border-amber-200 text-amber-950 font-bold shadow-2xl hover:brightness-110 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-amber-600/40"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="absolute -inset-1.5 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
            {isPlaying ? (
              <Pause className="relative z-10 w-6 h-6 fill-amber-950 text-amber-950" />
            ) : (
              <Play className="relative z-10 w-6 h-6 fill-amber-950 text-amber-950 ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            id="next-btn"
            onClick={onNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-amber-950/80 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all cursor-pointer active:scale-95 shadow-md hover:border-amber-400/60"
            aria-label="Next track"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5 fill-current opacity-90" />
          </button>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 bg-black/60 border border-amber-500/30 px-3.5 py-2 rounded-full shadow-md">
          <button
            onClick={() => onVolumeChange(isMuted ? 80 : 0)}
            aria-label={isMuted ? 'Unmute radio' : 'Mute radio'}
            className="text-amber-400 hover:text-amber-200 cursor-pointer transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-amber-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-20 sm:w-24 accent-amber-400 bg-amber-950/80 h-1.5 rounded-lg cursor-pointer"
            aria-label="Radio Volume"
          />

          <span className="text-[10px] font-mono text-amber-400/80 w-6 text-right font-bold">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
};
