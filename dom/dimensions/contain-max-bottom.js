// libs
import defaults from 'lodash/defaults'

// modules

/**
 *
 * @param {Object} options
 * @param {number} [options.gutter]
 * @param {number} options.height
 * @return {number}
 */
export function containMaxBottom(options={}) {
  options = defaults({ ...options}, {
    gutter: 0,
  });

  const { gutter, height } = options;
  return (window.innerHeight - gutter) || 0;
}

export default containMaxBottom;
