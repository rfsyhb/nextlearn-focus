import { useSyncExternalStore } from 'react';

let interval: number | null = null;
let now = Date.now();
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (interval === null) {
    interval = window.setInterval(() => {
      now = Date.now(); // update cache
      listeners.forEach((fn) => fn());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  };
}

function getSnapshot() {
  return now;
}

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
