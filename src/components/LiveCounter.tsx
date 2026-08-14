import React, { useState, useEffect } from 'react';

export const LiveCounter: React.FC = () => {
  const [count, setCount] = useState<number>(427);

  useEffect(() => {
    // Change counter every 12 to 24 seconds randomly
    const updateCounter = () => {
      // Pick random number between 400 and 499
      const nextCount = Math.floor(Math.random() * (499 - 400 + 1)) + 400;
      setCount(nextCount);
    };

    const intervalTime = Math.floor(Math.random() * (24000 - 12000)) + 12000;
    const interval = setInterval(updateCounter, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/30 text-amber-300/90 font-mono text-xs tracking-wider"
      title="Fictional late-night highway travelers"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <span>● {count} ON THE HIGHWAY</span>
    </div>
  );
};
