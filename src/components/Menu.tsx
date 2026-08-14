import React from 'react';
import { X, Sparkles, Eye, ShieldCheck, CloudRain, Sun, CloudFog, Moon } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';


interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  weatherMode: 'rain' | 'clear' | 'fog' | 'midnight';
  onWeatherChange: (mode: 'rain' | 'clear' | 'fog' | 'midnight') => void;
  shayariEnabled: boolean;
  onToggleShayari: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  reducedMotion,
  onToggleReducedMotion,
  weatherMode,
  onWeatherChange,
  shayariEnabled,
  onToggleShayari,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl transition-opacity select-none">
      <div
        className="relative w-full max-w-lg bg-[#0b0907] border border-amber-800/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-amber-100/90 overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-label="Dhaba Menu and Experience Settings"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-amber-900/40 text-amber-400/80 hover:text-amber-100 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NIGHT HIGHWAY ATMOSPHERE</span>
          </div>
          <h2 className="font-display text-3xl text-amber-100 tracking-wider uppercase gold-text-gradient leading-none">
            DHABA ON HIGHWAY
          </h2>
          <p className="font-devanagari text-amber-400/80 text-sm">
            गोलू हाईवे ढाबा — चाय, गाना और सुकून
          </p>
        </div>

        {/* Weather Mode Selector */}
        <div className="space-y-3 pt-2 border-t border-amber-900/30">
          <h3 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-amber-400" />
            <span>WEATHER ATMOSPHERE</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'rain', label: 'RAIN', icon: CloudRain },
              { id: 'fog', label: 'FOG', icon: CloudFog },
              { id: 'clear', label: 'CLEAR', icon: Sun },
              { id: 'midnight', label: 'MIDNIGHT', icon: Moon },
            ].map((w) => {
              const Icon = w.icon;
              const active = weatherMode === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    ambientSynth.playSwitchClick();
                    onWeatherChange(w.id as any);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-mono tracking-wider flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-600 text-black border-amber-300 font-bold shadow-lg'
                      : 'bg-black/50 hover:bg-amber-950/60 text-amber-300 border-amber-900/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{w.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferences / Settings */}
        <div className="space-y-3 pt-2 border-t border-amber-900/30">
          <h3 className="font-mono text-xs text-amber-500 uppercase tracking-wider font-semibold">
            EXPERIENCE SETTINGS
          </h3>

          {/* Highway Shayari Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-amber-950/60">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-sm font-medium text-amber-200">Highway Shayari & Sayings</div>
                <div className="text-xs text-amber-500/70">Truck painting quotes & roadside thoughts</div>
              </div>
            </div>
            <button
              onClick={onToggleShayari}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                shayariEnabled
                  ? 'bg-amber-600 text-black font-bold'
                  : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
              }`}
            >
              {shayariEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-amber-950/60">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-sm font-medium text-amber-200">Reduced Motion</div>
                <div className="text-xs text-amber-500/70">Disable truck movement & heavy rain</div>
              </div>
            </div>
            <button
              onClick={onToggleReducedMotion}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                reducedMotion
                  ? 'bg-amber-600 text-black font-bold'
                  : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
              }`}
            >
              {reducedMotion ? 'ENABLED' : 'OFF'}
            </button>
          </div>
        </div>


        {/* Story Atmosphere Quote */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/30 space-y-2 italic text-amber-200/90 text-xs font-sans leading-relaxed">
          <p>
            &ldquo;1:30 AM. Rain on the highway. Trucks passing. Warm dhaba lights. A glass of cutting chai. An old Bollywood song playing on the radio. You are alone, but the highway is still alive.&rdquo;
          </p>
        </div>

        {/* Technical Information */}
        <div className="space-y-1 text-xs font-mono text-amber-500/60 pt-2 border-t border-amber-900/30">
          <div className="flex items-center gap-1.5 text-amber-400/80">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL YOUTUBE IFRAME API INTEGRATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
