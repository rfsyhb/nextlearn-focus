'use client';

import { useMemo } from 'react';
import { useNow } from './useNow';

type ActivityName = 'Free Time' | 'Lock In';

type ActivityResult = {
  name: ActivityName;
  endsAt: Date;
};

type Slot = {
  startMin: number;
  endMin: number;
  name: ActivityName;
};

const slots: Slot[] = [
  { startMin: 4 * 60, endMin: 6 * 60, name: 'Lock In' }, // 04:00 - 06:00
  { startMin: 6 * 60, endMin: 9 * 60, name: 'Free Time' },
  { startMin: 9 * 60, endMin: 11 * 60, name: 'Lock In' },
  { startMin: 11 * 60, endMin: 15 * 60, name: 'Free Time' },
  { startMin: 15 * 60, endMin: 17 * 60, name: 'Lock In' },
  { startMin: 17 * 60, endMin: 19 * 60, name: 'Free Time' },
  { startMin: 19 * 60, endMin: 21 * 60, name: 'Lock In' },
];

// Helper
const atHM = (base: Date, hour: number, minute: number) => {
  const d = new Date(base);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const getActivity = (now: Date): ActivityResult | null => {
  const secondsNow =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const slot = slots.find((s) => {
    const startSec = s.startMin * 60;
    const endSec = s.endMin * 60;
    return secondsNow >= startSec && secondsNow < endSec;
  });

  if (!slot) return null;

  const endsAtHour = Math.floor(slot.endMin / 60);
  const endsAtMinute = slot.endMin % 60;

  return {
    name: slot.name,
    endsAt: atHM(now, endsAtHour, endsAtMinute),
  };
};

export function useActivity() {
  const now = useNow();

  return useMemo(() => getActivity(new Date(now)), [now]);
}
