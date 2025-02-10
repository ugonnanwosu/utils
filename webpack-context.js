import appRootPath from 'app-root-path'
import { GitRevisionPlugin } from 'git-revision-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'

const context = {
  appRootPath,
  GitRevisionPlugin,
  ReactRefreshWebpackPlugin,
  webpack,
  WebpackBar,
  WebpackManifestPlugin,
};

export default context;