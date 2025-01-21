// libs
import EventEmitter from 'wolfy87-eventemitter'

// libs [lodash]
import defaults from 'lodash/defaults'
import extend from 'lodash/extend'
import isEqual from 'lodash/isEqual'
import _set from 'lodash/set'
import _get from 'lodash/get'
import clone from 'lodash/clone'
import castArray from 'lodash/castArray'
import each from 'lodash/each'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

// relative modules

// modules

export const EVENTS = {
  CHANGE: 'CHANGE',
  CHANGE_OPTIONAL: 'CHANGE_OPTIONAL',
  SET: 'CHANGE_OPTIONAL',
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

  let isInitial = true;

  extend(this, new EventEmitter())

  const storeProxy = new Proxy(store, {

    set: function (obj, prop, value) {

      const previous = previousStore[prop];

      if (isEqual(previous, value)) {
        return true;
      }

      console.log({
        previousStore,
        prop,
        obj,
        prev: previousStore[prop]
      })

      // previous[prop] = clone(obj[prop]);
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
    });

    const {
      silent
    } = options;

    isInitial = false;

    if (_.isString(attributes)) {
      attributes = {[attributes]: values};
    } else if (_.isArray(attributes)) {
      attributes = _.zipObject(attributes, _.castArray(values));
    } else if (_.isObject(attributes)) {
      /**/
    }

    each(attributes, (value, prop) => {
      _set(storeProxy, prop, value);

      if (!silent) {
        this.emit(`${EVENTS.CHANGE_OPTIONAL}:${prop}`, {
          changedAttribute: prop,
          value,
          changes: attributes,
        });
      }
    });

    if (!silent) {

      this.emit(EVENTS.CHANGE_OPTIONAL, {
        changes: attributes
      });

      this.emit(EVENTS.SET, {
        changes: attributes
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