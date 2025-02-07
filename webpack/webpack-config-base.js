/**
 * FIXME - Remove appRootPath to ensure this will work with PM2
 */

// libs
import _ from 'lodash'
import path from 'path'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { GitRevisionPlugin as DefaultGitRevisionPlugin } from 'git-revision-webpack-plugin'
import { WebpackManifestPlugin as DefaultWebpackManifestPlugin } from 'webpack-manifest-plugin'
import DefaultReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import DefaultWebpackBar from 'webpackbar'

// relative modules
import webpackConfigAbstract from './webpack-config-abstract'
import WebpackDefines from '../constants/webpack-defines'

import ProjectConfig from '../project-config'
import appRootPath from 'app-root-path'

const {
  excludedWebpackNodeModules,
} = ProjectConfig;

const {
  IS_WEBPACKED,

  GIT_VERSION,
  GIT_COMMIT_HASH,
  GIT_BRANCH,
  GIT_LAST_COMMIT_DATETIME
} = WebpackDefines;

/**
 *
 * @param {WebpackContext} [context={}]
 * @param {Object} [config={}] - webpack config
 * @param {WebpackConfigOptions} [options={}]
 */
function WebpackConfigBase(context={}, config={}, options={}) {

  const rootPath = _.defaultTo(options?.rootPath, appRootPath);

  context = _.defaultsDeep(_.cloneDeep(context), {
    GitRevisionPlugin: DefaultGitRevisionPlugin,
    WebpackManifestPlugin: DefaultWebpackManifestPlugin,
    ReactRefreshWebpackPlugin: DefaultReactRefreshWebpackPlugin,
    WebpackBar: DefaultWebpackBar,
  });

  config = _.defaultsDeep(_.cloneDeep(config), {
    ...webpackConfigAbstract,
  });

  options = _.defaultsDeep(options, {
    aliasNodeModulePaths: [],
    entries: [],
    excludedWebpackNodeModules: [],
    mode: 'none',
    moduleAliases: {},
    rootPath: `${appRootPath}`,
  });

  const {
    webpack,
    GitRevisionPlugin,
    ReactRefreshWebpackPlugin,
    WebpackManifestPlugin,
    WebpackBar,
  } = context;

  const {
    devtool,
    entries,
    excludedWebpackNodeModules,
    mode,
    moduleAliases,
  } = options;

  const gitRevisionPlugin = new GitRevisionPlugin();

  // TODO - fixme and confirm working
  const includePaths = _.reduce(moduleAliases, (arr, path, key) => {
    arr.push(path);
    return arr;
  }, []);

  const response = _.extend({}, config, {

    devtool: 'source-map',

    externals: [
      '@babel',
      /^express.+$/,
      /^lodash.+$/,
      'modernizr',
    ],

    stats: {
      warnings: false
    },

    entry: {
      /* Abstract */
    },

    module: {
      rules: [
        {
          // test: /\.(js|jsx|ts|tsx)$/,
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // Make sure cacheDirectory is disabled so that Babel
                // always rebuilds dependent module
                cacheDirectory: false,
                plugins: [
                  '@babel/plugin-transform-runtime',
                ],
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ]
              }
            },
            // {
            //   loader: 'webpack-conditional-loader'
            // }
          ],
          include: [
            path.resolve(__dirname, `${rootPath}`),
            ...includePaths,
            // path.resolve(__dirname, `${rootPath}/../`),
          ],
          exclude: [
            /webpack\/runtime/,
            // `${appRootPath}/node_modules/`
          ]
        },
        {
          test: /\.(jpe?g|png|svg)$/,
          type: 'asset/resource',
        },

        {
          test: /\.(woff|woff2)?$/,
          type: 'asset/resource',
        },
      ]
    },

    output: {

    },

    plugins: [

      new webpack.DefinePlugin({
        [`${IS_WEBPACKED}`]: true,
        [`${GIT_VERSION}`]: JSON.stringify(gitRevisionPlugin.version()),
        [`${GIT_COMMIT_HASH}`]: JSON.stringify(gitRevisionPlugin.commithash()),
        [`${GIT_BRANCH}`]: JSON.stringify(gitRevisionPlugin.branch()),
        [`${GIT_LAST_COMMIT_DATETIME}`]: JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
      }),

      new WebpackBar(),

      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        cwd: process.cwd(),
      }),

      new webpack.ProvidePlugin({

      }),
    ]
  });

  return response;
}

export default WebpackConfigBase;