export function findUUIDPositions(array) {
  const uuidPositions = [];
  for (let i = 0; i < array.length; i++) {
    if (isValidUUID(array[i])) {
      uuidPositions.push(i);
    }
  }
  return uuidPositions;
}

export function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function getNuuid(uuid) {

if (uuid == null) {
return 'XXXX';
}

    const n = uuid.substring(0, 4);
    return n.toUpperCase();


}
