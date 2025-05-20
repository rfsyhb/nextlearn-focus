import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist((set) => ({
    tasks: [],
    addTask: (title) =>
      set((s) => ({
        tasks: [...s.tasks, { id: uuidv4(), title, completed: false }],
      })),
    toggleTask: (id) =>
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      })),
    removeTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),
  }),
    { name: 'focus-tasks-storage'}
  ),
);
