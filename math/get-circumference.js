// libs


// libs [lodash]
import defaults from 'lodash/defaults'

// relative modules

// modules


/**
 * @param {number} radius
 * @param {Object} [options={}]
 */
export function getCircumference(radius, options={}) {
  options = defaults({ ...options }, {

  });

  const {

  } = options;

  const circumference = 2 * Math.PI * radius;
  return circumference;
}

export default getCircumference