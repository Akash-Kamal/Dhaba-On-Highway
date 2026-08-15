import React, { useState } from 'react';
import { X, Sparkles, Eye, ShieldCheck, CloudRain, Sun, CloudFog, Moon, HelpCircle, Info, ChevronDown } from 'lucide-react';
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqData = [
    {
      q: 'What is Dhaba On Highway?',
      a: 'Dhaba On Highway is a digital nostalgia experience inspired by Indian highway culture — decorated trucks, roadside dhabas, chai, night drives, and the songs that became part of those journeys.',
    },
    {
      q: 'What songs are on Dhaba On Highway?',
      a: 'The playlist features a collection of nostalgic Bollywood, Punjabi, and Bhojpuri tracks, bringing together familiar voices and songs associated with classic Indian road-trip culture.\n\nThe complete tracklist is available in the Dhaba On Highway player.',
    },
    {
      q: 'Who created Dhaba On Highway?',
      a: 'Dhaba On Highway was created and coded by Akash Kamal.\n\nThe concept is an original digital experience built around the nostalgia of Indian highways, dhabas, trucks, music, and long-distance journeys.',
    },
    {
      q: 'Is there an app, login, or cost?',
      a: 'No. There is no login, no subscription, no paywall, and no app required.\n\nJust open the website, press play, and enjoy the journey.',
    },
    {
      q: 'Where does the audio come from?',
      a: 'The music is played through embedded YouTube videos.\n\nDhaba On Highway does not host, upload, or stream the audio files itself.\n\nThe website acts as a visual and interactive interface for playing the selected YouTube content.',
    },
    {
      q: 'Who made Dhaba On Highway?',
      a: 'Created & Coded by Akash Kamal.\n\nDhaba On Highway is built as a tribute to the feeling of travelling through India at night — one song, one highway, and one dhaba at a time.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl transition-opacity select-none">
      <div
        className="relative w-full max-w-xl bg-[#0b0907] border border-amber-800/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-amber-100/90 overflow-y-auto max-h-[90vh] custom-scrollbar"
        role="dialog"
        aria-label="Dhaba Menu, About & FAQ Settings"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-amber-900/40 text-amber-400/80 hover:text-amber-100 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Header */}
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

        {/* ── ABOUT DHABA ON HIGHWAY SECTION ── */}
        <div className="space-y-3 pt-3 border-t border-amber-900/40">
          <h3 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            <span>ABOUT DHABA ON HIGHWAY</span>
          </h3>

          <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-900/35 space-y-3 text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
            <p>
              <strong>Dhaba On Highway</strong> is a nostalgic highway music experience created around the feeling of late-night Indian road journeys — the sound of an old car stereo, colourful trucks passing by, roadside dhabas, chai, and the timeless songs that made every highway drive feel like a story.
            </p>
            <p>
              Press play on the <strong>Dhaba On Highway</strong> player and let the journey begin.
            </p>
            <p>
              The playlist brings together classic <strong>Bollywood, Punjabi, and Bhojpuri songs</strong>, with a strong nostalgic flavour inspired by the music heard on Indian highways and at roadside dhabas.
            </p>
            <p>
              It is made for long drives, lonely roads, chai breaks, and anyone who misses that old-school Indian highway atmosphere.
            </p>
            <p className="text-amber-400/80 text-xs font-mono pt-1 border-t border-amber-900/20">
              Every track is played through <strong>YouTube's embedded player</strong>. Dhaba On Highway does <strong>not host or store the audio files itself</strong>.
            </p>
            <div className="pt-1 font-mono text-xs text-amber-300 font-bold">
              Created & Coded by Akash Kamal.
            </div>
          </div>
        </div>

        {/* ── FAQ SECTION (EXPANDABLE ACCORDION) ── */}
        <div className="space-y-3 pt-3 border-t border-amber-900/40">
          <h3 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>FREQUENTLY ASKED QUESTIONS (FAQ)</span>
          </h3>

          <div className="space-y-2">
            {faqData.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-black/40 border border-amber-900/30 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => {
                      ambientSynth.playSwitchClick();
                      setOpenFaqIndex(isOpen ? null : idx);
                    }}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-amber-200 hover:text-amber-100 hover:bg-amber-950/30 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-xs sm:text-sm font-sans tracking-wide">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-300' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-amber-900/20 text-xs sm:text-sm text-amber-300/80 leading-relaxed font-sans whitespace-pre-line animate-title-in">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather Mode Selector */}
        <div className="space-y-3 pt-3 border-t border-amber-900/40">
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
        <div className="space-y-3 pt-3 border-t border-amber-900/40">
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

        {/* Technical & Copyright Information */}
        <div className="space-y-1 text-xs font-mono text-amber-500/60 pt-3 border-t border-amber-900/40">
          <div className="flex items-center gap-1.5 text-amber-400/80">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL YOUTUBE IFRAME API INTEGRATION</span>
          </div>
          <div className="text-[11px] text-amber-500/70 pt-0.5">
            Created & Coded by Akash Kamal.
          </div>
        </div>
      </div>
    </div>
  );
};
