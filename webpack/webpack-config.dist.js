// libs
import appRootPath from 'app-root-path'

import _ from 'lodash'


// relative modules
import assignJsMinify from './config-assigns/assign-js-minify'
import WebpackConfigBase from './webpack-config.base'

import webpackContext from '@project-root/webpack-context'

// modules


/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function WebpackConfigDist(context={}, configOverrides={}, options={}) {

  const {
    appRootPath, // may not work with PM2
  } = context;

  configOverrides = _.defaultsDeep({...configOverrides}, {

  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const config = new WebpackConfigBase(webpackContext, configOverrides, options);

  assignJsMinify(context, config);
  
  // find styles rule

  return config;
}

export default WebpackConfigDist