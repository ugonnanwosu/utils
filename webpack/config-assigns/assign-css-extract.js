// libs
import _ from 'lodash'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// relative modules
import CSSLoader from '../loaders/css-loader'
import sassLoader from '../loaders/sass-loader'

// modules
import projectConfig from '@project-root/project-config'
import webpackContext from '@project-root/webpack-context'

const {
  includePaths,
} = projectConfig;

/**
 * Mutates config
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function assignCssExtract(context={}, config={}, options={}) {

  context = _.defaults(context, webpackContext);

  const {

  } = context;

  config = _.defaultsDeep(config, {
    plugins: [],
    module: {
      rules: [],
    }
  });

  options = _.defaults({...options}, {
    isDevelopment: false,
    isProduction: false,
  });

  const {
    isDevelopment,
    isProduction,
  } = options;

  config.plugins.push(...[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
  ]);

  return config;
}

export default assignCssExtract