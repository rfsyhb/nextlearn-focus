'use client';
import { useSettingStore } from '@/stores/useSettingStore';
import TimerIteration from './TimerIteration';
import { formatTime } from '@/utils/timer';
import { useSessionStore } from '@/stores/useSessionStore';
import { useMemo, useState } from 'react';
import { useNow } from '@/hooks/useNow';

export default function Header() {
  const showSetting = useSettingStore((s) => s.showSetting);
  const hideSetting = useSettingStore((s) => s.hideSetting);
  const isRunning = useSessionStore((s) => s.isRunning);
  const lastCompleted = useSessionStore((s) => s.lastCompleted);
  const [awayDuration, setAwayDuration] = useState('00:00:00');

  const isAway = !isRunning;
  const now = useNow();
  useMemo(() => {
    if (isAway && lastCompleted !== 0) {
      const diff = now - lastCompleted;
      setAwayDuration(formatTime(diff));
    }
  }, [isAway, lastCompleted, now]);

  return (
    <header className='flex items-center justify-between font-sans px-4 py-2'>
      <TimerIteration />
      {lastCompleted !== 0 && (
        <p className={`font-light ${!isRunning ? 'block' : 'hidden'}`}>
          time is ticking, you&rsquo;ve already away for{' '}
          <span className='font-semibold text-lg'>{awayDuration}</span>
        </p>
      )}
      <section className='text-lg font-semibold flex flex-row gap-2'>
        <button onClick={hideSetting} className='cursor-pointer'>
          main
        </button>
        <button onClick={showSetting} className='cursor-pointer'>
          setting
        </button>
      </section>
    </header>
  );
}
