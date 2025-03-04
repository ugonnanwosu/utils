// libs

// libs [lodash]
import defaults from 'lodash/defaults'
import delayFn from 'lodash/delay'

// relative modules

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise'

/**
 * @param {Function} [func]
 * @param {number} [delay=0]
 * @param {Object} [options={}]
 */
export function PromisedDelay(func, delay=0, options={}) {
  options = defaults({ ...options }, {

  });

  const {

  } = options;

  const {
    promise,
    resolve,
    reject,
  } = new WrappedPromise();

  const delayId = delayFn(() => {
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