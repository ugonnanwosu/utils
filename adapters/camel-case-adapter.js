// libs
import _ from 'lodash'

// relative modules

// modules

/**
 * @param {Object} input
 * @param {Object} [options={}]
 * @param {Object} [options={}]
 * @param {Array} [options.exclude=[]]
 * @return {Object}
 */
export function camelCaseAdapter(input={}, options={}) {
  options = _.defaults(options, {
    exclude: [],
  });

  const {
    exclude,
  } = options;

  const camelize = obj => _.transform(obj, (acc, value, key, target) => {
    const shouldExclude = _.includes(exclude, key);
    const camelKey = _.isArray(target) || shouldExclude ? key : _.camelCase(key);
    acc[camelKey] = _.isObject(value) && !shouldExclude ? camelize(value) : value;
  });

  return camelize(input);
}

export default camelCaseAdapter