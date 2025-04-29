// libs
import _ from 'lodash'

/**
 *
 * @param {Array} input
 * @param {Object} [options={}]
 * @param {Array} [options.without=[]]
 * @param {Array} [options.excluded=[]]
 * @param {Boolean} [options.debug=false]
 * @return {Array}
 */
export function compact(input=[], options={}) {
  options = _.defaults(options, {
    without: [
      undefined,
      0,
      null,
    ],
    excluded: [],


    debug: false,
  });

  const {
    without,
    excluded,


    debug,
  } = options;

  const newArray = _.reduce(input,

    /**
     *
     * @param {Array} acc - accumulator
     * @param {*} value
     * @returns {Array}
     */
    (acc, value) => {

    const isEmpty = _.isEmpty(_.trim(value));
    const isExcluded = _.includes(excluded, value);
    const isWithout = _.includes(without, value);

    const shouldAdd = _.some([

      _.every([
        isExcluded,
      ]),

      _.every([
        !isEmpty,
        !isWithout,
      ]),

    ]);

    if (shouldAdd) {
      acc.push(value);
    }

    return acc;
  }, []);

  return newArray;
}

export default compact;