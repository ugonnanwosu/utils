// libs
import _ from 'lodash'

// relative modules
import getVersionEnvVars from './env-vars/get-version-env-vars'
import getGitEnvVars from './env-vars/get-git-env-vars'
import getWebpackEnvVars from './env-vars/get-webpack-env-vars'

import assignProgressBar from './config-assigns/assign-progress-bar'

import assignPackageDefines from './config-assigns/assign-package-defines'
import assignEnvDefines from './config-assigns/assign-env-defines'
import assignGitDefines from './config-assigns/assign-git-defines'
import assignStyleRules from './config-assigns/assign-style-rules'
import ecmaScriptRule from './rules/ecmascript-rule'
import assetResourceRule from './rules/asset-resource-rule'

import assignWebpackManifest from './config-assigns/assign-webpack-manifest'
import assignPreventCircDeps from './config-assigns/assign-prevent-circ-deps'

// modules

import projectConfig from '@project-root/project-config'

/**
 * @param {Object} [context={}]
 * @param {Object} [configOverrides={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function WebpackConfigBase(context={}, configOverrides={}, options={}) {
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
    }

  }, configOverrides);

  // assign / extensions

  // assignGitDefines(context, config);
  // assignEnvDefines(context, config);
  // assignPackageDefines(context, config);

  assignStyleRules(context, config);
  assignProgressBar(context, config);

  // assignWebpackManifest(context, config);

  assignPreventCircDeps(context, config);

  const gitEnvVars = getGitEnvVars(context);
  const versionEnvVars = getVersionEnvVars(context);
  const webpackEnvVars = getWebpackEnvVars(context);

  const envVars = _.merge({}, gitEnvVars, versionEnvVars, webpackEnvVars);

  return {
    config,
    envVars,
  };
}

export default WebpackConfigBase