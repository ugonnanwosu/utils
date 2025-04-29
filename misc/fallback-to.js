// libs
import _ from 'lodash'

/**
 *
 * @param {Array} [arr=[]]
 * @param {Object} [options={}]
 * @param {boolean} [options.allowEmpty=true]
 * @return {*}
 */
export function fallbackTo(arr=[], options={}) {
  options = _.defaults(options, {
    allowEmpty: true,
  });

  const {
    allowEmpty,
  } = options;

  return _.find(arr, (val) => {

    const conditions = [
      !_.isNil(val),
    ];

    if (!allowEmpty) {
      conditions.push(
        !_.isEmpty(_.trim(val)),
      )
    }

    return _.every(conditions);
  });
}

export default fallbackTo;