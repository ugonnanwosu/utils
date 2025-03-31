// libs
import defaults from 'lodash/defaults'

// modules

/**
 *
 * @param {Object} [options={}]
 * @param {number} [options.gutter]
 * @return {number}
 */
export function containMinTop(options={}) {
  options = defaults({ ...options }, {
    gutter: 0,
  });

  const { width, gutter } = options;

  return 0;
}

export default containMinTop;