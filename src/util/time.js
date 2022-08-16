export function humanTime(timestamp) {
  const ts = new Date(timestamp * 1000);
  return ts.toISOString();
}

export  function timeStamp() {
    var date = Date.now();
    return date.toString();
  }
