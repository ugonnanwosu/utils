// libs
import appRootPath from 'app-root-path'

import _ from 'lodash'

// relative modules
import WebpackConfigBase from './webpack-config.base'

// modules

import contextHelper from './helpers/context-helper'
import assignHmr from '@usn/un-web/new-webpack/config-assigns/assign-hmr'

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @param {ProjectConfig} [options.projectConfig]
 * @return {Object}
 */
export function WebpackConfigDev(context={}, configOverrides={}, options={}) {
  context = contextHelper(context);

  const {
    appRootPath, // may not work with PM2
  } = context;

  configOverrides = _.defaultsDeep({...configOverrides}, {
    devServer: {
      static: `${appRootPath}/web/client/`,
      hot: true,
    },
    output: {
      filename: '[name].js',
      publicPath: '/', // important
      chunkFilename: '[name].js',
      sourceMapFilename: '[file].map'
    },
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const config = new WebpackConfigBase(context, configOverrides, options);

  assignHmr(context, config);

  return config;
}

export default WebpackConfigDev