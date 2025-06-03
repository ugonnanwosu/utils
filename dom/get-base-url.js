/** @deprecated */
// libs
import _ from 'lodash'

// relative modules

// modules
import env from '@usn/utils/misc/env'

// import isBrowser from '@usn/utils/dom/is-browser'
// import isDevelopment from '@usn/utils/dom/is-development'
import isProduction from '@usn/utils/dom/is-production'

const [
  BASE_URL_DEVELOPMENT,
  BASE_URL_PRODUCTION,
] = env([
  'BASE_URL_DEVELOPMENT',
  'BASE_URL_PRODUCTION',
]);

/**
 * @param {Object} [options={}]
 */
export function getBaseUrl(options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const baseUrl = isProduction() ? BASE_URL_PRODUCTION : BASE_URL_DEVELOPMENT;
  return baseUrl;
}

export default getBaseUrl