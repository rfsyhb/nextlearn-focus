'use client';

import { useActivity } from '@/hooks/useActivity';
import { useNow } from '@/hooks/useNow';

export default function CheckPage() {
  const activity = useActivity();
  const now = useNow();
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

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold'>{activity.name}</h1>
      <p className='text-lg'>{timeLeft}</p>
    </main>
  );
}
