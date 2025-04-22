// libs

//  libs [lodash]
import extend from 'lodash/extend'
import defaults from 'lodash/defaults'
import isUndefined from 'lodash/isUndefined'
import some from 'lodash/some'
import isArray from 'lodash/isArray'
import castArray from 'lodash/castArray'
import defaultTo from 'lodash/defaultTo'

// relative modules

// modules
import isNode from '@usn/utils/dom/is-node'
import fallbackTo from '@usn/utils/misc/fallback-to'
import clientEnv from '@env'

/**
 *
 * @param {string} lookup
 * @param {Object} [options={}]
 * @param {boolean} [options.debug=false]
 * @returns {*}
 */
function getEnv(lookup, options={}) {
  const { debug } = options;
  let val = isNode() ? process.env[lookup] : clientEnv[lookup];
  val = defaultTo(val, clientEnv[lookup]);
  return val;
}

/**
 * @param {string} [lookup]
 * @param {*} [fallback]
 * @param {Object} [options={}]
 * @param {boolean} [options.debug=false]
 */
function env(lookup, fallback, options={}) {

  options = defaults(options, {
    debug: false,
  });

  const {
    debug,
  } = options

  if (debug) {

  }

  if (isArray(lookup)) {
    const _fallback = isArray(fallback) ? fallback : [];
    return lookup.map((key, i) => {
      const value = getEnv(key, options);
      return !isUndefined(value) ? value : fallback;
    });
  } else {
    const value = getEnv(lookup, options);
    const resp = !isUndefined(value) ? value : fallback;
    return resp;
  }

}

/**
 *
 * @param {string} lookup
 * @param {int} [fallback]
 */
function int(lookup, fallback) {
  const value = getEnv(lookup);
  const input = !isUndefined(value) ? value : fallback;
  return parseInt(input, 10);
}

/**
 *
 * @param {string} lookup
 * @param {float} [fallback]
 */
function float(lookup, fallback) {
  const value = getEnv(lookup);
  const input = !isUndefined(value) ? value : fallback;
  return parseFloat(input);
}

/**
 *
 * @param {string} lookup
 * @param {boolean} [fallback]
 */
function bool(lookup, fallback) {
  const value = getEnv(lookup);
  const isTrue = some([
    value === 'true',
    value === true,
  ]);

  const resp = !isUndefined(value) ? isTrue : fallback;

  return resp;
}

/**
 *
 * @param {string} lookup
 * @param {Object} [fallback]
 */
function json(lookup, fallback={}) {
  const value = getEnv(lookup);
  let resp = {};

  try {
    resp = JSON.parse(value);
  } catch (err) {
    resp = fallback;
  }

  return resp;
}

/**
 *
 * @param {string} lookup
 * @param {int} [fallback]
 */
function array(lookup, fallback) {
  const value = castArray(getEnv(lookup));
  const resp = !isUndefined(value) ? value : fallback;
  return resp;
}

/**
 *
 * @param {string} lookup
 * @param {Date} [fallback]
 */
function date(lookup, fallback=new Date()) {
  const value = new Date(getEnv(lookup));
  const resp = !isUndefined(value) ? new Date(value) : new Date(fallback);
  return resp;
}

extend(env, {
  int,
  float,
  bool,
  json,
  array,
  date,
});

export default env