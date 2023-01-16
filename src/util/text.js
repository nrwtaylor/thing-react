import {zuluTimeDifferenceMilliseconds} from "./time.js";

var slugify = require("slugify");


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function extractUuid(input) {
  if (input == null) {
    return true;
  }
  const uuids = extractUuids(input);
  if (uuids == null) {
    return false;
  }

  if (uuids.length === 1) {
    return uuids[0];
  }

  return false;
}

export const extractNumberTokens = (text, options) => {
  let numbers;
  if (!text || typeof text !== "string") {
    return [];
  }

  numbers = text.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);

  return numbers;
};

export const extractMixedTokens = (text, options) => {
  var parts = [];
  if (Array.isArray(text)) {
    parts = text;
  } else {
    parts = text.split(" ");
  }

  return parts.filter((part) => {
    return isMixed(part);
  });
}


export function isAlpha(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}



export function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}


export function isNumeric(token) {
  if (typeof token != "string") return false; // we only process strings!
  return (
    !isNaN(token) && !isNaN(parseFloat(token)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not >
  ); // ...and ensure strings of whitespace fail
}

export function isMixed(token) {
  if (isAlphaNumeric(token) && !isAlpha(token) && !isNumeric(token)) {
    return true;
  }
  return false;
}


  export function extractAlphaTokens(text) {
    var parts = text.split(" ");

    return parts.filter((part) => {
      return isAlpha(part);
    });
  }

// Sort high to low score
export function sortThingsByScore(things) {
  //if (items === undefined) {return [];}
  //if (items.length === 0) {return [];}
  const sortedThings = things.sort(function (a, b) {
    return b.score - a.score;
  });

  return sortedThings;
}


// Sort high to low score
export function sortThingsByAge(things, order) {
  //if (items === undefined) {return [];}
  //if (items.length === 0) {return [];}
  const sortedThings = things.sort(function (a, b) {
console.log("text xkcd", a);
if (order === 'ascending') {return zuluTimeDifferenceMilliseconds(a.createdAt , b.createdAt);}
    return zuluTimeDifferenceMilliseconds(b.createdAt, a.createdAt);
  });

  return sortedThings;
}


  export function scoreThings(things, slugTitle) {

    if (!Array.isArray(things)) {
      return true;
    }
console.log("text scoreThings", things, slugTitle)
    const scoredThings = things.map((thing) => {
      return {
        ...thing,
        score: scoreThing(thing, slugTitle),
      };
    });

    return scoredThings;
  }

  export function scoreThing(thing, inputClusterTokens) {

const text = thing.subject + " " +thing.uuid;

if (text == null) {return true;}

    const defaultKeywords = "";

//    const conditionedClusterTokens = getSlug(inputClusterTokens).replace("-"," ");

    const conditionedClusterTokens = getSlug(inputClusterTokens);
    const clusterTokens = conditionedClusterTokens
      ? conditionedClusterTokens.toLowerCase().split("-")
      : defaultKeywords.toLowerCase().split(" ");
console.log("text scoreThing", text, inputClusterTokens, conditionedClusterTokens, clusterTokens);

    const conditionedText = getSlug(text);
    const titleTokens = conditionedText.toLowerCase().split("-");

    let score = titleTokens.length;
    let count = 0;

    const clusterUuidTokens = extractUuids(clusterTokens.join(" "));
    const titleUuidTokens = extractUuids(titleTokens.join(" "));

console.log("text scoreThing uuid", clusterUuidTokens, titleUuidTokens);

if (clusterUuidTokens !== null) {
clusterUuidTokens.forEach((clusterUuidToken)=>{
if (titleUuidTokens == null) {return;}
titleUuidTokens.forEach((titleUuidToken)=>{

if (titleUuidToken === clusterUuidToken) {count += count +10;}



});

});
}

if (clusterUuidTokens && clusterUuidTokens.includes(thing.uuid)) {count += count +100;}




    const clusterNumberTokens = extractNumberTokens(clusterTokens.join(" "));
    const titleNumberTokens = extractNumberTokens(titleTokens.join(" "));

    //extractMixedTokens

    const clusterMixedTokens = extractMixedTokens(clusterTokens.join(" "));
    const titleMixedTokens = extractMixedTokens(titleTokens.join(" "));

    if (clusterNumberTokens !== null && titleNumberTokens !== null) {
      clusterNumberTokens.map((word) => {
        if (titleNumberTokens.includes(word.toLowerCase())) {
          count += 1;
        }
        return true;
      });

      titleNumberTokens.map((word) => {
        if (clusterNumberTokens.includes(word.toLowerCase())) {
          count += 1;
        }
        return true;
      });
    }

    if (clusterMixedTokens !== null && titleMixedTokens !== null) {
      clusterMixedTokens.map((word) => {
        if (titleMixedTokens.includes(word.toLowerCase())) {
          count += 5;
        }
        return true;
      });

      titleMixedTokens.map((word) => {
        if (clusterMixedTokens.includes(word.toLowerCase())) {
          count += 5;
        }
        return true;
      });
    }

    if (clusterTokens.length === 1) {
      if (titleTokens.includes(clusterTokens[0].toLowerCase())) {
        count += 1;
      }
    }

    clusterTokens.map((word) => {
      if (titleTokens.includes(word.toLowerCase())) {
        count += 1;
      }
      return true;
    });

    titleTokens.map((word) => {
      if (clusterTokens.includes(word.toLowerCase())) {
        count += 1;
      }
      return true;
    });

    // Weight matches in first three tokens of title
    clusterTokens.map((word) => {
      if (titleTokens.length === 0) {
        return true;
      }

      if (word.toLowerCase() === titleTokens[0].toLowerCase()) {
        count += 1;
      }

      if (titleTokens.length === 1) {
        return true;
      }

      if (word.toLowerCase() === titleTokens[1].toLowerCase()) {
        count += 1;
      }

      if (titleTokens.length === 2) {
        return true;
      }

      if (word.toLowerCase() === titleTokens[2].toLowerCase()) {
        count += 1;
      }
      return true;
    });

    score = count;

    // NEXT STEP EXTRACT MIXEDs.

    //const score = LevenshteinDistance(keywords, text);
    //console.log(text, keywords, score);

    return score;
  }

  /*
  let mixeds;
  if (!text || typeof text !== 'string') {
    return [];
  }
console.log("mixeds text", text);
  mixeds = text.match(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/g);
console.log("mixeds",mixeds);
  return mixeds;
*/
//};

export function extractUuids(input) {
  const pattern = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/g;

  return input.match(pattern);
}

export function extractNuuids(input) {
  const pattern = /[0-9a-f]{4}/g;

  return input.match(pattern);
}


export function extractNuuid(input) {
  if (input == null) {
    return true;
  }
  const nuuids = extractNuuids(input);
  if (nuuids == null) {
    return false;
  }

  if (nuuids.length === 1) {
    return nuuids[0];
  }

  return false;
}


export function replaceUuids(input) {
  if (input == null) {return true;}
  const pattern = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/g;

  var result = input.replace(pattern, function (match, token) {
    return "x";
    //    return data[token];
  });
  return result;
  //  return input.match(pattern);
}

export function getSlug(text) {
  if (text == null) {
    return "";
  }

  const rawSlug = text
    .toLowerCase()
    .replace("+", " ")
    .replace("-", " ")
    .replace(/[^\w ]+/g, " ")
    .replace(/ +/g, "-");

  const first = rawSlug.charAt(0);
  const last = rawSlug.charAt(rawSlug.length - 1);
  var conditionedSlug = rawSlug;

  if (last === "-") {
    conditionedSlug = conditionedSlug.slice(0, -1);
  }
  if (first === "-") {
    conditionedSlug = conditionedSlug.slice(1);
  }
//console.log("conditionedSlug", conditionedSlug);
  return conditionedSlug;
}

export function parsePing(p) {
  //    const ps = [];
  if (!p) {
    return;
  }

  console.log("text parsePing", p);
  //   ping.map((p) => {
  if (!p) {
    return;
  }
  // Parse ping return.
  // Identity and read.
  const pingArray = p.split("=");
  if (!pingArray[1]) {
    return;
  }
  const pingArray2 = pingArray[1].split("/");
  const measure =
    parseFloat(pingArray2[0]) +
    parseFloat(pingArray2[1]) +
    parseFloat(pingArray2[2]);

  console.log("text parsePing pingArray", pingArray);
  const parts = pingArray[0].split(" ");

  const ps = {
    host: parts[1],
    amount: parseFloat(pingArray2[0]),
    amount2: parseFloat(pingArray2[1]),
    amount3: parseFloat(pingArray2[2]),
  };
  //    });

  return ps;
}

export function prefixText(text, prefix) {
  if (text == null) {
    return text;
  }

  if (text.startsWith(prefix)) {
    return text;
  }

  if (text.startsWith("/" + prefix)) {
    return text;
  }

  if (text.startsWith("/" + prefix + "/")) {
    return text;
  }

  if (text.startsWith(prefix + "/")) {
    return text;
  }

  return prefix + text;
}

export function isText(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
