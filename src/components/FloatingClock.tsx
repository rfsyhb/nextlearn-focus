'use client';

import { useEffect, useState } from 'react';
import { useNow } from '@/hooks/useNow';

export default function FloatingClock() {
  const now = useNow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hindari mismatch: server/first render tampil placeholder yang stabil
  if (!mounted) {
    return (
      <div className='fixed bottom-4 left-4 z-[9999] px-3 py-2 bg-background/60 rounded-lg text-lg font-sans tabular-nums'>
        --:--:--
      </div>
    );
  }

  const date = new Date(now);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return (
    <div className='fixed bottom-4 left-4 z-[9999] px-3 py-2 bg-background/60 rounded-lg text-lg font-sans tabular-nums'>
      {hours}:{minutes}:{seconds}
    </div>
  );
}
