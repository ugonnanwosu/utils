// libs
import _ from 'lodash';
// relative modules

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise'

/**
 * @typedef {Object} PromisedDelay
 * @property {function} abort
 * @property {Promise} promise
 */

/**
 * @param {Function} [func]
 * @param {number} [delay=0]
 * @param {Object} [options={}]
 * @return {PromisedDelay}
 */
export function PromisedDelay(func, delay=0, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const {
    promise,
    resolve,
    reject,
  } = new WrappedPromise();

  const delayId = _.delay(() => {
    func();
    resolve('complete');
  }, delay);

  function abort() {
    clearTimeout(delayId);
    reject('User aborted');
  }

  return {
    abort,
    promise,
  }
}

export default PromisedDelay