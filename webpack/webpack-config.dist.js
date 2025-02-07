// libs
import appRootPath from 'app-root-path'

import _ from 'lodash'


// relative modules
import WebpackConfigBase from './webpack-config.base'

// modules

import contextHelper from './helpers/context-helper'
import assignJsMinify from '@usn/un-web/new-webpack/config-assigns/assign-js-minify';

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @param {ProjectConfig} [options.projectConfig]
 * @return {Object}
 */
export function WebpackConfigDist(context={}, configOverrides={}, options={}) {
  context = contextHelper(context);

  const {
    appRootPath, // may not work with PM2
  } = context;

  configOverrides = _.defaultsDeep({...configOverrides}, {

  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const config = new WebpackConfigBase(context, configOverrides, options);

  assignJsMinify(context, config);

  return config;
}

export default WebpackConfigDist