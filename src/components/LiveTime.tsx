import React, { useState, useEffect } from 'react';

export const LiveTime: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format as 01:42:09 AM
      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeStr(time);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 border border-amber-900/30 text-amber-300/80 font-mono text-xs tracking-wider"
      title="User local time"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      <span>{timeStr || '01:30:00 AM'}</span>
    </div>
  );
};
