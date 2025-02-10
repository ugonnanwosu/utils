// libs
import _ from 'lodash'

// relative modules

// modules
import WebpackDefines from '@usn/utils/constants/webpack-defines'

import LocalWebpackDefines from '@project-root/constants/webpack-defines'
import webpackContext from '@project-root/webpack-context'

const {
  IS_WEBPACKED,

  GIT_VERSION,
  GIT_COMMIT_HASH,
  GIT_BRANCH,
  GIT_LAST_COMMIT_DATETIME
} = _.merge(WebpackDefines, LocalWebpackDefines);

/**
 * Mutates config
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 * @param {Object} [options={}]
 * @return {Object}
 */
export function assignGitDefines(context={}, config={}, options={}) {

  context = _.defaults(context, webpackContext);

  const {
    GitRevisionPlugin,
    ReactRefreshWebpackPlugin,
    webpack,
    WebpackBar,
    WebpackManifestPlugin,
  } = context;

  config = _.defaults(config, {
    plugins: [],
  });

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const gitRevisionPlugin = new GitRevisionPlugin();

  config.plugins.push(...[
    new webpack.DefinePlugin({
      [`${IS_WEBPACKED}`]: true,
      [`${GIT_VERSION}`]: JSON.stringify(gitRevisionPlugin.version()),
      [`${GIT_COMMIT_HASH}`]: JSON.stringify(gitRevisionPlugin.commithash()),
      [`${GIT_BRANCH}`]: JSON.stringify(gitRevisionPlugin.branch()),
      [`${GIT_LAST_COMMIT_DATETIME}`]: JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
    }),
  ]);

  return config;
}

export default assignGitDefines