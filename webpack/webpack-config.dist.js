// libs
import _ from 'lodash'

// relative modules

import WebpackConfigBase from './webpack-config.base'

import assignOptimization from './config-assigns/assign-optimization'
import assignJsMinify from './config-assigns/assign-js-minify'
import assignCssExtract from './config-assigns/assign-css-extract'
import assignWebpackManifest from './config-assigns/assign-webpack-manifest'

import webpackContext from '@project-root/webpack-context'

// modules

/**
 * @typedef {Object} WebpackConfigDistResponse
 * @property {Object} config
 */

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {WebpackConfigDistResponse}
 */
export function WebpackConfigDist(context={}, configOverrides={}, options={}) {

  const {
    webpack,
  } = context;

  configOverrides = _.defaultsDeep({...configOverrides}, {
    devtool: false,
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const { config, envVars } = new WebpackConfigBase(webpackContext, configOverrides, options);

  assignOptimization(context, config);
  assignJsMinify(context, config);
  assignCssExtract(context, config);
  assignWebpackManifest(context, config);

  // find styles rule

  const styleRule = _.find(config.module.rules, ({ test }) => {
    return _.isEqual(test, /\.(s)?css$/);
  });

  if (styleRule) {
    // This allows CSS on prod builds
    _.pullAll(styleRule.use, ['style-loader']);
  }

  // config.plugins.push(...[
  //   new webpack.IgnorePlugin({
  //     resourceRegExp: /\.dev\.(s)?css$/,
  //   }),
  // ]);

  config.plugins.push(...[
    new webpack.DefinePlugin({
      ...envVars,
    }),
  ]);

  return {
    config,
  };
}

export default WebpackConfigDist