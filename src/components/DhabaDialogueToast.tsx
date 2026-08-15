import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const AMBIENT_DIALOGUES = [
  '“भैया दो चाय!” ☕',
  '“गाड़ी साइड में लगा देना साहब।” 🚛',
  '“रात लंबी है... गाना अच्छा लगाना।” 🎶',
  '“पराठा गरम है साहब!” 🫓',
  '“हाईवे पे सब अपने हैं।” 🛣️',
  '“रेडियो थोड़ा तेज़ कर दूँ?” 📻',
];

export const DhabaDialogueToast: React.FC = () => {
  const [dialogue, setDialogue] = useState<string | null>(null);

  useEffect(() => {
    // Show a rare ambient toast dialogue every 40-50 seconds
    const triggerRandomDialogue = () => {
      const msg = AMBIENT_DIALOGUES[Math.floor(Math.random() * AMBIENT_DIALOGUES.length)];
      setDialogue(msg);
      setTimeout(() => {
        setDialogue(null);
      }, 5000);
    };

    const firstTimer = setTimeout(triggerRandomDialogue, 20000);
    const interval = setInterval(triggerRandomDialogue, 45000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  if (!dialogue) return null;

  return (
    <div className="fixed top-28 sm:top-32 left-1/2 -translate-x-1/2 z-40 max-w-[85vw] sm:max-w-md px-4 py-2 rounded-full bg-[#1f150c]/95 border border-amber-500/50 text-amber-200 font-devanagari text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md flex items-center justify-center gap-2 animate-title-in select-none pointer-events-none text-center">
      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
      <span className="truncate">{dialogue}</span>
    </div>
  );
};
