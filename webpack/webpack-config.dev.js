// libs
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import _ from 'lodash'

// relative modules
import WebpackConfigBase from './webpack-config.base'

import assignHmr from './config-assigns/assign-hmr'
import assignOptimization from './config-assigns/assign-optimization'
import assignWebpackManifest from '@usn/utils/webpack/config-assigns/assign-webpack-manifest'

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
    webpack,
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
    externals: [
      'gsap',
      {  }
    ]
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const { config, envVars } = new WebpackConfigBase(context, configOverrides, options);

  assignWebpackManifest(context, config);
  assignOptimization(context, config);
  assignHmr(context, config);

  const styleRule = _.find(config.module.rules, ({ test }) => {
    return _.isEqual(test, /\.(s)?css$/);
  });

  if (styleRule) {
    // This allows HMR to work with CSS on dev builds
    _.pullAll(styleRule.use, [MiniCssExtractPlugin.loader]);
  }

  // ensure this is always done last
  config.plugins.push(...[
    new webpack.DefinePlugin({
      ...envVars,
      PRODUCTION: false,
      DEVELOPMENT: true,
    }),
  ]);

  return {
    config,
  };
}

export default WebpackConfigDev