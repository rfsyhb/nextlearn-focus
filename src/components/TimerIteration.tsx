'use client';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingStore } from '@/stores/useSettingStore';
import { X } from 'lucide-react';

export default function TimerIteration() {
  const { completed } = useSessionStore();
  const showSetting = useSettingStore((s) => s.showSetting);
  const cancelCompleted = useSessionStore((s) => s.cancelCompleted);

  return (
    <section className='flex flex-row gap-2'>
      {completed.length > 0 ? (
        completed.map((done, index) => (
          <div
            key={index}
            className={`
              w-6 h-6 border flex items-center justify-center 
              ${done ? 'bg-gray-200 hover:bg-red-300 hover:border-red-300' : 'bg-transparent'}
            `}
          >
            {done && (
              <button
                onClick={cancelCompleted}
                className='group relative cursor-pointer'
              >
                <X size={32} className='text-black' />
                <span className='absolute -bottom-6 left-1/2 whitespace-nowrap text-xs text-white bg-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition'>
                  remove?
                </span>
              </button>
            )}
          </div>
        ))
      ) : (
        <button onClick={showSetting} className='cursor-pointer'>
          set your goal!
        </button>
      )}
    </section>
  );
}
