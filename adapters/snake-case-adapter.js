// libs
import _ from 'lodash';

// relative modules

// modules

/**
 * @param {Object} input
 * @param {Object} [options={}]
 * @param {Object} [options={}]
 * @param {Array} [options.exclude=[]]
 * @return {Object}
 */
export function snakeCaseAdapter(input={}, options={}) {
  options = _.defaults(options, {
    exclude: [],
  });

  const {
    exclude,
  } = options;

  const snakeize = obj => _.transform(obj, (acc, value, key, target) => {
    const shouldExclude = _.includes(exclude, key);
    const snakeKey = _.isArray(target) || shouldExclude ? key : _.snakeCase(key);
    acc[snakeKey] = _.isObject(value) && !shouldExclude ? snakeize(value) : value;
  });

  return snakeize(input);
}

export default snakeCaseAdapter