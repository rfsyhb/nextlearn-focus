'use client';
import { useActivity } from '@/hooks/useActivity';
import { useNow } from '@/hooks/useNow';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FloatingCurrentActivity() {
  const [mounted, setMounted] = useState(false);
  const now = useNow();
  const activity = useActivity();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!activity) return <p>Off hours</p>;

  const timeLeftMs = activity.endsAt.getTime() - now;
  const safeMs = Math.max(0, timeLeftMs);

  const timeLeft: string = (() => {
    const totalSeconds = Math.floor(safeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  })();

  const getDescription = (name: string) => {
    switch (name) {
      case 'Lock In':
        return 'Gotta go harder, move smarter, think wiser, stack more, talk less.';
      case 'Free Time':
        return 'Your time is limited. Satisfy your soul not society.';
      default:
        return '';
    }
  };

  return (
    <div className='flex flex-row items-center fixed top-1/2 left-4 z-[9999] px-3 py-2 rounded-lg text-lg font-sans tabular-nums'>
      {/* Image gif */}
      <div>
        {activity.name === 'Lock In' ? (
          <Image
            src='/onComputer.gif'
            alt='Lock In'
            width={120}
            height={120}
            priority
          />
        ) : (
          <Image
            src='/windDown.gif'
            alt='Free Time'
            width={120}
            height={120}
            priority
          />
        )}
      </div>
      {/* Text */}
      <div className='w-64'>
        <h2 className='font-bold text-2xl'>
          <span className='uppercase'>{activity.name} </span>
          <span className='font-normal text-lg text-background hover:text-foreground cursor-pointer'>
            ({timeLeft})
          </span>
        </h2>
        <p className='text-sm'>{getDescription(activity.name)}</p>
      </div>
    </div>
  );
}
