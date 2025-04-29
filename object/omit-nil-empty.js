// libs
import _ from 'lodash'

/**
 *
 * @param {Object} [data={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function omitNilEmpty(data={}, options={}) {
  options = _.defaults(options, {

  });

  const {

  } = options;

  const omittedData = _.omitBy(data, (o) => {
    return _.some([
      _.isNil(o),
      _.every([
        _.isString(o),
        _.isEmpty(_.trim(o)),
      ]),
    ])
  });

  return omittedData;
}

export default omitNilEmpty;