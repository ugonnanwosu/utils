// libs
import _ from 'lodash'

// modules

/**
 *
 * @param {Object} [options={}]
 * @param {number} [options.gutter]
 * @return {number}
 */
export function gutterMinTop(options={}) {
  options = _.defaults({ ...options }, {
    gutter: 0,
  });

  const { gutter, height } = options;
  return (-height + gutter) || 0;
}

export default gutterMinTop;