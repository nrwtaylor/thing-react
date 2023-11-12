/*
export function minMaxData(data, field) {

if (field == null) {field = 'amount';}

console.debug("Trace ySeriesData data", data);
    var yVals = data.map(function (val) {
//      return val.amount;
return val.amount;
    });

    var minY = Math.min.apply(Math, yVals);
    var maxY = Math.max.apply(Math, yVals);
const numberOfYTicks = 5;

return [minY, maxY];

}
*/
export function minMaxData(data, field) {
  if (field == null) {
    field = "amount";
  }

  console.debug("Trace ySeriesData data", data);

  var yVals = data
    .map(function (val) {
      if (val == null) {
        return null;
      }

      return val[field];
    })
    .filter(function (value) {
      return value !== undefined && value !== null && !isNaN(value);
    });

  if (yVals.length === 0) {
    // Handle the case where all values are NaN, undefined, or null
    return [0, 0];
  }

  var minY = Math.min.apply(Math, yVals);
  var maxY = Math.max.apply(Math, yVals);
  const numberOfYTicks = 5;

  return [minY, maxY];
}

function largestFactorLessThan5(n) {
  const factors = [10, 5, 2, 1];
  for (const factor of factors) {
    if ((n - factor) % 10 === 0) {
      return factor;
    }
  }
  return 1;
}

function findClosestMultiple(n) {
  const closestMultiple1 = Math.pow(10, Math.floor(Math.log10(n)));
  const closestMultiple2 = closestMultiple1 * 2;
  const closestMultiple5 = closestMultiple1 * 5;

  return Math.max(closestMultiple1, closestMultiple2, closestMultiple5);
}

function findValidFactor(factor) {
  const divisors = [10, 5, 2, 1];
  for (const divisor of divisors) {
    if (factor % divisor === 0) {
      return divisor;
    }
  }
  return factor;
}

export function minMaxTicks(min, max, numberOfTicks) {
  if (max == null || min == null || numberOfTicks < 2) {
    return [];
  }

  const y = [];
  const tickRange = Math.abs(max - min);

  //const largestFactor = largestFactorLessThan5(Math.abs(tickRange));
  const requestedInterval = tickRange / numberOfTicks;
  const tickInterval = findClosestMultiple(requestedInterval);

  //const tickInterval = tickRange / ((numberOfTicks - 1) * adjustedFactor);
  //const tickInterval = adjustedFactor;
  console.debug(
    "data min max tickRange numberOfTicks tickInterval",
    min,
    max,
    tickRange,
    numberOfTicks,
    requestedInterval,
    tickInterval
  );

  const newMin = roundDownToTickInterval(min, tickInterval);

  for (let i = 0; i < numberOfTicks; i++) {
    const tickValue = newMin + i * tickInterval;
    y.push(tickValue);
  }

  return y;
}

function roundDownToTickInterval(n, tickInterval) {
  return Math.floor(n / tickInterval) * tickInterval;
}

export  function atSpread(data) {
    if (data == null) {
      return;
    }
    if (Array.isArray(data) && data.length === 0) {
      return;
    }
    const first = new Date(data[0].at);
    const last = new Date(data[data.length - 1].at);

    const spreadEvent = last - first > 0 ? last - first : first - last;

   // setFirstAt(data[0].at);
    //setLastAt(data[data.length - 1].at);
    return {firstAt:data[0].at, lastAt:data[data.length -1].at, spread:spreadEvent};
  }
