// libs
import _ from 'lodash'

// modules

/**
 *
 * @param {Object} options
 * @param {number} [options.gutter]
 * @param {number} options.height
 * @return {number}
 */
export function gutterMaxBottom(options={}) {
  options = _.defaults({ ...options }, {
    gutter: 50,
  });

  const { gutter, height } = options;
  return (window.innerHeight + (height - gutter)) || 0;
}

export default gutterMaxBottom;
