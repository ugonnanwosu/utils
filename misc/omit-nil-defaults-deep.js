// libs
import _ from 'lodash';

// relative modules

// modules
import omitNilEmpty from '@usn/utils/object/omit-nil-empty'


/**
 * @param {Object} [input={}]
 * @param {Object} [options={}]
 */
export function omitNilDefaultsDeep(input={}, options={}) {
  const resp = _.defaultsDeep(omitNilEmpty({ ...input }), { ...options });

  console.log(options);

  return resp;
}

export default omitNilDefaultsDeep