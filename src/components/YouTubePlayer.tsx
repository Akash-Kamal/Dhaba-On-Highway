import React, { useEffect, useRef } from 'react';
import type { YTPlayer } from '../types/youtube';

interface YouTubePlayerProps {
  playlistId?: string;
  volume: number; // 0-100
  isPlaying: boolean;
  onStateChange: (state: number) => void;
  onSongChange: (songInfo: { title: string; author: string; id: string }) => void;
  onPlayerReady: (player: YTPlayer) => void;
  onError: () => void;
}

// Full 52 90s Bollywood Highway Bangers Track List (myTracks)
export const MY_TRACKS = [
  'N0jnLZxYwYc', // Mujhse Mohabbat Ka Izhaar Karta
  '3NWMK2MRqIk', // Tumsa Koi Pyaara
  '9b0iydtDZLU', // Waada Raha Sanam
  'fg9G1dacXjk', // Chhupana Bhi Nahin Aata
  'u0AgbGWvzdA', // Jhanjharia (Male Version)
  'jE1CavSI5TQ', // Husn Hai Suhana
  'wYdXuNtJkPk', // Jeeye To Jeeye Kaise
  'cBGDDBHN22U', // Pehli Pehli Baar Mohabbat Ki Hai
  'oFxbBeYhLqM', // Saaton Janam Main Tere
  'e-1xmmEb49I', // To Chalun
  '7-ORLGKcnLQ', // Tumhein Dekhen Meri Aankhen
  'tPNwGuu_rQ4', // Tumhein Apna Banane Ki Kasam Khai Hai
  'dDR4oiyjUBA', // Raah Mein Unse Mulaqat
  'tRMzF4EVPHI', // Tu Jo Hans Hans Ke
  'PqiddY3o3aY', // Dil Kehta Hai
  'Jtg2zyS_y_c', // Ae Kash Ke Hum
  'lFdSi01tpYM', // Sochenge Tumhe Pyar
  'i1IsLVz6T9Q', // Kumar Sanu & Sadhana Sargam Live
  'bga_0ziOOfQ', // Woh Meri Neend Mera Chain
  'g3ddCx2Uawo', // Dil Hai Ki Manta Nahin
  'QjqKXFGM3eI', // Chori Chori Dil Tera
  'Y-o8NQ8Y36A', // Is Tarah Aashiqui Ka
  'qGOTe3KmCdY', // Kitna Haseen Chehra
  '9f6GhUb-WdM', // Dil Cheer Ke Dekh
  'E4HtYArLiwc', // Pucho Zara Pucho
  'd5ZrSe1eDDU', // Woh Ladki Bahut Yaad Aati Hai
  '1jjDs69WWUQ', // Lal Dupatta
  'PlN6oP-Nlno', // Sona Kitna Sona Hai
  'SF_cCyz6QQg', // Humko Deewana Kar Gaye
  '_YjSmLlmqLM', // Aisi Deewangi
  'eVnG_Rqfgg4', // Neele Neele Ambar Par
  'mW4WRtL6GxM', // Is Pyar Se Meri Taraf Na Dekho
  'uIOrAkrjwp4', // Hum Yaar Hai Tumhare
  '5y_TCKNzAMI', // Tumse Milne Ko Dil Karta Hai
  'cBwl6qKrZd0', // Ab Tere Dil Mein To
  'BaAoZA0fup0', // Dil Ka Aalam
  'nNhv8A_rJTg', // Oye Raju Pyar Na Kariyo
  's1NLjpj3aP4', // Jaa Bewafa Jaa
  'u4NSsEIny1c', // Muje Pine Ka Shauk Nahi
  'RjJxWRFfG3s', // Nahin Yeh Ho Nahin Sakta
  'rrzSZ0NMID4', // Barsaat Ke Mausam Mein
  '1ziaNhD9xqE', // Meri Mehbooba
  'UCsW7nea7sI', // Ae Mere Humsafar
  '5dWbn_qER3s', // Tere Dar Par Sanam
  'HIr_kpG4Fnc', // Tumse Milne Ki Tamanna Hai
  'XR7qvTgQ19o', // Taaron Ka Chamakta
  'jEL02Nz7Dds', // Dono Hi Mohabbat Ke
  'mocKoIhNJxk', // Ding Dong Dole
  'Tx7YCSTJC6I', // Dheere Dheere Tere Bina
  'jD3SGW0NHY0', // Kumar Sanu 90s Hits
  '0A2ue4lNMzo', // Wafa Na Raas Aayee Tujhe O Harjaee
  's4slgbuwOfw', // O Dil Tod Ke Hansti Ho Mera
];

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  playlistId,
  volume,
  isPlaying: _isPlaying,
  onStateChange,
  onSongChange,
  onPlayerReady,
  onError,

}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const initializedRef = useRef(false);

  const isCustomPlaylist = !!(playlistId && playlistId.startsWith('PL'));
  const apiKey =
    import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDZLYCcS6HF1ZFOWYbpjE9iUdhYffOESio';

  const fetchSongDetails = async (videoId: string) => {
    if (!videoId || !apiKey) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      );
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const snippet = data.items[0].snippet;
        onSongChange({
          title: snippet.title,
          author: snippet.channelTitle || '90s Bollywood Radio',
          id: videoId,
        });
      }
    } catch (e) {
      console.warn('YouTube Data API fetch error:', e);
    }
  };

  const handleSongUpdate = (target: YTPlayer) => {
    try {
      const data = target.getVideoData();
      if (data && data.video_id) {
        fetchSongDetails(data.video_id);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (initializedRef.current) return;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player || !containerRef.current) return;
      if (initializedRef.current) return;
      initializedRef.current = true;

      try {
        const originUrl = window.location.origin;

        // Start player with first video loaded individually.
        // Then cuePlaylist in onReady to properly queue all tracks.
        const firstVideoId = isCustomPlaylist ? undefined : MY_TRACKS[0];

        const playerVars: any = {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: originUrl,
        };

        if (isCustomPlaylist) {
          playerVars.listType = 'playlist';
          playerVars.list = playlistId;
        }
        // For custom tracks, do NOT pass 'playlist' in playerVars — load via cuePlaylist in onReady

        new window.YT.Player(containerRef.current, {
          height: '1',
          width: '1',
          videoId: firstVideoId, // Load first video directly for custom tracks
          playerVars,
          events: {
            onReady: (event) => {
              const ytPlayer = event.target;
              playerRef.current = ytPlayer;

              // Unmute and set volume first
              try {
                ytPlayer.unMute();
                ytPlayer.setVolume(volume || 80);
              } catch (e) {}

              // For custom track list: load the full playlist array properly
              if (!isCustomPlaylist) {
                try {
                  // cuePlaylist with array (NOT comma-joined string) is the correct API call
                  ytPlayer.cuePlaylist(MY_TRACKS, 0, 0, 'default');
                } catch (e) {
                  console.warn('cuePlaylist failed:', e);
                }
              }

              onPlayerReady(ytPlayer);

              // Fetch song info after a delay to let player load
              setTimeout(() => handleSongUpdate(ytPlayer), 1500);
            },

            onStateChange: (event) => {
              onStateChange(event.data);
              const ytStates = window.YT;
              if (ytStates && event.data === ytStates.PlayerState.PLAYING) {
                handleSongUpdate(event.target);
              }
              // Auto advance on ended
              if (ytStates && event.data === ytStates.PlayerState.ENDED) {
                try {
                  event.target.nextVideo();
                } catch (e) {}
              }
            },

            onError: (err) => {
              console.warn('YouTube Player Error code:', err.data);
              // Error codes: 101/150 = embed not allowed, 2 = invalid ID, 5 = HTML5 error
              // Auto-skip to next track on error so playlist continues
              try {
                playerRef.current?.nextVideo();
              } catch (e) {}
              onError();
            },
          },
        });
      } catch (e) {
        console.warn('YouTube init exception:', e);
        initializedRef.current = false;
        onError();
      }
    };

    if (!window.YT || !window.YT.Player) {
      // YT API not yet loaded
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  }, []);

  // Sync Volume
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      playerRef.current.setVolume(volume);
    } catch (e) {}
  }, [volume]);

  // NOTE: Play/pause is now controlled directly by MusicPlayer via the player ref passed
  // through onPlayerReady. We do NOT use a useEffect here to avoid calling playVideo()
  // outside of a direct user gesture — which browsers block as autoplay policy violation.
  // The isPlaying prop is kept for potential future use (e.g. external sync).



  return (
    <div
      ref={containerRef}
      id="youtube-player-element"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '1px',
        height: '1px',
        opacity: 0.01,
        pointerEvents: 'none',
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
};
