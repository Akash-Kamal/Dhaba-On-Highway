import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
}

const PULL_THRESHOLD = 85; // 85px pull distance threshold

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ children }) => {
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const startY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0 || document.documentElement.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;

      if (diff > 0 && (window.scrollY === 0 || document.documentElement.scrollTop === 0)) {
        // Dampening resistance factor for natural feel
        const distance = Math.min(diff * 0.45, PULL_THRESHOLD + 25);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;
      isPulling.current = false;

      if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
        setIsRefreshing(true);
        setPullDistance(PULL_THRESHOLD);

        setTimeout(() => {
          window.location.reload();
        }, 750);
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  const progressPct = Math.min(100, (pullDistance / PULL_THRESHOLD) * 100);

  return (
    <div className="relative min-h-[100svh] w-full">
      {/* Floating Refresh Pull Indicator Pill */}
      {(pullDistance > 8 || isRefreshing) && (
        <div
          className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#140e0a]/95 border border-amber-500/50 text-amber-200 text-xs font-mono tracking-wider shadow-2xl backdrop-blur-md transition-all duration-75 select-none pointer-events-none"
          style={{
            transform: `translate(-50%, ${isRefreshing ? 12 : Math.min(60, pullDistance * 0.65)}px)`,
          }}
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="font-bold">Refreshing Dhaba... ☕</span>
            </>
          ) : (
            <>
              {pullDistance >= PULL_THRESHOLD ? (
                <RefreshCw
                  className="w-4 h-4 text-amber-400 transition-transform"
                  style={{ transform: `rotate(${progressPct * 3.6}deg)` }}
                />
              ) : (
                <ArrowDown
                  className="w-4 h-4 text-amber-400 transition-transform"
                  style={{ transform: `rotate(${progressPct * 1.8}deg)` }}
                />
              )}
              <span>
                {pullDistance >= PULL_THRESHOLD
                  ? 'Release to refresh website...'
                  : 'Slide down to refresh...'}
              </span>
            </>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
