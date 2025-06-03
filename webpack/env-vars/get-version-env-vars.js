// libs
import _ from 'lodash'

// relative modules

// modules
import pJson from '@usn/utils/package.json'
import webpackContext from '@usn/utils/webpack-context'

/**
 * @param {Object} [context={}]
 * @param {Object} [options={}]
 */
export function getVersionEnvVars(context={}, options={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = context;

  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  return {
    VERSION: JSON.stringify(pJson.version),
  }
}

export default getVersionEnvVars