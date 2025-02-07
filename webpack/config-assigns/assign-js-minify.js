// libs

import _ from 'lodash'
import TerserPlugin from 'terser-webpack-plugin'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignJsMinify(context={}, config={}) {
  context = _.defaults(context, webpackContext)

  const {

  } = context;

  _.merge(config, {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  });

  return config;
}

export default assignJsMinify