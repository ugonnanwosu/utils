// libs
import _ from 'lodash'

// relative modules

// modules

export function nilMerge(a, b,) {
  return _.isNil(a)? b: a;
}

export default nilMerge