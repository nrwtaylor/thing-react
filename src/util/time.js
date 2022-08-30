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

export function zuluTime(at) {
  var epochtime = Date.parse(at);

  var d = new Date(epochtime);
  return d.toISOString();
}

