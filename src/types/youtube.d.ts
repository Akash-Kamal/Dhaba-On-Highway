declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: {
            listType?: string;
            list?: string;
            autoplay?: 0 | 1;
            controls?: 0 | 1;
            modestbranding?: 0 | 1;
            rel?: 0 | 1;
            playsinline?: 0 | 1;
            enablejsapi?: 0 | 1;
            origin?: string;
            [key: string]: any;
          };
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
            onStateChange?: (event: YTPlayerStateChangeEvent) => void;
            onError?: (event: YTPlayerErrorEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  setVolume(volume: number): void;
  getVolume(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getVideoData(): {
    video_id: string;
    author: string;
    title: string;
    [key: string]: any;
  };
  getPlaylist(): string[];
  getPlaylistIndex(): number;
  getCurrentTime(): number;
  getDuration(): number;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getPlayerState(): number;

  destroy(): void;
  cuePlaylist(
    playlist: string | string[],
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string
  ): void;
  loadPlaylist(
    playlist: string | string[],
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string
  ): void;
}


export interface YTPlayerEvent {
  target: YTPlayer;
}

export interface YTPlayerStateChangeEvent {
  target: YTPlayer;
  data: number;
}

export interface YTPlayerErrorEvent {
  target: YTPlayer;
  data: number;
}
