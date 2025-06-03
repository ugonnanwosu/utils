// libs
import _ from 'lodash';

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser';
import env from '@usn/utils/misc/env';
import getBootstrap from '@usn/utils/dom/get-bootstrap';

const bootstrap = getBootstrap();


const [
  BASE_URL,
] = env([
  'BASE_URL',
]);

/**
 * @param {string} ssrUrlPath
 * @param {Object} [options={}]
 */
export function getCurrentHref(ssrUrlPath, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const href = isBrowser() ? window.location.href : `${BASE_URL}${ssrUrlPath}`

  return href;
}

export default getCurrentHref