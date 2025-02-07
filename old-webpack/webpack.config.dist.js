// libs
const _ = require('lodash');
const webpack = require('webpack');
const appRoot = require('app-root-path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackManifestPluginModule = require('webpack-manifest-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { WebpackManifestPlugin } = WebpackManifestPluginModule;

// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackConfigBase = require('./es5/webpack-config-base.js');

// modules
const webpackAbstractConfig = {
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
};

const webpackConfigBase = new WebpackConfigBase({
  webpack,

});

// constants
// const NODE_ENV = (process.env.NODE_ENV || config.NODE_ENV);

let webpackConfig = _.extend(
  {},
  webpackAbstractConfig,
  webpackConfigBase,
  {
    mode: 'production',
    devtool: 'source-map',

    entry: {
      'main': ['./main-prod.jsx']
    },

    output: {
      path: `${appRoot}/web/client/dist`,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash].js',
    },

    externals: {

    },

    optimization: {
      // minimizer: [
      //   new UglifyJsPlugin({
      //     cache: true,
      //     parallel: true,
      //     sourceMap: false // set to true if you want JS source maps
      //   }),
      //   new OptimizeCSSAssetsPlugin({
      //     cssProcessor: require('cssnano'),
      //     cssProcessorPluginOptions: {
      //       // preset: ['default', { discardComments: { removeAll: true } }],
      //     },
      //   })
      // ],

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
  }
);

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
  }
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      modules: true,
      sourceMap: true,
      indentWidth: 2,
      includePaths: [

      ]
    }
  }
};

webpackConfig.module.rules.push(...[
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      CSSLoader, sassLoader,
    ]
  }
]);

webpackConfig.plugins.push(...[

  // new OptimizeCssAssetsPlugin(),

  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].[chunkhash].css',
  }),

  new WebpackManifestPlugin({
    fileName: 'webpack-manifest.json'
  }),

  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    },
    __DEV__: false,
    __BUILT__: true
  }),

  new WebpackBar(),

  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
    cwd: process.cwd(),
  }),

  new webpack.ProvidePlugin({

  }),

]);

module.exports = webpackConfig;