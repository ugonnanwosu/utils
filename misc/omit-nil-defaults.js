// libs
import _ from 'lodash';

// relative modules

// modules
import omitNilEmpty from '@usn/utils/object/omit-nil-empty'


/**
 * @param {Object} [input={}]
 * @param {Object} [options={}]
 */
export function omitNilDefaults(input={}, options={}) {
  const resp = _.defaults(omitNilEmpty({ ...input }), { ...options });
  return resp;
}

export default omitNilDefaults