// libs
import _ from 'lodash';

// relative modules

// modules


const _isProduction = typeof PRODUCTION !== 'undefined' ? PRODUCTION : false; // eslint-disable-line

/**
 * @param {Object} [options={}]
 */
export function isProduction(options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  return _isProduction;
}

export default isProduction