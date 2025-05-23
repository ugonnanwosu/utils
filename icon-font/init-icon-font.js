// libs
import _ from 'lodash';

// modules
import WrappedPromise from '@usn/utils/promise/wrapped-promise';

/**
 *
 * @returns {Promise}
 */
function fallbackFetchConfigFunc() {
  const { promise, resolve, reject } = new WrappedPromise();
  const data = {};
  resolve(data);
  return promise;
}
/**
 * @typedef {Object} InitIconFontAbortCondition
 * @property {function} condition
 * @property {string} message
 */

/**
 *
 * @param {Object} [options={}]
 * @param {Array<InitIconFontAbortCondition>} [options.abortConditions=[]]
 * @param {function} options.fetchConfigFunc
 * @param {string} options.fontFamilyName
 * @param {string} options.name
 * @param {string} options.slug
 * @param {boolean} [options.debug]
 * @returns {Promise}
 */
export function initIconFont(options={}) {

  options = _.defaults({ ...options }, {
    abortConditions: [],
    fetchConfigFunc: fallbackFetchConfigFunc,
    fontFamilyName: '[.:fontFamilyName:.]',
    name: '[.:name:.]',
    slug: '__slug__',
    debug: false,
  });

  const {
    abortConditions,
    fetchConfigFunc,
    fontFamilyName,
    name,
    slug,
    debug,
  } = options;

  const {
    promise,
    reject,
    resolve,
  } = new WrappedPromise();

  const shouldAbortMap = [
    ...abortConditions,
    {
      condition: false,
      message: 'Example message',
    }
  ];

  const shouldAbortTest = _.find(shouldAbortMap, 'condition') || {};

  const shouldAbort = !_.isEmpty(shouldAbortTest);

  if (shouldAbort) {
    reject(new Error(shouldAbortTest.message || 'Unknown Reason'));
    return promise;
  }

  const response = {
    glyphs: [],
    fontFamilyName,
    slug,
    name,
  }

  fetchConfigFunc()
    .then((config) => {

      const glyphs = _.map(config.glyphs, ({ svg, search, css }) => {
        return {
          search,
          slug: css,
        }
      });

      _.extend(response, {
        glyphs,
      });

      if (debug) {
        console.trace({
          response,
        });
      }

      resolve(response);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });

  return promise;
}

export default initIconFont;