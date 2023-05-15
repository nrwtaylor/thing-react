export function findTokenPositions(array, token) {
  const tokenPositions = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(token)) {
      tokenPositions.push(i);
    }
  }
  return tokenPositions;
}

