// libs
import _ from 'lodash';

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'


const _isDevelopment = typeof DEVELOPMENT !== 'undefined' ? DEVELOPMENT : false; // eslint-disable-line

/**
 * @param {Object} [options={}]
 */
export function isDevelopment(options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  return _isDevelopment;
}

export default isDevelopment