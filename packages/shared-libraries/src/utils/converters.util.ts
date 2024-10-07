export function convertSecondsToDuration(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.round(seconds % 60);

  const arr = [];
  if (days) {
    arr.push(`${days} days`);
  }
  if (days || hours) {
    arr.push(`${hours} hours`);
  }
  if (days || hours || minutes) {
    arr.push(`${minutes} minutes`);
  }
  if (days || hours || minutes || secs) {
    arr.push(`${secs} seconds`);
  }
  const res = arr.join(', ');
  return res === '' ? `0 seconds` : res;
}

export function convertMillisecsToDuration(milliSecs: number) {
  return convertSecondsToDuration(milliSecs / 1000);
}
