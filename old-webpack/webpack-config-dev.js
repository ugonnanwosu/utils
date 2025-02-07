// libs
import _ from 'lodash'
import defaultAppRootPath from 'app-root-path'

// relative modules
import WebpackConfigBase from './webpack-config-base'

// modules


/**
 *
 * @param {WebpackContext} context
 * @param {Object} [config={}]
 * @param {WebpackConfigOptions} [options={}]
 * @return {Object}
 */
function WebpackConfigDev(context, config={}, options={}) {

  // overrides
  const webpackConfigBase = new WebpackConfigBase(context, config, {
    mode: 'development',
    ...options,
  });

  const appRootPath = _.defaultTo(options?.rootPath, defaultAppRootPath);

  // defaults
  options = _.defaultsDeep(options, {
    devtool: 'source-map',
    entries: [
      {
        name: 'main',
        paths: [
          `${appRootPath}/main.jsx`
        ]
      }
    ],
    mode: 'development',
    moduleAliases: {},
  });

  const {
    webpack,
    ReactRefreshWebpackPlugin,
    WebpackManifestPlugin,
  } = context;

  const {
    devtool,
    entries,
    mode,
    moduleAliases,
  } = options;

  const entry = _.reduce(entries, (acc, entry) => {
    const { name, paths } = entry;

    const addition = {
      [`${name}`]: [
        'webpack-hot-middleware/client',
        ...paths,
      ]
    }

    _.extend(acc, {
      ...addition,
    });

    return acc;
  }, {});

  const CSSLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        mode: 'icss'
      },
      sourceMap: true
    }
  };

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        modules: true,
        sourceMap: true,
        includePaths: _.map(moduleAliases, (path, key) => {
          return `${path}`;
        }),
      }
    }
  };

  const rules = [
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.(s)?css$/,
      use: ['style-loader', CSSLoader, sassLoader]
    }
  ];

  const plugins = [
    new WebpackManifestPlugin({
      fileName: 'webpack-manifest.json'
    }),

    new webpack.HotModuleReplacementPlugin({

    }),

    new ReactRefreshWebpackPlugin({

    }),
  ];

  const response = {
    ...webpackConfigBase,
    devServer: {
      static: `${appRootPath}/web/client/`,
      hot: true,
    },
    devtool,
    entry,

    externals: [

    ],

    mode,

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
      publicPath: '/', // important
      filename: '[name].js',
      chunkFilename: '[name].js',
      sourceMapFilename: '[file].map'
    },
  }

  response.module.rules.push(...rules);
  response.plugins.push(...plugins);

  return response;
}

export default WebpackConfigDev;