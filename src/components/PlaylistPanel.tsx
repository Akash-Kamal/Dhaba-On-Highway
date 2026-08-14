import React, { useState } from 'react';
import { X, Radio, Music, Plus, Check } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist?: string;
}

interface PlaylistPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentSongTitle: string;
  playlistId: string;
  onSelectTrackIndex?: (index: number) => void;
  onUpdatePlaylistId?: (newId: string) => void;
}

// All 52 90s Bollywood Highway Bangers Track List
export const MY_TRACKS_LIST: Track[] = [
  { id: 'N0jnLZxYwYc', title: 'Mujhse Mohabbat Ka Izhaar Karta', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: '3NWMK2MRqIk', title: 'Tumsa Koi Pyaara', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: '9b0iydtDZLU', title: 'Waada Raha Sanam', artist: 'Abhijeet & Alka Yagnik' },
  { id: 'fg9G1dacXjk', title: 'Chhupana Bhi Nahin Aata', artist: 'Vinod Rathod' },
  { id: 'u0AgbGWvzdA', title: 'Jhanjharia (Male Version)', artist: 'Kumar Sanu' },
  { id: 'jE1CavSI5TQ', title: 'Husn Hai Suhana', artist: 'Abhijeet & Chandana Dixit' },
  { id: 'wYdXuNtJkPk', title: 'Jeeye To Jeeye Kaise', artist: 'Kumar Sanu, SPB & Pankaj Udhas' },
  { id: 'cBGDDBHN22U', title: 'Pehli Pehli Baar Mohabbat Ki Hai', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'oFxbBeYhLqM', title: 'Saaton Janam Main Tere', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'e-1xmmEb49I', title: 'To Chalun', artist: 'Roop Kumar Rathod' },
  { id: '7-ORLGKcnLQ', title: 'Tumhein Dekhen Meri Aankhen', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'tPNwGuu_rQ4', title: 'Tumhein Apna Banane Ki Kasam Khai Hai', artist: 'Kumar Sanu & Anuradha Paudwal' },
  { id: 'dDR4oiyjUBA', title: 'Raah Mein Unse Mulaqat', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'tRMzF4EVPHI', title: 'Tu Jo Hans Hans Ke', artist: 'Udit Narayan & Kavita Krishnamurthy' },
  { id: 'PqiddY3o3aY', title: 'Dil Kehta Hai', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'Jtg2zyS_y_c', title: 'Ae Kash Ke Hum', artist: 'Kumar Sanu' },
  { id: 'lFdSi01tpYM', title: 'Sochenge Tumhe Pyar', artist: 'Kumar Sanu' },
  { id: 'i1IsLVz6T9Q', title: 'Kumar Sanu & Sadhana Sargam Live', artist: 'Kumar Sanu & Sadhana Sargam' },
  { id: 'bga_0ziOOfQ', title: 'Woh Meri Neend Mera Chain', artist: 'Sadhana Sargam' },
  { id: 'g3ddCx2Uawo', title: 'Dil Hai Ki Manta Nahin', artist: 'Kumar Sanu & Anuradha Paudwal' },
  { id: 'QjqKXFGM3eI', title: 'Chori Chori Dil Tera', artist: 'Kumar Sanu & Sujata Goswamy' },
  { id: 'Y-o8NQ8Y36A', title: 'Is Tarah Aashiqui Ka', artist: 'Kumar Sanu' },
  { id: 'qGOTe3KmCdY', title: 'Kitna Haseen Chehra', artist: 'Kumar Sanu' },
  { id: '9f6GhUb-WdM', title: 'Dil Cheer Ke Dekh', artist: 'Kumar Sanu' },
  { id: 'E4HtYArLiwc', title: 'Pucho Zara Pucho', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'd5ZrSe1eDDU', title: 'Woh Ladki Bahut Yaad Aati Hai (Lo Fi Remix)', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: '1jjDs69WWUQ', title: 'Lal Dupatta', artist: 'Udit Narayan & Alka Yagnik' },
  { id: 'PlN6oP-Nlno', title: 'Sona Kitna Sona Hai', artist: 'Udit Narayan & Poornima' },
  { id: 'SF_cCyz6QQg', title: 'Humko Deewana Kar Gaye', artist: 'Sonu Nigam & Tulsi Kumar' },
  { id: '_YjSmLlmqLM', title: 'Aisi Deewangi', artist: 'Vinod Rathod & Alka Yagnik' },
  { id: 'eVnG_Rqfgg4', title: 'Neele Neele Ambar Par', artist: 'Kishore Kumar' },
  { id: 'mW4WRtL6GxM', title: 'Is Pyar Se Meri Taraf Na Dekho', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'uIOrAkrjwp4', title: 'Hum Yaar Hai Tumhare', artist: 'Udit Narayan & Alka Yagnik' },
  { id: '5y_TCKNzAMI', title: 'Tumse Milne Ko Dil Karta Hai', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'cBwl6qKrZd0', title: 'Ab Tere Dil Mein To', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'BaAoZA0fup0', title: 'Dil Ka Aalam', artist: 'Kumar Sanu' },
  { id: 'nNhv8A_rJTg', title: 'Oye Raju Pyar Na Kariyo', artist: 'Kumar Sanu' },
  { id: 's1NLjpj3aP4', title: 'Jaa Bewafa Jaa', artist: 'Altaf Raja' },
  { id: 'u4NSsEIny1c', title: 'Muje Pine Ka Shauk Nahi', artist: 'Shabbir Kumar & Lata Mangeshkar' },
  { id: 'RjJxWRFfG3s', title: 'Nahin Yeh Ho Nahin Sakta', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'rrzSZ0NMID4', title: 'Barsaat Ke Mausam Mein', artist: 'Kumar Sanu & Roop Kumar Rathod' },
  { id: '1ziaNhD9xqE', title: 'Meri Mehbooba', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'UCsW7nea7sI', title: 'Ae Mere Humsafar', artist: 'Vinod Rathod & Alka Yagnik' },
  { id: '5dWbn_qER3s', title: 'Tere Dar Par Sanam', artist: 'Kumar Sanu' },
  { id: 'HIr_kpG4Fnc', title: 'Tumse Milne Ki Tamanna Hai', artist: 'SP Balasubrahmanyam' },
  { id: 'XR7qvTgQ19o', title: 'Taaron Ka Chamakta', artist: 'Udit Narayan & Bali Brahmbhatt' },
  { id: 'jEL02Nz7Dds', title: 'Dono Hi Mohabbat Ke', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'mocKoIhNJxk', title: 'Ding Dong Dole', artist: 'Babul Supriyo & Alka Yagnik' },
  { id: 'Tx7YCSTJC6I', title: 'Dheere Dheere Tere Bina', artist: 'Kumar Sanu & Alka Yagnik' },
  { id: 'jD3SGW0NHY0', title: "Kumar Sanu 90's Hits", artist: 'Kumar Sanu' },
  { id: '0A2ue4lNMzo', title: 'Wafa Na Raas Aayee Tujhe O Harjaee', artist: 'Nitin Mukesh' },
  { id: 's4slgbuwOfw', title: 'O Dil Tod Ke Hansti Ho Mera Remix', artist: 'Udit Narayan' },
];

