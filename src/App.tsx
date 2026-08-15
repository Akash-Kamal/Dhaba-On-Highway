import { useState, useMemo } from 'react';

import { HighwayScene } from './components/HighwayScene';
import { IntroScreen } from './components/IntroScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { ChaiInteraction } from './components/ChaiInteraction';
import { AmbientControls } from './components/AmbientControls';
import { Menu } from './components/Menu';
import { LiveHighwayHUD } from './components/LiveHighwayHUD';
import { DhabaDialogueToast } from './components/DhabaDialogueToast';
import { InteractiveDhabaScene } from './components/InteractiveDhabaScene';
import { HighwayShayariOverlay } from './components/HighwayShayariOverlay';
import { ambientSynth } from './utils/audioSynth';

export function App() {
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [ambienceVolume, setAmbienceVolume] = useState<number>(40);
  const [isAmbienceMuted, setIsAmbienceMuted] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [playlistId, _setPlaylistId] = useState<string>('custom_mytracks');

  // New Atmosphere & Interaction states
  const [weatherMode, setWeatherMode] = useState<'rain' | 'clear' | 'fog' | 'midnight'>('rain');
  const [isLightOn, setIsLightOn] = useState<boolean>(true);
  const [isCharpaiMode, setIsCharpaiMode] = useState<boolean>(false);
  const [shayariEnabled, setShayariEnabled] = useState<boolean>(true);
  const [isHindiDhaba, setIsHindiDhaba] = useState<boolean>(false);


  // Time of Day determination based on real clock
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 18 && hour < 20) return 'golden-hour';
    if (hour >= 20 && hour < 23) return 'evening';
    if (hour >= 23 || hour < 3) return 'deep-night';
    if (hour >= 3 && hour < 5) return 'cold-night';
    return 'dawn';
  }, []);

  // Handle Journey Start (from Intro screen)
  const handleStartJourney = () => {
    setIntroVisible(false);
    ambientSynth.init();
    ambientSynth.setVolume(ambienceVolume / 100);
  };

  // Toggle Ambience Mute
  const handleToggleAmbienceMute = () => {
    setIsAmbienceMuted((prev) => {
      const nextMute = !prev;
      if (nextMute) {
        ambientSynth.setVolume(0);
      } else {
        ambientSynth.setVolume(ambienceVolume / 100);
      }
      return nextMute;
    });
  };

  return (
    <div className={`relative min-h-[100svh] w-full overflow-hidden ${reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Intro Modal Overlay */}
      {introVisible && <IntroScreen onStart={handleStartJourney} />}

      {/* Ghost Minimal Top HUD Header Bar */}
      <LiveHighwayHUD
        onOpenMenu={() => setIsMenuOpen(true)}
        onToggleAmbience={handleToggleAmbienceMute}
        isAmbienceMuted={isAmbienceMuted}
      />

      {/* Rare Ambient Dhaba Toast Dialogue */}
      <DhabaDialogueToast />

      {/* Atmospheric Highway Shayari & Truck Quotes Overlay */}
      <HighwayShayariOverlay enabled={shayariEnabled} reducedMotion={reducedMotion} />

      {/* Interactive Environment Hotspot Wrapper */}
      <InteractiveDhabaScene
        isLightOn={isLightOn}
        onToggleLight={() => setIsLightOn((prev) => !prev)}
        isCharpaiMode={isCharpaiMode}
        onToggleCharpaiMode={() => setIsCharpaiMode((prev) => !prev)}
      >
        {/* Main Visual Scene */}
        <HighwayScene weatherMode={weatherMode} timeOfDay={timeOfDay}>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col justify-between p-4 sm:p-8 relative z-20 h-full min-h-[100svh]">
            {/* Top-Right Ambient Controls Widget (Offset on PC to prevent overlap with Hotspots Dock) */}
            <div className="flex justify-end items-center pt-10 sm:pt-12 sm:pr-36 md:pr-44">
              <AmbientControls
                volume={ambienceVolume}
                onVolumeChange={(vol) => {
                  setAmbienceVolume(vol);
                  if (isAmbienceMuted) setIsAmbienceMuted(false);
                }}
                isMuted={isAmbienceMuted}
                onToggleMute={handleToggleAmbienceMute}
              />
            </div>

            {/* CENTER HERO TITLE: VINTAGE TRUCK SLAB SERIF LOGO (MATCHING UPLOADED ARTWORK) */}
            <div
              className={`flex-1 flex flex-col items-center justify-center text-center px-4 z-20 my-auto py-6 transition-all duration-700 select-none ${
                isCharpaiMode ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              {/* Line 0: GOLU HIGHWAY DHABA Badge (Hindi Only) */}
              <div className="text-xs sm:text-sm font-chandra tracking-wider text-amber-400 font-bold opacity-90 mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-2">
                <span className="text-red-500">★</span>
                <span>गोलू हाईवे ढाबा</span>
                <span className="text-red-500">★</span>
              </div>


              {/* Line 1: DHABA / ढाबा (Interactive Click Toggle) */}

              <h1
                onClick={() => {
                  ambientSynth.playSwitchClick();
                  setIsHindiDhaba((prev) => !prev);
                }}
                className={`text-5xl sm:text-8xl md:text-[10rem] text-weathered-cream tracking-wider uppercase drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)] leading-none cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 select-none group ${
                  isHindiDhaba ? 'font-chandra' : 'font-truck-brand'
                }`}
                title="Click to toggle English / Hindi (DHABA ⇄ ढाबा)"
              >
                <span>{isHindiDhaba ? 'ढाबा' : 'DHABA'}</span>
              </h1>



              {/* Line 2: = ON HIGHWAY = */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 font-display text-2xl sm:text-5xl md:text-6xl text-highway-amber tracking-widest uppercase font-extrabold leading-none mt-2">
                <span className="text-red-600 font-sans tracking-tighter opacity-90 text-xl sm:text-4xl">═</span>
                <span>ON HIGHWAY</span>
                <span className="text-red-600 font-sans tracking-tighter opacity-90 text-xl sm:text-4xl">═</span>
              </div>

              {/* Line 3: Devanagari Subtitle Quote */}
              <p className="font-devanagari text-sm sm:text-2xl text-[#d4bca0] font-semibold mt-3 sm:mt-4 tracking-wide drop-shadow-md">
                रुकिए ज़रा... सफ़र अभी बाक़ी है।
              </p>

              {/* Line 4: Red Vintage Dhaba Flourish Ornament */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 text-red-600/90 opacity-90">
                <div className="h-[2px] w-8 sm:w-20 bg-gradient-to-r from-transparent via-red-600 to-red-500" />
                <span className="text-[10px] sm:text-xs">❖</span>
                <div className="h-[2px] w-8 sm:w-20 bg-gradient-to-l from-transparent via-red-600 to-red-500" />
              </div>
            </div>





            {/* Bottom Area: Centered Compact Pill Radio Player & Bottom-Left Chai Stop */}
            <div className="w-full relative flex flex-col md:flex-row items-center md:items-end justify-center gap-4 pb-4">
              {/* Interactive Cutting Chai Glass Stop */}
              <div className="md:absolute md:left-0 md:bottom-0 flex items-center gap-3">
                <ChaiInteraction />
                <div className="hidden sm:block leading-none">
                  <div className="font-display text-sm text-amber-200 uppercase tracking-wider">
                    HIGHWAY CHAI STOP
                  </div>
                  <div className="text-[10px] font-mono text-amber-500/70">
                    Tap glass for hot tea ☕
                  </div>
                </div>
              </div>

              {/* Compact Pill Music Player (Center Bottom) & Creator Attribution */}
              <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2">
                <MusicPlayer
                  playlistId={playlistId}
                  onTogglePlaylist={() => setIsPlaylistOpen((prev) => !prev)}
                  isPlaylistOpen={isPlaylistOpen}
                />

                {/* Center Bottom Attribution */}
                <div className="text-center text-xs font-mono tracking-widest text-amber-300/70 select-none pt-0.5">
                  Created & Coded by <span className="text-amber-200 font-semibold">Akash Kamal</span> ❤️
                </div>
              </div>
            </div>
          </main>

        </HighwayScene>
      </InteractiveDhabaScene>

      {/* Atmospheric Story Menu & Settings */}
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        weatherMode={weatherMode}
        onWeatherChange={(m) => setWeatherMode(m)}
        shayariEnabled={shayariEnabled}
        onToggleShayari={() => setShayariEnabled((prev) => !prev)}
      />
    </div>
  );
}

export default App;
