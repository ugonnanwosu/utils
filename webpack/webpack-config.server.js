// libs
import _ from 'lodash'

// relative modules

import WebpackConfigBase from './webpack-config.base'

import webpackContext from '@project-root/webpack-context'

// modules

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function WebpackConfigServer(context={}, configOverrides={}, options={}) {

  const {
    webpack,
  } = context;

  configOverrides = _.defaultsDeep({...configOverrides}, {
    // devtool: false,
    mode: 'production',
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const { config, envVars } = new WebpackConfigBase(webpackContext, configOverrides, options);

  config.plugins.push(...[
    new webpack.DefinePlugin({
      ...envVars,
    }),
  ]);

  return {
    config,
  };
}

export default WebpackConfigServer