// libs
import _ from 'lodash';

// relative modules

// modules
import webpackContext from '@usn/utils/webpack-context';


/**
 * @param {Object} [context={}]
 * @param {Object} [options={}]
 */
export function getWebpackEnvVars(context={}, options={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = context;

  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  return {
    PRODUCTION: false,
    DEVELOPMENT: false,
    IS_WEBPACKED: true,
  }
}

export default getWebpackEnvVars