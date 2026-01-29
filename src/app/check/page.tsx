'use client';

import { useActivity } from '@/hooks/useActivity';
import { useNow } from '@/hooks/useNow';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CheckPage() {
  const activity = useActivity();
  const now = useNow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  if (!activity) {
    return (
      <main className='w-full h-screen flex justify-center items-center'>
        <h1 className='text-3xl font-bold'>No activity found.</h1>
      </main>
    );
  }

  const timeLeftMs = activity.endsAt.getTime() - now;
  const safeMs = Math.max(0, timeLeftMs);

  const timeLeft: string = (() => {
    const totalSeconds = Math.floor(safeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  })();

  const getImageUrl = (name: string) => {
    if (name === 'Free Time') return '/windDown.gif';
    return '/onComputer.gif';
  };

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <Image
        src={getImageUrl(activity.name)}
        alt={activity.name}
        width={160}
        height={160}
      />
      <p className='font-mono'>{timeLeft}</p>
    </main>
  );
}
