// libs
import _ from 'lodash'

// modules
import env from '@usn/utils/misc/env'

const [
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE
] = env([
  'DEFAULT_LOCALE',
  'FALLBACK_LOCALE',
  'SUPPORTED_LOCALES'
]);


/**
 * @param {string} locale
 * @param {Object} [options={}]
 */
export function isLocaleSupported(locale, options={}) {
  return _.includes(SUPPORTED_LOCALES, locale);
}

export default isLocaleSupported