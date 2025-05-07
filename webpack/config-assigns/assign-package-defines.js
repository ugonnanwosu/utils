// libs
import _ from 'lodash'

// relative modules
import webpackContext from '@project-root/webpack-context'
import pJson from '@project-root/package.json'

// modules

/**
 * Mutates config
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function assignPackageDefines(context={}, config={}, options={}) {

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
      VERSION: JSON.stringify(pJson.version),
    }),
  ]);

  return config;
}

export default assignPackageDefines