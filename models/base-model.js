// libs
import EventEmitter from 'wolfy87-eventemitter'

// libs [lodash]
import _get from 'lodash/get'
import _set from 'lodash/set'
import castArray from 'lodash/castArray'
import clone from 'lodash/clone'
import defaults from 'lodash/defaults'
import each from 'lodash/each'
import extend from 'lodash/extend'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import zipObject from 'lodash/zipObject'

// relative modules

// modules

export const EVENTS = {
  CHANGE: 'CHANGE',
  SET: 'SET',
}

/**
 * @param {Object} store
 * @param {Object} [options={}]
 */
export function BaseModel(store, options={}) {
  options = defaults({...options}, {

  });

  const {

  } = options;

  const previousStore = { ...store };

  this.isInitial = true;

  extend(this, new EventEmitter());

  const storeProxy = new Proxy(store, {

    set: function (obj, prop, value) {

      const previous = previousStore[prop];

      if (isEqual(previous, value)) {
        return true;
      }

      previousStore[prop] = clone(obj[prop]);
      obj[prop] = value;

      return true;
    },

    get: function (target, prop, receiver) {
      const obj = Reflect.get(...arguments);

      // return _.get(this._proxy, attribute);

      return obj;
    }
  });

  function toJSON() {
    return { ...storeProxy };
  }

  function set(attributes, values, options={}) {
    options = defaults(options, {
      silent: false,
      trace: new Error().stack,
    });

    const {
      silent,
      trace,
    } = options;

    this.isInitial = false;

    if (isString(attributes)) {
      attributes = {[attributes]: values};
    } else if (isArray(attributes)) {
      attributes = zipObject(attributes, castArray(values));
    } else if (isObject(attributes)) {
      /**/
    }

    each(attributes, (value, prop) => {
      _set(storeProxy, prop, value);

      if (!silent) {
        this.emit(`${EVENTS.CHANGE}:${prop}`, {
          changedAttribute: prop,
          value,
          changes: attributes,
          trace,
        });
      }

    });

    if (!silent) {
      this.emit(EVENTS.CHANGE, {
        changes: attributes,
        trace,
      });

      this.emit(EVENTS.SET, {
        changes: attributes,
        trace,
      });
    }
  }

  /**
   *
   * @param {string} attribute
   * @returns {*}
   */
  function get(attribute) {
    return _get(storeProxy, attribute);
  }

  extend(this, {
    toJSON,
    set,
    get,
  });
}


export default BaseModel