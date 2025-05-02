// libs
import _ from 'lodash';

// relative modules

// modules
import nilMerge from '@usn/utils/object/nil-merge'

/**
 * @param {Object} [input={}]
 * @param {Object} [defaults={}]
 */
export function omitNilDefaults(input={}, defaults={}) {
  const resp = _.mergeWith({}, input, defaults, nilMerge);

  return resp;
}

export default omitNilDefaults