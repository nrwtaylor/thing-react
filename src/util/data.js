

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
        field = 'amount';
    }

    console.debug("Trace ySeriesData data", data);

    var yVals = data.map(function (val) {
        return val[field];
    }).filter(function (value) {
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


/*

export function minMaxTicks(min, max, numberOfTicks) {
    const maxYTickSpacing = 1;

    if (max == null || min == null) {
        return [];
    }

    const y = [];
    const tickRange = max - min;

    console.log("data ticksData", max, min);
    let tickInterval = 1;
    if (tickRange > 0) {
        tickInterval = Math.pow(10, Math.floor(Math.log10(tickRange)) - 1);
        tickInterval = [1, 2, 5].reduce((prev, curr) =>
            Math.abs(tickRange / curr) < Math.abs(tickInterval) ? curr : prev
        );
    }

    // Calculate and push the ticks
    for (let i = 0; i < numberOfTicks; i++) {
        const tickValue = Math.floor(min) + i * tickInterval;
        y.push(tickValue);
    }

    return y;
}
*/
/*
export function minMaxTicks(min,max, numberOfTicks) {

//const [max, min] = maxMinData(data, 'amount');

    const maxYTickSpacing = 1;



if (max == null || min == null) {return true;} // Without defining y range

//const numberOfTicks = 5;
const y = [];
const tickRange = max - min;

console.log("data ticksData", max, min);
let tickInterval = 1;
if (tickRange > 0) {
    tickInterval = Math.pow(10, Math.floor(Math.log10(tickRange)) - 1);
    tickInterval = [1, 2, 5].reduce((prev, curr) => (Math.abs(tickRange / curr) < Math.abs(tickInterval) ? curr : prev));
}

// Calculate and push the ticks
for (let i = 0; i < numberOfTicks; i++) {
    const tickValue = Math.floor(min) + i * tickInterval;
    y.push(tickValue);
}

return y;

}
*/
/*
export function minMaxTicks(min, max, numberOfTicks) {
    if (max == null || min == null) {
        return [];
    }

    const y = [];
    const tickRange = max - min;

    console.log("data ticksData", max, min);
    let tickInterval = 1;
    if (tickRange > 0) {
        tickInterval = Math.pow(10, Math.floor(Math.log10(tickRange)) - 1);
        tickInterval = [1, 2, 5].reduce((prev, curr) =>
            Math.abs(tickRange / curr) < Math.abs(tickInterval) ? curr : prev
        );
    }

    // Push the min and max as the first and last ticks
    y.push(min);
    for (let i = 1; i < numberOfTicks - 1; i++) {
        const tickValue = Math.floor(min) + i * tickInterval;
        y.push(tickValue);
    }
    y.push(max);

    return y;
}
*/
/*
export function minMaxTicks(min, max, numberOfTicks) {
    if (max == null || min == null || numberOfTicks < 2) {
        return [];
    }

    const y = [];
    const tickRange = max - min;

    console.log("data ticksData", max, min);

    // Find the appropriate factor
    let factor = 1;
    if (tickRange > 0) {
        const factors = [1, 2, 5];
        for (let f of factors) {
            const tickCount = Math.ceil(tickRange / (min * (10 ** f)));
            if (tickCount >= numberOfTicks) {
                factor = f;
                break;
            }
        }
    }

    // Calculate tick interval based on the factor
    let tickInterval = factor;
    while (tickInterval <= tickRange / (numberOfTicks - 1)) {
        tickInterval *= factor;
    }

    // Push the ticks
    for (let i = 0; i < numberOfTicks; i++) {
        const tickValue = min + i * tickInterval;
        y.push(tickValue);
    }

    return y;
}
*/

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
const requestedInterval = tickRange/numberOfTicks;
    const tickInterval = findClosestMultiple(requestedInterval);

    //const tickInterval = tickRange / ((numberOfTicks - 1) * adjustedFactor);
//const tickInterval = adjustedFactor;
console.debug("data min max tickRange numberOfTicks tickInterval", min, max, tickRange, numberOfTicks, requestedInterval, tickInterval);

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
