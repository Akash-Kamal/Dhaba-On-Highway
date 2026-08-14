import React, { useState } from 'react';
import { X, Coffee, Utensils, MapPin, Receipt } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';


interface BhaiyaDialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMenu: () => void;
  onOrderChai: () => void;
}

const DIRECTION_QUOTES = [
  '“Seedha jao saab... 47 kilometer baad ek bada flyover aayega.” 🛣️',
  '“Raat mein highway khaali milega, bas gaadi sambhal ke chalana.” 🚚',
  '“Aage thodi dhundh hai saab, dipper jalakar chalana.” 🌫️',
  '“Bas 20 kilometer aur... aage petrol pump 24 ghante khula hai.” ⛽',
];

export const BhaiyaDialogModal: React.FC<BhaiyaDialogModalProps> = ({
  isOpen,
  onClose,
  onOpenMenu,
  onOrderChai,
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'direction' | 'bill'>('main');
  const [directionText, setDirectionText] = useState<string>('');

  if (!isOpen) return null;

  const handleAskDirection = () => {
    ambientSynth.playChaiSound();
    const q = DIRECTION_QUOTES[Math.floor(Math.random() * DIRECTION_QUOTES.length)];
    setDirectionText(q);
    setActiveTab('direction');
  };

  const handleBillClick = () => {
    ambientSynth.playChaiSound();
    setActiveTab('bill');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-title-in">
      <div className="relative w-full max-w-md bg-[#1f150c] border-2 border-amber-600/40 rounded-2xl shadow-2xl p-5 text-amber-100 space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400/80 hover:text-amber-100 p-1 rounded-full hover:bg-amber-950/60 transition-colors cursor-pointer"
          aria-label="Close Bhaiya dialogue"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bhaiya Avatar Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-amber-600/30">
          <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center text-xl shrink-0 shadow-md">
            🧑‍🍳
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-wider">BHAIYA (GOLU DHABA)</div>
            <div className="text-lg font-bold font-devanagari text-amber-100">“जी साहब, क्या हुकम?”</div>
          </div>
        </div>

        {/* Main Option Buttons */}
        {activeTab === 'main' && (
          <div className="space-y-2.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onOrderChai();
              }}
              className="w-full p-3 rounded-xl bg-black/60 hover:bg-amber-950/80 border border-amber-900/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-900/40 text-amber-400 group-hover:scale-110 transition-transform">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200">☕ Chai chahiye</div>
                <div className="text-xs text-amber-400/70">Adrak, Elaichi ya Special Kulhad Chai</div>
              </div>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenMenu();
              }}
              className="w-full p-3 rounded-xl bg-black/60 hover:bg-amber-950/80 border border-amber-900/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-900/40 text-amber-400 group-hover:scale-110 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200">🍽️ Khana chahiye</div>
                <div className="text-xs text-amber-400/70">Garam Aloo Paratha, Dal Tadka & Rice</div>
              </div>
            </button>

            <button
              onClick={handleAskDirection}
              className="w-full p-3 rounded-xl bg-black/60 hover:bg-amber-950/80 border border-amber-900/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-900/40 text-amber-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200">🛣️ Raasta poochna hai</div>
                <div className="text-xs text-amber-400/70">Aage ke highway ka haal poochhiye</div>
              </div>
            </button>

            <button
              onClick={handleBillClick}
              className="w-full p-3 rounded-xl bg-black/60 hover:bg-amber-950/80 border border-amber-900/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-amber-900/40 text-amber-400 group-hover:scale-110 transition-transform">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200">💰 Bill dena</div>
                <div className="text-xs text-amber-400/70">Imaginary Dhaba bill & checkout</div>
              </div>
            </button>
          </div>
        )}

        {/* Direction Result Tab */}
        {activeTab === 'direction' && (
          <div className="py-6 text-center space-y-4">
            <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 text-amber-200 font-devanagari text-lg leading-relaxed shadow-inner">
              {directionText}
            </div>
            <button
              onClick={() => setActiveTab('main')}
              className="px-5 py-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-mono uppercase tracking-wider cursor-pointer border border-amber-600/40"
            >
              ← BACK TO BHAIYA
            </button>
          </div>
        )}

        {/* Bill Receipt Tab */}
        {activeTab === 'bill' && (
          <div className="py-4 text-center space-y-4">
            <div className="p-4 rounded-xl bg-black/70 border border-amber-500/30 text-left text-xs font-mono space-y-2">
              <div className="text-amber-400 font-bold border-b border-amber-950 pb-1">
                GOLU DHABA RECEIPT
              </div>
              <div className="flex justify-between text-amber-200">
                <span>2 × Special Dhaba Chai</span>
                <span>₹60</span>
              </div>
              <div className="flex justify-between text-amber-200">
                <span>1 × Aloo Paratha</span>
                <span>₹60</span>
              </div>
              <div className="flex justify-between font-bold text-amber-300 border-t border-amber-950 pt-1">
                <span>TOTAL</span>
                <span>₹120</span>
              </div>
              <div className="text-[10px] text-amber-500/70 text-center pt-1 font-devanagari">
                “साहब, UPI चलेगा।”
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setActiveTab('main');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
            >
              PAY IMAGINARY BILL (PAID WITH GOOD MEMORIES)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
