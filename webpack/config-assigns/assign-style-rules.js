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
export function assignStyleRules(context={}, config={}, options={}) {

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

  config.module.rules.push(...[
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.(s)?css$/,
      use: [
        // NOTE - for CSS HMR to work MiniCssExtractPlugin must be reomved from dev builds
        MiniCssExtractPlugin.loader,
        'style-loader',
        CSSLoader, sassLoader
      ],
      include: [
        ...includePaths,
      ],
    }
  ]);

  config.plugins.push(...[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
  ]);

  return config;
}

export default assignStyleRules