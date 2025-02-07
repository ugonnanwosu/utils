// libs
import _ from 'lodash'


// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * Mutates config
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function assignHmr(context={}, config={}, options={}) {

  context = _.defaults(context, webpackContext);

  const {
    ReactRefreshWebpackPlugin,
    webpack,
  } = context;

  config = _.defaultsDeep(config, {
    plugins: [],
    module: {
      rules: [],
    }
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;


  config.plugins.push(...[
    new webpack.HotModuleReplacementPlugin({

    }),

    new ReactRefreshWebpackPlugin({

    }),
  ]);

  return config;
}

export default assignHmr