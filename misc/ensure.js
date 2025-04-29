// libs
import _ from 'lodash'

// relative modules

// modules
import castIfNilCustomiser from '@usn/utils/customisers/cast-if-nil-customiser'


/**
 *
 * Note: This method mutates input
 * @param {Object} [input={}]
 * @param {Object} [sources={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function ensure(input={}, sources={}, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  _.mergeWith(input, sources, castIfNilCustomiser);

  return input;
}

export default ensure