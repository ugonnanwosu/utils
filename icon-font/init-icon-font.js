// libs
import _ from 'lodash';

// modules

/* utils */
import env from '@usn/utils/misc/env';
import WrappedPromise from '@usn/utils/promise/wrapped-promise';

/* data */
import ENVIRONMENT from '@usn/utils/constants/environment';

// constants

const {
  STATES,
} = ENVIRONMENT;

const [
  environmentState,
] = env([
  'environmentState',
]);

/**
 * @typedef {Object} InitIconFontAbortCondition
 * @property {function} condition
 * @property {string} message
 */

/**
 *
 * @param {Object} [options={}]
 * @param {Array<InitIconFontAbortCondition>} [options.abortConditions=[]]
 * @param {string} options.fontFamilyName
 * @param {string} options.remoteConfigSrc
 * @param {Promise} options.localConfigImport
 * @param {string} options.name
 * @param {string} options.slug
 * @param {boolean} [options.debug]
 * @returns {Promise}
 */
export function initIconFont(options={}) {

  options = _.defaults({ ...options }, {
    abortConditions: [],
    fontFamilyName: '[.:fontFamilyName:.]',
    name: '[.:name:.]',
    remoteConfigSrc: '', //
    slug: '__slug__',

    debug: false,
  });

  const {
    abortConditions,
    fontFamilyName,
    localConfigImport,
    name,
    remoteConfigSrc,
    slug,

    debug,
  } = options;

  const {
    promise,
    reject,
    resolve,
  } = new WrappedPromise();

  function defaultFetchConfigFunc() {
    const { promise, resolve, reject } = new WrappedPromise();
    localConfigImport
      .then((module) => {
        const data = module?.default;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });

    return promise;
  }

  const configFetchConfigFuncMap = [
    {
      condition: environmentState === STATES.DEVELOPMENT,
      /** @returns {Promise} */
      fetchConfigFunc: defaultFetchConfigFunc,
    },
    {
      condition: environmentState === STATES.PRODUCTION,
      /** @returns {Promise} */
      fetchConfigFunc: () => {
        const { promise, resolve, reject } = new WrappedPromise();
        fetch(remoteConfigSrc, {})
          .then(resp => resp.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          })

        return promise;
      }
    },
    {
      condition: true,
      fetchConfigFunc: defaultFetchConfigFunc,
    }
  ];

  const fetchConfigFunc = _.find(configFetchConfigFuncMap, 'condition').fetchConfigFunc;

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