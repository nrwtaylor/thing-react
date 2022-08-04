export function humanTime(timestamp) {
  const ts = new Date(timestamp * 1000);
  return ts.toISOString();
}
