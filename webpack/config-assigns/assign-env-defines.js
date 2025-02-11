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
export function assignEnvDefines(context={}, config={}, options={}) {

  context = _.defaults(context, webpackContext);

  const {
    webpack,
  } = context;

  config = _.defaults(config, {
    plugins: [],
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  config.plugins.push(...[
    new webpack.DefinePlugin({
      PRODUCTION: false,
      DEVELOPMENT: false,
      IS_WEBPACKED: true,
    }),
  ]);

  return config;
}

export default assignEnvDefines