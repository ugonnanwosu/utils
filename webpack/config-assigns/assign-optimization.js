// libs

import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignOptimization(context={}, config={}) {
  context = _.defaults(context, webpackContext)

  const {

  } = context;

  _.merge(config, {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {

          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
          },

          styles: {
            name: 'styles',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        }
      },

      minimizer: [

      ],
    },
  });

  return config;
}

export default assignOptimization