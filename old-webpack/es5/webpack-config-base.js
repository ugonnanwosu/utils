// libs
const _ = require('lodash')
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { GitRevisionPlugin: DefaultGitRevisionPlugin } = require('git-revision-webpack-plugin')
const DefaultWebpackManifestPlugin = require('webpack-manifest-plugin')
const DefaultReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const appRootPath = require('app-root-path')
const DefaultWebpackBar = require('webpackbar')

// relative modules

const webpackConfigAbstract = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.scss',
    ],
    modules: [
      'node_modules',
    ],
    alias: {},
  }
}

const IS_WEBPACKED = 'IS_WEBPACKED';

const GIT_VERSION = 'GIT_VERSION'
const GIT_COMMIT_HASH = 'GIT_COMMIT_HASH'
const GIT_BRANCH = 'GIT_BRANCH'
const GIT_LAST_COMMIT_DATETIME = 'GIT_LAST_COMMIT_DATETIME'


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
          test: /\.(html|txt)$/i,
          use: 'raw-loader'
        },
        {
          test: /\.js(x)?$/,

          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: [
                  '@babel/plugin-transform-runtime',
                ],
                presets: ['@babel/preset-react']
              }
            },
            // {
            //   loader: 'webpack-conditional-loader'
            // }
          ],
          include: [
            path.resolve(__dirname, `${rootPath}`),
            ...includePaths,
          ],
          exclude: [
            /webpack\/runtime/,
            `${appRootPath}/node_modules/`
          ]
        },
        {
          test: /\.(jpe?g|png|svg)$/,
          type: 'asset/resource',
        },

        {
          test: /\.(woff|woff2)?$/,
          type: 'asset/resource',
        }
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

module.exports = WebpackConfigBase;