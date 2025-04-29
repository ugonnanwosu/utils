// libs
import _ from 'lodash';

// modules

/**
 *
 * @param {Object} [options={}]
 * @param {number} [options.gutter]
 * @return {number}
 */
export function containMinTop(options={}) {
  options = _.defaults({ ...options }, {
    gutter: 0,
  });

  const { width, gutter } = options;

  return 0;
}

export default containMinTop;