import React, { useEffect, useRef, useState } from 'react';
import { YouTubePlayer } from './YouTubePlayer';
import type { YTPlayer } from '../types/youtube';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Megaphone,
  Disc,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';

interface MusicPlayerProps {
  playlistId?: string;
  onTogglePlaylist?: () => void;
  isPlaylistOpen?: boolean;
  onUpdatePlaylistId?: (id: string) => void;
}

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlistId }) => {
  const playerRef = useRef<YTPlayer | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(false);
  const [isHornActive, setIsHornActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  const [songInfo, setSongInfo] = useState<{ title: string; author: string; id: string }>({
    title: 'Ab Tere Dil Mein To',
    author: 'Kumar Sanu & Alka Yagnik',
    id: '2V56f0xBNsw',
  });

  // Track playback time
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        try {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          if (dur > 0) setDuration(dur);
        } catch (e) {}
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    const p = playerRef.current;
    if (!p) return;

    try {
      p.unMute();
      p.setVolume(volume || 80);

      const currentState = p.getPlayerState ? p.getPlayerState() : -1;
      const ytPlaying = window.YT?.PlayerState?.PLAYING ?? 1;

      if (currentState === ytPlaying) {
        p.pauseVideo();
        setIsPlaying(false);
      } else {
        p.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn('PlayPause error:', e);
    }
  };

  const handleNext = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.unMute();
      p.setVolume(volume || 80);
      p.nextVideo();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Next error:', e);
    }
  };

  const handlePrevious = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.unMute();
      p.setVolume(volume || 80);
      p.previousVideo();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Previous error:', e);
    }
  };

  const handleHornClick = () => {
    ambientSynth.playTruckHorn();
    setIsHornActive(true);
    setTimeout(() => setIsHornActive(false), 800);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    if (!p || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = pct * duration;
    try {
      p.seekTo(targetTime, true);
      setCurrentTime(targetTime);
    } catch (err) {}
  };

  const handleVolumeToggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (isMuted) {
      p.unMute();
      setIsMuted(false);
    } else {
      p.mute();
      setIsMuted(true);
    }
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto select-none px-2 sm:px-0">
      {/* Hidden YouTube Engine */}
      <YouTubePlayer
        playlistId={playlistId}
        volume={volume}
        isPlaying={isPlaying}
        onStateChange={(state) => {
          const ytStates = window.YT?.PlayerState;
          if (ytStates) {
            if (state === ytStates.PLAYING) setIsPlaying(true);
            if (state === ytStates.PAUSED || state === ytStates.ENDED) setIsPlaying(false);
          }
        }}
        onSongChange={(data) => setSongInfo(data)}
        onPlayerReady={(p) => {
          playerRef.current = p;
        }}
        onError={() => {}}
      />

      {/* Modern Compact Pill Capsule Player Container (Matching Uploaded Image) */}
      <div className="relative w-full rounded-full glass-pill-premium p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-3 sm:gap-4 radio-glow overflow-hidden">
        
        {/* Glass Glare Top Highlight Streak */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Left Section: Spinning Album Art Disc */}
        <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/40 shadow-lg flex items-center justify-center bg-black">
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-950 via-neutral-900 to-black ${
              isPlaying ? 'animate-[spin_5s_linear_infinite]' : ''
            }`}
          >
            <Disc className="w-7 h-7 text-amber-300/90" />
          </div>
          <span className="absolute w-2 h-2 rounded-full bg-white shadow-sm" />
        </div>

        {/* Center Section: Track Info, Progress Bar & Live Time */}
        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1">
          {/* Song Title & Artist */}
          <div className="flex flex-col leading-tight min-w-0">
            <div className="text-sm sm:text-base font-bold text-white truncate drop-shadow-sm">
              {songInfo.title || 'Ab Tere Dil Mein To'}
            </div>
            <div className="text-xs text-white/70 truncate font-sans">
              {songInfo.author || 'Kumar Sanu & Alka Yagnik'}
            </div>
          </div>

          {/* Interactive Progress Bar Slider */}
          <div
            onClick={handleSeek}
            className="w-full h-1 bg-white/25 rounded-full overflow-hidden relative cursor-pointer group py-0.5"
            title="Seek track position"
          >
            <div
              className="bg-white h-full rounded-full transition-all duration-300 group-hover:bg-amber-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Time Display (3:41 / 8:25 style) */}
          <div className="text-[11px] font-mono text-white/80 font-medium">
            {formatTime(currentTime)} / {formatTime(duration || 325)}
          </div>
        </div>

        {/* Right Section: Inline Controls (Shuffle, Prev, Hero Play/Pause, Next, Horn) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Shuffle Button */}
          <button
            onClick={() => setIsShuffleOn((prev) => !prev)}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full hidden xs:flex items-center justify-center transition-all cursor-pointer ${
              isShuffleOn
                ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            }`}
            title="Shuffle"
            aria-label="Toggle Shuffle"
          >
            <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Previous Button */}
          <button
            id="prev-btn"
            onClick={handlePrevious}
            className="p-1 sm:p-2 text-white/90 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Previous Track"
            aria-label="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
          </button>

          {/* Hero Circular White Play / Pause Button */}
          <button
            id="play-button"
            onClick={handlePlayPause}
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_22px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold shrink-0 border border-white/90"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black ml-0.5" />
            )}
          </button>

          {/* Next Button */}
          <button
            id="next-btn"
            onClick={handleNext}
            className="p-1 sm:p-2 text-white/90 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Next Track"
            aria-label="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
          </button>

          {/* Horn OK Please Airhorn Trigger Button */}
          <button
            onClick={handleHornClick}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isHornActive
                ? 'bg-amber-400 text-black font-bold scale-110'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            }`}
            title="Horn OK Please"
            aria-label="Sound Horn"
          >
            <Megaphone className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHornActive ? 'animate-bounce' : ''}`} />
          </button>

          {/* Volume Control Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowVolumeSlider((prev) => !prev);
                handleVolumeToggle();
              }}
              className="p-1 sm:p-2 text-white/90 hover:text-white transition-all cursor-pointer"
              title="Volume"
              aria-label="Volume"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              )}
            </button>

            {/* Quick Popover Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-12 right-0 bg-black/90 border border-white/20 p-2 rounded-lg shadow-xl flex items-center gap-2 z-50">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const newV = Number(e.target.value);
                    setVolume(newV);
                    if (playerRef.current) playerRef.current.setVolume(newV);
                  }}
                  className="w-20 accent-white"
                />
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};
