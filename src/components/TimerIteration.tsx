'use client';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingStore } from '@/stores/useSettingStore';
import { X } from 'lucide-react';

export default function TimerIteration() {
  const { completed } = useSessionStore();
  const showSetting = useSettingStore((s) => s.showSetting);

  return (
    <section className='flex flex-row gap-2'>
      {completed.length > 0 ? completed.map((done, index) => (
        <div
          key={index}
          className={`
              w-6 h-6 border flex items-center justify-center 
              ${done ? 'bg-gray-200' : 'bg-transparent'}
            `}
        >
          {done && <X size={32} className='text-black'/>}
        </div>
      )) : (
          <button onClick={showSetting} className='cursor-pointer'>set your goal!</button>
      )}
    </section>
  );
}
