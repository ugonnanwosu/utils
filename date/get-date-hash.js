// libs
import _ from 'lodash'

// relative modules

// modules


/**
 * @param {Object} [options={}]
 */
export function getDateHash(options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  return (+new Date).toString(36);
}

export default getDateHash