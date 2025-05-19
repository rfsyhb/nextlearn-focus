// src/app/page.tsx
'use client';

import { useState } from 'react';
import useTimer from '@/hooks/useTimer';

export default function HomePage() {
  const TOTAL_MS = 0.2 * 60 * 1000; // 25 menit
  const [showIndicator, setShowIndicator] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const { label, start, stop, elapsedMS } = useTimer(TOTAL_MS, {
    onComplete: () => {
      // setiap kali selesai: sembunyikan indikator & tambah counter
      setShowIndicator(false);
      setCompletedCount((c) => c + 1);
    },
  });

  const handleStart = () => {
    setShowIndicator(true);
    start();
  };

  const handleStop = () => {
    stop();
    setShowIndicator(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {showIndicator ? (
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">{label}</p>
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Stop
          </button>
          {elapsedMS}
        </div>
      ) : (
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Start Timer
        </button>
      )}

      <p className="mt-4 text-gray-700">
        Completed sessions: <span className="font-medium">{completedCount}</span>
      </p>
    </div>
  );
}
