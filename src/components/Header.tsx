'use client';
import { useSettingStore } from '@/stores/useSettingStore';
import TimerIteration from './TimerIteration';

export default function Header() {
  const showSetting = useSettingStore((s) => s.showSetting);
  const hideSetting = useSettingStore((s) => s.hideSetting);

  return (
    <header className='flex items-center justify-between font-sans px-4 py-2'>
      <TimerIteration />
      <section className='text-lg font-semibold flex flex-row gap-2'>
        <button onClick={hideSetting} className='cursor-pointer'>main</button>
        <button onClick={showSetting} className='cursor-pointer'>setting</button>
      </section>
    </header>
  );
}
