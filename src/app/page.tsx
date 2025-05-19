// src/app/page.tsx
'use client';
import Setting from '@/components/Setting';
import useTimer from '@/hooks/useTimer';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingStore } from '@/stores/useSettingStore';

export default function HomePage() {
  const { durationMS, completeNext } = useSessionStore();
  const { isSetting } = useSettingStore();

  const { label, start, stop, isRunning } = useTimer(durationMS, {
    onComplete: completeNext,
  });

  const handleStart = () => {
    start();
  };

  const handleStop = () => {
    stop();
  };

  return (
    <main
      className={`font-sans h-full flex flex-col items-center justify-center ${
        isRunning ? 'bg-gif' : ''
      }`}
    >
      {isSetting ? (
        <Setting />
      ) : isRunning ? (
        <section className='flex flex-col gap-1 items-center'>
          <h2 className='text-3xl font-semibold'>focus.</h2>
          <div className='flex flex-row gap-6 items-center'>
            <h3 className='text-lg'>{label}</h3>
            <button className='text-md hover:text-red-400 cursor-pointer' onClick={handleStop}>
              give up?
            </button>
          </div>
        </section>
      ) : (
        <section className='flex flex-row gap-8 items-center'>
          <div className='flex flex-col text-left'>
            <h2 className='text-3xl font-semibold'>focus.</h2>
            <p className='font-light'>manifesting 🙏</p>
          </div>
          <button
            className='cursor-pointer text-2xl font-semibold'
            onClick={handleStart}
          >
            click to start
          </button>
        </section>
      )}
    </main>
  );
}
