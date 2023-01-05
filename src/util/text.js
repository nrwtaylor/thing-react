var slugify = require('slugify')

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/*
export function getSlug(text) {
  if (text === undefined) {return ""};
//  return text.toLowerCase().replace(/\s+/g,"-");
  return slugify(text,"-").toLowerCase();

}
*/

export function extractUuid(input) {
  const uuids = extractUuids(input);
if (uuids == null) {return false;}

  if (uuids.length === 1) {
    return uuids[0];
  }

  return false;
}

export function extractUuids(input) {
  const pattern = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/g;

  return input.match(pattern);
}


export function getSlug(text) {
    if (text == null) {return ""};
  //  return text.toLowerCase().replace(/\s+/g,"-");
  //  return slugify(text,"-").toLowerCase();
 // console.log("slugtest",text.toLowerCase()
 // .replace(/[^\w ]+/g, ' '));
  /*
    return text
               .toLowerCase()
               .replace(/ -/g, ' ')
               .replace(/[^\w ]+/g, '')
               //change the below - to a + for Amazon. MT
               .replace(/ +/g, '-');
               */
               const rawSlug =  text.toLowerCase()
               .replace('+', ' ')
               .replace('-', ' ')
               .replace(/[^\w ]+/g, ' ')
               .replace(/ +/g, '-');

               const first = rawSlug.charAt(0);
               const last = rawSlug.charAt(rawSlug.length - 1);
var conditionedSlug = rawSlug;
               if (last ==='-') {conditionedSlug = conditionedSlug.slice(0, -1) }
               if (last ==='-') {conditionedSlug = conditionedSlug.slice(1) }
return conditionedSlug;
  }




export function isText(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}
