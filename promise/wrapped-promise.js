// libs
import defaults from 'lodash/defaults'
import extend from 'lodash/extend'
import noop from 'lodash/noop'

// modules

// constants

const PROMISE_STATUSES = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
}

/**
 * @typedef {Object} WrappedPromise
 * @property {Function} abort
 * @property {Promise} promise
 * @property {string} status
 * @property {Function} resolve
 * @property {Function} reject
 */

/**
 *
 * @param {Object} [options]
 * @param {boolean} [options.suppressRejectError=true]
 * @param {boolean} [options.debug=false]
 * @return {WrappedPromise}
 */
export function WrappedPromise(options={}) {
  options = defaults(options, {
    suppressRejectError: true,
    debug: false,
  });

  const {
    suppressRejectError,
    debug,
  } = options;

  let rejectPromise = noop;
  let resolvePromise = noop;
  let status = PROMISE_STATUSES.PENDING;

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  promise
    .catch((err) => {
      if (!suppressRejectError) {
        console.error(err.stack || err);
      }
    });

  const wrappedPromise = {
    abort: (reason='aborted') => {
      rejectPromise(reason);
    },
    promise,
    status,
    resolve: (reason) => {
      extend(wrappedPromise, {
        status: PROMISE_STATUSES.FULFILLED,
      });

      resolvePromise(reason);
    },
    reject: (reason) => {
      extend(wrappedPromise, {
        status: PROMISE_STATUSES.REJECTED,
      });
      rejectPromise(reason);
    },
  };

  return wrappedPromise;
}

export default WrappedPromise;