const extractPlaylistId = (input: string): string => {
  const trimmed = input.trim();
  if (trimmed.includes('list=')) {
    try {
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      const listParam = urlObj.searchParams.get('list');
      if (listParam) return listParam;
    } catch (e) {
      const match = trimmed.match(/list=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) return match[1];
    }
  }
  return trimmed;
};

export const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  isOpen,
  onClose,
  currentSongTitle,
  playlistId: _playlistId,
  onSelectTrackIndex,
  onUpdatePlaylistId,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = extractPlaylistId(customInput);
    if (cleanId && onUpdatePlaylistId) {
      onUpdatePlaylistId(cleanId);
      setCustomInput('');
      setShowInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div
        className="w-full sm:w-96 max-h-[85vh] sm:max-h-[80vh] flex flex-col bg-[#0b0907] border-t sm:border border-amber-900/40 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden select-none radio-glow"
        role="dialog"
        aria-label="Dhaba Radio Playlist Station"
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-amber-900/30 flex items-center justify-between bg-gradient-to-r from-amber-950/80 to-[#050505]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-500 animate-pulse" />
            <div>
              <h2 className="font-display text-lg tracking-wider text-amber-200 uppercase">
                90s HIGHWAY BANGERS ({MY_TRACKS_LIST.length} TRACKS)
              </h2>
              <p className="text-[10px] text-amber-500/70 font-mono">
                PUBLIC / TRACKS.JSON QUEUE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-900/40 text-amber-400/80 hover:text-amber-200 transition-colors cursor-pointer"
            aria-label="Close playlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Playlist Form Trigger */}
        <div className="p-3 bg-black/40 border-b border-amber-950/50">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/30 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>LOAD CUSTOM YOUTUBE PLAYLIST ID / LINK</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Paste YouTube Playlist Link or ID"
                className="flex-1 px-3 py-1.5 rounded bg-black/80 border border-amber-800/40 text-amber-200 text-xs font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Track List Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-amber-950/30">
          {MY_TRACKS_LIST.map((track, idx) => {
            const isActive =
              currentSongTitle.toLowerCase().includes(track.title.toLowerCase().slice(0, 10)) ||
              (idx === 0 && currentSongTitle.includes('Mujhse Mohabbat'));

            return (
              <div
                key={track.id}
                onClick={() => onSelectTrackIndex && onSelectTrackIndex(idx)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-950/60 border border-amber-700/50 text-amber-100 shadow-md'
                    : 'hover:bg-amber-950/30 text-amber-400/80 hover:text-amber-200 border border-transparent'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-black/50 text-amber-600 border border-amber-900/30'
                  }`}
                >
                  {isActive ? <Music className="w-3.5 h-3.5 animate-bounce" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate font-sans">
                    {track.title}
                  </div>
                  {track.artist && (
                    <div className="text-xs text-amber-500/70 truncate font-mono">
                      {track.artist}
                    </div>
                  )}
                </div>

                {isActive && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-900/50 text-amber-300 border border-amber-700/40 animate-pulse shrink-0">
                    ON AIR
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-amber-900/30 bg-[#050505] text-[11px] text-amber-500/60 font-mono text-center">
          ● {MY_TRACKS_LIST.length} TRACKS LOADED FROM TRACKS.JSON
        </div>
      </div>
    </div>
  );
};
