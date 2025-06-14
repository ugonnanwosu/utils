// libs
import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'

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
    webpack,
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
      GIT_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      GIT_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
      GIT_BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
      GIT_LAST_COMMIT_DATETIME: JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
    }),
  ]);

  return config;
}

export default assignGitDefines