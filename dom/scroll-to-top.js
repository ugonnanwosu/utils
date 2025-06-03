// libs
import _ from 'lodash'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'


/**
 * @param {HTMLDivElement} [node]
 * @param {Object} [position={}]
 * @param {Object} [position.x]
 * @param {Object} [position.y]
 * @param {Object} [options={}]
 */
export function scrollToTop(node, position, options={}) {
  if (!isBrowser()) {
    return;
  }

  node = !_.isUndefined(node) ? node : window;

  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  node.scrollTo(0, 0);
}

export default scrollToTop