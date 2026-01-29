import { useEffect, useRef } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { useSessionStore } from '@/stores/useSessionStore';

type MandatoryTask = {
  title: string;
  hour: number;
  minute: number;
};

const mandatoryTasks: MandatoryTask[] = [
  { title: '04:10 - Fajr', hour: 4, minute: 10 },
  { title: '11:40 - Dhuhr', hour: 11, minute: 40 },
  { title: '15:00 - Ashar', hour: 15, minute: 0 },
  { title: '17:50 - Maghrib', hour: 17, minute: 50 },
  { title: '19:00 - Isha', hour: 19, minute: 0 },
  { title: '21:00 - Journaling', hour: 21, minute: 0 },
];

export function useTaskDetector() {
  const addTask = useTaskStore((s) => s.addTask);
  const autoAddTask = useSessionStore((s) => s.isAutoAddTask);

  const hasMandatoryCreated = useSessionStore((s) => s.hasMandatoryCreated);
  const markMandatoryCreated = useSessionStore((s) => s.markMandatoryCreated);

  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!autoAddTask) return; // auto add task disabled

    const nowMs = Date.now();

    for (const task of mandatoryTasks) {
      // target hari ini pada jam:menit task
      const target = new Date();
      target.setHours(task.hour, task.minute, 0, 0);
      const targetMs = target.getTime();

      // tujuan kamu: user buka jam 11 => task jam 10 dilewati
      if (targetMs <= nowMs) continue;

      // sudah pernah dibuat hari ini => skip
      if (hasMandatoryCreated(task.title)) continue;

      const timer = window.setTimeout(() => {
        // guard lagi untuk jaga-jaga (refresh / strict mode)
        if (hasMandatoryCreated(task.title)) return;

        addTask(task.title);
        markMandatoryCreated(task.title);
      }, targetMs - nowMs);

      timersRef.current.push(timer);
    }

    return () => {
      for (const t of timersRef.current) clearTimeout(t);
      timersRef.current = [];
    };
  }, [autoAddTask, addTask, hasMandatoryCreated, markMandatoryCreated]);
}
