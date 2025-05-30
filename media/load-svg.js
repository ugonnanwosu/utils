// libs
import _ from 'lodash'

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise'

/**
 *
 * @param {Object} options
 * @param {string} [options.id]
 * @param {string} options.src
 * @returns {Promise.<string>} - HTML
 */
export function loadSvg(options={}) {

  options = _.defaults({ ...options }, {
    debug: false,
  });

  const {
    src,
    debug,
  } = options;

  const {
    promise,
    resolve,
    reject,
  } = new WrappedPromise();

  if (_.isEmpty(src)) {
    return reject(new Error('no image src url'));
  }

  fetch(src, {
    cache: 'force-cache',
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'image/svg+xml'
    })
  })
    .then(res => {
      return res.text()
    })
    .then((data) => {

      const wrapper = document.createElement('div');
      wrapper.innerHTML = data;

      // Get the Svg tag, ignore the rest
      const svg = wrapper.querySelector('svg') || {};

      try {
        // Remove any invalid XML tags as per http://validator.w3.org
        svg.removeAttribute('xmlns:a');

        // Force svg to fit its container
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
      } catch (err) {
        /* do nothing */
      }

      resolve(wrapper.innerHTML);
    })
    .catch( error => {
      reject(error);
    });

  return promise;
}

/**
 *
 * @type {function}
 * @property {string} src
 * @returns {Promise.<string>} svg
 */
export const memoLoadSvg = _.memoize(async (src) => {
  return await loadSvg({
    src,
  });
});

const MediaLoadSvg = {
  loadSvg,
  memoLoadSvg,
}

export default MediaLoadSvg;