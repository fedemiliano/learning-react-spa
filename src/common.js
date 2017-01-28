
// taken from: http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
import areIntlLocalesSupported from 'intl-locales-supported';

function hashCode(string) {
  var hash = 0, i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getHours(dateTime) {
  let date = new Date(dateTime)
  let min = date.getMinutes()
  return date.getHours() + ':' + (min < 9 ? '0' + min : min)
}


/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */

let DateTimeFormat

if (areIntlLocalesSupported(['fr', 'es-ES'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/es-ES');
}

export {
  DateTimeFormat,
  getHours,
  hashCode}