export default function getIndicatorLabel(
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
