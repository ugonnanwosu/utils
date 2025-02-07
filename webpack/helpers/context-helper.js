// libs
import _ from 'lodash'
import defaultAppRootPath from 'app-root-path'

import { GitRevisionPlugin as DefaultGitRevisionPlugin } from 'git-revision-webpack-plugin'
import { WebpackManifestPlugin as DefaultWebpackManifestPlugin } from 'webpack-manifest-plugin'
import DefaultReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import DefaultWebpackBar from 'webpackbar'
import defaultWebpack from 'webpack'

// relative modules

// modules

/**
 * @param {Object} [context={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function contextHelper(context={}, options={}) {
  context = _.defaultsDeep(_.cloneDeep(context), {
    appRootPath: defaultAppRootPath,
    GitRevisionPlugin: DefaultGitRevisionPlugin,
    WebpackManifestPlugin: DefaultWebpackManifestPlugin,
    ReactRefreshWebpackPlugin: DefaultReactRefreshWebpackPlugin,
    WebpackBar: DefaultWebpackBar,
    webpack: defaultWebpack,
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;


  return context;
}

export default contextHelper