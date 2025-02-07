// libs

import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignProgressBar(context={}, config={}) {
  context = _.defaults(context, webpackContext)

  const {
    WebpackBar,
  } = context;

  config.plugins.push(...[
    new WebpackBar(),
  ]);

  return config;
}

export default assignProgressBar