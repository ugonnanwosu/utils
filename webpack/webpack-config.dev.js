// libs
import appRootPath from 'app-root-path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import _ from 'lodash'

// relative modules
import WebpackConfigBase from './webpack-config.base'
import assignHmr from './config-assigns/assign-hmr'

// modules

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function WebpackConfigDev(context={}, configOverrides={}, options={}) {

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

  const styleRule = _.find(config.module.rules, ({ test }) => {
    return _.isEqual(test, /\.(sa|sc|c)ss$/);
  });

  if (styleRule) {
    // This allow HMR to work with CSS on dev builds
    _.pullAll(styleRule.use, [MiniCssExtractPlugin.loader]);
  }

  return config;
}

export default WebpackConfigDev