// libs
import _ from 'lodash';

// relative modules

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise';


/**
 * Since this is async it will not block the current thread
 * @param {Element} element
 * @param {Object} [options={}]
 * @return {Promise.<Array>}
 */
export function getAsyncBoundingClientRects(element, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const {
    promise,
    resolve,
    reject,
  } = new WrappedPromise();

  const response = [];

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const bounds = entry.boundingClientRect;
      response.push(bounds);
    }
    observer.disconnect();
    resolve(response);
  });

  observer.observe(element);

  return promise;
}

export default getAsyncBoundingClientRects