// libs
import _ from 'lodash';

// relative modules
import isBrowser from './is-browser'

// modules


/**
 * @param {Object} [options={}]
 * @return {Object}
 */
export function getBootstrap(options={}) {
  options = _.defaults(options, {

  });

  const {

  } = options;


  if (!isBrowser()) {
    return {}
  }

  const bootstrap = window?.bootstrap || {};
  return bootstrap;
}

export default getBootstrap