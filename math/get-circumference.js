// libs
import _ from 'lodash';

// modules


/**
 * @param {number} radius
 * @param {Object} [options={}]
 */
export function getCircumference(radius, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const circumference = 2 * Math.PI * radius;
  return circumference;
}

export default getCircumference