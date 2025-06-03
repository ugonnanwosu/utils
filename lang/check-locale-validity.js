// libs
import _ from 'lodash'

// relative modules

// modules
import isLocaleSupported from '@usn/utils/lang/is-locale-supported'
/**
 * @param {string} locale
 */
export function checkLocaleValidity(locale) {
  return _.some([
    _.isNil(locale),
    isLocaleSupported(locale),
  ]);
}

export default checkLocaleValidity