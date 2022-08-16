var slugify = require('slugify')

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getSlug(text) {
  if (text === undefined) {return ""};
//  return text.toLowerCase().replace(/\s+/g,"-");
  return slugify(text,"-").toLowerCase();

}

