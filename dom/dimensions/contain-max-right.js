// libs
import _ from 'lodash';

// modules

/**
 *
 * @param {Object} options
 * @param {number} [options.gutter]
 * @param {number} [options.width]
 * @return {number}
 */
export function containMaxRight(options={}) {
  options = _.defaults({ ...options }, {
    gutter: 10, // accounts for scrollbar and border
  });

  const { gutter, width } = options;

  return (window.innerWidth - gutter) || 0;
}

export default containMaxRight;