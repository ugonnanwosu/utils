// libs

import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignRemoveOptimization(context={}, config={}) {
  // context = _.defaults(context, webpackContext)

  delete config.optimization;

  return config;
}

export default assignRemoveOptimization