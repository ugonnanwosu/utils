// libs
import _ from 'lodash'

// relative modules
import nilMerge from './nil-merge'

// modules

const nilMergeDeep = (a, b) => (_.isObject(a) && !_.isArray(a))
  // recursively merge objects with nilMergeDeep customizer
  ? _.mergeWith({}, a, b, nilMergeDeep)
  // let's use our default customizer
  : nilMerge(a, b);

export default nilMergeDeep