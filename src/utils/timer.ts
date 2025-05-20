export function getIndicatorLabel(
  elapsedMS: number,
  totalMS: number,
): string {
  const percent = (elapsedMS / totalMS) * 100;
  const percentLeft = 100 - percent;

  if (percentLeft <= 10) return 'final push';
  if (percentLeft <= 30) return 'almost there';
  if (percentLeft <= 50) return 'on track';
  if (percentLeft <= 75) return 'getting into it';
  return 'just started';
}

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
} // example output: 00:01:50