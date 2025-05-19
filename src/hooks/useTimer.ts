import getIndicatorLabel from '@/utils/timer';
import { useCallback, useEffect, useRef, useState } from 'react';

interface TimerOptions {
  onComplete?: () => void;
  tickRate?: number; // default is 1000ms
}

export default function useTimer(
  totalMS?: number | null,
  { onComplete, tickRate = 1000 }: TimerOptions = {},
) {
  const [elapsedMS, setElapsedMS] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // simpan timestamp mulai
  const startRef = useRef<number>(0);
  // ref interval
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // START: selalu mulai dari elapsed=0 ketika belum pernah jalan atau setelah stop
  const start = useCallback(() => {
    // reset elapsed jika sebelumnya sudah berhenti/give up
    setElapsedMS(0);
    startRef.current = Date.now();
    setIsRunning(true);
  }, []);

  // STOP: hentikan & reset elapsed ke 0
  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setElapsedMS(0);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const next = now - startRef.current;

        if (typeof totalMS === 'number' && next >= totalMS) {
          setElapsedMS(totalMS);
          setIsRunning(false);
          clearInterval(intervalRef.current!);
          onComplete?.();
        } else {
          setElapsedMS(next);
        }
      }, tickRate);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, totalMS, tickRate, onComplete]);

  const label =
    typeof totalMS === 'number' ? getIndicatorLabel(elapsedMS, totalMS) : '';

  return { elapsedMS, label, isRunning, start, stop };
}
