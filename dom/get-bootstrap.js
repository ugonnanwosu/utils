// libs

// libs [lodash]
import defaults from 'lodash/defaults'

// relative modules
import isBrowser from './is-browser'

// modules


/**
 * @param {Object} [options={}]
 * @return {Object}
 */
export function getBootstrap(options={}) {
  options = defaults(options, {

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