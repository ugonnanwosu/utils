// libs
import _ from 'lodash';

// relative modules

// modules

/**
 * @param {*} a
 * @param {*} b
 */
export function castIfNilCustomiser(a, b) {
  if (_.isNil(a)) {
    return b;
  }
}

export default castIfNilCustomiser