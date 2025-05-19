export default function getIndicatorLabel(
  elapsedMS: number,
  totalMS: number,
): string {
  const percent = (elapsedMS / totalMS) * 100;
  const percentLeft = 100 - percent;

  if (percentLeft <= 10) return 'Final Push!';
  if (percentLeft <= 30) return 'Almost there';
  if (percentLeft <= 50) return 'On Track';
  if (percentLeft <= 75) return 'Getting Into It';
  return 'Just Started';
}
