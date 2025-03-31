// libs
import defaults from 'lodash/defaults'

// modules

/**
 *
 * @param {Object} options
 * @param {number} [options.gutter]
 * @param {number} [options.width]
 * @return {number}
 */
export function containMaxRight(options={}) {
  options = defaults({ ...options }, {
    gutter: 0,
  });

  const { gutter, width } = options;

  return (window.innerWidth - gutter) || 0;
}

export default containMaxRight;