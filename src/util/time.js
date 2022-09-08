export function humanTime(timestamp) {

if (!timestamp) {return true;}
  const ts = new Date(timestamp * 1000);
  return ts.toISOString();
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
return Math.floor(seconds) + " seconds ago.";

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

if (seconds > 24 * 60 * 60 * 7) {
return sign * Math.floor(seconds / (24 * 60 * 60 * 7)) + " weeks" + postFix;
}


if (seconds > 24 * 60 * 60) {
return sign * Math.floor(seconds / (24 * 60 * 60)) + " days" + postFix;
}


if (seconds > 60 * 60) {
return sign * Math.floor(seconds / (60 * 60)) + " hours" + postFix;
}

if (seconds > 60) {
return sign * Math.floor(seconds/60) + " minutes." + postFix;
}

if (milliseconds > 999) {
return sign * Math.floor(seconds) + " seconds" + postFix;
}

if (milliseconds > 1) {
return sign * Math.floor(milliseconds) + " milliseconds" + postFix;
}


return sign * Math.floor(milliseconds) + " ms" + postFix;

  }

export function zuluTime(at) {
  var epochtime = Date.parse(at);

  var d = new Date(epochtime);
  return d.toISOString();
}

