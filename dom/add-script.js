// libs


// libs [lodash]
import defaults from 'lodash/defaults'
import extend from 'lodash/extend'

// relative modules

// modules

import WrappedPromise from '@usn/utils/promise/wrapped-promise'
import isBrowser from '@usn/utils/dom/is-browser'

/**
 * @param {Object} [options={}]
 * @param {string} options.src
 * @param {string} [options.root] - global/window variable
 * @param {string} [options.content] - global/window variable
 * @return {Promise}
 */
export function addScript(options={}) {
  options = defaults({...options}, {
    content: '',
  });

  const {
    src,
    root,
    content,
  } = options;

  const {
    promise,
    resolve,
    reject,
  } = new WrappedPromise();

  if (!isBrowser()) {
    reject(new Error('Can only be used in browser'));
    return promise;
  }

  const script = document.createElement('script');

  script.innerHTML = `${content}`;

  extend(script, {
    type: 'text/javascript',
    src,
  });

  document.head.appendChild(script);

  function handleLoad() {
    cleanup();
    resolve(window[root]);
  }

  function handleError(err) {
    cleanup();
    reject(err);
  }

  function cleanup() {
    script.removeEventListener('load', handleLoad);
    script.removeEventListener('error', handleError);
  }

  script.addEventListener('load', handleLoad);
  script.addEventListener('error', handleError);

  return promise;
}

export default addScript