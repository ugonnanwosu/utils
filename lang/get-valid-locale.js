// libs
import _ from 'lodash'

// relative modules

// modules
import isLocaleSupported from '@usn/utils/lang/is-locale-supported'
import env from '@usn/utils/misc/env'
import checkLocaleValidity from '@usn/utils/lang/check-locale-validity'

const [
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  SUPPORTED_LOCALES,
] = env([
  'DEFAULT_LOCALE',
  'FALLBACK_LOCALE',
  'SUPPORTED_LOCALES',
]);

/**
 * @param {string} locale
 */
export function getValidLocale(locale) {

  const isLocaleValid = checkLocaleValidity(locale);

  const localToUseMap = [
    {
      condition: _.isNil(locale),
      locale: FALLBACK_LOCALE,
    },
    {
      condition: isLocaleValid,
      locale,
    },
    {
      condition: true,
      locale: FALLBACK_LOCALE,
    }
  ];

  const validLocaleObj = _.find(localToUseMap, 'condition');
  return validLocaleObj.locale;
}

export default getValidLocale