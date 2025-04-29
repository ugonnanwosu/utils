// libs
import _ from 'lodash'

// relative modules
import addScript from './add-script'

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise'
import isBrowser from '@usn/utils/dom/is-browser'


/**
 * @param {Object} [options={}]
 * @param {string} options.src
 * @param {string} options.fallbackSrc - global/window variable
 * @param {string} [options.auxSrc] - global/window variable
 * @param {string} [options.root] - global/window variable
 * @return {Promise}
 */
export function addScriptWithFallback(options={}) {
  options = _.defaults({...options}, {

  });

  const {
    src,
    fallbackSrc,
    auxSrc,
    root,
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

  addScript({
    src,
    root,
  })
    .then(() => {
      resolve(window[root]);
    })
    .catch((error) => {
      return addScript({
        src: fallbackSrc,
        root,
      })
    })
    .then(() => {
      resolve(window[root]);
    })
    .catch((error) => {
      return addScript({
        src: auxSrc,
        root,
      })
    })
    .then(() => {
      resolve(window[root]);
    })
    .catch((error) => {
      const err = new Error(`Failed to load src "${src}", fallbackSrc "${fallbackSrc}" & auxSrc "${auxSrc}" `);
      reject(err);
    })
    .finally(() => {

    });

  return promise;
}

export default addScriptWithFallback