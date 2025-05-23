'use client';

import { useTaskStore } from '@/stores/useTaskStore';
import Portal from './Portal';
import { X, Minimize2, NotebookPen } from 'lucide-react';
import { useState } from 'react';

export default function FloatingToDo() {
  const { tasks, addTask, removeTask, toggleTask } = useTaskStore();
  const [newTitle, setNewTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Portal>
      {isOpen ? (
        <section className='fixed bottom-4 right-4 z-[9999] px-3 py-2 flex flex-col gap-2 bg-background/60 rounded-lg'>
          <ul className='flex flex-col'>
            {tasks.map((task) => (
              <li
                key={task.id}
                className='flex flex-row items-center justify-between '
              >
                <div className='flex flex-row items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={`${task.completed && 'line-through'} text-lg`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
                  className='cursor-pointer group '
                >
                  <X className='group-hover:text-red-400' />
                </button>
              </li>
            ))}
          </ul>
          <div className='flex flex-row items-center justify-between gap-2'>
            <input
              type='text'
              value={newTitle}
              placeholder='Add new task...'
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTitle.trim() !== '') {
                  addTask(newTitle.trim());
                  setNewTitle('');
                }
              }}
              className='focus:outline-none w-32'
            />
            <button
              onClick={() => setIsOpen(false)}
              className='hover:text-red-400'
            >
              <Minimize2 size={20} />
            </button>
          </div>
        </section>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-4 right-4 z-[9999] p-2 bg-background/60 rounded-full hover:text-red-400'
        >
          <NotebookPen />
        </button>
      )}
    </Portal>
  );
}
