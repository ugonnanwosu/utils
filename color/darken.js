
// libs
import _ from 'lodash';

// relative modules
import lightenDarken from './lighten-darken'

// modules


/**
 * @param {string} col
 * @param {number} [amount]
 * @param {Object} [options={}]
 * @param {boolean} [options.useHash=false]
 */
export function darken(col, amount, options={}) {
  options = _.defaults(options, {
    useHash: false,
  });

  const {

  } = options;

  return lightenDarken(col, -amount, options);
}

export default darken