// libs
import _ from 'lodash'

// relative modules
import contextHelper from './helpers/context-helper'
import assignProgressBar from './config-assigns/assign-progress-bar';

import assignGitDefines from './config-assigns/assign-git-defines'
import assignStyleRules from './config-assigns/assign-style-rules'
import ecmaScriptRule from './rules/ecmascript-rule'
import assetResourceRule from './rules/asset-resource-rule'

// modules

import projectConfig from '@project-root/project-config'
import assignWebpackManifest from '@usn/un-web/new-webpack/config-assigns/assign-webpack-manifest';
import assignPreventCircDeps from '@usn/un-web/new-webpack/config-assigns/assign-prevent-circ-deps';

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function WebpackConfigBase(context={}, configOverrides={}, options={}) {
  context = contextHelper(context);

  configOverrides = _.defaultsDeep({...configOverrides}, {

  });

  options = _.defaults({...options}, {

  });

  const {
    appRootPath,
    GitRevisionPlugin,
    ReactRefreshWebpackPlugin,
    webpack,
    WebpackBar,
    WebpackManifestPlugin,
  } = context;

  const {

  } = options;

  const config = _.merge({

    devtool: 'source-map',
    devServer: {},

    entry: {},

    externals: [
      // '@babel',
      // /^express.+$/,
      // /^lodash.+$/,
      // 'modernizr',
    ],

    module: {
      rules: [
        ecmaScriptRule,
        assetResourceRule,
      ],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          }
        }
      }
    },

    output: {
      path: `${appRootPath}/web/client`,
      publicPath: '/',
      filename: '[name].js',
    },

    plugins: [],

    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.css',
        '.scss',

        '.txt',
        '.html',
      ],
      modules: [
        'node_modules',
      ],
      alias: {
        ...projectConfig.moduleAliases,
      },
    },

  }, configOverrides);

  // assign / extensions

  assignGitDefines(context, config);
  assignStyleRules(context, config);
  assignProgressBar(context, config);
  assignWebpackManifest(context, config);
  assignPreventCircDeps(context, config);

  return config;
}

export default WebpackConfigBase