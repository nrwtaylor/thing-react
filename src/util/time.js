export function humanTime(at) {


var d = new Date();

if (at !== undefined) {
  var epochtime = Date.parse(at);
  d = new Date(epochtime);
}

//if (!timestamp) {return true;}
//  const ts = new Date(timestamp * 1000);
  return d.toLocaleString();
//  return ts.toISOString();
}

export  function timeStamp() {
    var date = Date.now();
    return date.toString();
  }


// at firebase object
export function age(at) {

  if (at === null) {return null }

return (Date.now() - at)

}

export function zuluTextSpread(zuluA,zuluB) {

if (zuluA === undefined) {return;}
if (zuluB === undefined) {return;}

const partsA = zuluA.split("T");
const partsB = zuluB.split("T");

if (partsA[0] === partsB[0]) {

return zuluA + " to " +partsB[1];
}

return zuluA + " to " + zuluB;
//      {lastAt}
//      {" to "}
//      {firstAt}


}

export function ageMinutes(at) {

  const milliseconds = age(at);
  const minutes = Math.floor(milliseconds / (60 * 1000));
  return minutes;
  }

export function humanAge(at) {
const a = new Date(at);
var milliseconds = age(a);
var seconds = Math.floor(milliseconds/1000);

if (seconds > 60 * 60) {
return humanTime(at);
}

if (seconds > 60) {
return Math.floor(seconds/60) + " minutes ago.";
}

if (seconds > 60) {
return Math.floor(seconds/60) + " minute ago.";
}

if (seconds > 1) {
return Math.floor(seconds) + " seconds ago.";
}

return Math.floor(seconds) + " second ago.";

  }

export function humanRuntime(runTimeMilliseconds, lens, inputPostFix) {

var sign = Math.sign(runTimeMilliseconds);


//const a = new Date(at);
var milliseconds = Math.abs(runTimeMilliseconds);
var seconds = Math.floor(milliseconds/1000);
var postFix = "";
if (lens === 'text') {
sign = 1;

postFix = " ago";
if (inputPostFix) {
postFix = " " + inputPostFix;
}

}

if (seconds > 24 * 60 * 60 * 7 * 2) {
return sign * Math.floor(seconds / (24 * 60 * 60 * 7)) + " weeks" + postFix;
}


if (seconds > 24 * 60 * 60 * 7) {
return sign * Math.floor(seconds / (24 * 60 * 60 * 7)) + " week" + postFix;
}

if (seconds > 2* 24 * 60 * 60) {
return sign * Math.floor(seconds / (24 * 60 * 60)) + " days" + postFix;
}


if (seconds > 24 * 60 * 60) {
return sign * Math.floor(seconds / (24 * 60 * 60)) + " day" + postFix;
}


if (seconds > 2 * 60 * 60) {
return sign * Math.floor(seconds / (60 * 60)) + " hours" + postFix;
}


if (seconds > 60 * 60) {
return sign * Math.floor(seconds / (60 * 60)) + " hour" + postFix;
}

if (seconds > 2 * 60) {
return sign * Math.floor(seconds/60) + " minutes." + postFix;
}


if (seconds > 60) {
return sign * Math.floor(seconds/60) + " minute." + postFix;
}

if (milliseconds > 2 *1000) {
return sign * Math.floor(seconds) + " seconds" + postFix;
}

if (milliseconds > 999) {
return sign * Math.floor(seconds) + " second" + postFix;
}

if (milliseconds > 1) {
return sign * Math.floor(milliseconds) + " milliseconds" + postFix;
}


return sign * Math.floor(milliseconds) + " ms" + postFix;

  }

export function zuluTime(at) {

var d = new Date();

if (at !== undefined) {
  var epochtime = Date.parse(at);
  d = new Date(epochtime);
}

  return d.toISOString();
}


export function zuluTimeDifferenceMilliseconds(atA, atB) {

//var d = new Date();

//if (at !== undefined) {
  const epochtimeA = Date.parse(atA);
  const a = new Date(epochtimeA);
//}

  const epochtimeB = Date.parse(atB);
  const b = new Date(epochtimeB);

const differenceMilliseconds = b.getTime() - a.getTime();

  return differenceMilliseconds;
}

