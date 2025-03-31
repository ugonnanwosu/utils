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
export function gutterMaxRight(options={}) {
  options = defaults({ ...options }, {
    gutter: 0,
  });

  const { gutter, width } = options;
  return (window.innerWidth + (width - gutter)) || 0;
}

export default gutterMaxRight;