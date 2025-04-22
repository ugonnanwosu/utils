// libs
import _ from 'lodash'

// lodash
import defaults from 'lodash/defaults'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import every from 'lodash/every'

/**
 *
 * @param {Array} [arr=[]]
 * @param {Object} [options={}]
 * @param {boolean} [options.allowEmpty=true]
 * @return {*}
 */
export function fallbackTo(arr=[], options={}) {
  options = defaults(options, {
    allowEmpty: true,
  });

  const {
    allowEmpty,
  } = options;

  return find(arr, (val) => {

    const conditions = [
      !isNil(val),
    ];

    if (!allowEmpty) {
      conditions.push(
        !isEmpty(trim(val)),
      )
    }

    return every(conditions);
  });
}

export default fallbackTo;