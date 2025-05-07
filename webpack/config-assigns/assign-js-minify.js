// libs

import _ from 'lodash'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

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
      minimizer: [
        new TerserPlugin(),
        // new CssMinimizerPlugin(),
      ],
    },
  });

  return config;
}

export default assignJsMinify