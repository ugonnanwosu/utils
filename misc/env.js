// libs
import _ from 'lodash'

// relative modules

// modules
import isNode from '@usn/utils/dom/is-node'
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
  val = _.defaultTo(val, clientEnv[lookup]);
  return val;
}

/**
 * @param {string} [lookup]
 * @param {*} [fallback]
 * @param {Object} [options={}]
 * @param {boolean} [options.debug=false]
 */
function env(lookup, fallback, options={}) {

  options = _.defaults(options, {
    debug: false,
  });

  const {
    debug,
  } = options

  if (debug) {

  }

  if (_.isArray(lookup)) {
    const _fallback = _.isArray(fallback) ? fallback : [];
    return lookup.map((key, i) => {
      const value = getEnv(key, options);
      return !_.isUndefined(value) ? value : fallback;
    });
  } else {
    const value = getEnv(lookup, options);
    const resp = !_.isUndefined(value) ? value : fallback;
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
  const input = !_.isUndefined(value) ? value : fallback;
  return parseInt(input, 10);
}

/**
 *
 * @param {string} lookup
 * @param {float} [fallback]
 */
function float(lookup, fallback) {
  const value = getEnv(lookup);
  const input = !_.isUndefined(value) ? value : fallback;
  return parseFloat(input);
}

/**
 *
 * @param {string} lookup
 * @param {boolean} [fallback]
 */
function bool(lookup, fallback) {
  const value = getEnv(lookup);
  const isTrue = _.some([
    value === 'true',
    value === true,
  ]);

  const resp = !_.isUndefined(value) ? isTrue : fallback;

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
  const value = _.castArray(getEnv(lookup));
  const resp = !_.isUndefined(value) ? value : fallback;
  return resp;
}

/**
 *
 * @param {string} lookup
 * @param {Date} [fallback]
 */
function date(lookup, fallback=new Date()) {
  const value = new Date(getEnv(lookup));
  const resp = !_.isUndefined(value) ? new Date(value) : new Date(fallback);
  return resp;
}

_.extend(env, {
  int,
  float,
  bool,
  json,
  array,
  date,
});

export default env