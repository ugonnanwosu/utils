// libs
import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@usn/utils/webpack-context'

/**
 * @param {Object} [context={}]
 * @param {Object} [options={}]
 */
export function getGitEnvVars(context={}, options={}) {
  context = _.defaults(context, webpackContext);

  const {
    GitRevisionPlugin,
  } = context;

  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const gitRevisionPlugin = new GitRevisionPlugin();

  return {
    GIT_VERSION: JSON.stringify(gitRevisionPlugin.version()),
    GIT_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    GIT_BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    GIT_LAST_COMMIT_DATETIME: JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
  }
}

export default getGitEnvVars