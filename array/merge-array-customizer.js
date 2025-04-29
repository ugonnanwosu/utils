// libs
import _ from 'lodash'

/**
 *
 * @param {Array} objValue
 * @param {Array} srcValue
 * @returns {*}
 */
export function mergeArrayCustomizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export default mergeArrayCustomizer