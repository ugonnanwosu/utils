// libs
import _ from 'lodash';

// relative modules

// modules
import nilMergeDeep from '@usn/utils/object/nil-merge-deep'


/**
 * @param {Object} [input={}]
 * @param {Object} [defaults={}]
 */
export function omitNilDefaultsDeep(input={}, defaults={}) {
  const resp = _.mergeWith({}, input, defaults, nilMergeDeep);

  return resp;
}

export default omitNilDefaultsDeep