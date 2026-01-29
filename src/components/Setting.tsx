import { useSessionStore } from '@/stores/useSessionStore';

export default function Setting() {
  const {
    count,
    durationMS,
    setCount,
    setDurationMS,
    isAutoAddTask,
    setIsAutoAddTask,
  } = useSessionStore();

  return (
    <section className='flex flex-col gap-1'>
      <div className='flex flex-row items-center gap-6 justify-between'>
        <label htmlFor='iteration'>how many?</label>
        <input
          type='number'
          id='iteration'
          value={count}
          onChange={(e) => {
            const value = +e.target.value;
            if (value > 10) {
              setCount(10);
            } else {
              setCount(value);
            }
          }}
          onFocus={(e) => e.target.select()}
          className='border w-12 px-2 py-1 rounded'
        />
      </div>
      <div className='flex flex-row items-center gap-2 justify-between'>
        <label htmlFor='duration'>how long?</label>
        <input
          type='number'
          id='duration'
          value={durationMS / 60000}
          onChange={(e) => setDurationMS(+e.target.value * 60000)}
          onFocus={(e) => e.target.select()}
          className='border w-12 px-2 py-1 rounded'
        />
      </div>
      <div className='flex flex-row items-center gap-2 justify-between'>
        <label htmlFor='autoAddTask'>are you limau?</label>
        <input
          type='checkbox'
          id='autoAddTask'
          checked={isAutoAddTask}
          onChange={(e) => setIsAutoAddTask(e.target.checked)}
          className='border w-4 h-4 px-2 py-1 rounded hover:cursor-pointer'
        />
      </div>
    </section>
  );
}
