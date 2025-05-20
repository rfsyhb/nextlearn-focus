import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  count: number;
  durationMS: number;
  completed: boolean[];
  lastReset: string; // YYYY-MM-DD
  lastCompleted: number; // last completed date in milliseconds
  isRunning: boolean; // is the timer running
  setCount: (n: number) => void; // Set the count and reset completed
  setDurationMS: (n: number) => void; // Set the duration in milliseconds
  completeNext: () => void; // Mark the next task as completed
  cancelCompleted: () => void; // Cancel the completed task
  resetSession: () => void; // Reset count and completed array
  resetCompleted: () => void; // Reset completed array
  setLastReset: (date: string) => void; // Set the last reset date
  setRunning: (v: boolean) => void; // Set the running state
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      // initial state
      count: 0,
      durationMS: 25 * 60 * 1000, // default to 25 minutes
      completed: [],
      lastReset: new Date().toISOString().slice(0, 10), // e.g. '2025-05-19'
      lastCompleted: 0, // last completed date in milliseconds
      isRunning: false,

      // actions
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
          set({ completed: newArr, lastCompleted: Date.now() }); // update the completed array and last completed date
        }
      },
      cancelCompleted: () => {
        const { completed } = get(); // get the current completed array
        const lastIndex = completed.lastIndexOf(true); // find the last true
        if (lastIndex !== -1) {
          const newArr = [...completed]; // copy the array
          newArr[lastIndex] = false; // set the last index to false
          set({ completed: newArr });
        }
      },
      resetSession: () =>
        set({
          count: 0,
          completed: [],
        }),
      resetCompleted: () =>
        set({
          completed: Array(get().count).fill(false),
        }),
      setLastReset: (date) =>
        set({
          lastReset: date,
        }),
      setRunning: (v) => set({ isRunning: v }), // set the running state
    }),
    {
      name: 'focus-session-storage',
      // callback sebelum/selesai rehydrate: inject logic reset
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        if (state.lastReset !== today) {
          state.completed = Array(state.count).fill(false); // reset completed array
          state.lastReset = today; // update last reset date
        }
      },
    },
  ),
);
