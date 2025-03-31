// libs
import defaults from 'lodash/defaults'

// modules

/**
 *
 * @param {Object} [options={}]
 * @param {number} [options.gutter]
 * @param {number} options.width
 * @return {number}
 */
export function gutterMinLeft(options={}) {
  options = defaults({ ...options }, {
    gutter: 0,
  });

  const { width, gutter } = options;
  return (-width + gutter) || 0;
}

export default gutterMinLeft;