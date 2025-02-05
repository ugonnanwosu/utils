// libs

// libs [lodash]
import defaults from 'lodash/defaults'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'

/**
 * @param {Object} [options={}]
 * @param {string} [options.title]
 * @param {string} [options.favicon]
 */
export function updateHtmlHead(options={}) {
  options = defaults(options, {

  });

  const {

  } = options;

  if (!isBrowser()) {
    return
  }


  document.querySelector('title').textContent = newPageTitle;

}

export default updateHtmlHead