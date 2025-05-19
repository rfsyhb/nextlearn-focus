import { create } from 'zustand';

interface SessionState {
  count: number;
  durationMS: number;
  completed: boolean[];
  setCount: (n: number) => void; // Set the count and reset completed
  setDurationMS: (n: number) => void; // Set the duration in milliseconds
  completeNext: () => void; // Mark the next task as completed
  reset: () => void; // Reset the count and completed array
}

export const useSessionStore = create<SessionState>((set, get) => ({
  count: 2,
  durationMS: 25 * 60 * 1000, // default to 25 minutes
  completed: [true, false],
  setCount: (n) =>
    set({
      count: n,
      completed: Array(n).fill(false),
    }),
  setDurationMS: (n) =>
    set({
      durationMS: n,
    }),
  completeNext: () => {
    const { completed } = get(); // get the current completed array
    const nextIndex = completed.findIndex((done) => !done); // find the first false
    if (nextIndex !== -1) {
      const newArr = [...completed]; // copy the array
      newArr[nextIndex] = true; // set the next index to true
      set({ completed: newArr });
    }
  },
  reset: () =>
    set({
      count: 0,
      completed: [],
    }),
}));
