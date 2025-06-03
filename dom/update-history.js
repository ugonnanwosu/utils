// libs
import _ from 'lodash'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'


/**
 * @param {string} path
 * @param {Object} [options={}]
 * @param {string} [options.title]
 */
export function updateHistory(path='', options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;


  if (!isBrowser()) {
    return;
  }

  const currentTitle = _.document.getElementsByTagName("title")[0].innerHTML;
  const title = !_.isEmpty(_.trim(options.title)) ? options.title : currentTitle;

  // window.history.replaceState(null, title, path);
  window.history.pushState(null, title, path);
}

export default updateHistory